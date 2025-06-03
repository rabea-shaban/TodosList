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

---

## ▶️ Getting Started

### 1. Clone the frontend

```bash
git clone https://github.com/rabea-shaban/TodosList
cd TodosList
npm install
npm run dev
📎 Useful Links
Frontend Repo: github.com/rabea-shaban/TodosList

Live App: todos-list-zeta.vercel.app

👨‍💻 Developed by
Rabea Shaban Elzayat
🌐 rabeashaban.site
📧 engrabeashaban@gmail.com
📱 WhatsApp
🔗 LinkedIn


