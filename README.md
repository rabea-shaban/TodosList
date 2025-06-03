# ✅ Todos List App (Frontend)

A secure and simple Todo management app built with **React.js**, **React Query**, and **JWT Authentication**.  
Each user can log in, view their own tasks, and perform full CRUD operations. All pages are protected — no access without a valid JWT.

---

## 🚀 Live Demo

🔗 [https://todos-list-zeta.vercel.app/](https://todos-list-zeta.vercel.app/)

---

## 🛠 Tech Stack

- React.js + Vite
- React Query
- Axios
- Tailwind CSS (or plain CSS)
- react-hot-toast
- JWT Authentication (from Strapi backend)

---

## 🔐 Authentication

- JWT token is returned from **Strapi** after login.
- Token is stored in **localStorage**.
- All protected routes check for token and redirect if not found.
- Axios sends `Authorization: Bearer <token>` in headers.

---

## 🔧 Features

- 🔒 Secure Login
- 🧾 Display todos only after login
- ➕ Add new todo
- 📝 Edit todo
- ❌ Delete todo
- ⚡ React Query for fast data fetching
- 🔔 Toast notifications with `react-hot-toast`
- ⛔ 404 / Unauthorized route protection

---
**👨‍💻 Developed by
Rabea Shaban Elzayat

🌐 Website: rabeashaban.site

📧 Email: engrabeashaban@gmail.com

📱 WhatsApp: wa.me/201156807072

🔗 LinkedIn: linkedin.com/in/rabea-sh-elzayat

💼 Upwork: upwork.com/freelancers/~01d2bd68b7d6e8fbce

💻 Mostaql: mostaql.com/u/rabea_elzayat

📸 Instagram: instagram.com/rabea_sh_elzayat

📘 Facebook: facebook.com/Rabea.Sh.ELZayat

🧑‍💻 Nafezly: nafezly.com/u/Rabea_sh_elzayat

**
---

## ▶️ Getting Started

### 1. Clone the frontend

```bash
git clone https://github.com/rabea-shaban/TodosList
cd TodosList
npm install
npm run dev



