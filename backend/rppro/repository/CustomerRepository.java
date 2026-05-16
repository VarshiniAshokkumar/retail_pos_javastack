package com.example.rppro.repository;

import com.example.rppro.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository
        extends JpaRepository<Customer, Long> {

    boolean existsByPhone(String phone);
    long count();
}