package com.example.demo;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/houses") // Base URL for house-related endpoints
public class HouseController {

    private final HouseService houseService;

    public HouseController(HouseService houseService) {
        this.houseService = houseService;
    }

    @PostMapping
    public ResponseEntity<House> addHouse(@RequestBody HouseRequest houseRequest) {
        House house = new House();
        house.setUser(houseRequest.getUser());
        house.setLocation(houseRequest.getLocation());

        // Convert String dates to LocalDate
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        house.setAvailabilityStart(LocalDate.parse(houseRequest.getAvailabilityStart(), formatter));
        house.setAvailabilityEnd(LocalDate.parse(houseRequest.getAvailabilityEnd(), formatter));

        house.setDescription(houseRequest.getDescription());
        house.setPhotosFromUrls(houseRequest.getPhotoUrls()); // Convert photoUrls to HousePhoto objects

        House savedHouse = houseService.addHouse(house);
        return ResponseEntity.ok(savedHouse);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<House>> getHousesByUserId(@PathVariable Long userId) {
        List<House> houses = houseService.getHousesByUserId(userId);
        return ResponseEntity.ok(houses);
    }

    @GetMapping("/{houseId}")
    public ResponseEntity<House> getHouseById(@PathVariable Long houseId) {
        House house = houseService.getHouseById(houseId);
        if (house != null) {
            return ResponseEntity.ok(house);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @GetMapping
    public ResponseEntity<List<House>> getAllHouses() {
        List<House> houses = houseService.getAllHouses();
        return ResponseEntity.ok(houses);
    }

    @GetMapping("/available")
    public ResponseEntity<List<House>> getAvailableHouses() {
        LocalDate today = LocalDate.now();
        List<House> availableHouses = houseService.getAvailableHouses(today);
        return ResponseEntity.ok(availableHouses);
    }

    @GetMapping("/search")
    public ResponseEntity<List<House>> searchHouses(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<House> searchResults = houseService.searchHouses(city, startDate, endDate);
        return ResponseEntity.ok(searchResults);
    }    

    @DeleteMapping("/{houseId}")
    public ResponseEntity<String> deleteHouse(@PathVariable Long houseId) {
        try {
            houseService.deleteHouseById(houseId);
            return ResponseEntity.ok("House deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting house: " + e.getMessage());
        }    
    }


    
}
