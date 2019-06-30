package fr.dauphine.sia2.yukArt.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import fr.dauphine.sia2.yukArt.model.TheMovieDBApiConnect;
import fr.dauphine.sia2.yukArt.objects.Film;

@Service
public class FilmService {

	private static final String POSTER = "http://image.tmdb.org/t/p/w185/PATH";
	private static final String SEARCH_IMDB = "https://www.imdb.com/title/IMDB_ID/";
	private static final Integer RECOMMANDATION_SIZE = 15;

	public Film searchMovieByTitle(String name) throws ParseException {
		TheMovieDBApiConnect omdb = new TheMovieDBApiConnect();
		String result = omdb.searchAllMovieByTitle(name);

		JSONObject jsonResult = omdb.parseToJson(result);

		if (jsonResult.get("total_results").toString().equals("0")) {
			return null;
		}

		JSONArray jsonFilms = (JSONArray) jsonResult.get("results");

		JSONObject jsonFilm = (JSONObject) jsonFilms.get(0);

		String resultDetailledFilm = omdb.searchDetailledMovieById(jsonFilm.get("id").toString());
		JSONObject jsonDetailledFilm = omdb.parseToJson(resultDetailledFilm);

		List<String> genres = new ArrayList<>();
		JSONArray genresJSONArray = (JSONArray) jsonDetailledFilm.get("genres");

		for (Object genre : genresJSONArray) {
			JSONObject genreJSONObject = (JSONObject) genre;
			genres.add(genreJSONObject.get("name").toString());
		}

		String poster = POSTER.replaceAll("PATH", jsonDetailledFilm.get("poster_path").toString());
		String imdb_url = SEARCH_IMDB.replaceAll("IMDB_ID", jsonDetailledFilm.get("imdb_id").toString());

		Film film = new Film(jsonDetailledFilm.get("original_title").toString(),
				jsonDetailledFilm.get("release_date").toString().split("-")[0],
				jsonDetailledFilm.get("release_date") == null ? null : jsonDetailledFilm.get("release_date").toString(),
				jsonDetailledFilm.get("runtime") == null ? null : jsonDetailledFilm.get("runtime").toString(), genres,
				jsonDetailledFilm.get("overview").toString(), poster, jsonDetailledFilm.get("vote_average").toString(),
				imdb_url);

		return film;
	}

	public List<Film> searchAllMovieByTitle(String name) throws ParseException {
		TheMovieDBApiConnect omdb = new TheMovieDBApiConnect();
		String result = omdb.searchAllMovieByTitle(name);
		JSONObject jsonResult = new JSONObject();
		try {
			jsonResult = omdb.parseToJson(result);
		} catch (ParseException ex) {
			return null;
		}
		if (jsonResult.get("total_results").toString().equals("0")) {
			return null;
		}

		JSONArray jsonFilms = (JSONArray) jsonResult.get("results");

		List<Film> films = new ArrayList<>();

		for (Object film : jsonFilms) {
			JSONObject jsonFilm = (JSONObject) film;

			String resultDetailledFilm = omdb.searchDetailledMovieById(jsonFilm.get("id").toString());
			JSONObject jsonDetailledFilm = new JSONObject();
			try {
				jsonDetailledFilm = omdb.parseToJson(resultDetailledFilm);
			} catch (ParseException ex) {
				continue;
			}
			List<String> genres = new ArrayList<>();
			JSONArray genresJSONArray = (JSONArray) jsonDetailledFilm.get("genres");

			for (Object genre : genresJSONArray) {
				JSONObject genreJSONObject = (JSONObject) genre;
				genres.add(genreJSONObject.get("name").toString());
			}

			String poster = "";
			try {
				poster = POSTER.replaceAll("PATH", jsonDetailledFilm.get("poster_path").toString());
			} catch (Exception ex) {

			}

			String imdb_url = "";

			try {
				imdb_url = SEARCH_IMDB.replaceAll("IMDB_ID", jsonDetailledFilm.get("imdb_id").toString());
			} catch (Exception ex) {

			}

			films.add(new Film(jsonDetailledFilm.get("original_title").toString(),
					jsonDetailledFilm.get("release_date").toString().split("-")[0],
					jsonDetailledFilm.get("release_date") == null ? null
							: jsonDetailledFilm.get("release_date").toString(),
					jsonDetailledFilm.get("runtime") == null ? null : jsonDetailledFilm.get("runtime").toString(),
					genres, jsonDetailledFilm.get("overview").toString(), poster,
					jsonDetailledFilm.get("vote_average").toString(), imdb_url));
		}

		return films;
	}

	public List<Film> searchPopular() throws ParseException {
		TheMovieDBApiConnect omdb = new TheMovieDBApiConnect();
		String result = omdb.searchPopular();

		JSONObject jsonResult = omdb.parseToJson(result);

		if (jsonResult.get("total_results").toString().equals("0")) {
			return null;
		}

		JSONArray jsonFilms = (JSONArray) jsonResult.get("results");

		List<Film> films = new ArrayList<>();

		for (Object film : jsonFilms) {
			JSONObject jsonFilm = (JSONObject) film;

			String resultDetailledFilm = omdb.searchDetailledMovieById(jsonFilm.get("id").toString());
			JSONObject jsonDetailledFilm = new JSONObject();
			try {
				jsonDetailledFilm = omdb.parseToJson(resultDetailledFilm);
			} catch (ParseException ex) {
				continue;
			}

			List<String> genres = new ArrayList<>();

			JSONArray genresJSONArray = (JSONArray) jsonDetailledFilm.get("genres");

			for (Object genre : genresJSONArray) {
				JSONObject genreJSONObject = (JSONObject) genre;
				genres.add(genreJSONObject.get("name").toString());
			}

			String poster = POSTER.replaceAll("PATH", jsonDetailledFilm.get("poster_path").toString());
			String imdb_url = SEARCH_IMDB.replaceAll("IMDB_ID", jsonDetailledFilm.get("imdb_id").toString());

			films.add(new Film(jsonDetailledFilm.get("original_title").toString(),
					jsonDetailledFilm.get("release_date").toString().split("-")[0],
					jsonDetailledFilm.get("release_date") == null ? null
							: jsonDetailledFilm.get("release_date").toString(),
					jsonDetailledFilm.get("runtime") == null ? null : jsonDetailledFilm.get("runtime").toString(),
					genres, jsonDetailledFilm.get("overview").toString(), poster,
					jsonDetailledFilm.get("vote_average").toString(), imdb_url));

		}

		return films;
	}

	public List<Film> searchRecommandations(String username) throws ParseException {
		DatabaseService databaseService = new DatabaseService();

		List<Film> favoriteList = databaseService.getMovieInFavoriteList(username);

		if (favoriteList.size() == 0) {
			return searchPopular();
		}

		Collections.shuffle(favoriteList);

		TheMovieDBApiConnect omdb = new TheMovieDBApiConnect();

		List<Film> films = new ArrayList<>();

		for (Film favori : favoriteList) {
			if (films.size() >= RECOMMANDATION_SIZE) {
				break;
			}
			String result = omdb.searchRecommandation(favori.getTitle());
			JSONObject jsonResult = omdb.parseToJson(result);
			JSONArray jsonFilms = (JSONArray) jsonResult.get("results");

			int countMaxReco = 0;
			for (Object film : jsonFilms) {
				if (countMaxReco > 5) {
					break;
				}
				JSONObject jsonFilm = (JSONObject) film;

				String resultDetailledFilm = omdb.searchDetailledMovieById(jsonFilm.get("id").toString());
				JSONObject jsonDetailledFilm = new JSONObject();

				try {
					jsonDetailledFilm = omdb.parseToJson(resultDetailledFilm);
				} catch (ParseException ex) {
					continue;
				}

				List<String> genres = new ArrayList<>();
				JSONArray genresJSONArray = (JSONArray) jsonDetailledFilm.get("genres");

				for (Object genre : genresJSONArray) {
					JSONObject genreJSONObject = (JSONObject) genre;
					genres.add(genreJSONObject.get("name").toString());
				}

				String poster = POSTER.replaceAll("PATH", jsonDetailledFilm.get("poster_path").toString());
				String imdb_url = SEARCH_IMDB.replaceAll("IMDB_ID", jsonDetailledFilm.get("imdb_id").toString());

				films.add(new Film(jsonDetailledFilm.get("original_title").toString(),
						jsonDetailledFilm.get("release_date").toString().split("-")[0],
						jsonDetailledFilm.get("release_date") == null ? null
								: jsonDetailledFilm.get("release_date").toString(),
						jsonDetailledFilm.get("runtime") == null ? null : jsonDetailledFilm.get("runtime").toString(),
						genres, jsonDetailledFilm.get("overview").toString(), poster,
						jsonDetailledFilm.get("vote_average").toString(), imdb_url));

				countMaxReco++;
			}

		}

		return films;
	}
}
