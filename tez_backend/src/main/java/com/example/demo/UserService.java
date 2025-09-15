package com.example.demo;

import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null); // Returns user if found, otherwise null
    }

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User authenticateUser(String email, String rawPassword) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user;
        }
        return null;
    }
    public User updateUser(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    
        // Update user details
        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setProfilePhoto(updatedUser.getProfilePhoto());
    
        return userRepository.save(existingUser); // Save the updated user
    }
}
