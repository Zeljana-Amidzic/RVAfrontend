package rva.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import rva.repository.ArtiklRepository;
import rva.jpa.Artikl;


@RestController
public class ArtiklRestController {

	//injektovanje zavisnoti
	@Autowired
	private ArtiklRepository artiklRepository;
	
	@GetMapping("artikl")
	public Collection<Artikl> getArtikli(){
		return artiklRepository.findAll();
	}
	
	@GetMapping("artikl/{id}")
	public Artikl getArtikl(@PathVariable ("id") Integer id) {
		return artiklRepository.getOne(id);
	}
	
	@GetMapping("artiklNaziv/")
	public Collection<Artikl> getArtiklByName(@PathVariable ("naziv") String naziv){
		return artiklRepository.findByNazivContainingIgnoreCase(naziv);
	}
}
