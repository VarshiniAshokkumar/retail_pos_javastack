package com.example.rppro.controller;

import com.example.rppro.dto.BillRequest;
import com.example.rppro.entity.Bill;
import com.example.rppro.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/billing")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BillController {

    private final BillService billService;

    @PostMapping("/complete")
    public ResponseEntity<Bill> completeBill(
            @RequestBody BillRequest request
    ) {

        return ResponseEntity.ok(
                billService.completeBill(request)
        );
    }

    @GetMapping
    public ResponseEntity<?> getAllBills() {

        return ResponseEntity.ok(
                billService.getAllBills()
        );
    }

    @GetMapping("/last-30-days")
    public ResponseEntity<?> getLast30DaysBills() {

        return ResponseEntity.ok(
                billService.getLast30DaysBills()
        );
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getCustomerHistory(
            @PathVariable Long customerId
    ) {

        return ResponseEntity.ok(
                billService.getCustomerPurchaseHistory(customerId)
        );
    }

    @GetMapping("/return-check/{billId}")
    public ResponseEntity<?> checkReturnEligibility(
            @PathVariable Long billId
    ) {

        return ResponseEntity.ok(
                billService.checkReturnEligibility(billId)
        );
    }

    @GetMapping("/all-clean")
    public ResponseEntity<?> getAllBillsClean() {

        return ResponseEntity.ok(
                billService.getAllBillsResponse()
        );
    }

    @GetMapping("/customer-history-clean/{customerId}")
    public ResponseEntity<?> getCustomerHistoryClean(
            @PathVariable Long customerId
    ) {

        return ResponseEntity.ok(
                billService.getCustomerHistoryClean(customerId)
        );
    }
}