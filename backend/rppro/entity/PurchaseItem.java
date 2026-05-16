package com.example.rppro.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

public class PurchaseItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "purchase_id")
    private Purchase purchase;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer quantity;

    private BigDecimal purchasePrice;

    private BigDecimal subtotal;
}
