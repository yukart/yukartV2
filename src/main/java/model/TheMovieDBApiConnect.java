package model;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class TheMovieDBApiConnect {

	private static String API_KEY = "df1a8a2aad5fbba70d7851155c59e9f7";
	private static final String SEARCH_ALL_URL = "https://api.themoviedb.org/3/search/movie?api_key="+API_KEY+"&query=TITLE&language=en-US";
	private static final String SEARCH_POPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY + "&language=en-US";
	private static final String SEARCH_BY_GENRE = "https://api.themoviedb.org/3/discover/movie?api_key="+ API_KEY + "&language=en-US&sort_by=popularity.desc&with_genres=GENRE_ID";
	private static final String RECOMMANDATION = "https://api.themoviedb.org/3/movie/ID/recommendations?api_key="+API_KEY+"&language=en-US&page=1";
	
	private static final String SEARCH_DETAILLED ="https://api.themoviedb.org/3/movie/ID?api_key="+API_KEY+"&language=en-US";
	public String sendGetRequest(String requestUrl) {

		StringBuffer response = new StringBuffer();

		URL url;
		try {
			url = new URL(requestUrl);

			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("GET");
			connection.setRequestProperty("Accept", "*/*");
			connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
			InputStream stream = connection.getInputStream();
			InputStreamReader reader = new InputStreamReader(stream);
			BufferedReader buffer = new BufferedReader(reader);
			String line;

			while ((line = buffer.readLine()) != null) {
				response.append(line);
			}
			buffer.close();
			connection.disconnect();
		} catch (Exception e) {
		}

		return response.toString();

	}


	public String searchAllMovieByTitle(String title) {

		String movieTitle = title.replaceAll("\\s+", "+");
		movieTitle = movieTitle.replaceAll("\\&", "%26");

		String requestUrl = SEARCH_ALL_URL.replaceAll("TITLE", movieTitle);

		return sendGetRequest(requestUrl);
	}

	public String searchDetailledMovieById(String id) {


		String requestUrl = SEARCH_DETAILLED.replaceAll("ID", id);

		return sendGetRequest(requestUrl);
	}
	
	public String searchPopular() {

		String requestUrl = SEARCH_POPULAR;

		return sendGetRequest(requestUrl);
	}
	
	public String searchRecommandation(String title) throws ParseException {

		String movieTitle = title.replaceAll("\\s+", "+");
		movieTitle = movieTitle.replaceAll("\\&", "%26");

		String movieResult = this.searchAllMovieByTitle(title);
		JSONObject jsonResult = this.parseToJson(movieResult);
		JSONArray jsonFilms = (JSONArray) jsonResult.get("results");
		
		String movie_id = this.parseToJson(jsonFilms.get(0).toString()).get("id").toString();
;
		String requestUrl = RECOMMANDATION.replaceAll("ID", movie_id);

		return sendGetRequest(requestUrl);
	}

	public String searchByGenre(String genre) {
		//TODO
		String genre_id = "";
		String requestUrl = SEARCH_BY_GENRE.replaceAll("GENRE_ID", genre_id);

		return sendGetRequest(requestUrl);
	}
	public JSONObject parseToJson(String request) throws ParseException {
		JSONParser parser = new JSONParser();
		JSONObject json = (JSONObject) parser.parse(request);

		return json;
	}


}
