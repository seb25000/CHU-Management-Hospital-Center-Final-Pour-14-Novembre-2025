package com.chu.management.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration JWT pour l'authentification
 */
@Configuration
public class JwtConfig {

    @Value("${spring.security.jwt.secret}")
    private String secret;

    @Value("${spring.security.jwt.expiration}")
    private Long expiration;

    public String getSecret() {
        return secret;
    }

    public Long getExpiration() {
        return expiration;
    }

    // Constantes pour les claims JWT
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String AUTHORITIES_KEY = "roles";
    public static final String USER_ID_KEY = "userId";
    public static final String EMAIL_KEY = "email";
}