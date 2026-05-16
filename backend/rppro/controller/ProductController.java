package com.example.rppro.controller;

import com.example.rppro.dto.ProductRequest;
import com.example.rppro.entity.Product;
import com.example.rppro.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor

@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public Product createProduct(
            @RequestBody ProductRequest request
    ) {

        return productService.createProduct(request);
    }

    @GetMapping
    public List<Product> getAllProducts() {

        return productService.getAllProducts();
    }

    @GetMapping("/barcode/{barcode}")
    public Product getByBarcode(
            @PathVariable String barcode
    ) {

        return productService.getProductByBarcode(barcode);
    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequest request
    ) {

        return productService.updateProduct(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id
    ) {

        productService.deleteProduct(id);

        return "Product Deleted Successfully";
    }
}