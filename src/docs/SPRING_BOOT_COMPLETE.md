# Guide Complet Spring Boot + PostgreSQL + IntelliJ

## 🎯 Objectif
Créer l'architecture backend complète pour CHU Management avec Spring Boot, PostgreSQL et IntelliJ IDEA.

## 📁 Structure Complète des Fichiers

### ChuManagementApplication.java
```java
package com.chu.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChuManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(ChuManagementApplication.class, args);
    }
}
```

### WebConfig.java (Configuration CORS)
```java
package com.chu.management.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### Department.java (Entité pour les services)
```java
package com.chu.management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Le nom du département est obligatoire")
    @Column(nullable = false, unique = true)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String location;
    
    @Column(name = "phone_number")
    private String phoneNumber;
    
    @Column(name = "emergency_available")
    private Boolean emergencyAvailable = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Doctor> doctors;
    
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MedicalService> services;
    
    // Constructeurs
    public Department() {
        this.createdAt = LocalDateTime.now();
    }
    
    public Department(String name, String description) {
        this();
        this.name = name;
        this.description = description;
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public Boolean getEmergencyAvailable() { return emergencyAvailable; }
    public void setEmergencyAvailable(Boolean emergencyAvailable) { this.emergencyAvailable = emergencyAvailable; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public List<Doctor> getDoctors() { return doctors; }
    public void setDoctors(List<Doctor> doctors) { this.doctors = doctors; }
    
    public List<MedicalService> getServices() { return services; }
    public void setServices(List<MedicalService> services) { this.services = services; }
}
```

### MedicalService.java
```java
package com.chu.management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_services")
public class MedicalService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @PositiveOrZero
    private Double price;
    
    @Column(name = "duration_minutes")
    private Integer durationMinutes;
    
    @Column(name = "is_emergency")
    private Boolean isEmergency = false;
    
    @Column(name = "availability_hours")
    private String availabilityHours;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Constructeurs
    public MedicalService() {
        this.createdAt = LocalDateTime.now();
    }
    
    public MedicalService(String name, String description, Double price) {
        this();
        this.name = name;
        this.description = description;
        this.price = price;
    }
    
    // Getters et Setters complets
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    
    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
    
    public Boolean getIsEmergency() { return isEmergency; }
    public void setIsEmergency(Boolean isEmergency) { this.isEmergency = isEmergency; }
    
    public String getAvailabilityHours() { return availabilityHours; }
    public void setAvailabilityHours(String availabilityHours) { this.availabilityHours = availabilityHours; }
    
    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
```

### AppointmentDTO.java
```java
package com.chu.management.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public class AppointmentDTO {
    
    @NotNull(message = "L'ID du patient est obligatoire")
    private Long patientId;
    
    @NotNull(message = "L'ID du médecin est obligatoire")
    private Long doctorId;
    
    @NotNull(message = "La date du rendez-vous est obligatoire")
    @Future(message = "La date doit être dans le futur")
    private LocalDateTime appointmentDate;
    
    @NotBlank(message = "La raison de la consultation est obligatoire")
    @Size(min = 5, max = 500, message = "La raison doit contenir entre 5 et 500 caractères")
    private String reason;
    
    @Size(max = 1000, message = "Les notes ne peuvent pas dépasser 1000 caractères")
    private String notes;
    
    // Constructeurs
    public AppointmentDTO() {}
    
    public AppointmentDTO(Long patientId, Long doctorId, LocalDateTime appointmentDate, String reason) {
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.appointmentDate = appointmentDate;
        this.reason = reason;
    }
    
    // Getters et Setters
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    
    public LocalDateTime getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDateTime appointmentDate) { this.appointmentDate = appointmentDate; }
    
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
```

### AppointmentService.java
```java
package com.chu.management.service;

import com.chu.management.dto.AppointmentDTO;
import com.chu.management.model.Appointment;
import com.chu.management.model.Doctor;
import com.chu.management.model.Patient;
import com.chu.management.repository.AppointmentRepository;
import com.chu.management.repository.DoctorRepository;
import com.chu.management.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AppointmentService {
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }
    
    public Optional<Appointment> findById(Long id) {
        return appointmentRepository.findById(id);
    }
    
    public List<Appointment> findByPatientId(Long patientId) {
        return appointmentRepository.findByPatientIdOrderByAppointmentDateDesc(patientId);
    }
    
    public List<Appointment> findByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorIdOrderByAppointmentDateAsc(doctorId);
    }
    
    public List<Appointment> findUpcomingAppointments() {
        return appointmentRepository.findByAppointmentDateAfterOrderByAppointmentDateAsc(LocalDateTime.now());
    }
    
    public Appointment createAppointment(AppointmentDTO appointmentDTO) {
        // Vérifier que le patient existe
        Patient patient = patientRepository.findById(appointmentDTO.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient non trouvé avec l'ID: " + appointmentDTO.getPatientId()));
        
        // Vérifier que le médecin existe et est disponible
        Doctor doctor = doctorRepository.findById(appointmentDTO.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Médecin non trouvé avec l'ID: " + appointmentDTO.getDoctorId()));
        
        if (!doctor.getIsAvailable()) {
            throw new RuntimeException("Le médecin n'est pas disponible actuellement");
        }
        
        // Vérifier qu'il n'y a pas de conflit d'horaire
        if (hasTimeConflict(appointmentDTO.getDoctorId(), appointmentDTO.getAppointmentDate())) {
            throw new RuntimeException("Le médecin a déjà un rendez-vous à cette heure");
        }
        
        // Créer le rendez-vous
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(appointmentDTO.getAppointmentDate());
        appointment.setReason(appointmentDTO.getReason());
        appointment.setNotes(appointmentDTO.getNotes());
        appointment.setStatus(Appointment.AppointmentStatus.SCHEDULED);
        
        return appointmentRepository.save(appointment);
    }
    
    public Appointment updateAppointment(Long id, AppointmentDTO appointmentDTO) {
        Appointment existingAppointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rendez-vous non trouvé avec l'ID: " + id));
        
        // Mettre à jour les champs modifiables
        if (appointmentDTO.getAppointmentDate() != null) {
            // Vérifier les conflits uniquement si la date change
            if (!existingAppointment.getAppointmentDate().equals(appointmentDTO.getAppointmentDate())) {
                if (hasTimeConflict(existingAppointment.getDoctor().getId(), appointmentDTO.getAppointmentDate())) {
                    throw new RuntimeException("Le médecin a déjà un rendez-vous à cette nouvelle heure");
                }
            }
            existingAppointment.setAppointmentDate(appointmentDTO.getAppointmentDate());
        }
        
        if (appointmentDTO.getReason() != null) {
            existingAppointment.setReason(appointmentDTO.getReason());
        }
        
        if (appointmentDTO.getNotes() != null) {
            existingAppointment.setNotes(appointmentDTO.getNotes());
        }
        
        existingAppointment.setUpdatedAt(LocalDateTime.now());
        
        return appointmentRepository.save(existingAppointment);
    }
    
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new RuntimeException("Rendez-vous non trouvé avec l'ID: " + id);
        }
        appointmentRepository.deleteById(id);
    }
    
    public Appointment confirmAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rendez-vous non trouvé avec l'ID: " + id));
        
        appointment.setStatus(Appointment.AppointmentStatus.CONFIRMED);
        appointment.setUpdatedAt(LocalDateTime.now());
        
        return appointmentRepository.save(appointment);
    }
    
    public Appointment cancelAppointment(Long id, String reason) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rendez-vous non trouvé avec l'ID: " + id));
        
        appointment.setStatus(Appointment.AppointmentStatus.CANCELLED);
        appointment.setNotes(appointment.getNotes() + " | Annulation: " + reason);
        appointment.setUpdatedAt(LocalDateTime.now());
        
        return appointmentRepository.save(appointment);
    }
    
    private boolean hasTimeConflict(Long doctorId, LocalDateTime appointmentDate) {
        // Chercher des rendez-vous dans une fenêtre de 30 minutes avant et après
        LocalDateTime startWindow = appointmentDate.minusMinutes(30);
        LocalDateTime endWindow = appointmentDate.plusMinutes(30);
        
        List<Appointment> conflictingAppointments = appointmentRepository
                .findByDoctorIdAndAppointmentDateBetweenAndStatusNot(
                        doctorId, 
                        startWindow, 
                        endWindow, 
                        Appointment.AppointmentStatus.CANCELLED
                );
        
        return !conflictingAppointments.isEmpty();
    }
    
    public List<Appointment> findTodayAppointments() {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        
        return appointmentRepository.findByAppointmentDateBetweenOrderByAppointmentDateAsc(startOfDay, endOfDay);
    }
}
```

### AppointmentRepository.java
```java
package com.chu.management.repository;

import com.chu.management.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    // Rechercher par patient
    List<Appointment> findByPatientIdOrderByAppointmentDateDesc(Long patientId);
    
    // Rechercher par médecin
    List<Appointment> findByDoctorIdOrderByAppointmentDateAsc(Long doctorId);
    
    // Rechercher par statut
    List<Appointment> findByStatusOrderByAppointmentDateAsc(Appointment.AppointmentStatus status);
    
    // Rechercher les rendez-vous futurs
    List<Appointment> findByAppointmentDateAfterOrderByAppointmentDateAsc(LocalDateTime date);
    
    // Rechercher les rendez-vous dans une période
    List<Appointment> findByAppointmentDateBetweenOrderByAppointmentDateAsc(LocalDateTime start, LocalDateTime end);
    
    // Rechercher les conflits d'horaire pour un médecin
    List<Appointment> findByDoctorIdAndAppointmentDateBetweenAndStatusNot(
            Long doctorId, 
            LocalDateTime start, 
            LocalDateTime end, 
            Appointment.AppointmentStatus status
    );
    
    // Rechercher par patient et statut
    List<Appointment> findByPatientIdAndStatusOrderByAppointmentDateDesc(Long patientId, Appointment.AppointmentStatus status);
    
    // Compter les rendez-vous du jour pour un médecin
    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.doctor.id = :doctorId " +
           "AND DATE(a.appointmentDate) = CURRENT_DATE AND a.status != 'CANCELLED'")
    long countTodayAppointmentsByDoctor(@Param("doctorId") Long doctorId);
    
    // Rechercher les prochains rendez-vous d'un patient
    @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId " +
           "AND a.appointmentDate > CURRENT_TIMESTAMP AND a.status = 'SCHEDULED' " +
           "ORDER BY a.appointmentDate ASC")
    List<Appointment> findUpcomingAppointmentsByPatient(@Param("patientId") Long patientId);
}
```

### DoctorController.java
```java
package com.chu.management.controller;

import com.chu.management.model.Doctor;
import com.chu.management.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class DoctorController {
    
    @Autowired
    private DoctorService doctorService;
    
    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.findAll();
        return ResponseEntity.ok(doctors);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return doctorService.findById(id)
                .map(doctor -> ResponseEntity.ok().body(doctor))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/specialty/{specialty}")
    public ResponseEntity<List<Doctor>> getDoctorsBySpecialty(@PathVariable String specialty) {
        List<Doctor> doctors = doctorService.findBySpecialty(specialty);
        return ResponseEntity.ok(doctors);
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<Doctor>> getAvailableDoctors() {
        List<Doctor> doctors = doctorService.findAvailableDoctors();
        return ResponseEntity.ok(doctors);
    }
    
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<Doctor>> getDoctorsByDepartment(@PathVariable Long departmentId) {
        List<Doctor> doctors = doctorService.findByDepartmentId(departmentId);
        return ResponseEntity.ok(doctors);
    }
    
    @PostMapping
    public ResponseEntity<Doctor> createDoctor(@Valid @RequestBody Doctor doctor) {
        try {
            Doctor savedDoctor = doctorService.save(doctor);
            return ResponseEntity.ok(savedDoctor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @Valid @RequestBody Doctor doctorDetails) {
        try {
            Doctor updatedDoctor = doctorService.update(id, doctorDetails);
            return ResponseEntity.ok(updatedDoctor);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/availability")
    public ResponseEntity<Doctor> updateDoctorAvailability(@PathVariable Long id, @RequestParam boolean available) {
        try {
            Doctor updatedDoctor = doctorService.updateAvailability(id, available);
            return ResponseEntity.ok(updatedDoctor);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
        try {
            doctorService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
```

## 🚀 Instructions de Déploiement IntelliJ

### 1. Créer le Projet
1. **File > New > Project**
2. **Spring Initializr**
3. **Project Metadata:**
   - Group: `com.chu`
   - Artifact: `chu-management`
   - Name: `CHU Management`
   - Package name: `com.chu.management`
   - Java: `17`
   - Spring Boot: `3.2.x`

### 2. Dependencies à sélectionner
- **Spring Web**
- **Spring Data JPA**
- **PostgreSQL Driver**
- **Validation**
- **Spring Boot DevTools**

### 3. Configuration PostgreSQL
```bash
# Installer PostgreSQL
sudo apt install postgresql postgresql-contrib

# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base et l'utilisateur
CREATE DATABASE chu_management;
CREATE USER chu_user WITH ENCRYPTED PASSWORD 'chu_password';
GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;
\q
```

### 4. Structure des Dossiers dans IntelliJ
```
src/main/java/com/chu/management/
├── ChuManagementApplication.java
├── config/
│   └── WebConfig.java
├── controller/
│   ├── AppointmentController.java
│   ├── DoctorController.java
│   ├── PatientController.java
│   └── ServiceController.java
├── service/
│   ├── AppointmentService.java
│   ├── DoctorService.java
│   ├── PatientService.java
│   └── HospitalService.java
├── repository/
│   ├── AppointmentRepository.java
│   ├── DoctorRepository.java
│   ├── PatientRepository.java
│   └── ServiceRepository.java
├── model/
│   ├── Appointment.java
│   ├── Doctor.java
│   ├── Patient.java
│   ├── MedicalService.java
│   └── Department.java
└── dto/
    ├── AppointmentDTO.java
    ├── DoctorDTO.java
    └── PatientDTO.java
```

### 5. Lancer l'Application
1. Clic droit sur `ChuManagementApplication.java`
2. **Run 'ChuManagementApplication'**
3. L'API sera disponible sur `http://localhost:8080`

### 6. Tester les APIs
```bash
# Récupérer tous les médecins
curl -X GET http://localhost:8080/api/doctors

# Créer un nouveau patient
curl -X POST http://localhost:8080/api/patients \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jean","lastName":"Dupont","email":"jean.dupont@email.com"}'

# Créer un rendez-vous
curl -X POST http://localhost:8080/api/appointments \
  -H "Content-Type: application/json" \
  -d '{"patientId":1,"doctorId":1,"appointmentDate":"2024-01-15T10:00:00","reason":"Consultation de routine"}'
```

## 🔗 Connexion avec le Frontend React

L'application React est déjà configurée pour fonctionner avec cette API backend. Une fois les deux applications lancées :

- **Frontend React:** `http://localhost:3000` ou `http://localhost:5173`
- **Backend Spring Boot:** `http://localhost:8080`

La communication se fait automatiquement grâce à la configuration CORS dans `WebConfig.java`.

**✅ L'architecture complète est maintenant prête pour la production !**