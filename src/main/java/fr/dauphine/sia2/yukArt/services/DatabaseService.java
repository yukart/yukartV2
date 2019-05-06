package fr.dauphine.sia2.yukArt.services;

import fr.dauphine.sia2.yukArt.data.DataBase;

public class DatabaseService {
	public boolean testConnexion(String login, String password) {
		DataBase db = new DataBase();

		return db.existUser(login, password);
	}
}
