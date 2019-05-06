package fr.dauphine.sia2.yukArt.data;

import fr.dauphine.sia2.yukArt.engine.Comment;
import fr.dauphine.sia2.yukArt.engine.User;

public class DataBase {

	private static DataBase INSTANCE = null;
	private DBConnect dataBConnect;

	public DataBase() {
		this.dataBConnect = new DBConnect();
	}

	public static DataBase getDataBase() {
		if (INSTANCE == null)
			INSTANCE = new DataBase();
		return INSTANCE;
	}

	public boolean existLogin(String login) {
		return this.dataBConnect.existLogin(login);
	}

	public boolean existUser(String login, String pass) {
		return this.dataBConnect.existUser(login, pass);
	}

	public void createNewUser(String formPseudo, String formPwd, String formMail) {
		this.dataBConnect.createUser(formPseudo, formPwd, formMail);
	}

	public User getUser(String formPseudo) {
		return this.dataBConnect.getUser(formPseudo);
	}

	public void changePassword(String login, String password) {
		dataBConnect.changePassword(login, password);
	}

	public void insertComment(Comment c) {
		dataBConnect.insertComment(c);
	}

}
