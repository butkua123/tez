package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HouseService {

    private final HouseRepository houseRepository;

    public HouseService(HouseRepository houseRepository) {
        this.houseRepository = houseRepository;
    }

    public House addHouse(House house) {
        return houseRepository.save(house); // Save the house in the database
    }

    public List<House> getHousesByUserId(Long userId) {
        return houseRepository.findByUserId(userId); // Fetch houses for a user
    }

    public List<House> getAllHouses() {
        return houseRepository.findAll(); // Fetch all available houses
    }

    public void deleteHouseById(Long houseId) {
        houseRepository.deleteById(houseId);
    }

    public List<House> getAvailableHouses(LocalDate today) {
        return houseRepository.findByAvailabilityEndAfter(today);
    }

    public House getHouseById(Long houseId) {
        return houseRepository.findById(houseId).orElse(null);
    }

    public List<House> searchHouses(String city, LocalDate startDate, LocalDate endDate) {
        if (city != null && startDate != null && endDate != null) {
            return houseRepository.findByLocationContainingIgnoreCaseAndAvailabilityStartBeforeAndAvailabilityEndAfter(city, startDate, endDate);
        } else if (city != null) {
            return houseRepository.findByLocationContainingIgnoreCase(city);
        } else if (startDate != null && endDate != null) {
            return houseRepository.findByAvailabilityStartBeforeAndAvailabilityEndAfter(startDate, endDate);
        } else {
            return houseRepository.findAll();
        }
    }

}
