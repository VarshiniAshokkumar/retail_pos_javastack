package com.example.rppro.dto;

import com.example.rppro.enums.PaymentMethod;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class BillRequest {

    private Long customerId;

    private List<BillItemRequest> items;

    private BigDecimal discountAmount;

    private BigDecimal paidAmount;

    private PaymentMethod paymentMethod;
}