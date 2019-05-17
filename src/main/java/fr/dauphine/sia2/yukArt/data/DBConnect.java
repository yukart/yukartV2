package fr.dauphine.sia2.yukArt.data;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.json.simple.parser.ParseException;

import fr.dauphine.sia2.yukArt.engine.Comment;
import fr.dauphine.sia2.yukArt.engine.Factory;
import fr.dauphine.sia2.yukArt.engine.User;
import fr.dauphine.sia2.yukArt.objects.Film;
import fr.dauphine.sia2.yukArt.services.FilmService;

public class DBConnect {

	private Connection connect;

	private FilmService filmService;

	public DBConnect() {
		// File file = new File(
		// DBConnect.class.getProtectionDomain().getCodeSource().getLocation().getPath()
		// + "config.txt");

		File file = new File("config.txt");

		try {
			FileReader fis = new FileReader(file);
			@SuppressWarnings("resource")
			BufferedReader buff = new BufferedReader(fis);
			try {
				String className = buff.readLine();
				String url = buff.readLine();
				String login = buff.readLine();
				String password = buff.readLine();
				try {
					Class.forName(className);
				} catch (ClassNotFoundException e1) {

					e1.printStackTrace();
				}
				try {
					this.connect = DriverManager.getConnection(url, login, password);
				} catch (SQLException e) {

					e.printStackTrace();
				}
			} catch (FileNotFoundException e2) {
				e2.printStackTrace();
			}
		} catch (IOException e2) {
			e2.printStackTrace();
		}
		
		filmService = new FilmService();
	}

	// Vérifié que le login n'est pas déjé pris
	public boolean existLogin(String login) {
		Statement request;
		ResultSet res;
		boolean tmp = false;
		try {
			String sql = "SELECT * FROM users WHERE login = '" + login + "'";
			request = connect.createStatement();
			res = request.executeQuery(sql);
			tmp = res.next();
		} catch (SQLException e) {

			e.printStackTrace();
		}
		return tmp;

	}

	// Verifie qu'un utilisateur existe
	public boolean existUser(String loginConnect, String passConnect) {
		Statement request;
		ResultSet res;
		boolean tmp = false;
		try {
			String sql = "SELECT * FROM users WHERE login = '" + loginConnect + "' and password = '" + passConnect
					+ "'";
			request = connect.createStatement();
			res = request.executeQuery(sql);
			tmp = res.next();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return tmp;

	}
	
	public void updateUserConfirmed(String username) {
		this.setUpdate("update users set isAccountConfirmed = 1 where login = '" + username + "'");
	}

	public void createUser(String formPseudo, String formPwd, String formMail) {
		Random r = new Random();
		int mailConfirmation = r.nextInt(10000);
		this.setUpdate("Insert into users(login,password,email,isAdmin,mailConfirmation) Values('" + formPseudo + "','"
				+ formPwd + "','" + formMail + "', false, " + mailConfirmation + " )");
	}

	public User getUser(String formPseudo) {
		return this.getUsers("select * from users where login='" + formPseudo + "'").get(0);
	}

	private List<User> getUsers(String sql) {
		Statement request;
		ResultSet resultSet;
		String login = null, password = null, email = null;
		int id = 0;
		boolean isAdmin = false;
		int mailConfirmation = 0;
		boolean isAccountConfirmed = false;
		List<User> lUser = new ArrayList<User>();
		try {
			request = connect.createStatement();
			resultSet = request.executeQuery(sql);

			while (resultSet.next()) {
				id = resultSet.getInt("id_user");
				login = resultSet.getString("login");
				password = resultSet.getString("password");
				email = resultSet.getString("email");
				isAdmin = resultSet.getBoolean("isAdmin");
				mailConfirmation = resultSet.getInt("mailConfirmation");
				isAccountConfirmed = resultSet.getBoolean("isAccountConfirmed");
				lUser.add(Factory.getUser(id, login, password, email, isAdmin, mailConfirmation, isAccountConfirmed));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return lUser;
	}

	private void setUpdate(String sql) {
		Statement request = null;
		try {
			request = connect.createStatement();
			request.executeUpdate(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void changePassword(String login, String password) {
		this.setUpdate("update users set password ='" + password + "' where login = '" + login + "'");
	}

	public void insertComment(Comment c) {
		this.setUpdate("Insert into comment(username, comment, date) Values('" + c.getUserName() + "','"
				+ c.getCommentContent() + "','" + c.getDate() + "'");
	}

	public static void main(String[] args) {
		DBConnect db = new DBConnect();
		// db.createUser("vik3", "vik3", "vik2@vik2.vik2");
		System.out.println(db.existLogin("vik3"));
		System.out.println(db.getUser("fontlo15").getMailConfirmation());
		// System.out.println(db.getUser("vik3").isAccountConfirmed());
	}

	public boolean existsFavorite(String username, String movie) {
		Statement request;
		ResultSet res;
		boolean tmp = false;
		try {
			String sql = "SELECT * FROM bridgefavoritemovie WHERE login = '" + username + "' AND movie= '" +movie+"';";
			request = connect.createStatement();
			res = request.executeQuery(sql);
			tmp = res.next();
		} catch (SQLException e) {

			e.printStackTrace();
		}
		return tmp;
	}
	public Film insertMovieInFavoriteList(String username, String movie) {
		String sql = "Insert into bridgefavoritemovie(login,movie) Values('"+username+"','"+movie+"');";
		this.setUpdate(sql);
		
		try {
			return filmService.searchMovieByTitle(movie);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public boolean removeMovieInFavoriteList(String username, String movie) {
		String sql = "Delete from bridgefavoritemovie where login='"+username+"' and movie='"+movie+"';";
		this.setUpdate(sql);
		return true;
	}

	public List<Film> getMovieInFavoriteList(String username) {
		Statement request;
		ResultSet resultSet;
		String movie;
		List<Film> lMovie = new ArrayList<Film>();
		
		try {
			request = connect.createStatement();
			resultSet = request.executeQuery("select movie from bridgefavoritemovie where login='" + username + "'");

			while (resultSet.next()) {
				movie = resultSet.getString("movie");
				Film film = null;
				try {
					film = filmService.searchMovieByTitle(movie);
				} catch (ParseException e) {
					e.printStackTrace();
				}
				lMovie.add(film);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return lMovie;
	}

}