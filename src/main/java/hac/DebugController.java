package hac;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Enumeration;
import java.util.List;

/**
 * This code is for debugging purposes only.
 * You can check the DB contents by visiting http://localhost:8080/debug/purchases
 * You may add new routes to this controller if you want to test your code.
 * This class will not be graded (ignored by the grader).
 */
@RestController
@RequestMapping("/debug")
public class DebugController {
    @Autowired
    private PurchaseRepository repository;  // this is the JPA repository (SQL database)

    @GetMapping("/purchases")
    public List<Purchase> showPurchases() {
        return repository.findAll(); // this is a JPA method to get all the purchases
    }

    @PostMapping("/purchases")
    public Purchase addPurchase(Purchase purchase) {
        return repository.save(purchase); // this is a JPA method to save a purchase to the database
    }

    @GetMapping("/session")
    public Enumeration<String> debugSessionAttributes(HttpSession session) {
        Enumeration<String> attributeNames = session.getAttributeNames();
        while (attributeNames.hasMoreElements()) {
            String attributeName = attributeNames.nextElement();
            Object attributeValue = session.getAttribute(attributeName);
            System.out.println(attributeName + " = " + attributeValue);
        }
        return attributeNames;
    }
}
