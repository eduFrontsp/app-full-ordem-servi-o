package com.os.repository;

import com.os.domain.Pessoa;
import com.os.domain.Tecnico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
    @Query("SELECT obj FROM Pessoa WHERE obj.cpf =: cpf ")
    Pessoa findByCPF(@Param("cpf") String cpf);
}
