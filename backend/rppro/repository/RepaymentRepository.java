package com.example.rppro.repository;

import com.example.rppro.entity.Repayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepaymentRepository
        extends JpaRepository<Repayment, Long> {
}