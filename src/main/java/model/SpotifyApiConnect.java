package model;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class SpotifyApiConnect {


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

	public String getAPIArtistURL(String name) {
		String URL = "https://api.spotify.com/v1/search?"
				+name
				+"&type=artist";
		return sendGetRequest(URL); 
	}
	public String searchTopTracksArtist(String name) {
		
		String URL_ArtistID = getAPIArtistURL(name);
		return sendGetRequest(URL_ArtistID+"/top-tracks");

	}
	public String searchAlbumArtist(String name) {
		
		String URL_ArtistID = getAPIArtistURL(name);
		return sendGetRequest(URL_ArtistID+"/albums");
	}
	//public String searchAudioAnalysisByID(String ID) {

		//return sendGetRequest(requestUrl);
	//}
	public static void main(String[] args) {

		SpotifyApiConnect spotify = new SpotifyApiConnect();
		String drake = spotify.searchAlbumArtist("drake");
		System.out.println(drake);
	}
}
