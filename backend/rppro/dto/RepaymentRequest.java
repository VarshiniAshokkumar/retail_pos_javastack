package com.example.rppro.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class RepaymentRequest {

    private Long lendingId;

    private BigDecimal amount;
}