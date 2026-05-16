package com.example.rppro.repository;

import com.example.rppro.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface BillRepository
        extends JpaRepository<Bill, Long> {

    List<Bill> findByCreatedAtBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    List<Bill> findByCustomerId(Long customerId);

    @Query("""
        SELECT COALESCE(SUM(b.finalAmount), 0)
        FROM Bill b
        WHERE DATE(b.createdAt) = CURRENT_DATE
        """)
    BigDecimal getTodaySales();

    @Query("""
        SELECT COALESCE(SUM(b.finalAmount), 0)
        FROM Bill b
        WHERE MONTH(b.createdAt) = MONTH(CURRENT_DATE)
        AND YEAR(b.createdAt) = YEAR(CURRENT_DATE)
        """)
    BigDecimal getMonthlySales();

    @Query("""
        SELECT COALESCE(SUM(b.lendingAmount), 0)
        FROM Bill b
        """)
    BigDecimal getTotalPendingLending();
}