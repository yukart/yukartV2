package fr.dauphine.sia2.yukArt.engine;

import fr.dauphine.sia2.yukArt.data.DataBase;

public class User {
	private int id;
	private String email;
	private String login;
	private String password;
	private boolean isAdmin;
	private int mailConfirmation;
	private boolean isAccountConfirmed;
	private DataBase db = new DataBase();

	public User(int ID, String log, String pass, String mail, boolean admin, int mailConfirmation,
			boolean accountConfirmed) {
		this.id = ID;
		this.login = log;
		this.password = pass;
		this.email = mail;
		this.isAdmin = admin;
		this.mailConfirmation = mailConfirmation;
		this.isAccountConfirmed = accountConfirmed;

	}

	public String getLogin() {
		return this.login;
	}

	public boolean isAdmin() {
		return this.isAdmin;
	}

	public String getEmail() {
		return this.email;
	}

	public int getId() {
		return this.id;
	}

	public String getPassword() {
		return this.password;
	}

	public int getMailConfirmation() {
		return this.mailConfirmation;
	}

	public boolean isAccountConfirmed() {
		return this.isAccountConfirmed;
	}

	public void setAccountConfirmed() {
		db.updateUserConfirmed(this.login);
		this.isAccountConfirmed = true;
	}

}
