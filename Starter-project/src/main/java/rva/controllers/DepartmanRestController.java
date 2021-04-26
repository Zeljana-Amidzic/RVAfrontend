package rva.controllers;

import java.util.Collection;


import javax.transaction.Transactional;

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

import com.fasterxml.jackson.annotation.JsonCreator;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.repository.DepartmanRepository;
import rva.repository.FakultetRepository;
import rva.jpa.Departman;
import rva.jpa.Fakultet;

@CrossOrigin
@RestController
@Api(tags = {"Departman CRUD operacije"})
public class DepartmanRestController {

	@Autowired
	private DepartmanRepository departmanRepository;
	
	@Autowired
	private FakultetRepository fakultetRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("departman")
	@ApiOperation(value="Vraæa kolekciju svih departmana iz baze podataka")
	public Collection<Departman> getDepartmane() {
		return departmanRepository.findAll();
	}
	
	@GetMapping("departman/{id}")
	@ApiOperation(value="Vraæa departman na osnovu prosledjene vrednosti za id")
	public Departman getDepartmanByID(@PathVariable("id") Integer id) {
		return departmanRepository.getOne(id);
	}
	
	@GetMapping("departmanNaziv/{naziv}")
	@ApiOperation(value="Vraæa departman na osnovu prosledjene vrednosti za naziv")
	public Collection<Departman> getByNameDepartman(@PathVariable("naziv") String naziv) {
		return departmanRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	
	@GetMapping("departmaniFakultetID/{id}")
	@ApiOperation(value="Vraæa kolekciju departmana koji se nalaze na konkretnom fakultetu")
	public Collection<Departman> getDepartmaneNaFakultetu(@PathVariable("id") Integer id) {
		Fakultet f = fakultetRepository.getOne(id); 
		return departmanRepository.findByFakultet(f);
	}
	
	@PostMapping("departman")
	@ApiOperation(value="Dodavanje novog departmana u bazu podataka")
	public ResponseEntity<Departman> insertDepartman(@RequestBody Departman departman) {
		if(!departmanRepository.existsById(departman.getId())) {
			departmanRepository.save(departman);
			return new ResponseEntity<Departman>(HttpStatus.OK);
		}
		return new ResponseEntity<Departman>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("departman")
	@ApiOperation(value="Modifikacija departmana koji postoji u bazi podataka")
	public ResponseEntity<Departman> updateDepartman(@RequestBody Departman departman){
		if(!departmanRepository.existsById(departman.getId())) {
			return new ResponseEntity<Departman>(HttpStatus.NO_CONTENT);
		}
		departmanRepository.save(departman);
		return new ResponseEntity<Departman>(HttpStatus.OK);
	}
	
	//@Transactional
	@DeleteMapping("departman/{id}")
	@ApiOperation(value="Brisanje departmana po prosledjenoj vrednosti za id")
	public ResponseEntity<Departman> deleteDepartman(@PathVariable("id") Integer id) {
		if(!departmanRepository.existsById(id))
			return new ResponseEntity<Departman>(HttpStatus.NO_CONTENT);
		
		jdbcTemplate.execute("DELETE FROM student WHERE departman=" + id);
		
		departmanRepository.deleteById(id);
		
		if(id==-100)
			jdbcTemplate.execute("INSERT INTO \"departman\" (\"id\", \"naziv\", \"oznaka\", \"fakultet\")"+
					 " values (-100,'Test naziv','TO',1)");
		
		return new ResponseEntity<Departman>(HttpStatus.OK);
	}
}
