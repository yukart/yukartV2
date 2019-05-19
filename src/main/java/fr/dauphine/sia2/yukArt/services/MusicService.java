package fr.dauphine.sia2.yukArt.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wrapper.spotify.Api;
import com.wrapper.spotify.methods.ArtistSearchRequest;
import com.wrapper.spotify.models.Artist;
import com.wrapper.spotify.models.Page;

import fr.dauphine.sia2.yukArt.model.SpotifyConnect;

@Service
public class MusicService {

	public List<Artist> searchArtist(String name)  {
		Api api = SpotifyConnect.connection();
		List<Artist> artists = null;
		final ArtistSearchRequest requestArtist = api.searchArtists(name).limit(10).build();
		try {
			final Page<Artist> artistSearchResult = requestArtist.get();
			artists = artistSearchResult.getItems();
		} catch (Exception e1) {
			System.out.println("Something went wrong!" + e1.getMessage());
		}
		return artists;
	}
	
}
