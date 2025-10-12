package com.udayan.jobsapi.service;

import com.udayan.jobsapi.dto.AuthResponse;
import com.udayan.jobsapi.dto.LoginRequest;
import com.udayan.jobsapi.dto.SignupRequest;
import com.udayan.jobsapi.model.User;
import com.udayan.jobsapi.repository.UserRepository;
import com.udayan.jobsapi.security.JwtUtils;
import com.udayan.jobsapi.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    @Transactional
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().iterator().next().getAuthority();
        
        return new AuthResponse(jwt, userDetails.getId(), userDetails.getUsername(), 
                userDetails.getEmail(), role);
    }
    
    @Transactional
    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username is already taken");
        }
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }
        
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setCompany(request.getCompany());
        user.setRole(request.getRole());
        user.setEnabled(true);
        
        User savedUser = userRepository.save(user);
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        
        String jwt = jwtUtils.generateJwtToken(authentication);
        String role = "ROLE_" + savedUser.getRole().name();
        
        return new AuthResponse(jwt, savedUser.getId(), savedUser.getUsername(), 
                savedUser.getEmail(), role);
    }
}



