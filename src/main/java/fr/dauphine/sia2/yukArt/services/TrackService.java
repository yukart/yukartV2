package fr.dauphine.sia2.yukArt.services;

import java.util.List;

import com.wrapper.spotify.Api;
import com.wrapper.spotify.methods.TrackSearchRequest;
import com.wrapper.spotify.models.Page;
import com.wrapper.spotify.models.Track;

import fr.dauphine.sia2.yukArt.model.SpotifyConnect;

public class TrackService {
	public List<Track> searchTrack(String name)  {
		Api api = SpotifyConnect.connection();
		List<Track> tracks = null;
		final TrackSearchRequest requestTrack = api.searchTracks(name).build();
		try {
			final Page<Track> trackSearchResult = requestTrack.get();
			tracks = trackSearchResult.getItems();
		} catch (Exception e1) {
			System.out.println("Something went wrong!" + e1.getMessage());
		}
		return tracks;
	}
}
