package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repositories.BusRepository;
import com.example.demo.Repositories.TicketRepository;
import com.example.demo.models.Bus;
import com.example.demo.models.Ticket;

@RestController
@RequestMapping("/ticket")
public class TicketController {

	@Autowired
	TicketRepository ticketRepository;

	@Autowired
	BusRepository busRepository;

	@PostMapping
	public ResponseEntity<?> bookTicket(@RequestBody Ticket ticket) {

		Ticket savedTicket = ticketRepository.save(ticket);
		if (savedTicket != null) {
			return ResponseEntity.ok(savedTicket);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request");
	}

	@GetMapping("/{ticketId}")
	public ResponseEntity<?> getTicketById(@PathVariable("ticketId") int ticketId) {
		Ticket ticket = ticketRepository.findById(ticketId).orElse(null);

		if (ticket != null) {
			return ResponseEntity.ok(ticket);

		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
	}

	@PutMapping("/cancel/{ticketId}/{userId}")
	public ResponseEntity<?> cancelTicket(@PathVariable int ticketId, @PathVariable("userId") int userId) {
		Ticket ticket = ticketRepository.getById(ticketId);
		if(ticket.getUser().getUserId()== userId) {	
		
		ticket.setStatus(0);
		Ticket updatedTicket = ticketRepository.save(ticket);
		if (updatedTicket != null) {
			return ResponseEntity.ok(updatedTicket);
		}}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request");
	}

	@GetMapping("/all/{userId}")
	public ResponseEntity<?> getMyTickets(@PathVariable int userId) {
		
		List<Ticket> ticketList = ticketRepository.getByUserId(userId);

		if (ticketList.size() > 0) {
			return ResponseEntity.ok(ticketList);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request");
	}

	@GetMapping("/{busId}/{date}")
	public ResponseEntity<?> getAvailableTickets(@PathVariable("busId") int busId,
			@PathVariable("date")  @DateTimeFormat (pattern = "yyyy-MM-dd") LocalDate localDate) {
		
		System.out.println(busId+" ==== "+ localDate);
		Bus bus = busRepository.getById(busId);

		List<Ticket> ticketsList = ticketRepository.getByBusIdAndDateAndStatus(busId, localDate,1);

		// if bus is full
		if (ticketsList.size() >= bus.getTotalSeats()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(0);

		}

		// if some seats are filled
		if (ticketsList.size() > 0) {
			return ResponseEntity.ok(bus.getTotalSeats() - ticketsList.size());
		}

		// if all seats are available
		return ResponseEntity.ok(bus.getTotalSeats());
	}

}
