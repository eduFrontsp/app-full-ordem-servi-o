package com.os.service;

import com.os.controller.exceptions.DataIntegratyViolationException;
import com.os.domain.Pessoa;
import com.os.domain.Cliente;
import com.os.dtos.ClienteDTO;
import com.os.repository.PessoaRepository;
import com.os.repository.ClienteRepository;
import com.os.service.exceptions.ObjectNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    @Autowired
    private PessoaRepository pessoaRepository;

    public Cliente findById(Integer id) {
        Optional<Cliente> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException(
                "obj nao encontrado Id: " + id + ", tipo: " + Cliente.class.getName()));
    }
    public List<Cliente> findAll() {
        return repository.findAll();
    }

    public Cliente create(ClienteDTO objDTO) {
        if(findByCPF(objDTO) != null) {
            throw new DataIntegratyViolationException("CPF ja cadastrado");
        }

        return repository.save(new Cliente(null, objDTO.getNome(), objDTO.getCpf(), objDTO.getTelefone()));
    }

    public Cliente update(Integer id, @Valid ClienteDTO objDTO) {
        Cliente oldObj = findById(id);

        if(findByCPF(objDTO) != null && findByCPF(objDTO).getId() != id) {
            throw new DataIntegratyViolationException("CPF ja cadastrado");
        }
        oldObj.setNome(objDTO.getNome());
        oldObj.setCpf(objDTO.getCpf());
        oldObj.setTelefone(objDTO.getTelefone());

        return repository.save(oldObj);
    }
    public void delete(Integer id) {
        Cliente obj = findById(id);
        if(obj.getList().size() > 0) {
            throw new DataIntegratyViolationException("pessoa possui ordem de serviço, nao pode ser deletado");
        }
       repository.deleteById(id);
    }

    private Pessoa findByCPF(ClienteDTO objDTO) {
        Pessoa obj = pessoaRepository.findByCPF(objDTO.getCpf());

        if(obj != null) {
            return obj;
        }
        return null;
    }

}
