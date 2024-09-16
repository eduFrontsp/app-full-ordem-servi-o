package com.os.repository;

import com.os.domain.Cliente;
import com.os.domain.Tecnico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    @Query("SELECT obj FROM pessoa WHERE obj.cpf =: cpf ")
    Cliente findByCPF(@Param("cpf") String cpf);
}
