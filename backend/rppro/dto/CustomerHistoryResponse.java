package com.example.rppro.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class CustomerHistoryResponse {

    private Long billId;

    private LocalDateTime date;

    private BigDecimal finalAmount;

    private BigDecimal paidAmount;

    private BigDecimal pendingAmount;

    private List<ProductHistoryResponse> products;
}