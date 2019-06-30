package fr.dauphine.sia2.yukArt;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wrapper.spotify.models.Artist;
import com.wrapper.spotify.models.Page;
import com.wrapper.spotify.models.SimpleAlbum;
import com.wrapper.spotify.models.Track;

import fr.dauphine.sia2.yukArt.model.SpotifyNewReleases;
import fr.dauphine.sia2.yukArt.objects.Film;
import fr.dauphine.sia2.yukArt.services.DatabaseService;
import fr.dauphine.sia2.yukArt.services.FilmService;
import fr.dauphine.sia2.yukArt.services.MusicService;
import fr.dauphine.sia2.yukArt.services.TrackService;

@RestController
public class ReferentielRestController {

	@RequestMapping("/api/filmByTitle/{name}")
	public List<Film> getFilmDescriptionByTitle(HttpServletRequest request, HttpServletResponse response,
			@PathVariable String name) throws ParseException {

		FilmService filmService = new FilmService();
		List<Film> film = filmService.searchAllMovieByTitle(name);

		if (film == null) {
			return null;
		}

		return film;
	}

	@RequestMapping("/api/artist/{name}")
	public List<Artist> getArtist(HttpServletRequest request, HttpServletResponse response, @PathVariable String name)
			throws ParseException {

		MusicService musicService = new MusicService();
		List<Artist> artists = musicService.searchArtist(name);

		if (artists == null) {
			return null;
		}

		return artists;
	}

	@RequestMapping("/api/track/{name}")
	public List<Track> getTrack(HttpServletRequest request, HttpServletResponse response, @PathVariable String name)
			throws ParseException {

		TrackService trackService = new TrackService();
		List<Track> tracks = trackService.searchTrack(name);

		if (tracks == null) {
			return null;
		}

		return tracks;
	}

	@RequestMapping("/api/connexion/{login}/{password}")
	public String connexion(HttpServletRequest request, HttpServletResponse response, @PathVariable String login,
			@PathVariable String password) {

		DatabaseService databaseService = new DatabaseService();

		return databaseService.testConnexion(login, password);
	}

	@RequestMapping("/api/verificationCode/{username}/{code}")
	public boolean verificationCode(HttpServletRequest request, HttpServletResponse response,
			@PathVariable String username, @PathVariable String code) {

		DatabaseService databaseService = new DatabaseService();

		return databaseService.testCode(username, code);
	}

	@RequestMapping("/api/inscription/{login}/{password}/{email}")
	public String inscription(HttpServletRequest request, HttpServletResponse response, @PathVariable String login,
			@PathVariable String password, @PathVariable String email) {

		DatabaseService databaseService = new DatabaseService();

		return databaseService.testInscription(login, password, email);
	}

	@RequestMapping("/api/addMovieInFavoriteList/{username}/{movie}")
	public Film addMovieInFavoriteList(HttpServletRequest request, HttpServletResponse response,
			@PathVariable String username, @PathVariable String movie) {

		DatabaseService databaseService = new DatabaseService();

		return databaseService.addMovieInFavoriteList(username, movie);
	}

	@RequestMapping("/api/removeMovieInFavoriteList/{username}/{movie}")
	public boolean removeMovieInFavoriteList(HttpServletRequest request, HttpServletResponse response,
			@PathVariable String username, @PathVariable String movie) {

		DatabaseService databaseService = new DatabaseService();

		return databaseService.removeMovieInFavoriteList(username, movie);
	}

	@RequestMapping("/api/loadFavoriteList/{username}")
	public List<Film> loadFavoriteList(HttpServletRequest request, HttpServletResponse response,
			@PathVariable String username) {

		DatabaseService databaseService = new DatabaseService();

		return databaseService.getMovieInFavoriteList(username);
	}

	@RequestMapping("/api/loadPopularMovies")
	public List<Film> loadPopularMovies(HttpServletRequest request, HttpServletResponse response)
			throws ParseException {

		FilmService filmService = new FilmService();

		return filmService.searchPopular();
	}

	@RequestMapping("/api/loadRecommandationsMovies/{username}")
	public List<Film> loadRecommandationsMovies(HttpServletRequest request, HttpServletResponse response,
			@PathVariable String username) throws ParseException {

		FilmService filmService = new FilmService();

		return filmService.searchRecommandations(username);
	}

	@RequestMapping("/api/loadRecommandationsAlbums/{username}")
	public Page<SimpleAlbum> loadRecommandationsAlbums(HttpServletRequest request, HttpServletResponse response,
			@PathVariable String username) throws ParseException {

		SpotifyNewReleases newReleases = new SpotifyNewReleases();

		return newReleases.recommandations();
	}

	@RequestMapping("/api/addTrackInFavoriteList/{username}/{track}")
	public Track addMusicInFavoriteList(HttpServletRequest request, HttpServletResponse response,
			@PathVariable String username, @PathVariable String track) {

		DatabaseService databaseService = new DatabaseService();

		return databaseService.addMusicInFavoriteList(username, track);
	}

	@RequestMapping("/api/removeTrackInFavoriteList/{username}/{track}")
	public boolean removeTrackInFavoriteList(HttpServletRequest request, HttpServletResponse response,
			@PathVariable String username, @PathVariable String track) {

		DatabaseService databaseService = new DatabaseService();

		return databaseService.removeTrackInFavoriteList(username, track);
	}

	@RequestMapping("/api/loadFavoriteTrackList/{username}")
	public List<Track> loadFavoriteTrackList(HttpServletRequest request, HttpServletResponse response,
			@PathVariable String username) {

		DatabaseService databaseService = new DatabaseService();

		return databaseService.getTrackInFavoriteList(username);
	}
}
