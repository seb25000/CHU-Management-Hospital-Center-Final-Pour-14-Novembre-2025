package com.chu.management.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

/**
 * Configuration CORS pour permettre les requêtes cross-origin
 * entre le frontend React (port 5173) et le backend Spring Boot (port 8080)
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${cors.allowed-origins:http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600); // Cache des preflight requests pendant 1 heure
    }

    /**
     * Configuration CORS pour Spring Security
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Origins autorisées
        configuration.setAllowedOrigins(Arrays.asList(allowedOrigins));
        
        // Méthodes HTTP autorisées
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"
        ));
        
        // Headers autorisés
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization", 
            "Content-Type", 
            "X-Requested-With", 
            "Accept", 
            "Origin", 
            "Access-Control-Request-Method", 
            "Access-Control-Request-Headers"
        ));
        
        // Headers exposés au client
        configuration.setExposedHeaders(Arrays.asList(
            "Access-Control-Allow-Origin", 
            "Access-Control-Allow-Methods", 
            "Access-Control-Allow-Headers", 
            "Access-Control-Max-Age", 
            "Access-Control-Request-Headers", 
            "Access-Control-Request-Method"
        ));
        
        // Autoriser les credentials (cookies, authorization headers)
        configuration.setAllowCredentials(true);
        
        // Cache des preflight requests
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}