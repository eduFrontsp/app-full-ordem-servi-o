package com.os.service;

import com.os.domain.Cliente;
import com.os.domain.OS;
import com.os.domain.Tecnico;
import com.os.domain.enums.Prioridade;
import com.os.domain.enums.Status;
import com.os.repository.ClienteRepository;
import com.os.repository.OSRepository;
import com.os.repository.TecnicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class DBservice {

    @Autowired
    private TecnicoRepository tecnicoRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    OSRepository osRepository;



    public void instanciaDB(){

        Tecnico t1 = new Tecnico(null, "Eduardo cesar", "064.201.266.06", "(11) 94985-2922");
        Cliente c1 = new Cliente(null, "Marcelo teles", "598.508.562.23", "(11) 94889-2345");
        OS os1 = new OS(null, Prioridade.ALTA, "Teste  cricaao", Status.ANDAMENTO, t1, c1);

        t1.getList().add(os1);
        c1.getList().add(os1);

        tecnicoRepository.saveAll(Arrays.asList(t1));
        clienteRepository.saveAll(Arrays.asList(c1));
        osRepository.saveAll(Arrays.asList(os1));
    }
}
