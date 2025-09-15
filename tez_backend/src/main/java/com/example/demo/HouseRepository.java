package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    List<House> findByUserId(Long userId);
    List<House> findByAvailabilityEndAfter(LocalDate date);
    List<House> findByLocationContainingIgnoreCase(String location);
    List<House> findByAvailabilityStartBeforeAndAvailabilityEndAfter(LocalDate startDate, LocalDate endDate);
    List<House> findByLocationContainingIgnoreCaseAndAvailabilityStartBeforeAndAvailabilityEndAfter(String location, LocalDate startDate, LocalDate endDate);
}