package model;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class OMDBApiConnect {

	private static String API_KEY = "a9383e9";
	private static final String SEARCH_URL = "http://www.omdbapi.com/?t=TITLE&apikey=" + API_KEY;
	private static final String SEARCH_URL_BY_YEAR = "http://www.omdbapi.com/?t=TITLE&y=YEAR&apikey=" + API_KEY;
	private static final String SEARCH_BY_IMDB_URL = "http://www.omdbapi.com/?i=IMDB&apikey=" + API_KEY;

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

	public String searchMovieByTitle(String title) {

		String movieTitle = title.replaceAll("\\s+", "+");

		String requestUrl = SEARCH_URL.replaceAll("TITLE", movieTitle);

		return sendGetRequest(requestUrl);

	}

	public String searchMovieByTitleAndYear(String title, int year) {
		String movieTitle = title.replaceAll("\\s+", "+");

		String requestUrl = SEARCH_URL_BY_YEAR.replaceAll("TITLE", movieTitle).replaceAll("YEAR",
				Integer.toString(year));

		return sendGetRequest(requestUrl);

	}

	public String searchMovieByImdb(String imdb) {

		String requestUrl = SEARCH_BY_IMDB_URL.replaceAll("IMDB", imdb);

		return sendGetRequest(requestUrl);
	}

	public JSONObject parseToJson(String request) throws ParseException {
		JSONParser parser = new JSONParser();
		JSONObject json = (JSONObject) parser.parse(request);

		return json;
	}

	public static void main(String[] args) throws ParseException {
		OMDBApiConnect omdb = new OMDBApiConnect();
		String theWolf = omdb.searchMovieByTitle("The Wolf");
		System.out.println(theWolf);
		System.out.println(omdb.searchMovieByTitleAndYear("batman", 2008));
		System.out.println(omdb.searchMovieByImdb("tt0398417"));

		JSONObject response = omdb.parseToJson(theWolf);
		System.out.println(response.get("Title"));
	}

}
