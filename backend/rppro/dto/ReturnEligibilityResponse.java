package com.example.rppro.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReturnEligibilityResponse {

    private Long billId;

    private boolean eligible;

    private String message;
}