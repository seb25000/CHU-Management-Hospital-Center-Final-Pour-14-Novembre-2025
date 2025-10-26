# 📋 Dossier Logs

Ce dossier contient les fichiers de logs pour le backend et le frontend.

## Fichiers

- **`backend.log`** - Logs du serveur Spring Boot
- **`frontend.log`** - Logs du serveur React/Vite

## Visualiser les Logs

### Temps Réel

**Mac/Linux** :
```bash
# Backend
tail -f logs/backend.log

# Frontend
tail -f logs/frontend.log
```

**Windows** :
```cmd
# Backend
type logs\backend.log

# Frontend
type logs\frontend.log
```

### Filtrer les Erreurs

```bash
# Chercher les erreurs dans le backend
grep ERROR logs/backend.log

# Chercher les warnings
grep WARN logs/backend.log
```

## Nettoyage

Pour nettoyer les logs :
```bash
# Mac/Linux
rm logs/*.log

# Windows
del logs\*.log
```

---

Les logs sont créés automatiquement quand vous utilisez les scripts `START_TOUT`.
