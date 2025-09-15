package com.example.demo;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "house_photos")
public class HousePhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "house_id")
    @JsonBackReference
    private House house;

    private String photoUrl;

    // Default constructor for Jackson
    public HousePhoto() {
    }

    // Constructor for convenience
    public HousePhoto(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}
