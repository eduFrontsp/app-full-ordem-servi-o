package com.os.service;

import com.os.domain.Cliente;
import com.os.domain.OS;
import com.os.domain.Tecnico;
import com.os.domain.enums.Prioridade;
import com.os.domain.enums.Status;
import com.os.dtos.OSDTO;
import com.os.repository.OSRepository;
import com.os.service.exceptions.ObjectNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OSservice {

    @Autowired
    private OSRepository repository;

    @Autowired
    private TecnicoService tecnicoService;

    @Autowired
    private ClienteService clienteService;

    public OS findById(Integer id) {
        Optional<OS> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException(
                "objeto nao encontrado: " + id + ", tipo: " + OS.class.getName()));
    }

    public List<OS> findAll() {
        return repository.findAll();
    }

    public OS create(@Valid OSDTO obj) {
        return fromDTO(obj);
    }

    public OS update(@Valid OSDTO obj) {
        findById(obj.getId());
        return fromDTO(obj);
    }

    private OS fromDTO(OSDTO obj) {
        OS newObj = new OS();
        newObj.setId(obj.getId());
        newObj.setObservacoes(obj.getObservacoes());
        newObj.setPrioridade(Prioridade.toEnum(obj.getPrioridade()));
        newObj.setStatus(Status.toEnum(obj.getStatus()));

        Tecnico tec = tecnicoService.findById(obj.getTecnico());
        Cliente cli = clienteService.findById(obj.getCliente());

        newObj.setTecnico(tec);
        newObj.setCliente(cli);

        if(newObj.getStatus().getCod().equals(2)) {
            newObj.setDataFechamento(LocalDateTime.now());
        }

        return repository.save(newObj);
    }


}
