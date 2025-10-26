-- Données de test pour CHU Management
-- Mot de passe par défaut pour tous les utilisateurs : "password123" (hashé avec BCrypt)

-- Insertion des utilisateurs (Admin, Docteurs, Patients)
INSERT INTO users (email, password, first_name, last_name, role, is_active, is_verified) VALUES
-- Admin
('admin@chu-management.fr', '$2a$10$rQ8FgzK9OIy0xGjOzOW5Y.6nYjKzQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9', 'Admin', 'System', 'ADMIN', true, true),

-- Docteurs
('marie.dubois@chu-management.fr', '$2a$10$rQ8FgzK9OIy0xGjOzOW5Y.6nYjKzQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9', 'Marie', 'Dubois', 'DOCTOR', true, true),
('pierre.martin@chu-management.fr', '$2a$10$rQ8FgzK9OIy0xGjOzOW5Y.6nYjKzQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9', 'Pierre', 'Martin', 'DOCTOR', true, true),
('sophie.lefebvre@chu-management.fr', '$2a$10$rQ8FgzK9OIy0xGjOzOW5Y.6nYjKzQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9', 'Sophie', 'Lefebvre', 'DOCTOR', true, true),
('michel.leroy@chu-management.fr', '$2a$10$rQ8FgzK9OIy0xGjOzOW5Y.6nYjKzQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9', 'Michel', 'Leroy', 'DOCTOR', true, true),

-- Patients
('jean.dupont@email.com', '$2a$10$rQ8FgzK9OIy0xGjOzOW5Y.6nYjKzQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9', 'Jean', 'Dupont', 'PATIENT', true, true),
('marie.durand@email.com', '$2a$10$rQ8FgzK9OIy0xGjOzOW5Y.6nYjKzQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9', 'Marie', 'Durand', 'PATIENT', true, true),
('paul.bernard@email.com', '$2a$10$rQ8FgzK9OIy0xGjOzOW5Y.6nYjKzQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9', 'Paul', 'Bernard', 'PATIENT', true, true),
('claire.martin@email.com', '$2a$10$rQ8FgzK9OIy0xGjOzOW5Y.6nYjKzQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9zQ9', 'Claire', 'Martin', 'PATIENT', true, true);

-- Insertion des docteurs avec leurs spécialités
INSERT INTO doctors (user_id, specialty, license_number, years_experience, phone, office_number, consultation_price, is_available) VALUES
(2, 'Cardiologie', 'DOC001', 15, '01 23 45 67 91', 'B101', 80.00, true),
(3, 'Neurologie', 'DOC002', 12, '01 23 45 67 92', 'B102', 90.00, true),
(4, 'Pédiatrie', 'DOC003', 10, '01 23 45 67 93', 'B103', 65.00, true),
(5, 'Orthopédie', 'DOC004', 18, '01 23 45 67 94', 'B104', 85.00, true);

-- Insertion des patients
INSERT INTO patients (user_id, date_of_birth, phone, address, emergency_contact_name, emergency_contact_phone, social_security_number, blood_type) VALUES
(6, '1985-06-15', '06 12 34 56 78', '123 Rue de la Paix, 75001 Paris', 'Marie Dupont', '06 87 65 43 21', '1850615123456', 'O+'),
(7, '1990-03-22', '06 23 45 67 89', '456 Avenue des Champs, 75008 Paris', 'Pierre Durand', '06 76 54 32 10', '1900322234567', 'A+'),
(8, '1978-11-08', '06 34 56 78 90', '789 Boulevard Saint-Germain, 75007 Paris', 'Sophie Bernard', '06 65 43 21 09', '1781108345678', 'B+'),
(9, '1995-09-12', '06 45 67 89 01', '321 Rue de Rivoli, 75004 Paris', 'Jean Martin', '06 54 32 10 98', '1950912456789', 'AB+');

-- Insertion des services médicaux
INSERT INTO medical_services (name, description, department, is_emergency, is_available_24_7, average_wait_time) VALUES
('Cardiologie', 'Service de cardiologie complet avec équipe spécialisée', 'Cardiologie', false, true, 15),
('Neurologie', 'Prise en charge des troubles neurologiques', 'Neurologie', false, false, 30),
('Pédiatrie', 'Soins spécialisés pour enfants de 0 à 18 ans', 'Pédiatrie', false, true, 20),
('Orthopédie', 'Chirurgie et traumatologie osseuse', 'Orthopédie', false, true, 25),
('Urgences', 'Service d''urgences médicales et chirurgicales', 'Urgences', true, true, 5),
('Pharmacie', 'Pharmacie hospitalière et conseils', 'Pharmacie', false, true, 10),
('Laboratoire', 'Analyses médicales et examens biologiques', 'Laboratoire', false, false, 15),
('Radiologie', 'Imagerie médicale et examens radiologiques', 'Radiologie', false, false, 20);

-- Insertion des horaires des médecins (Lundi = 1, Dimanche = 7)
INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, is_available) VALUES
-- Dr. Marie Dubois (Cardiologue) - du lundi au vendredi
(1, 1, '08:00', '17:00', true),
(1, 2, '08:00', '17:00', true),
(1, 3, '08:00', '17:00', true),
(1, 4, '08:00', '17:00', true),
(1, 5, '08:00', '17:00', true),

-- Dr. Pierre Martin (Neurologue) - du lundi au vendredi
(2, 1, '09:00', '18:00', true),
(2, 2, '09:00', '18:00', true),
(2, 3, '09:00', '18:00', true),
(2, 4, '09:00', '18:00', true),
(2, 5, '09:00', '18:00', true),

-- Dr. Sophie Lefebvre (Pédiatre) - tous les jours
(3, 1, '08:00', '16:00', true),
(3, 2, '08:00', '16:00', true),
(3, 3, '08:00', '16:00', true),
(3, 4, '08:00', '16:00', true),
(3, 5, '08:00', '16:00', true),
(3, 6, '09:00', '13:00', true),
(3, 7, '09:00', '13:00', true),

-- Dr. Michel Leroy (Orthopédiste) - du lundi au samedi
(4, 1, '08:00', '18:00', true),
(4, 2, '08:00', '18:00', true),
(4, 3, '08:00', '18:00', true),
(4, 4, '08:00', '18:00', true),
(4, 5, '08:00', '18:00', true),
(4, 6, '08:00', '12:00', true);

-- Insertion de quelques rendez-vous d'exemple
INSERT INTO appointments (patient_id, doctor_id, service_id, appointment_date, appointment_time, duration, status, reason) VALUES
(1, 1, 1, CURRENT_DATE + INTERVAL '1 day', '09:00', 30, 'SCHEDULED', 'Consultation cardiologique de routine'),
(2, 2, 2, CURRENT_DATE + INTERVAL '2 days', '14:30', 45, 'SCHEDULED', 'Suivi neurologique'),
(3, 3, 3, CURRENT_DATE + INTERVAL '3 days', '10:15', 30, 'SCHEDULED', 'Consultation pédiatrique'),
(4, 4, 4, CURRENT_DATE + INTERVAL '4 days', '15:00', 60, 'SCHEDULED', 'Consultation orthopédique'),
(1, 1, 1, CURRENT_DATE - INTERVAL '1 week', '11:00', 30, 'COMPLETED', 'Contrôle post-opératoire');

-- Insertion de notifications d'exemple
INSERT INTO notifications (user_id, title, message, type, is_read, priority) VALUES
(6, 'Rendez-vous confirmé', 'Votre rendez-vous avec Dr. Dubois le ' || TO_CHAR(CURRENT_DATE + INTERVAL '1 day', 'DD/MM/YYYY') || ' à 09h00 est confirmé', 'APPOINTMENT', false, 'MEDIUM'),
(7, 'Résultats d''analyse disponibles', 'Vos résultats de prise de sang sont maintenant disponibles dans votre espace patient', 'RESULT', false, 'HIGH'),
(8, 'Rappel de vaccination', 'N''oubliez pas votre rappel de vaccination prévu ce mois-ci', 'INFO', true, 'LOW'),
(9, 'Modification d''horaire', 'Votre rendez-vous du ' || TO_CHAR(CURRENT_DATE + INTERVAL '4 days', 'DD/MM/YYYY') || ' a été reporté à 16h00', 'WARNING', false, 'HIGH');

-- Insertion de dossiers médicaux d'exemple
INSERT INTO medical_records (patient_id, doctor_id, appointment_id, diagnosis, treatment, prescription, examination_results, record_date) VALUES
(1, 1, 5, 'Hypertension artérielle légère', 'Modification du régime alimentaire, exercice physique régulier', 'Amlodipine 5mg, 1 comprimé par jour', 'Tension artérielle: 145/95 mmHg, ECG normal', CURRENT_DATE - INTERVAL '1 week');

-- Insertion de factures d'exemple
INSERT INTO invoices (patient_id, appointment_id, invoice_number, amount, status, due_date) VALUES
(1, 5, 'INV-2024-001', 80.00, 'PAID', CURRENT_DATE - INTERVAL '3 days'),
(2, 2, 'INV-2024-002', 90.00, 'PENDING', CURRENT_DATE + INTERVAL '30 days'),
(3, 3, 'INV-2024-003', 65.00, 'PENDING', CURRENT_DATE + INTERVAL '30 days');

-- Mise à jour des séquences pour éviter les conflits
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('doctors_id_seq', (SELECT MAX(id) FROM doctors));
SELECT setval('patients_id_seq', (SELECT MAX(id) FROM patients));
SELECT setval('medical_services_id_seq', (SELECT MAX(id) FROM medical_services));
SELECT setval('appointments_id_seq', (SELECT MAX(id) FROM appointments));
SELECT setval('notifications_id_seq', (SELECT MAX(id) FROM notifications));
SELECT setval('medical_records_id_seq', (SELECT MAX(id) FROM medical_records));
SELECT setval('invoices_id_seq', (SELECT MAX(id) FROM invoices));
SELECT setval('doctor_schedules_id_seq', (SELECT MAX(id) FROM doctor_schedules));