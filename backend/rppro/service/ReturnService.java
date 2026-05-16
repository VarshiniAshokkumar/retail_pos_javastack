package com.example.rppro.service;

import com.example.rppro.dto.ReturnRequest;
import com.example.rppro.entity.*;
import com.example.rppro.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReturnService {

    private final BillRepository billRepository;
    private final ProductRepository productRepository;
    private final ProductReturnRepository productReturnRepository;

    public ProductReturn returnProduct(
            ReturnRequest request
    ) {

        Bill bill = billRepository.findById(
                request.getBillId()
        ).orElseThrow(() ->
                new RuntimeException("Bill not found"));

        // 30 days validation
        if (bill.getCreatedAt()
                .isBefore(
                        LocalDateTime.now()
                                .minusDays(30)
                )) {

            throw new RuntimeException(
                    "Return period expired"
            );
        }

        Product product =
                productRepository.findById(
                        request.getProductId()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Product not found"
                        ));

        BillItem billItem = bill.getItems()
                .stream()
                .filter(item ->
                        item.getProduct()
                                .getId()
                                .equals(request.getProductId())
                )
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found in bill"
                        ));

        if (request.getQuantity()
                > billItem.getQuantity()) {

            throw new RuntimeException(
                    "Return quantity exceeds purchased quantity"
            );
        }

        BigDecimal refundAmount =
                product.getSellingPrice()
                        .multiply(
                                BigDecimal.valueOf(
                                        request.getQuantity()
                                )
                        );

        // restore stock
        product.setStockQuantity(
                product.getStockQuantity()
                        + request.getQuantity()
        );

        productRepository.save(product);

        ProductReturn productReturn =
                ProductReturn.builder()
                        .bill(bill)
                        .product(product)
                        .quantity(
                                request.getQuantity()
                        )
                        .refundAmount(refundAmount)
                        .returnedAt(LocalDateTime.now())
                        .build();

        return productReturnRepository.save(
                productReturn
        );
    }
}