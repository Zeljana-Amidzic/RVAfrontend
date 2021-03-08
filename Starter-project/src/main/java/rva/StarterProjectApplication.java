package rva;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

// GitHub Classroom Invite Link --> https://classroom.github.com/a/PgzNRc2E

@SpringBootApplication
public class StarterProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(StarterProjectApplication.class, args); 
	}
	
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		
		return args -> {
			System.out.println("Beans provided by spring Boot: ");
			String[] beans = ctx.getBeanDefinitionNames();
			
			Arrays.sort(beans);
			for(String beansName : beans) {
				System.out.println(beansName);
			}
		};
		
	}

}
