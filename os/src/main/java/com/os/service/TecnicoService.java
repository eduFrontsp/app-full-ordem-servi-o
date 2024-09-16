package com.os.service;

import com.os.controller.exceptions.DataIntegratyViolationException;
import com.os.domain.Pessoa;
import com.os.domain.Tecnico;
import com.os.dtos.TecnicoDTO;
import com.os.repository.PessoaRepository;
import com.os.repository.TecnicoRepository;
import com.os.service.exceptions.ObjectNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TecnicoService {

    @Autowired
    private TecnicoRepository repository;

    @Autowired
    private PessoaRepository pessoaRepository;

    public Tecnico findById(Integer id) {
        Optional<Tecnico> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException(
                "obj nao encontrado Id: " + id + ", tipo: " + Tecnico.class.getName()));
    }
    public List<Tecnico> findAll() {
        return repository.findAll();
    }

    public Tecnico create(TecnicoDTO objDTO) {
        if(findByCPF(objDTO) != null) {
            throw new DataIntegratyViolationException("CPF ja cadastrado");
        }

        return repository.save(new Tecnico(null, objDTO.getNome(), objDTO.getCpf(), objDTO.getTelefone()));
    }

    public Tecnico update(Integer id, @Valid TecnicoDTO objDTO) {
        Tecnico oldObj = findById(id);

        if(findByCPF(objDTO) != null && findByCPF(objDTO).getId() != id) {
            throw new DataIntegratyViolationException("CPF ja cadastrado");
        }
        oldObj.setNome(objDTO.getNome());
        oldObj.setCpf(objDTO.getCpf());
        oldObj.setTelefone(objDTO.getTelefone());

        return repository.save(oldObj);
    }
    public void delete(Integer id) {
        Tecnico obj = findById(id);
        if(obj.getList().size() > 0) {
            throw new DataIntegratyViolationException("tenico possui ordem de serviço, nao pode ser deletado");
        }
       repository.deleteById(id);
    }

    private Pessoa findByCPF(TecnicoDTO objDTO) {
        Pessoa obj = pessoaRepository.findByCPF(objDTO.getCpf());

        if(obj != null) {
            return obj;
        }
        return null;
    }

}
