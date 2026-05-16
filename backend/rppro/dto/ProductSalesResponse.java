package com.example.rppro.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductSalesResponse {

    private String productName;

    private Long totalQuantitySold;
}