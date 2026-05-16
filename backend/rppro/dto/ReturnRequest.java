package com.example.rppro.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReturnRequest {

    private Long billId;

    private Long productId;

    private Integer quantity;
}