# 🚐 Roadsurfer Calendar Dashboard

[![CI/CD](https://github.com/manugo-dev/roadsurfer-test/actions/workflows/main.yml/badge.svg)](https://github.com/USERNAME/REPO/actions)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)](https://roadsurfer.manugo.dev)

**Roadsurfer Calendar Dashboard** is a Vue 3 + Vite web application that displays all bookings (pickups and returns) for a given station in a weekly calendar view.  
It is designed to help station staff efficiently manage van logistics and gain clear visibility over scheduled bookings.

---

## 🌍 Live Demo

Access the deployed app here:  
👉 **[https://roadsurfer.manugo.dev](https://roadsurfer.manugo.dev)**

---

## ✨ Features

- **Reusable Autocomplete**: Select a station using a smart input with remote search.
- **Responsive Calendar View**: Weekly view adapting to mobile and desktop.
- **Booking Details View**: Click a booking to view all related information.
- **State Management with Pinia**: Manage selected station and calendar pagination.
- **TanStack Query**: Data fetching, caching, and API communication.
- **Unit Testing with Vitest**: Fast and modern unit test setup.
- **CI/CD with GitHub Actions**: Automatic linting, testing, building, and deploying.
- **GitHub Pages Deployment**: Hosted at `roadsurfer.manugo.dev`.

---

## 🛠️ Tech Stack

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/vue/overview)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) + [Stylelint](https://stylelint.io/)
- [GitHub Actions](https://github.com/features/actions)
- [GitHub Pages](https://pages.github.com/)

---

## 📁 Project Structure

```
src/
├── assets/                # Static assets (images, styles)
├── modules/           # App modules folder
│   ├── core/                  # App-level config, constants, services, views
│   ├── calendar/           # Calendar module related types and logic
│   ├── dashboard/        # Dashboard module (integration of stations and calendar)
│   ├── stations/            # Stations module (services, custom input)
│   └── shared/              # Reusable components and utilities across app
├── test/                # Global test setup
└── main.ts              # App entry point
```

---

## 📦 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/manugo-dev/roadsurfer-test.git
cd roadsurfer-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development mode

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build locally

```bash
npm run preview
```

### 6. Run tests

```bash
npm run test
```

---

## ⚙️ CI/CD Workflow

- Lint, unit tests, and production build are automatically triggered on every push or pull request to `main`.
- A successful build uploads the `dist` folder as a GitHub Pages artifact.
- Then it is deployed using `actions/deploy-pages`.

---

## 👤 Author

**Manuel Gómez**  
🟢 [roadsurfer.manugo.dev](https://roadsurfer.manugo.dev)

---

## 📄 License

This project is licensed under the MIT License.
