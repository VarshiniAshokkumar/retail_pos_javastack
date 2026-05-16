package com.example.rppro.repository;

import com.example.rppro.dto.ProductSalesResponse;
import com.example.rppro.entity.BillItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillItemRepository
        extends JpaRepository<BillItem, Long> {

    @Query("""
        SELECT new com.example.rppro.dto.ProductSalesResponse(
            bi.product.name,
            SUM(bi.quantity)
        )
        FROM BillItem bi
        GROUP BY bi.product.name
        ORDER BY SUM(bi.quantity) DESC
    """)
    List<ProductSalesResponse> getTopSellingProducts();

    @Query("""
        SELECT new com.example.rppro.dto.ProductSalesResponse(
            bi.product.name,
            SUM(bi.quantity)
        )
        FROM BillItem bi
        GROUP BY bi.product.name
        ORDER BY SUM(bi.quantity) ASC
    """)
    List<ProductSalesResponse> getWorstSellingProducts();
}