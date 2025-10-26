package com.chu.management.controller;

import com.chu.management.dto.AuthRequest;
import com.chu.management.dto.AuthResponse;
import com.chu.management.dto.RegisterRequest;
import com.chu.management.entity.User;
import com.chu.management.service.AuthService;
import com.chu.management.util.JwtUtil;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * Contrôleur pour l'authentification et l'inscription
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Endpoint de connexion
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest authRequest) {
        try {
            logger.info("Tentative de connexion pour l'utilisateur: {}", authRequest.getEmail());

            // Authentifier l'utilisateur
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    authRequest.getEmail(),
                    authRequest.getPassword()
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Récupérer l'utilisateur
            User user = authService.findByEmail(authRequest.getEmail());
            
            // Générer les tokens JWT
            String accessToken = jwtUtil.generateToken(authentication, user.getId());
            String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getId());

            logger.info("Connexion réussie pour l'utilisateur: {}", authRequest.getEmail());

            return ResponseEntity.ok(new AuthResponse(
                accessToken,
                refreshToken,
                "Bearer",
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                "Connexion réussie"
            ));

        } catch (Exception e) {
            logger.error("Erreur lors de la connexion pour {}: {}", authRequest.getEmail(), e.getMessage());
            return ResponseEntity.badRequest()
                .body(new AuthResponse(null, null, null, null, null, null, null, null, 
                      "Email ou mot de passe incorrect"));
        }
    }

    /**
     * Endpoint d'inscription
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            logger.info("Tentative d'inscription pour l'utilisateur: {}", registerRequest.getEmail());

            // Vérifier si l'utilisateur existe déjà
            if (authService.existsByEmail(registerRequest.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, null, null, null, null, null, null, null,
                          "Un compte avec cet email existe déjà"));
            }

            // Créer l'utilisateur
            User user = authService.createUser(registerRequest);

            // Créer l'authentification
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getEmail(), null, authService.getAuthorities(user.getRole())
            );

            // Générer les tokens JWT
            String accessToken = jwtUtil.generateToken(authentication, user.getId());
            String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getId());

            logger.info("Inscription réussie pour l'utilisateur: {}", registerRequest.getEmail());

            return ResponseEntity.ok(new AuthResponse(
                accessToken,
                refreshToken,
                "Bearer",
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                "Inscription réussie"
            ));

        } catch (Exception e) {
            logger.error("Erreur lors de l'inscription pour {}: {}", registerRequest.getEmail(), e.getMessage());
            return ResponseEntity.badRequest()
                .body(new AuthResponse(null, null, null, null, null, null, null, null,
                      "Erreur lors de l'inscription: " + e.getMessage()));
        }
    }

    /**
     * Endpoint de rafraîchissement du token
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String refreshToken) {
        try {
            String token = jwtUtil.getTokenFromHeader(refreshToken);
            
            if (token != null && jwtUtil.validateToken(token)) {
                String email = jwtUtil.getEmailFromToken(token);
                Long userId = jwtUtil.getUserIdFromToken(token);
                User user = authService.findByEmail(email);
                
                // Créer une nouvelle authentification
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                    user.getEmail(), null, authService.getAuthorities(user.getRole())
                );
                
                // Générer un nouveau token d'accès
                String newAccessToken = jwtUtil.generateToken(authentication, userId);
                
                return ResponseEntity.ok(new AuthResponse(
                    newAccessToken,
                    token, // Garder le même refresh token
                    "Bearer",
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    "Token rafraîchi avec succès"
                ));
            } else {
                return ResponseEntity.badRequest()
                    .body(new AuthResponse(null, null, null, null, null, null, null, null,
                          "Token de rafraîchissement invalide"));
            }
        } catch (Exception e) {
            logger.error("Erreur lors du rafraîchissement du token: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(new AuthResponse(null, null, null, null, null, null, null, null,
                      "Erreur lors du rafraîchissement du token"));
        }
    }

    /**
     * Endpoint de déconnexion
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().body("{\"message\": \"Déconnexion réussie\"}");
    }

    /**
     * Endpoint pour vérifier la validité du token
     */
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = jwtUtil.getTokenFromHeader(authHeader);
            
            if (token != null && jwtUtil.validateToken(token)) {
                String email = jwtUtil.getEmailFromToken(token);
                Long userId = jwtUtil.getUserIdFromToken(token);
                User user = authService.findByEmail(email);
                
                return ResponseEntity.ok(new AuthResponse(
                    null, null, null,
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    "Token valide"
                ));
            } else {
                return ResponseEntity.badRequest()
                    .body("{\"message\": \"Token invalide\"}");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("{\"message\": \"Token invalide\"}");
        }
    }
}