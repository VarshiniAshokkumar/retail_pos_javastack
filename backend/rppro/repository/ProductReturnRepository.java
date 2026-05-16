package com.example.rppro.repository;

import com.example.rppro.entity.ProductReturn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductReturnRepository
        extends JpaRepository<ProductReturn, Long> {
}