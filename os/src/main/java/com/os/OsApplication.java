package com.os;

import com.os.domain.Cliente;
import com.os.domain.OS;
import com.os.domain.Tecnico;
import com.os.domain.enums.Prioridade;
import com.os.domain.enums.Status;
import com.os.repository.ClienteRepository;
import com.os.repository.OSRepository;
import com.os.repository.TecnicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class OsApplication  {
	public static void main(String[] args) {SpringApplication.run(OsApplication.class, args);}
}
