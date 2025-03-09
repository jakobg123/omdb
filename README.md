# Project Setup Guide

## 1. Setup Environment

Copy the environment configuration files:

```bash
cp .env.example .env
cp frontend/.env.example .env
```


## 2. Start Backend

```
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
The backend is now running on http://localhost:8000.

## 3. Start Frontend
Ensure you're using Node.js version 20:

```
nvm use 20
npm install
npm run dev
```
You can now visit the application in your browser at http://localhost:5173.
