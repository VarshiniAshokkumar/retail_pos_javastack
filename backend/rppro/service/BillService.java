package com.example.rppro.service;

import com.example.rppro.dto.BillItemRequest;
import com.example.rppro.dto.BillRequest;
import com.example.rppro.entity.*;
import com.example.rppro.enums.PaymentMethod;
import com.example.rppro.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.rppro.dto.ReturnEligibilityResponse;
import com.example.rppro.dto.BillResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.example.rppro.dto.CustomerHistoryResponse;
import com.example.rppro.dto.ProductHistoryResponse;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;
    private final BillItemRepository billItemRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final LendingRepository lendingRepository;

    public Bill completeBill(BillRequest request) {

        // customer validation
        Customer customer = customerRepository.findById(
                        request.getCustomerId())
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));

        // current logged user
        User user = userRepository.findById(1L)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        BigDecimal totalAmount = BigDecimal.ZERO;

        List<BillItem> billItems = new ArrayList<>();

        // process products
        for (BillItemRequest itemRequest : request.getItems()) {

            Product product = productRepository.findById(
                            itemRequest.getProductId())
                    .orElseThrow(() ->
                            new RuntimeException("Product not found"));

            // stock validation
            if (product.getStockQuantity() <
                    itemRequest.getQuantity()) {

                throw new RuntimeException(
                        product.getName() + " out of stock"
                );
            }

            BigDecimal subtotal =
                    product.getSellingPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            itemRequest.getQuantity()
                                    )
                            );

            totalAmount = totalAmount.add(subtotal);

            BillItem billItem = BillItem.builder()
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .price(product.getSellingPrice())
                    .subtotal(subtotal)
                    .build();

            billItems.add(billItem);
        }

        // discount
        BigDecimal discount = request.getDiscountAmount();

        if (discount == null) {
            discount = BigDecimal.ZERO;
        }

        BigDecimal finalAmount =
                totalAmount.subtract(discount);

        // lending
        BigDecimal paidAmount = request.getPaidAmount();

        BigDecimal lendingAmount =
                finalAmount.subtract(paidAmount);

        if (lendingAmount.compareTo(BigDecimal.ZERO) < 0) {
            lendingAmount = BigDecimal.ZERO;
        }

        // create bill
        Bill bill = Bill.builder()
                .customer(customer)
                .user(user)
                .totalAmount(totalAmount)
                .discountAmount(discount)
                .finalAmount(finalAmount)
                .paidAmount(paidAmount)
                .lendingAmount(lendingAmount)
                .paymentMethod(request.getPaymentMethod())
                .items(new ArrayList<>())
                .build();

        Bill savedBill = billRepository.save(bill);

        // save bill items + reduce stock
        for (BillItem item : billItems) {

            item.setBill(savedBill);

            billItemRepository.save(item);

            Product product = item.getProduct();

            // reduce stock
            product.setStockQuantity(
                    product.getStockQuantity()
                            - item.getQuantity()
            );

            // low stock alert
            product.setLowStockAlert(
                    product.getStockQuantity()
                            <= product.getThresholdStock()
            );

            productRepository.save(product);
        }

        // update lending balance
        if (lendingAmount.compareTo(BigDecimal.ZERO) > 0) {

            customer.setLendingBalance(
                    customer.getLendingBalance()
                            .add(lendingAmount)
            );

            customerRepository.save(customer);

            Lending lending = Lending.builder()
                    .customer(customer)
                    .bill(savedBill)
                    .pendingAmount(finalAmount)
                    .paidAmount(paidAmount)
                    .remainingAmount(lendingAmount)
                    .build();

            lendingRepository.save(lending);
        }

        return savedBill;
    }

    public List<Bill> getAllBills() {

        return billRepository.findAll();
    }

    public List<Bill> getLast30DaysBills() {

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime last30Days =
                now.minusDays(30);

        return billRepository.findByCreatedAtBetween(
                last30Days,
                now
        );
    }

    public List<Bill> getCustomerPurchaseHistory(
            Long customerId
    ) {

        return billRepository.findByCustomerId(customerId);
    }

    public ReturnEligibilityResponse checkReturnEligibility(
            Long billId
    ) {

        Bill bill = billRepository.findById(billId)
                .orElseThrow(() ->
                        new RuntimeException("Bill not found"));

        LocalDateTime purchaseDate =
                bill.getCreatedAt();

        LocalDateTime lastEligibleDate =
                purchaseDate.plusDays(30);

        boolean eligible =
                LocalDateTime.now()
                        .isBefore(lastEligibleDate);

        if (eligible) {

            return new ReturnEligibilityResponse(
                    billId,
                    true,
                    "Return allowed within 30 days"
            );
        }

        return new ReturnEligibilityResponse(
                billId,
                false,
                "Return period expired"
        );
    }

    public List<BillResponse> getAllBillsResponse() {

        List<Bill> bills = billRepository.findAll();

        return bills.stream()
                .map(bill -> BillResponse.builder()
                        .billId(bill.getId())
                        .customerName(
                                bill.getCustomer().getName()
                        )
                        .finalAmount(
                                bill.getFinalAmount()
                        )
                        .paidAmount(
                                bill.getPaidAmount()
                        )
                        .lendingAmount(
                                bill.getLendingAmount()
                        )
                        .paymentMethod(
                                bill.getPaymentMethod().name()
                        )
                        .createdAt(
                                bill.getCreatedAt()
                        )
                        .build()
                )
                .toList();
    }

    public List<CustomerHistoryResponse>
    getCustomerHistoryClean(Long customerId) {

        List<Bill> bills =
                billRepository.findByCustomerId(customerId);

        return bills.stream()
                .map(bill -> {

                    List<ProductHistoryResponse> products =
                            bill.getItems()
                                    .stream()
                                    .map(item ->
                                            ProductHistoryResponse.builder()
                                                    .productName(
                                                            item.getProduct().getName()
                                                    )
                                                    .quantity(
                                                            item.getQuantity()
                                                    )
                                                    .subtotal(
                                                            item.getSubtotal()
                                                    )
                                                    .build()
                                    )
                                    .toList();

                    return CustomerHistoryResponse.builder()
                            .billId(bill.getId())
                            .date(bill.getCreatedAt())
                            .finalAmount(
                                    bill.getFinalAmount()
                            )
                            .paidAmount(
                                    bill.getPaidAmount()
                            )
                            .pendingAmount(
                                    bill.getLendingAmount()
                            )
                            .products(products)
                            .build();
                })
                .toList();
    }
}