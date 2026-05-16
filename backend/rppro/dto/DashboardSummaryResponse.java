package com.example.rppro.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class DashboardSummaryResponse {

    private BigDecimal todaySales;

    private BigDecimal monthlySales;

    private Long totalBills;

    private Long totalCustomers;

    private Long lowStockProducts;

    private BigDecimal totalPendingLending;
}