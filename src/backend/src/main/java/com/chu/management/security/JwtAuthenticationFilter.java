package com.chu.management.security;

import com.chu.management.config.JwtConfig;
import com.chu.management.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Filtre d'authentification JWT qui intercepte chaque requête
 * pour vérifier la présence et la validité du token JWT
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        try {
            String jwt = getJwtFromRequest(request);
            
            if (jwt != null && jwtUtil.validateToken(jwt)) {
                String email = jwtUtil.getEmailFromToken(jwt);
                Long userId = jwtUtil.getUserIdFromToken(jwt);
                List<String> authorities = jwtUtil.getAuthoritiesFromToken(jwt);
                
                // Convertir les autorités en GrantedAuthority
                List<SimpleGrantedAuthority> grantedAuthorities = authorities.stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
                
                // Créer l'authentification
                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(email, null, grantedAuthorities);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Ajouter l'ID utilisateur aux détails de l'authentification
                request.setAttribute("userId", userId);
                request.setAttribute("userEmail", email);
                
                // Définir l'authentification dans le contexte de sécurité
                SecurityContextHolder.getContext().setAuthentication(authentication);
                
                logger.debug("Utilisateur authentifié: {} avec les autorités: {}", email, authorities);
            }
        } catch (Exception ex) {
            logger.error("Impossible de définir l'authentification utilisateur dans le contexte de sécurité", ex);
        }
        
        filterChain.doFilter(request, response);
    }

    /**
     * Extrait le token JWT de la requête
     */
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(JwtConfig.HEADER_STRING);
        return jwtUtil.getTokenFromHeader(bearerToken);
    }

    /**
     * Détermine si ce filtre doit être appliqué à la requête
     * Skip les endpoints publics comme /auth/login, /auth/register
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return path.startsWith("/api/auth/") || 
               path.startsWith("/api/public/") ||
               path.equals("/api/health") ||
               path.startsWith("/actuator/");
    }
}