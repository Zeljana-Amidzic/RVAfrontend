package rva.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Status;
import rva.repository.StatusRepository;

@RestController
public class StatusRestController {

	@Autowired
	private StatusRepository statusRepository;
	
	@Autowired
	private JdbcTemplate jdbcTamplate;
	
	@GetMapping("status")
	public Collection<Status> getStatuse(){
		return statusRepository.findAll();
	}
	
	//ova nije radila
	@GetMapping("status/{id}")
	public Status getStatusByID(@PathVariable("id") Integer id) {
		return statusRepository.getOne(id);
	}
	
	@GetMapping("status/{naziv}")
	public Collection<Status> getStatusByName(@PathVariable("naziv") String naziv){
		return statusRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("status")
	public ResponseEntity<Status> insertStatus(@RequestBody Status status){
		if(!statusRepository.existsById(status.getId())) {
			statusRepository.save(status);
			return new ResponseEntity<Status>(HttpStatus.OK);
		}
		return new ResponseEntity<Status>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("status")
	public ResponseEntity<Status> updateStatus(@RequestBody Status status){
		if(!statusRepository.existsById(status.getId())) {
			return new ResponseEntity<Status>(HttpStatus.CONFLICT);
		}
		statusRepository.save(status);
		return new ResponseEntity<Status>(HttpStatus.OK);
	}
	
	@DeleteMapping("status/{id}")
	public ResponseEntity<Status> deleteStatus(@PathVariable Integer id){
		if(!statusRepository.existsById(id)) {
			return new ResponseEntity<Status>(HttpStatus.NO_CONTENT);
		}else {
			statusRepository.deleteById(id);
		}
		
		if(id == 100)
			jdbcTamplate.execute("INSERT INTO \"status\" (\"id\",\"naziv\",\"oznaka\")"+
								"VALUES (-100,'Naziv test','TO')");
		return new ResponseEntity<Status>(HttpStatus.OK);
	}
}
