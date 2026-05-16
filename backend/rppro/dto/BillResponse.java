package com.example.rppro.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class BillResponse {

    private Long billId;

    private String customerName;

    private BigDecimal finalAmount;

    private BigDecimal paidAmount;

    private BigDecimal lendingAmount;

    private String paymentMethod;

    private LocalDateTime createdAt;
}