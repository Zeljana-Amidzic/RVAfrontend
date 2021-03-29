package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Fakultet;

public interface FakultetRepository extends JpaRepository<Fakultet, Integer>{
	
	public Collection<Fakultet> findByNazivContainingIgnoreCase(String naziv);
}
