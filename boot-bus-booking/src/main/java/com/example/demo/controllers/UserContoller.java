package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repositories.UserRepository;
import com.example.demo.models.User;

@RestController
@RequestMapping("/user")
public class UserContoller {

	@Autowired
	UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder encoder;

	@PostMapping
	public ResponseEntity<?> saveUser(@RequestBody User user) {

		if (user.getCity() == null || user.getEmail() == null || user.getFirstName() == null
				|| user.getLastName() == null || user.getMobileNumber() == null || user.getPostalCode() == 0
				|| user.getCity() == null || user.getState() == null
		)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields are required");

			user.setPassword(encoder.encode(user.getPassword()));
		User savedUser = this.userRepository.save(user);
		if (savedUser != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestParam String email, @RequestParam String password) {

		System.out.println(email + "-----" + password);
		User userExists = userRepository.findByEmail(email);
		System.out.println(userExists.toString());
		if (userExists != null && encoder.matches(password, userExists.getPassword())) {
			return ResponseEntity.ok(userExists);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Credentials");
		}
	}

	@GetMapping("/profile")
	public ResponseEntity<?> getUserProfile(@RequestParam String email) {
		User user = userRepository.findByEmail(email);

		if (user != null) {
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
	}

}
