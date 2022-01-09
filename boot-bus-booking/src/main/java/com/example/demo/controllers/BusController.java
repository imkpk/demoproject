package com.example.demo.controllers;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repositories.BusRepository;
import com.example.demo.models.Bus;

@RestController
@RequestMapping("/bus")
public class BusController {

	@Autowired
	BusRepository busRepository;

	@PostMapping
	public ResponseEntity<?> saveBus(@RequestBody Bus bus) {
		if (bus.getBusName() == null || bus.getDestination() == null || bus.getOrigin() == null || bus.getFare() == 0
				|| bus.getTotalSeats() == 0) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields are required");

		}
		bus.setOrigin(bus.getOrigin().toLowerCase());
		bus.setDestination(bus.getDestination().toLowerCase());

		int duration = (int) Duration.between(bus.getStartTime(), bus.getEndTime()).toMinutes();
		int hours = duration / 60;
		int min = duration % 60;
		LocalTime time = LocalTime.of(hours, min, 0);
		bus.setDuration(time);
		Bus savedBus = busRepository.save(bus);

		if (savedBus != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(savedBus);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
	}

	@GetMapping("/{busId}")
	public ResponseEntity<?> getBusById(@PathVariable("busId") int busId) {
		Bus bus = busRepository.findById(busId).orElse(null);

		if (bus != null) {
			return ResponseEntity.ok(bus);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
	}

//	@GetMapping("/{name}")
//	public ResponseEntity<?> getBusByName(@PathVariable("name") String name) {
//		Bus bus= busRepository.findByBusName(name);
//		
//		if(bus!=null) {
//			return ResponseEntity.ok(bus);
//		}
//		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
//	}

	@GetMapping("/{origin}/{destination}")
	public ResponseEntity<?> getBusesByOriginAndDestinations(@PathVariable("origin") String origin,
			@PathVariable("destination") String destination) {

		List<Bus> buses = busRepository.findByOriginAndDestination(origin, destination);

		if (buses.size() > 0) {
			return ResponseEntity.ok(buses);
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found");
	}

}
