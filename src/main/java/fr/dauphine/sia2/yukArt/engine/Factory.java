package fr.dauphine.sia2.yukArt.engine;

public class Factory {

	public static User getUser(int id, String login, String password, String email, boolean isAdmin,
			int mailConfirmation, boolean isAccountConfirmed) {
		// Possibilite de faire un traitement sur le password ici
		return new User(id, login, password, email, isAdmin, mailConfirmation, isAccountConfirmed);
	}

}

