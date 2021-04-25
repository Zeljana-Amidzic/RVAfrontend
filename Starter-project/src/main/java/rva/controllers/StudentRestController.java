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
import rva.repository.StudentRepository;
import rva.repository.DepartmanRepository;
import rva.repository.StatusRepository;
import rva.jpa.Departman;
import rva.jpa.Status;
import rva.jpa.Student;

@CrossOrigin
@RestController
@Api(tags = {"Student CRUD operacije"})
public class StudentRestController {

	@Autowired 
	private StudentRepository studentRepository;
	
	@Autowired
	private DepartmanRepository departmanRepository;
	
	@Autowired
	private StatusRepository statusRepository;
	
	@Autowired 
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("student")
	@ApiOperation(value="Vraæa kolekciju svih studenata iz baze podataka")
	public Collection<Student> getAllStudente() {
		return studentRepository.findAll();
	}
	
	@GetMapping("student/{id}")
	@ApiOperation(value="Vraæa studenta sa prosledjenom vrednosti za id")
	public Student getByIdStudente(@PathVariable("id") Integer id) {
		return studentRepository.getOne(id);
	}
	
	@GetMapping("studentDepartmanID/{id}")
	@ApiOperation(value="Vraæa kolekciju svih studenata jednog departmana")
	public Collection<Student> getStudentPoDepartmanu(@PathVariable("id") Integer id) {
		Departman d = departmanRepository.getOne(id); 
		return studentRepository.findByDepartman(d);
	}
	
	@GetMapping("studentStatusID/{id}")
	@ApiOperation(value="Vraæa kolekciju svih studenata konkretnog statusa")
	public Collection<Student> getStudentPoStatusu(@PathVariable("id") Integer id) {
		Status s = statusRepository.getOne(id);
		return studentRepository.findByStatus(s);
	}
	
	@PostMapping("student")
	@ApiOperation(value="Dodavanje novog studenta u bazu podataka")
	public ResponseEntity<Student> insertStudent(@RequestBody Student student){
		if(!studentRepository.existsById(student.getId()))
		{
			studentRepository.save(student);
			return new ResponseEntity<Student>(HttpStatus.OK);
		}
		return new ResponseEntity<Student>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("student/{id}")
	@ApiOperation(value="Modifikacija studenta koji postoji u bazi podataka")
	public ResponseEntity<Student> updateStudent(@RequestBody Student student){
		if(!studentRepository.existsById(student.getId()))
			return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
		studentRepository.save(student);
		return new ResponseEntity<Student>(HttpStatus.OK);
	}
	
	@DeleteMapping("student/{id}")
	@ApiOperation(value="Brisanje studenta po prosledjenoj vrednosti za id")
	public ResponseEntity<Student> deleteStudent(@PathVariable("id") Integer id) {
		if(!studentRepository.existsById(id))
			return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
		
		studentRepository.deleteById(id);

		if(id==-100)
			jdbcTemplate.execute("INSERT INTO \"student\" (\"id\", \"ime\", \"prezime\", \"broj_indeksa\", \"status\",\"departman\")"
					  +"VALUES (-100, 'Test ime', 'Test prezime', 'T1/1000', 1, 1)");
		return new ResponseEntity<Student>(HttpStatus.OK);
	}
}
