package fr.dauphine.sia2.yukArt.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import fr.dauphine.sia2.yukArt.objects.Film;
import model.OMDBApiConnect;
import model.TheMovieDBApiConnect;

@Service
public class FilmService {

	private static final String POSTER = "http://image.tmdb.org/t/p/w185/PATH";
	private static final String SEARCH_IMDB ="https://www.imdb.com/title/IMDB_ID/";
	private static final Integer RECOMMANDATION_SIZE = 15;
	
	public Film searchMovieByTitle(String name) throws ParseException {
		OMDBApiConnect omdb = new OMDBApiConnect();
		String result = omdb.searchMovieByTitle(name);

		JSONObject jsonFilm = omdb.parseToJson(result);

		if (jsonFilm.get("Response").toString().equals("False")) {
			return null;
		}

		
		List<String> genres = new ArrayList<>();
		genres.add(jsonFilm.get("Genre").toString());
		
		Film film = new Film(jsonFilm.get("Title").toString(), jsonFilm.get("Year").toString(),
				jsonFilm.get("Released").toString(), jsonFilm.get("Runtime").toString(),
				genres, jsonFilm.get("Plot").toString(), jsonFilm.get("Poster").toString(),jsonFilm.get("imdbRating").toString());
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
			
			List<String> genres = new ArrayList<>();
			genres.add(jsonDetailledFilm.get("Genre").toString());
			
			films.add(new Film(jsonDetailledFilm.get("Title").toString(), jsonDetailledFilm.get("Year").toString(),
					jsonDetailledFilm.get("Released").toString(), jsonDetailledFilm.get("Runtime").toString(),
					genres, jsonDetailledFilm.get("Plot").toString(),
					jsonDetailledFilm.get("Poster").toString(),jsonDetailledFilm.get("imdbRating").toString()));
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
			JSONObject jsonDetailledFilm = omdb.parseToJson(resultDetailledFilm);
			
			List<String> genres = new ArrayList<>();
			JSONArray genresJSONArray = (JSONArray) jsonDetailledFilm.get("genres");
			
			for(Object genre : genresJSONArray) {
				JSONObject genreJSONObject = (JSONObject) genre;
				genres.add(genreJSONObject.get("name").toString());
			}
			
			String poster = POSTER.replaceAll("PATH", jsonDetailledFilm.get("poster_path").toString());
			String imdb_url = SEARCH_IMDB.replaceAll("IMDB_ID", jsonDetailledFilm.get("imdb_id").toString());

			films.add(new Film(jsonDetailledFilm.get("original_title").toString(), jsonDetailledFilm.get("release_date").toString().split("-")[0],
					jsonDetailledFilm.get("release_date") == null ? null : jsonDetailledFilm.get("release_date").toString(), jsonDetailledFilm.get("runtime")== null ? null :jsonDetailledFilm.get("runtime").toString(),
					genres, jsonDetailledFilm.get("overview").toString(),
					poster,jsonDetailledFilm.get("vote_average").toString(),imdb_url));
		}

		return films;
	}

	public List<Film> searchRecommandations(String username) throws ParseException {
		DatabaseService databaseService = new DatabaseService();
		
		List<Film> favoriteList = databaseService.getMovieInFavoriteList(username);
		
		if(favoriteList.size() == 0) {
			return searchPopular();
		}

		Collections.shuffle(favoriteList);
		
		TheMovieDBApiConnect omdb = new TheMovieDBApiConnect();
		
		List<Film> films = new ArrayList<>();

		for(Film favori : favoriteList) {
			if(films.size() >= RECOMMANDATION_SIZE) {
				break;
			}
			String result = omdb.searchRecommandation(favori.getTitle());
			JSONObject jsonResult = omdb.parseToJson(result);
			JSONArray jsonFilms = (JSONArray) jsonResult.get("results");

			for (Object film : jsonFilms) {
				JSONObject jsonFilm = (JSONObject) film;

				String resultDetailledFilm = omdb.searchDetailledMovieById(jsonFilm.get("id").toString());
				JSONObject jsonDetailledFilm = new JSONObject();
				
				try {
					jsonDetailledFilm=omdb.parseToJson(resultDetailledFilm);
				}catch(ParseException ex) {
					continue;
				}
				
				List<String> genres = new ArrayList<>();
				JSONArray genresJSONArray = (JSONArray) jsonDetailledFilm.get("genres");
				
				for(Object genre : genresJSONArray) {
					JSONObject genreJSONObject = (JSONObject) genre;
					genres.add(genreJSONObject.get("name").toString());
				}
				
				String poster = POSTER.replaceAll("PATH", jsonDetailledFilm.get("poster_path").toString());
				String imdb_url = SEARCH_IMDB.replaceAll("IMDB_ID", jsonDetailledFilm.get("imdb_id").toString());

				films.add(new Film(jsonDetailledFilm.get("original_title").toString(), jsonDetailledFilm.get("release_date").toString().split("-")[0],
						jsonDetailledFilm.get("release_date") == null ? null : jsonDetailledFilm.get("release_date").toString(), jsonDetailledFilm.get("runtime")== null ? null :jsonDetailledFilm.get("runtime").toString(),
						genres, jsonDetailledFilm.get("overview").toString(),
						poster,jsonDetailledFilm.get("vote_average").toString(),imdb_url));
				
			}

		}

		return films;
	}
}
