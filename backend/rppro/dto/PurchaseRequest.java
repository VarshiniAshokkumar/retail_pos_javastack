package com.example.rppro.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PurchaseRequest {

    private String supplierName;

    private Long productId;

    private Integer quantity;

    private BigDecimal purchasePrice;
}