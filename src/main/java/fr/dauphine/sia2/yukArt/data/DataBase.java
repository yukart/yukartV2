package fr.dauphine.sia2.yukArt.data;

import java.util.List;

import com.wrapper.spotify.models.Track;

import fr.dauphine.sia2.yukArt.engine.Comment;
import fr.dauphine.sia2.yukArt.engine.User;
import fr.dauphine.sia2.yukArt.objects.Film;

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

	public void updateUserConfirmed(String login) {
		dataBConnect.updateUserConfirmed(login);
	}

	public Film addMovieInFavoriteList(String username, String movie) {
		return dataBConnect.insertMovieInFavoriteList(username, movie);
	}

	public boolean removeMovieInFavoriteList(String username, String movie) {
		return dataBConnect.removeMovieInFavoriteList(username, movie);
	}

	public List<Film> getMovieInFavoriteList(String username) {
		return dataBConnect.getMovieInFavoriteList(username);
	}

	public Track addMusicInFavoriteList(String username, String track) {
		return dataBConnect.insertMusicInFavoriteList(username, track);
	}

	public boolean removeTrackInFavoriteList(String username, String track) {
		return dataBConnect.removeTrackInFavoriteList(username, track);
	}

	public List<Track> getTrackInFavoriteList(String username) {
		return dataBConnect.getTrackInFavoriteList(username);
	}

}
