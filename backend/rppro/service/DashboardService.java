package com.example.rppro.service;

import com.example.rppro.dto.DashboardSummaryResponse;
import com.example.rppro.repository.BillItemRepository;
import com.example.rppro.repository.BillRepository;
import com.example.rppro.repository.CustomerRepository;
import com.example.rppro.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.rppro.dto.ProductSalesResponse;
import com.example.rppro.entity.Product;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final BillRepository billRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final BillItemRepository billItemRepository;

    public DashboardSummaryResponse getSummary() {

        return DashboardSummaryResponse.builder()
                .todaySales(
                        billRepository.getTodaySales()
                )
                .monthlySales(
                        billRepository.getMonthlySales()
                )
                .totalBills(
                        billRepository.count()
                )
                .totalCustomers(
                        customerRepository.count()
                )
                .lowStockProducts(
                        productRepository.countByLowStockAlertTrue()
                )
                .totalPendingLending(
                        billRepository.getTotalPendingLending()
                )
                .build();
    }

    public List<ProductSalesResponse> getTopSellingProducts() {
        return billItemRepository.getTopSellingProducts();
    }

    public List<ProductSalesResponse> getWorstSellingProducts() {

        return billItemRepository.getWorstSellingProducts();
    }

    public List<Product> getLowStockProducts() {

        return productRepository.findByLowStockAlertTrue();
    }
}