package com.chu.management.config;

import com.chu.management.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

/**
 * Configuration de sécurité Spring Security avec JWT
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    /**
     * Configuration de la chaîne de filtres de sécurité
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Désactiver CSRF car nous utilisons JWT
            .csrf(csrf -> csrf.disable())
            
            // Configuration CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            
            // Configuration des sessions (stateless pour JWT)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // Configuration des autorisations
            .authorizeHttpRequests(authz -> authz
                // Endpoints publics
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/health").permitAll()
                .requestMatchers("/actuator/**").permitAll()
                
                // Endpoints admin
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                
                // Endpoints médecins
                .requestMatchers("/api/doctors/**").hasAnyRole("ADMIN", "DOCTOR")
                
                // Endpoints patients
                .requestMatchers("/api/patients/**").hasAnyRole("ADMIN", "DOCTOR", "PATIENT")
                
                // Autres endpoints nécessitent une authentification
                .anyRequest().authenticated()
            )
            
            // Ajouter le filtre JWT avant le filtre d'authentification par défaut
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Bean pour l'encodage des mots de passe
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12); // Force 12 pour plus de sécurité
    }

    /**
     * Bean pour l'AuthenticationManager
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}