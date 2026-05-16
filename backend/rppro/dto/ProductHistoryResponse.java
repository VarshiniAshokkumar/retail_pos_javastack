package com.example.rppro.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class ProductHistoryResponse {

    private String productName;

    private Integer quantity;

    private BigDecimal subtotal;
}