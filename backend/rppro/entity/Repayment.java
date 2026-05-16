package com.example.rppro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "repayments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Repayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lending_id")
    private Lending lending;

    @Column(nullable = false)
    private BigDecimal amount;

    @Builder.Default
    private LocalDateTime paidDate = LocalDateTime.now();
}