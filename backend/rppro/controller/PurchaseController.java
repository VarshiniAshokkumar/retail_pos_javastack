package com.example.rppro.controller;

import com.example.rppro.dto.PurchaseRequest;
import com.example.rppro.entity.Purchase;
import com.example.rppro.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/purchase")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PurchaseController {

    private final PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<Purchase> createPurchase(
            @RequestBody PurchaseRequest request
    ) {

        return ResponseEntity.ok(
                purchaseService.createPurchase(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<Purchase>> getAll() {

        return ResponseEntity.ok(
                purchaseService.getAllPurchases()
        );
    }
}