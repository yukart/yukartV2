package fr.dauphine.sia2.yukArt.model;


import com.wrapper.spotify.Api;
import com.wrapper.spotify.methods.NewReleasesRequest;
import com.wrapper.spotify.models.NewReleases;
import com.wrapper.spotify.models.Page;
import com.wrapper.spotify.models.SimpleAlbum;

public class SpotifyNewReleases {

	public Page<SimpleAlbum> recommandations() {
		Api api = SpotifyConnect.connection();
		
		Page<SimpleAlbum> albums =null;
		final NewReleasesRequest request = api.getNewReleases()
		    .limit(5)
		    .offset(0)
		    .country("FR")
		    .build();

		try {
		    NewReleases newReleases = request.get();
		    albums = newReleases.getAlbums();
		} catch(Exception e) {
		    System.out.println("Something went wrong! " + e.getMessage());
		}
		return albums;	
	}
}
