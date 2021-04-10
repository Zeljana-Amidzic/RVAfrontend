package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Departman;
import rva.jpa.Status;
import rva.jpa.Student;

public interface StudentRepository extends JpaRepository<Student,Integer>{

	//svi studenti jednog departmana
	Collection<Student> findByDepartman(Departman d);
	
	//svi studenti sa trazenim statusom
	Collection<Student> findByStatus(Status s);
	
	Collection<Student> findByBrojIndeksa(String index);
}
