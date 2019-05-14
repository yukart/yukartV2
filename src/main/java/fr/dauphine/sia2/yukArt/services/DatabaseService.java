package fr.dauphine.sia2.yukArt.services;

import fr.dauphine.sia2.tools.Hashage;
import fr.dauphine.sia2.yukArt.data.DataBase;
import fr.dauphine.sia2.yukArt.engine.MailManagement;

public class DatabaseService {
	DataBase db = new DataBase();

	public String testConnexion(String login, String password) {
		String passwordHash = Hashage.sha256(password);
		if (db.existUser(login, passwordHash)) {
			if (db.getUser(login).isAccountConfirmed()) {

				return "USER_CONNECTED";
			} else {
				System.out.println("User not confirmed");
				return "USER_ACCOUNT_NOT_CONFIRMED";
			}
		} else {
			return "USER_NOT_EXISTS";
		}
	}

	public String testInscription(String login, String password, String email) {
		if (db.existLogin(login)) {
			return "USER_ALREADY_EXISTS";
		} else {
			MailManagement mailM = new MailManagement();
			mailM.sendMail(email, login);
			String passwordHash = Hashage.sha256(password);
			db.createNewUser(login, passwordHash, email);

			return "NEW_USER_CREATED";
		}

	}
}
