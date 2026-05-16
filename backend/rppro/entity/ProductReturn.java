package com.example.rppro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_returns")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductReturn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @ManyToOne
    @JoinColumn(name = "bill_id")

    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "product_id")

    private Product product;

    private Integer quantity;

    private BigDecimal refundAmount;

    private LocalDateTime returnedAt;
}