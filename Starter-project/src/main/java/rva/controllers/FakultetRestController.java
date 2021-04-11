package rva.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.repository.FakultetRepository;
import rva.jpa.Fakultet;

@CrossOrigin
@RestController
@Api(tags = {"Status CRUD operacije"})
public class FakultetRestController {

	@Autowired
	private FakultetRepository fakultetRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("fakultet")
	@ApiOperation(value="Vraæa kolekciju svih fakulteta iz baze podataka")
	public Collection<Fakultet> getFakultete() {
		return fakultetRepository.findAll();
	}
	
	@GetMapping("fakultet/{id}")
	@ApiOperation(value="Vraæa fakultet na osnovu prodledjene vrednosti za id")
	public Fakultet getFakultet(@PathVariable Integer id) {
		return fakultetRepository.getOne(id);
	}
	
	@GetMapping("fakultetNaziv/{naziv}")
	@ApiOperation(value="Vraæa fakultet na osnovu prosledjene vrednosti za naziv")
	public Collection<Fakultet> getByNameFakultet(@PathVariable String naziv){
		return fakultetRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("fakultet")
	@ApiOperation(value="Dodaje novi fakultet u bazu podataka")
	public ResponseEntity<Fakultet> insertFakultet(@RequestBody Fakultet fakultet) {
		if(!fakultetRepository.existsById(fakultet.getId())) {
			fakultetRepository.save(fakultet);
			return new ResponseEntity<Fakultet>(HttpStatus.OK);
		}
		return new ResponseEntity<Fakultet>(HttpStatus.CONFLICT);
			
	}
	
	@PutMapping("fakultet")
	@ApiOperation(value="Modifikacija fakulteta koji postoji u bazi")
	public ResponseEntity<Fakultet> updateFakultet(@RequestBody Fakultet fakultet) {
		if(!fakultetRepository.existsById(fakultet.getId())) 
			return new ResponseEntity<Fakultet>(HttpStatus.NO_CONTENT);
		fakultetRepository.save(fakultet);
		return new ResponseEntity<Fakultet>(HttpStatus.OK);
	}
	
	@DeleteMapping("fakultet/{id}")
	@ApiOperation(value="Brise fakultet na osnovu prosledjene vrednosti za id")
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
