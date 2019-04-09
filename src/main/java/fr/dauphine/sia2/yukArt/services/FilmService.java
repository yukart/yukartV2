package fr.dauphine.sia2.yukArt.services;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import fr.dauphine.sia2.yukArt.objects.Film;
import model.OMDBApiConnect;

@Service
public class FilmService {

	public Film searchMovieByTitle(String name) throws ParseException {
		OMDBApiConnect omdb = new OMDBApiConnect();
		String result = omdb.searchMovieByTitle(name);

		JSONObject jsonFilm = omdb.parseToJson(result);

		if (jsonFilm.get("Response").toString().equals("False")) {
			return null;
		}

		Film film = new Film(jsonFilm.get("Title").toString(), jsonFilm.get("Year").toString(),
				jsonFilm.get("Released").toString(), jsonFilm.get("Runtime").toString(),
				jsonFilm.get("Genre").toString(), jsonFilm.get("Plot").toString(), jsonFilm.get("Poster").toString());
		return film;
	}

	public List<Film> searchAllMovieByTitle(String name) throws ParseException {
		OMDBApiConnect omdb = new OMDBApiConnect();
		String result = omdb.searchAllMovieByTitle(name);

		JSONObject jsonResult = omdb.parseToJson(result);

		if (jsonResult.get("Response").toString().equals("False")) {
			return null;
		}

		JSONArray jsonFilms = (JSONArray) jsonResult.get("Search");

		List<Film> films = new ArrayList<>();

		for (Object film : jsonFilms) {
			JSONObject jsonFilm = (JSONObject) film;
			String resultDetailledFilm = omdb.searchMovieByImdb(jsonFilm.get("imdbID").toString());
			JSONObject jsonDetailledFilm = omdb.parseToJson(resultDetailledFilm);

			films.add(new Film(jsonDetailledFilm.get("Title").toString(), jsonDetailledFilm.get("Year").toString(),
					jsonDetailledFilm.get("Released").toString(), jsonDetailledFilm.get("Runtime").toString(),
					jsonDetailledFilm.get("Genre").toString(), jsonDetailledFilm.get("Plot").toString(),
					jsonDetailledFilm.get("Poster").toString()));
		}

		return films;
	}
}
