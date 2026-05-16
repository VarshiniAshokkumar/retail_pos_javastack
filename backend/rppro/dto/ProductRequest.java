package com.example.rppro.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {

    private String name;

    private String barcode;

    private String sku;

    private String category;

    private Integer stockQuantity;

    private Integer thresholdStock;

    private BigDecimal purchasePrice;

    private BigDecimal sellingPrice;
}