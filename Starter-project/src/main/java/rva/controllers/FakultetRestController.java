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

import rva.repository.FakultetRepository;
import rva.jpa.Fakultet;

@RestController
public class FakultetRestController {

	@Autowired
	private FakultetRepository fakultetRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("fakultet")
	public Collection<Fakultet> getFakultete() {
		return fakultetRepository.findAll();
	}
	
	@GetMapping("fakultet/{id}")
	public Fakultet getFakultet(@PathVariable Integer id) {
		return fakultetRepository.getOne(id);
	}
	
	@GetMapping("fakultetNaziv/{naziv}")
	public Collection<Fakultet> getFakultetByNaziv(@PathVariable String naziv){
		return fakultetRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("fakultet")
	public ResponseEntity<Fakultet> insertFakultet(@RequestBody Fakultet fakultet) {
		if(!fakultetRepository.existsById(fakultet.getId())) {
			fakultetRepository.save(fakultet);
			return new ResponseEntity<Fakultet>(HttpStatus.OK);
		}
		return new ResponseEntity<Fakultet>(HttpStatus.CONFLICT);
			
	}
	
	@PutMapping("fakultet")
	public ResponseEntity<Fakultet> updateFakultet(@RequestBody Fakultet fakultet) {
		if(!fakultetRepository.existsById(fakultet.getId())) 
			return new ResponseEntity<Fakultet>(HttpStatus.NO_CONTENT);
		fakultetRepository.save(fakultet);
		return new ResponseEntity<Fakultet>(HttpStatus.OK);
	}
	
	@DeleteMapping("fakultet/{id}")
	public ResponseEntity<Fakultet> deleteFakultet(@PathVariable Integer id) {
		if(!fakultetRepository.existsById(id))
			return new ResponseEntity<Fakultet>(HttpStatus.NO_CONTENT);
		fakultetRepository.deleteById(id);
		if(id == -100)
			jdbcTemplate.execute("INSERT INTO \"fakultet\" (\"id\", \"naziv\", \"sediste\")"
					+ "VALUES (-100, 'Naziv test', 'Sediste test') ");
		
		return new ResponseEntity<Fakultet>(HttpStatus.OK);
		
	}
}
