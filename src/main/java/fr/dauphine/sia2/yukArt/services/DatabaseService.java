package fr.dauphine.sia2.yukArt.services;

import java.util.List;

import fr.dauphine.sia2.tools.Hashage;
import fr.dauphine.sia2.yukArt.data.DataBase;
import fr.dauphine.sia2.yukArt.engine.MailManagement;
import fr.dauphine.sia2.yukArt.objects.Film;

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
			String passwordHash = Hashage.sha256(password);
			db.createNewUser(login, passwordHash, email);

			MailManagement mailM = new MailManagement();
			mailM.sendMail(email, login);

			return "NEW_USER_CREATED";
		}

	}

	public boolean testCode(String username, String code) {
		int userCode = db.getUser(username).getMailConfirmation();
		if (Integer.parseInt(code) == userCode) {
			db.getUser(username).setAccountConfirmed();
			return true;
		}
		return false;
	}

	public Film addMovieInFavoriteList(String username, String movie) {
		return db.addMovieInFavoriteList(username,movie);
	}
	
	public boolean removeMovieInFavoriteList(String username, String movie) {
		return db.removeMovieInFavoriteList(username,movie);
	}

	public List<Film> getMovieInFavoriteList(String username) {
		return db.getMovieInFavoriteList(username);
	}
}
