package fr.dauphine.sia2.yukArt.services;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import model.OMDBApiConnect;

@Service
public class FilmService {

	public JSONObject searchMovieByTitle(String name) throws ParseException {
		OMDBApiConnect omdb = new OMDBApiConnect();
		String result = omdb.searchMovieByTitle(name);
		return omdb.parseToJson(result);
	}
}
