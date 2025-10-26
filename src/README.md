# CHU Management Hospital Center

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](./package.json)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)

## 📜 Licence et Copyright

**Ce projet est sous licence MIT** - Vous êtes libre de l'utiliser, le modifier et le distribuer, y compris commercialement.

- 📄 Voir [LICENSE](./LICENSE) pour les détails complets
- 📖 Voir [COPYRIGHT.md](./COPYRIGHT.md) pour les informations de propriété intellectuelle
- 🖼️ Images : Unsplash (licence gratuite)

**Propriétaire** : CHU Management Hospital Center  
**Utilisation commerciale** : ✅ Autorisée  
**Modification** : ✅ Autorisée  
**Distribution** : ✅ Autorisée

---

## Architecture Full-Stack

### 🏗️ Stack Technologique

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS v4 + ShadCN/UI
- Navigation SPA avec hooks personnalisés
- Interface responsive et moderne

**Backend (Recommandé pour production):**
- Java Spring Boot 3.x
- Spring Data JPA + Hibernate
- PostgreSQL 14+
- API REST avec CORS
- Validation des données

**Base de Données:**
- PostgreSQL (tables relationnelles)
- Supabase (développement/prototypage)

## 🚀 Architecture Spring Boot pour IntelliJ

### Structure de Projet Recommandée

```
chu-management-hospital/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/com/chu/management/
│   │   │   ├── ChuManagementApplication.java
│   │   │   ├── config/
│   │   │   │   ├── WebConfig.java (CORS)
│   │   │   │   └── DatabaseConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── AppointmentController.java
│   │   │   │   ├── DoctorController.java
│   │   │   │   ├── PatientController.java
│   │   │   │   └── ServiceController.java
│   │   │   ├── service/
│   │   │   │   ├── AppointmentService.java
│   │   │   │   ├── DoctorService.java
│   │   │   │   ├── PatientService.java
│   │   │   │   └── HospitalService.java
│   │   │   ├── repository/
│   │   │   │   ├── AppointmentRepository.java
│   │   │   │   ├── DoctorRepository.java
│   │   │   │   ├── PatientRepository.java
│   │   │   │   └── ServiceRepository.java
│   │   │   ├── model/
│   │   │   │   ├── Appointment.java
│   │   │   │   ├── Doctor.java
│   │   │   │   ├── Patient.java
│   │   │   │   ├── MedicalService.java
│   │   │   │   └── Department.java
│   │   │   └── dto/
│   │   │       ├── AppointmentDTO.java
│   │   │       ├── DoctorDTO.java
│   │   │       └── PatientDTO.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── data.sql (données initiales)
│   │       └── schema.sql (structure DB)
│   └── test/
│       └── java/com/chu/management/
└── frontend/ (React - ce projet actuel)
    ├── src/
    ├── package.json
    └── ...
```

## 📋 Configuration Spring Boot

### 1. pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.chu</groupId>
    <artifactId>chu-management</artifactId>
    <version>1.0.0</version>
    <name>CHU Management</name>
    <description>Centre Hospitalier Universitaire Management System</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- PostgreSQL Driver -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Dev Tools -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        
        <!-- Tests -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### 2. application.yml

```yaml
server:
  port: 8080

spring:
  application:
    name: chu-management
  
  datasource:
    url: jdbc:postgresql://localhost:5432/chu_management
    username: chu_user
    password: chu_password
    driver-class-name: org.postgresql.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.PostgreSQLDialect
  
  web:
    cors:
      allowed-origins: 
        - "http://localhost:3000"
        - "http://localhost:5173"
      allowed-methods: "*"
      allowed-headers: "*"
      allow-credentials: true

logging:
  level:
    org.springframework.web: DEBUG
    com.chu.management: DEBUG
```

## 🗄️ Modèles de Données (Entités JPA)

### Patient.java
```java
package com.chu.management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Le nom est obligatoire")
    @Column(nullable = false)
    private String lastName;
    
    @NotBlank(message = "Le prénom est obligatoire")
    @Column(nullable = false)
    private String firstName;
    
    @Email(message = "Format email invalide")
    @Column(unique = true)
    private String email;
    
    @Pattern(regexp = "^[0-9]{10}$", message = "Numéro de téléphone invalide")
    private String phone;
    
    private LocalDate dateOfBirth;
    
    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    private String address;
    
    @Column(name = "security_number", unique = true)
    private String securityNumber;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Appointment> appointments;
    
    // Constructeurs, getters, setters
    public Patient() {}
    
    public Patient(String lastName, String firstName, String email) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters et Setters
    // ... (générés par IntelliJ ou Lombok)
    
    public enum Gender {
        MALE, FEMALE, OTHER
    }
}
```

### Doctor.java
```java
package com.chu.management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;

@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(nullable = false)
    private String lastName;
    
    @NotBlank
    @Column(nullable = false)
    private String firstName;
    
    @Email
    @Column(unique = true)
    private String email;
    
    private String phone;
    
    @NotBlank
    private String specialty;
    
    @Column(name = "license_number", unique = true)
    private String licenseNumber;
    
    @Column(name = "years_experience")
    private Integer yearsExperience;
    
    private String qualification;
    
    @Column(name = "consultation_fee")
    private Double consultationFee;
    
    @Column(name = "is_available")
    private Boolean isAvailable = true;
    
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
    
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Appointment> appointments;
    
    // Constructeurs, getters, setters
    public Doctor() {}
    
    public Doctor(String firstName, String lastName, String specialty) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialty = specialty;
    }
    
    // Getters et Setters...
}
```

### Appointment.java
```java
package com.chu.management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;
    
    @Column(name = "appointment_date", nullable = false)
    private LocalDateTime appointmentDate;
    
    @NotBlank
    private String reason;
    
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status = AppointmentStatus.SCHEDULED;
    
    private String notes;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructeurs
    public Appointment() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters et Setters...
    
    public enum AppointmentStatus {
        SCHEDULED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW
    }
}
```

## 🎮 Contrôleurs REST

### AppointmentController.java
```java
package com.chu.management.controller;

import com.chu.management.dto.AppointmentDTO;
import com.chu.management.model.Appointment;
import com.chu.management.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AppointmentController {
    
    @Autowired
    private AppointmentService appointmentService;
    
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.findAll();
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        return appointmentService.findById(id)
                .map(appointment -> ResponseEntity.ok().body(appointment))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@Valid @RequestBody AppointmentDTO appointmentDTO) {
        try {
            Appointment appointment = appointmentService.createAppointment(appointmentDTO);
            return ResponseEntity.ok(appointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, 
                                                       @Valid @RequestBody AppointmentDTO appointmentDTO) {
        try {
            Appointment updatedAppointment = appointmentService.updateAppointment(id, appointmentDTO);
            return ResponseEntity.ok(updatedAppointment);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
        try {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatient(@PathVariable Long patientId) {
        List<Appointment> appointments = appointmentService.findByPatientId(patientId);
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        List<Appointment> appointments = appointmentService.findByDoctorId(doctorId);
        return ResponseEntity.ok(appointments);
    }
}
```

## 🔧 Configuration IntelliJ IDEA

### 1. Créer le projet dans IntelliJ

1. **File > New > Project**
2. Sélectionner **Spring Initializr**
3. Configurer :
   - Project SDK : Java 17+
   - Spring Boot : 3.2.x
   - Group : com.chu
   - Artifact : chu-management
   - Dependencies : Web, JPA, PostgreSQL Driver, Validation

### 2. Configuration de base de données

```sql
-- Créer la base de données PostgreSQL
CREATE DATABASE chu_management;
CREATE USER chu_user WITH ENCRYPTED PASSWORD 'chu_password';
GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;
```

### 3. Données initiales (data.sql)

```sql
-- Insérer des départements
INSERT INTO departments (name, description) VALUES 
('Cardiologie', 'Service de cardiologie'),
('Neurologie', 'Service de neurologie'),
('Pédiatrie', 'Service de pédiatrie'),
('Orthopédie', 'Service d''orthopédie');

-- Insérer des médecins
INSERT INTO doctors (first_name, last_name, specialty, email, phone, license_number, years_experience, consultation_fee, is_available, department_id) VALUES
('Marie', 'Dubois', 'Cardiologie', 'marie.dubois@chu-management.fr', '0123456789', 'LIC001', 15, 80.0, true, 1),
('Pierre', 'Martin', 'Neurologie', 'pierre.martin@chu-management.fr', '0123456790', 'LIC002', 12, 90.0, true, 2),
('Sophie', 'Lefebvre', 'Pédiatrie', 'sophie.lefebvre@chu-management.fr', '0123456791', 'LIC003', 10, 65.0, true, 3);
```

## 🚀 Lancer l'Application

### 1. Backend (Spring Boot)

Dans IntelliJ :
1. Ouvrir le projet Spring Boot
2. Configurer PostgreSQL (voir application.yml)
3. Clic droit sur `ChuManagementApplication.java` > Run
4. L'API sera disponible sur `http://localhost:8080`

### 2. Frontend (React)

```bash
# Dans le dossier frontend
npm install
npm run dev
# L'interface sera disponible sur http://localhost:5173
```

## 🔗 Communication Frontend/Backend

### Service React pour API calls

```typescript
// src/services/api.ts
const API_BASE_URL = 'http://localhost:8080/api';

export const hospitalApi = {
  // Rendez-vous
  async getAppointments() {
    const response = await fetch(`${API_BASE_URL}/appointments`);
    return response.json();
  },
  
  async createAppointment(appointmentData: any) {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });
    return response.json();
  },
  
  // Médecins
  async getDoctors() {
    const response = await fetch(`${API_BASE_URL}/doctors`);
    return response.json();
  },
  
  // Patients
  async getPatients() {
    const response = await fetch(`${API_BASE_URL}/patients`);
    return response.json();
  }
};
```

## 📱 État Actuel du Frontend

✅ **Fonctionnalités implémentées :**
- Navigation SPA complète entre toutes les pages
- Page d'accueil avec hero section et services
- Page services détaillée avec informations complètes
- Page contact avec formulaire fonctionnel
- Header et footer avec navigation active
- Design responsive et moderne

✅ **Pages disponibles :**
- Accueil (`/`)
- Services (`/services`)
- Médecins (`/doctors`) 
- Patients (`/patients`)
- Rendez-vous (`/appointments`)
- Contact (`/contact`)

La navigation fonctionne parfaitement - tous les liens sont connectés et les pages s'affichent correctement quand on clique dessus.

**Pour tester immédiatement :** L'application React fonctionne déjà avec le système de navigation que vous avez créé !

---

## 📜 Informations sur la Licence

Ce projet est **votre propriété** et est distribué sous **licence MIT**.

### 🎯 Ce que cela signifie pour vous :

✅ **Utilisation commerciale** - Vendez des services basés sur ce code  
✅ **Modification** - Personnalisez selon vos besoins  
✅ **Distribution** - Partagez avec qui vous voulez  
✅ **Utilisation privée** - Gardez-le pour votre entreprise  
✅ **Pas de redevances** - Aucun paiement requis  

### 📚 Documentation de licence :

- 📄 [LICENSE](./LICENSE) - Texte complet de la licence MIT
- 📖 [COPYRIGHT.md](./COPYRIGHT.md) - Détails sur la propriété intellectuelle
- 📋 [LICENCE_RESUME.md](./LICENCE_RESUME.md) - Guide simplifié de la licence
- 📝 [NOTICE](./NOTICE) - Attribution des bibliothèques tierces

### 💼 Usage commercial :

**Vous êtes 100% libre** d'utiliser ce code pour :
- Proposer des services payants à des hôpitaux
- Créer une version SaaS payante
- Intégrer dans des produits propriétaires
- Vendre des licences à des clients

**Aucune limitation commerciale** - Le code vous appartient entièrement.

---

## 🙏 Attributions

Ce projet utilise des bibliothèques open source sous licences permissives :
- React, Tailwind CSS, shadcn/ui (MIT License)
- Spring Boot, Spring Security (Apache License 2.0)
- Images professionnelles de [Unsplash](https://unsplash.com)

Voir [NOTICE](./NOTICE) pour la liste complète des attributions.