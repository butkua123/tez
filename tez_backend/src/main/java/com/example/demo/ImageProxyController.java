package com.example.demo;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
public class ImageProxyController {

    @GetMapping("/proxy-image")
    public ResponseEntity<byte[]> getImage(@RequestParam String url) {
        RestTemplate restTemplate = new RestTemplate();
        byte[] imageBytes = restTemplate.getForObject(url, byte[].class);
        return ResponseEntity.ok().body(imageBytes);
    }
}
