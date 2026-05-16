package com.example.rppro.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
public class DashboardResponse {

    private BigDecimal todaySales;

    private BigDecimal monthlySales;

    private BigDecimal pendingLending;

    private Long lowStockProducts;

    private List<String> topSellingProducts;

    private List<String> worstSellingProducts;
}