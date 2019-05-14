package fr.dauphine.sia2.yukArt.objects;

public class Film {

	private String title;
	private String year;
	private String release_date;
	private String runtime;
	private String genre;
	private String synopsis;
	private String poster_url;
	private String rating;

	public Film(String title, String year, String release_date, String runtime, String genre, String synopsis,
			String poster_url,String rating) {
		this.title = title;
		this.year = year;
		this.release_date = release_date;
		this.runtime = runtime;
		this.genre = genre;
		this.synopsis = synopsis;
		this.poster_url = poster_url;
		this.rating = rating;
	}

	public String getTitle() {
		return title;
	}

	public String getPoster_url() {
		return poster_url;
	}

	public void setPoster_url(String poster_url) {
		this.poster_url = poster_url;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getRelease_date() {
		return release_date;
	}

	public void setRelease_date(String release_date) {
		this.release_date = release_date;
	}

	public String getRuntime() {
		return runtime;
	}

	public void setRuntime(String runtime) {
		this.runtime = runtime;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getSynopsis() {
		return synopsis;
	}

	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

}
