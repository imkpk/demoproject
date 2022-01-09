package com.example.demo.models;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tickets")
public class Ticket {

	public Ticket() {
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ticketId")
	int id;

	@ManyToOne
	@JoinColumn(name = "busId", nullable = false)
	Bus bus;

	@ManyToOne
	@JoinColumn(name = "userId", nullable = false)
	User user;
	
	LocalDate date;
	int status;

	public int getTicketId() {
		return id;
	}

	public void setTicketId(int ticketId) {
		this.id = ticketId;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Bus getBus() {
		return bus;
	}

	public void setBus(Bus bus) {
		this.bus = bus;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Ticket(int ticketId, Bus bus, User user, LocalDate date, int status) {
		super();
		this.id = ticketId;
		this.bus = bus;
		this.user = user;
		this.date = date;
		this.status = status;
	}

	public Ticket(Bus bus, User user, LocalDate date, int status) {
		super();
		this.bus = bus;
		this.user = user;
		this.date = date;
		this.status = status;
	}

}
