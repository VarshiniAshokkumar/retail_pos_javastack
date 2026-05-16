package com.example.rppro.service;

import com.example.rppro.dto.PurchaseRequest;
import com.example.rppro.entity.Product;
import com.example.rppro.entity.Purchase;
import com.example.rppro.repository.ProductRepository;
import com.example.rppro.repository.PurchaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final ProductRepository productRepository;

    public Purchase createPurchase(
            PurchaseRequest request
    ) {

        Product product = productRepository
                .findById(request.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        // increase stock
        product.setStockQuantity(
                product.getStockQuantity()
                        + request.getQuantity()
        );

        // low stock update
        product.setLowStockAlert(
                product.getStockQuantity()
                        <= product.getThresholdStock()
        );

        // update purchase price
        product.setPurchasePrice(
                request.getPurchasePrice()
        );

        productRepository.save(product);

        BigDecimal total =
                request.getPurchasePrice()
                        .multiply(
                                BigDecimal.valueOf(
                                        request.getQuantity()
                                )
                        );

        Purchase purchase = Purchase.builder()
                .supplierName(request.getSupplierName())
                .product(product)
                .quantity(request.getQuantity())
                .purchasePrice(request.getPurchasePrice())
                .totalAmount(total)
                .purchasedAt(LocalDateTime.now())
                .build();

        return purchaseRepository.save(purchase);
    }

    public List<Purchase> getAllPurchases() {

        return purchaseRepository.findAll();
    }
}