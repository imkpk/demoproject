package com.example.demo.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Table(name = "users")
@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userId")
	int id;
	String firstName;
	String lastName;
	String mobileNumber;
	int postalCode;
	String city;
	String state;
	String email;
	String password;

	@OneToMany(mappedBy = "user")
	List<Ticket> ticketList;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getUserId() {
		return id;
	}

	public void setUserId(int userId) {
		this.id = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public int getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(int postalAddress) {
		this.postalCode = postalAddress;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "UserModel [userId=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", mobileNumber="
				+ mobileNumber + ", postalAddress=" + postalCode + ", city=" + city + ", state=" + state + ", email="
				+ email + "]";
	}

	public User(String firstName, String lastName, String mobileNumber, int postalAddress, String city, String state,
			String email, String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.mobileNumber = mobileNumber;
		this.postalCode = postalAddress;
		this.city = city;
		this.state = state;
		this.email = email;
		this.password = password;

	}

	public User(int userId, String firstName, String lastName, String mobileNumber, int postalAddress, String city,
			String state, String email, String password) {
		super();
		this.id = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.mobileNumber = mobileNumber;
		this.postalCode = postalAddress;
		this.city = city;
		this.state = state;
		this.email = email;
		this.password = password;

	}

}
