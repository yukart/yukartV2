package fr.dauphine.sia2.yukArt;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.dauphine.sia2.yukArt.objects.Film;
import fr.dauphine.sia2.yukArt.services.FilmService;

@RestController
public class ReferentielRestController {

	@RequestMapping("/api/filmByTitle/{name}")
	public List<Film> getFilmDescriptionByTitle(HttpServletRequest request, HttpServletResponse response,
			@PathVariable String name) throws ParseException {

		FilmService filmService = new FilmService();
		List<Film> film = filmService.searchAllMovieByTitle(name);

		if (film == null) {
			return null;
		}

		return film;
	}

	@RequestMapping("/api")
	public String test() {
		return "Hello";
	}
}
