package com.example.rppro.service;

import com.example.rppro.dto.ProductRequest;
import com.example.rppro.entity.Product;
import com.example.rppro.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product createProduct(ProductRequest request) {

        Product product = Product.builder()
                .name(request.getName())
                .barcode(request.getBarcode())
                .sku(request.getSku())
                .category(request.getCategory())
                .stockQuantity(request.getStockQuantity())
                .thresholdStock(request.getThresholdStock())
                .purchasePrice(request.getPurchasePrice())
                .sellingPrice(request.getSellingPrice())
                .build();

        checkLowStock(product);

        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductByBarcode(String barcode) {

        return productRepository.findByBarcode(barcode)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));
    }

    public Product updateProduct(
            Long id,
            ProductRequest request
    ) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        product.setName(request.getName());
        product.setBarcode(request.getBarcode());
        product.setSku(request.getSku());
        product.setCategory(request.getCategory());
        product.setStockQuantity(request.getStockQuantity());
        product.setThresholdStock(request.getThresholdStock());
        product.setPurchasePrice(request.getPurchasePrice());
        product.setSellingPrice(request.getSellingPrice());

        checkLowStock(product);

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {

        productRepository.deleteById(id);
    }

    private void checkLowStock(Product product) {

        product.setLowStockAlert(
                product.getStockQuantity()
                        < product.getThresholdStock()
        );
    }
}