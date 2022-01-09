package com.example.demo.models;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "buses")
public class Bus {

	public Bus() {
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "busId")
	int id;
	
	String destination;
	String origin;
	String busName;
	int totalSeats;
	int fare;
	LocalTime startTime;
	LocalTime endTime;
	LocalTime duration;
	
	@OneToMany(mappedBy = "bus", cascade = CascadeType.ALL)
	List<Ticket> ticketList;
	
	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

	public LocalTime getDuration() {
		return duration;
	}

	public void setDuration(LocalTime duration) {
		this.duration = duration;
	}

	public int getFare() {
		return fare;
	}

	public void setFare(int fare) {
		this.fare = fare;
	}



	public Bus(String destination, String origin, String busName, int totalSeats, int fare, LocalTime startTime,
			LocalTime endTime, LocalTime duration) {
		super();
		this.destination = destination;
		this.origin = origin;
		this.busName = busName;
		this.totalSeats = totalSeats;
		this.fare = fare;
		this.startTime = startTime;
		this.endTime = endTime;
		this.duration = duration;
	}

	public Bus(int busId, String destination, String origin, String busName, int totalSeats, int fare,
			LocalTime startTime, LocalTime endTime, LocalTime duration) {
		super();
		this.id = busId;
		this.destination = destination;
		this.origin = origin;
		this.busName = busName;
		this.totalSeats = totalSeats;
		this.fare = fare;
		this.startTime = startTime;
		this.endTime = endTime;
		this.duration = duration;
	}

	@Override
	public String toString() {
		return "BusModel [busId=" + id + ", destination=" + destination + ", origin=" + origin + ", busName="
				+ busName + "]";
	}


	public int getBusId() {
		return id;
	}

	public void setBusId(int busId) {
		this.id = busId;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getBusName() {
		return busName;
	}

	public void setBusName(String busName) {
		this.busName = busName;
	}

	public int getTotalSeats() {
		return totalSeats;
	}

	public void setTotalSeats(int totalSeats) {
		this.totalSeats = totalSeats;
	}

}
