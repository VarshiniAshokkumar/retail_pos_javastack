package com.example.rppro.repository;

import com.example.rppro.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    Optional<Product> findByBarcode(String barcode);

    Optional<Product> findBySku(String sku);

    long countByLowStockAlertTrue();
    List<Product> findByLowStockAlertTrue();
    //Long countByLowStockAlertTrue();
}