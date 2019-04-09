package fr.dauphine.sia2.yukArt.services;

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
				jsonFilm.get("Genre").toString(), jsonFilm.get("Plot").toString());
		return film;
	}
}
