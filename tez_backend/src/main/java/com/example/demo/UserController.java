package com.example.demo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import com.example.demo.LoginRequest;


@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
    User authenticatedUser = userService.authenticateUser(request.getEmail(), request.getPassword());
    if (authenticatedUser != null) {
        // Return the user's data in the response
        return ResponseEntity.ok(authenticatedUser);
    }
    return ResponseEntity.status(401).body("Invalid credentials");
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser) {
        try {
            // Call the service to update the user
            User savedUser = userService.updateUser(id, updatedUser);
            return ResponseEntity.ok(savedUser); // Return the updated user
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error updating user: " + e.getMessage());
        }
    }
}

