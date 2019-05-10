package fr.dauphine.sia2.yukArt.engine;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailManagement {

	public MailManagement() {

	}

	public void sendMail(String email, String user) {
		final String username = "yukart.miage@gmail.com";
		final String password = "yukartdauph";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

		String msg = "Bienvenue sur la plateforme YukArt " + user + " ! <br>"
				+ "Pour rappel, l'accès à la plateforme se fait via le lien suivant : <b>http://localhost:4100/api</b>"
				+ "<br> A bientôt.";

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("yukart.miage@gmail.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
			message.setSubject("Bienvenue sur YukArt, " + user);
			message.setContent(msg, "text/html; charset=utf-8");
			message.saveChanges();

			Transport.send(message);

		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}

}
