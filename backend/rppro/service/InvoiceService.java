package com.example.rppro.service;

import com.example.rppro.entity.Bill;
import com.example.rppro.entity.BillItem;
import com.example.rppro.repository.BillRepository;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;

import java.io.ByteArrayOutputStream;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final BillRepository billRepository;

    public byte[] generateInvoice(Long billId)
            throws Exception {

        Bill bill = billRepository.findById(billId)
                .orElseThrow(() ->
                        new RuntimeException("Bill not found"));

        ByteArrayOutputStream outputStream =
                new ByteArrayOutputStream();

        Document document = new Document();

        PdfWriter.getInstance(document, outputStream);

        document.open();

        Font titleFont = new Font(
                Font.HELVETICA,
                20,
                Font.BOLD
        );

        Paragraph title =
                new Paragraph(
                        "Retail POS Invoice",
                        titleFont
                );

        title.setAlignment(Element.ALIGN_CENTER);

        document.add(title);

        document.add(new Paragraph(" "));

        document.add(new Paragraph(
                "Invoice ID: " + bill.getId()
        ));

        document.add(new Paragraph(
                "Customer: " +
                        bill.getCustomer().getName()
        ));

        document.add(new Paragraph(
                "Payment Method: " +
                        bill.getPaymentMethod()
        ));

        document.add(new Paragraph(
                "Date: " +
                        bill.getCreatedAt()
        ));

        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(4);

        table.setWidthPercentage(100);

        table.addCell(createHeader("Product"));
        table.addCell(createHeader("Qty"));
        table.addCell(createHeader("Price"));
        table.addCell(createHeader("Subtotal"));

        for (BillItem item : bill.getItems()) {

            table.addCell(
                    item.getProduct().getName()
            );

            table.addCell(
                    String.valueOf(
                            item.getQuantity()
                    )
            );

            table.addCell(
                    item.getPrice().toString()
            );

            table.addCell(
                    item.getSubtotal().toString()
            );
        }

        document.add(table);

        document.add(new Paragraph(" "));

        document.add(new Paragraph(
                "Total Amount: ₹" +
                        bill.getTotalAmount()
        ));

        document.add(new Paragraph(
                "Discount: ₹" +
                        bill.getDiscountAmount()
        ));

        document.add(new Paragraph(
                "Final Amount: ₹" +
                        bill.getFinalAmount()
        ));

        document.add(new Paragraph(
                "Paid Amount: ₹" +
                        bill.getPaidAmount()
        ));

        document.add(new Paragraph(
                "Pending Amount: ₹" +
                        bill.getLendingAmount()
        ));

        document.add(new Paragraph(" "));

        document.add(new Paragraph(
                "Scan QR to view invoice"
        ));

        Image qrImage =
                generateQRCode(bill.getId());

        qrImage.scaleAbsolute(120, 120);

        document.add(qrImage);

        document.close();

        return outputStream.toByteArray();
    }

    private PdfPCell createHeader(String title) {

        PdfPCell cell = new PdfPCell();

        cell.setPhrase(
                new Phrase(title)
        );

        return cell;
    }

    private Image generateQRCode(Long billId)
            throws Exception {

        String invoiceUrl =
                "http://localhost:8080/invoice/" + billId;

        QRCodeWriter qrCodeWriter =
                new QRCodeWriter();

        BitMatrix bitMatrix =
                qrCodeWriter.encode(
                        invoiceUrl,
                        BarcodeFormat.QR_CODE,
                        200,
                        200
                );

        BufferedImage bufferedImage =
                MatrixToImageWriter.toBufferedImage(
                        bitMatrix
                );

        ByteArrayOutputStream pngOutputStream =
                new ByteArrayOutputStream();

        ImageIO.write(
                bufferedImage,
                "PNG",
                pngOutputStream
        );

        return Image.getInstance(
                pngOutputStream.toByteArray()
        );
    }
}