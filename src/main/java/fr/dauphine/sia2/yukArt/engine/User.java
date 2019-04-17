package fr.dauphine.sia2.yukArt.engine;

public class User {
	private int id;
	private String email;
	private String login;
	private String password;
	private boolean isAdmin;

	public User(int ID, String log, String pass, String mail, boolean admin) {
		this.id = ID;
		this.login = log;
		this.password = pass;
		this.email = mail;
		this.isAdmin = admin;
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

}
