package fr.dauphine.sia2.yukArt.engine;

import java.time.LocalDateTime;

public class Comment {

	private int commentID;
	private String userName;
	private String commentContent;
	private LocalDateTime date;

	public Comment(String userName, String commentContent) {
		this.commentID++;
		this.userName = userName;
		this.commentContent = commentContent;
		this.date = LocalDateTime.now();
	}

	public int getCommentID() {
		return commentID;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String comment) {
		this.commentContent = comment;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

}
