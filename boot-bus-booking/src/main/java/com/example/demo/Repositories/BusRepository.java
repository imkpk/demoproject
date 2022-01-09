package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Bus;

@Repository
public interface BusRepository extends JpaRepository<Bus, Integer>{
	
	Bus findByBusName(String name);
	
	List<Bus> findByOriginAndDestination(String origin, String destination);
	
	
	
}
