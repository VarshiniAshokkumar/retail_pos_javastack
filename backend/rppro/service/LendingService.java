package com.example.rppro.service;

import com.example.rppro.dto.RepaymentRequest;
import com.example.rppro.entity.Customer;
import com.example.rppro.entity.Lending;
import com.example.rppro.entity.Repayment;
import com.example.rppro.repository.CustomerRepository;
import com.example.rppro.repository.LendingRepository;
import com.example.rppro.repository.RepaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LendingService {

    private final LendingRepository lendingRepository;
    private final RepaymentRepository repaymentRepository;
    private final CustomerRepository customerRepository;

    public List<Lending> getPendingLendings() {

        return lendingRepository
                .findByRemainingAmountGreaterThan(
                        BigDecimal.ZERO
                );
    }

    public Lending addRepayment(
            RepaymentRequest request
    ) {

        Lending lending = lendingRepository.findById(
                        request.getLendingId())
                .orElseThrow(() ->
                        new RuntimeException("Lending not found"));

        BigDecimal repaymentAmount =
                request.getAmount();

        if (repaymentAmount.compareTo(
                lending.getRemainingAmount()) > 0) {

            throw new RuntimeException(
                    "Repayment exceeds pending amount"
            );
        }

        lending.setPaidAmount(
                lending.getPaidAmount()
                        .add(repaymentAmount)
        );

        lending.setRemainingAmount(
                lending.getRemainingAmount()
                        .subtract(repaymentAmount)
        );

        lendingRepository.save(lending);

        Customer customer = lending.getCustomer();

        customer.setLendingBalance(
                customer.getLendingBalance()
                        .subtract(repaymentAmount)
        );

        customerRepository.save(customer);

        Repayment repayment = Repayment.builder()
                .lending(lending)
                .amount(repaymentAmount)
                .build();

        repaymentRepository.save(repayment);

        return lending;
    }
}