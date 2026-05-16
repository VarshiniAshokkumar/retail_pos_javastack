package com.example.rppro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "lending")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lending {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne
    @JoinColumn(name = "bill_id")
    private Bill bill;

    @Column(nullable = false)
    private BigDecimal pendingAmount;

    @Column(nullable = false)
    private BigDecimal paidAmount;

    @Column(nullable = false)
    private BigDecimal remainingAmount;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}