package com.example.rppro.controller;

import com.example.rppro.dto.ReturnRequest;
import com.example.rppro.service.ReturnService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/returns")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReturnController {

    private final ReturnService returnService;

    @PostMapping
    public ResponseEntity<?> returnProduct(
            @RequestBody ReturnRequest request
    ) {

        return ResponseEntity.ok(
                returnService.returnProduct(request)
        );
    }
}