package com.chu.management.util;

import com.chu.management.config.JwtConfig;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Utilitaire pour la gestion des tokens JWT
 */
@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Autowired
    private JwtConfig jwtConfig;

    /**
     * Génère une clé secrète à partir de la configuration
     */
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtConfig.getSecret().getBytes());
    }

    /**
     * Génère un token JWT à partir de l'authentification
     */
    public String generateToken(Authentication authentication, Long userId) {
        String email = authentication.getName();
        List<String> authorities = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtConfig.getExpiration());

        return Jwts.builder()
                .setSubject(email)
                .claim(JwtConfig.USER_ID_KEY, userId)
                .claim(JwtConfig.EMAIL_KEY, email)
                .claim(JwtConfig.AUTHORITIES_KEY, authorities)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Génère un token de rafraîchissement
     */
    public String generateRefreshToken(String email, Long userId) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + (jwtConfig.getExpiration() * 7)); // 7 fois plus long

        return Jwts.builder()
                .setSubject(email)
                .claim(JwtConfig.USER_ID_KEY, userId)
                .claim("type", "refresh")
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Extrait l'email du token
     */
    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    /**
     * Extrait l'ID utilisateur du token
     */
    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get(JwtConfig.USER_ID_KEY, Long.class);
    }

    /**
     * Extrait les rôles du token
     */
    @SuppressWarnings("unchecked")
    public List<String> getAuthoritiesFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return (List<String>) claims.get(JwtConfig.AUTHORITIES_KEY);
    }

    /**
     * Vérifie si le token est expiré
     */
    public Boolean isTokenExpired(String token) {
        try {
            Date expiration = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration();

            return expiration.before(new Date());
        } catch (Exception e) {
            logger.error("Erreur lors de la vérification de l'expiration du token", e);
            return true;
        }
    }

    /**
     * Valide le token JWT
     */
    public Boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            logger.error("Signature JWT invalide: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Token JWT malformé: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("Token JWT expiré: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Token JWT non supporté: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string est vide: {}", e.getMessage());
        }
        return false;
    }

    /**
     * Extrait le token de l'header Authorization
     */
    public String getTokenFromHeader(String header) {
        if (header != null && header.startsWith(JwtConfig.TOKEN_PREFIX)) {
            return header.substring(JwtConfig.TOKEN_PREFIX.length());
        }
        return null;
    }
}