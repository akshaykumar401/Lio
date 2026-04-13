<div align="center">
  
  <h1 align="center">Lio - Advanced Link Management</h1>
  
  <p align="center">
    <strong>A powerful, secure, and lightning-fast link management platform designed for creators, businesses, and teams.</strong>
  </p>

  <p align="center">
    <a href="https://github.com/akshaykumar401/Lio/stargazers"><img src="https://img.shields.io/github/stars/akshaykumar401/Lio?style=for-the-badge&color=yellow" alt="Stars" /></a>
    <a href="https://github.com/akshaykumar401/Lio/issues"><img src="https://img.shields.io/github/issues/akshaykumar401/Lio?style=for-the-badge&color=red" alt="Issues" /></a>
    <a href="https://github.com/akshaykumar401/Lio/blob/main/package.json"><img src="https://img.shields.io/badge/License-ISC-blue?style=for-the-badge" alt="License" /></a>
  </p>
</div>

<br />

> **Lio** lets you shorten URLs, track performance, and grow your audience with an intuitive dashboard and enterprise-grade security.

## 🌟 Key Features

| Feature | Description |
| ------- | ----------- |
| ⚡ **Lightning Fast** | Generate short links in milliseconds with our highly optimized routing infrastructure. |
| 📊 **Deep Analytics** | Track every click, geographic location, referrers, and device info in real time using rich charts. |
| 🛡️ **Secure & Private** | Secured by JWT authentication, bcrypt hashing, and robust data isolation for all your links. |
| 👥 **Team Ready** | Share branded short links effortlessly and keep track of your team's analytics in one place. |
| 🎨 **Stunning UI** | A responsive, glassmorphism-inspired interface designed to be as visually stunning as it is functional. |

## 💻 Tech Stack

We use modern, industry-standard tools to ensure high performance and zero-downtime reliability:

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

---

## 🚀 Getting Started

Want to test it out? Here is how to get the project running locally.

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (v18.0.0 or higher)
- **MongoDB** (Running an Atlas connection URI)

### Quick Setup

**1. Clone the repository**
```bash
git clone https://github.com/akshaykumar401/Lio.git
cd Lio
```

**2. Backend Setup**
```bash
cd Backend
npm install
cp .env.sample .env
```
_Edit the `.env` file with your database URI and secrets._
```bash
npm run dev
```

**3. Frontend Setup**
Open a new terminal window:
```bash
cd Lio/Frontend
npm install
npm run dev
```
_Your app will now be running on [http://localhost:5173](http://localhost:5173)._

---

## 📂 Project Structure

``` arduino
Lio/
├── Backend/
│   ├── public/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.ts
│   │   ├── constants.ts
│   │   └── index.ts
│   ├── .env.sample
│   ├── .gitignore
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── package.json
└── Frontend/ 
    ├── public/
    ├── src/
    │   ├── app/
    │   ├── assets/
    │   ├── components/  
    │   ├── features/  
    │   ├── pages/
    │   ├── styles/ 
    │   ├── App.tsx
    │   └── main.tsx
    ├── .env.sample
    ├── .gitignore
    ├── package-lock.json
    ├── tsconfig.json
    └── package.json
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/akshaykumar401/Lio/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the ISC License.

---
<p align="center">
  Made with ❤️ by <a href="https://github.com/akshaykumar401">Akshay Kumar</a>
</p>
