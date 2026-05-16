package com.example.rppro.controller;

import com.example.rppro.dto.RepaymentRequest;
import com.example.rppro.entity.Lending;
import com.example.rppro.service.LendingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lending")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LendingController {

    private final LendingService lendingService;

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingLendings() {

        return ResponseEntity.ok(
                lendingService.getPendingLendings()
        );
    }

    @PostMapping("/repay")
    public ResponseEntity<Lending> addRepayment(
            @RequestBody RepaymentRequest request
    ) {

        return ResponseEntity.ok(
                lendingService.addRepayment(request)
        );
    }
}