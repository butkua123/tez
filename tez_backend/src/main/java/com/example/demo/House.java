package com.example.demo;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "houses")
public class House {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<HousePhoto> photos = new ArrayList<>();

    private String location;
    private String description;

    private LocalDate availabilityStart;
    private LocalDate availabilityEnd;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Method to set photos from URLs
    public void setPhotosFromUrls(List<String> photoUrls) {
        this.photos.clear(); // Clear existing photos
        for (String url : photoUrls) {
            HousePhoto photo = new HousePhoto();
            photo.setPhotoUrl(url); // Set the photo URL
            photo.setHouse(this);   // Link the photo to this house
            this.photos.add(photo);
        }
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<HousePhoto> getPhotos() {
        return photos;
    }

    public void setPhotos(List<HousePhoto> photos) {
        this.photos = photos;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getAvailabilityStart() {
        return availabilityStart;
    }

    public void setAvailabilityStart(LocalDate availabilityStart) {
        this.availabilityStart = availabilityStart;
    }

    public LocalDate getAvailabilityEnd() {
        return availabilityEnd;
    }

    public void setAvailabilityEnd(LocalDate availabilityEnd) {
        this.availabilityEnd = availabilityEnd;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
