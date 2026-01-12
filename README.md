# Mechatronics Fresher Voting System (2025-2026)

> **Live Demo:** [[https://mechatronics-fresher-voting.vercel.app/](https://mechatronics-fresher-voting.vercel.app/)]

A secure, mobile-first voting application for the **Technological University Mandalay (TUM)** Fresher Welcome. Built to handle real-time voting for King, Queen, Mister, and Miss selections with strict anti-fraud protection.

![photo_1_2026-01-09_22-49-00](https://github.com/user-attachments/assets/a24aa4b8-d555-4b18-83bb-8e07f9e9c05b)
![photo_2_2026-01-09_22-49-00](https://github.com/user-attachments/assets/4fdf138f-47db-4e13-8351-488e2f02a12f)



## ✨ Key Features
* **📱 Mobile-First UI:** Vertical layout for voting on phones.
* **🔒 Fingerprint Security:** Uses device hardware analysis (VisitorAPI/FingerprintJS by React) to prevent duplicate votes, bypassing Incognito mode tricks.
* **📊 Live Stats:** Real-time bar charts 
* **🛡️ Backend:** Time-lock logic and "Proxy Admin" models for organized candidate management.

## 🛠️ Tech Stack
* **Frontend:** React (Vite), Tailwind CSS 
* **Backend:** Django REST Framework, Python 3.12
* **Database:** PostgreSQL (Neon Tech)
* **Deployment:** Vercel (Frontend) + Render (Backend)

## 🚀 Quick Start

### Backend (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
