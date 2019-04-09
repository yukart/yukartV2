package model;

import java.util.List;

import com.google.common.util.concurrent.FutureCallback;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.SettableFuture;
import com.wrapper.spotify.Api;
import com.wrapper.spotify.methods.ArtistSearchRequest;
import com.wrapper.spotify.methods.TrackSearchRequest;
import com.wrapper.spotify.methods.authentication.ClientCredentialsGrantRequest;
import com.wrapper.spotify.models.Artist;
import com.wrapper.spotify.models.ClientCredentials;
import com.wrapper.spotify.models.Page;
import com.wrapper.spotify.models.Track;

import fr.dauphine.sia2.yukArt.objects.ArtistOBJ;
import fr.dauphine.sia2.yukArt.objects.Musique;

public class SpotifyAccess {

	
	public static void main(String[] args) {

		final Api api = Api.builder()
				.clientId("10cd5c13cdb24fea9fa52504c4d3c73c")
				.clientSecret("c0907bb89c0d4b9ba4c9e67068933af4")
				.redirectURI("yukArt://callback")
				.build();

		/* Create a request object. */

		final ClientCredentialsGrantRequest request = api.clientCredentialsGrant().build();

		/* Use the request object to make the request, either asynchronously (getAsync) or synchronously (get) */

		final SettableFuture<ClientCredentials> responseFuture = request.getAsync();
		
		/* Add callbacks to handle success and failure */
		
		Futures.addCallback(responseFuture, new FutureCallback<ClientCredentials>() {
		  @Override
		  public void onSuccess(ClientCredentials clientCredentials) {
		    /* The tokens were retrieved successfully! */
		    System.out.println("Successfully retrieved an access token! " + clientCredentials.getAccessToken());
		    System.out.println("The access token expires in " + clientCredentials.getExpiresIn() + " seconds");
		    
		    /* Set access token on the Api object so that it's used going forward */
		    api.setAccessToken(clientCredentials.getAccessToken());
		    
		    /* Please note that this flow does not return a refresh token. * That's only for the Authorization code flow */
		  }

		  @Override
		  public void onFailure(Throwable throwable) {
		    /* An error occurred while getting the access token. This is probably caused by the client id or * client secret is invalid. */
		  }
		});
		
		
		
		Musique musique = new Musique();
		musique.title = "Mr. Brightside";
		musique.country = "US";

		/* Searching for tracks */

		final TrackSearchRequest requestTrack = api.searchTracks(musique.title).market(musique.country).build(); 
		try {
			final Page<Track> trackSearchResult = requestTrack.get();
			System.out.println("I got " + trackSearchResult.getTotal() + " results!");
		} catch (Exception e) {
			System.out.println("Something went wrong!" + e.getMessage());
		}


		/* Searching for artists */
		ArtistOBJ artist = new ArtistOBJ();
		artist.name = "tania bowra";
		artist.country = "SE";

		final ArtistSearchRequest requestArtist = api.searchArtists(artist.name).market(artist.country).limit(10).build();

		try {
			final Page<Artist> artistSearchResult = requestArtist.get();
			final List<Artist> artists = artistSearchResult.getItems();

			System.out.println("I've found " + artistSearchResult.getTotal() + " artist(s)!");

			for (Artist artistspot : artists) {
				System.out.println(artistspot.getName());
			}

		} catch (Exception e1) {
			System.out.println("Something went wrong!" + e1.getMessage());
		}
	}
}