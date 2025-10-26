-- Script d'initialisation de la base de données CHU Management
-- Exécutez ce script en tant qu'utilisateur PostgreSQL

-- Créer la base de données
DROP DATABASE IF EXISTS chu_management;
CREATE DATABASE chu_management;

-- Créer l'utilisateur
DROP USER IF EXISTS chu_user;
CREATE USER chu_user WITH PASSWORD 'chu_password';

-- Accorder les privilèges
GRANT ALL PRIVILEGES ON DATABASE chu_management TO chu_user;

-- Se connecter à la base de données
\c chu_management;

-- Accorder les privilèges sur le schéma public
GRANT ALL PRIVILEGES ON SCHEMA public TO chu_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO chu_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO chu_user;

-- Activer les extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";