package com.example.rppro.repository;

import com.example.rppro.entity.Lending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface LendingRepository
        extends JpaRepository<Lending, Long> {

    List<Lending> findByRemainingAmountGreaterThan(
            java.math.BigDecimal amount
    );



        @Query("""
    SELECT COALESCE(SUM(l.remainingAmount),0)
    FROM Lending l
    """)
        BigDecimal getTotalPendingLending();
}