package com.example.rppro.controller;

import com.example.rppro.dto.DashboardSummaryResponse;
import com.example.rppro.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryResponse> getSummary() {

        return ResponseEntity.ok(
                dashboardService.getSummary()
        );
    }

    @GetMapping("/top-products")
    public ResponseEntity<?> getTopProducts() {

        return ResponseEntity.ok(
                dashboardService.getTopSellingProducts()
        );
    }

    @GetMapping("/worst-products")
    public ResponseEntity<?> getWorstProducts() {

        return ResponseEntity.ok(
                dashboardService.getWorstSellingProducts()
        );
    }

    @GetMapping("/low-stock")
    public ResponseEntity<?> getLowStockProducts() {

        return ResponseEntity.ok(
                dashboardService.getLowStockProducts()
        );
    }
}