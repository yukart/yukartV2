package fr.dauphine.sia2.yukArt;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import fr.dauphine.sia2.yukArt.data.DBConnect;

public class DatabaseTests {

	DBConnect db = new DBConnect();

	@Test
	public void dbExisteLoginTest() {
		db.createUser("vik2", "vik2", "vik2@vik2.vik2");
		assertTrue(db.existLogin("vik2"));
	}

	@Test
	public void dbExisteLoginTest2() {
		assertFalse(db.existLogin("notExistingUser"));
	}

}
