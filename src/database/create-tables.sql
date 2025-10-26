-- Script de création des tables pour CHU Management
-- Exécutez ce script après avoir créé la base de données

-- Table des utilisateurs (pour l'authentification)
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'PATIENT' CHECK (role IN ('ADMIN', 'DOCTOR', 'NURSE', 'PATIENT', 'STAFF')),
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des médecins
CREATE TABLE IF NOT EXISTS doctors (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    specialty VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    years_experience INTEGER DEFAULT 0,
    phone VARCHAR(20),
    office_number VARCHAR(20),
    consultation_price DECIMAL(10,2) DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des patients
CREATE TABLE IF NOT EXISTS patients (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE,
    phone VARCHAR(20),
    address TEXT,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    social_security_number VARCHAR(15) UNIQUE,
    blood_type VARCHAR(5),
    allergies TEXT,
    medical_history TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des services médicaux
CREATE TABLE IF NOT EXISTS medical_services (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    department VARCHAR(100),
    is_emergency BOOLEAN DEFAULT false,
    is_available_24_7 BOOLEAN DEFAULT false,
    average_wait_time INTEGER DEFAULT 30, -- en minutes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des rendez-vous
CREATE TABLE IF NOT EXISTS appointments (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id BIGINT REFERENCES doctors(id) ON DELETE CASCADE,
    service_id BIGINT REFERENCES medical_services(id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration INTEGER DEFAULT 30, -- en minutes
    status VARCHAR(20) DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW')),
    reason TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des dossiers médicaux
CREATE TABLE IF NOT EXISTS medical_records (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id BIGINT REFERENCES doctors(id),
    appointment_id BIGINT REFERENCES appointments(id),
    diagnosis TEXT,
    treatment TEXT,
    prescription TEXT,
    examination_results TEXT,
    record_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des prescriptions
CREATE TABLE IF NOT EXISTS prescriptions (
    id BIGSERIAL PRIMARY KEY,
    medical_record_id BIGINT REFERENCES medical_records(id) ON DELETE CASCADE,
    medication_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    duration VARCHAR(100),
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des factures
CREATE TABLE IF NOT EXISTS invoices (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id BIGINT REFERENCES appointments(id),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'CANCELLED', 'OVERDUE')),
    payment_method VARCHAR(50),
    payment_date TIMESTAMP,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des horaires des médecins
CREATE TABLE IF NOT EXISTS doctor_schedules (
    id BIGSERIAL PRIMARY KEY,
    doctor_id BIGINT REFERENCES doctors(id) ON DELETE CASCADE,
    day_of_week INTEGER CHECK (day_of_week BETWEEN 1 AND 7), -- 1=Lundi, 7=Dimanche
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des notifications
CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'INFO' CHECK (type IN ('INFO', 'WARNING', 'ERROR', 'SUCCESS', 'APPOINTMENT', 'RESULT')),
    is_read BOOLEAN DEFAULT false,
    priority VARCHAR(20) DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer les index pour améliorer les performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_medical_records_patient ON medical_records(patient_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- Créer des triggers pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();