package com.os.controller;

import com.os.dtos.OSDTO;
import com.os.service.OSservice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/OS")
public class OSController {

    @Autowired
    private OSservice service;

    @GetMapping(value = "/{id}")
    public ResponseEntity<OSDTO> findById(@PathVariable Integer id) {
        OSDTO obj = new OSDTO(service.findById(id));
        return ResponseEntity.ok().body(obj);
    }
    @GetMapping
    public ResponseEntity<List<OSDTO>> findAll() {
        List<OSDTO> list = service.findAll()
                .stream()
                .map(obj -> new OSDTO(obj))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(list);
    }
    @PostMapping
    public ResponseEntity<OSDTO> create(@Valid @RequestBody OSDTO obj) {
        obj = new OSDTO(service.create(obj));
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(obj.getId())
                .toUri();
        return ResponseEntity.created(uri).build();
    }
    @PostMapping
    public ResponseEntity<OSDTO> update(@RequestBody OSDTO obj) {
        obj = new OSDTO(service.update(obj));
        return ResponseEntity.ok().body(obj);
    }
}
