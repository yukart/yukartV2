package fr.dauphine.sia2.yukArt.services;

import fr.dauphine.sia2.yukArt.data.DataBase;

public class DatabaseService {
	DataBase db = new DataBase();

	public boolean testConnexion(String login, String password) {
		return db.existUser(login, password);
	}

	public String testInscription(String login, String password, String email) {
		if (db.existLogin(login)) {
			return "USER_ALREADY_EXISTS";
		} else {
			db.createNewUser(login, password, email);
			return "NEW_USER_CREATED";
		}

	}
}
