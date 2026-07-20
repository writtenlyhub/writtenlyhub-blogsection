# WrittenlyHub Blog Platform

A modern, SEO-first blog platform built with **Next.js** and **Payload CMS**, designed to replace the existing WordPress-based blog while providing a scalable content management experience for editors and writers.

---

## ✨ Features

- Next.js App Router
- Payload CMS v3
- PostgreSQL Database
- Lexical Rich Text Editor
- Draft & Publish Workflow
- Automatic Slug Generation
- Read Time Calculation
- Featured Article Support
- Category Management
- Media Library
- Responsive Blog UI
- SEO-Friendly Architecture
- TypeScript
- Tailwind CSS

---

## 🛠 Tech Stack

- Next.js 16
- Payload CMS 3
- PostgreSQL
- Tailwind CSS
- TypeScript
- Docker

---

## 📂 Project Structure

```
src/
├── app/
│   ├── (frontend)/
│   └── (payload)/
├── collections/
│   ├── Blogs/
│   ├── Categories/
│   ├── Media/
│   └── Users/
├── components/
├── lib/
└── payload.config.ts
```

---

## 🚀 Getting Started

### Install dependencies

```bash
pnpm install
```

### Start PostgreSQL

```bash
docker compose up -d
```

### Run the development server

```bash
pnpm dev
```

Payload Admin:

```
http://localhost:3000/admin
```

---

## 📌 Current Status

### ✅ Completed

- Project setup
- Payload CMS integration
- Authentication
- Users collection
- Blogs collection
- Categories collection
- Media library
- Draft & Publish workflow
- Frontend design system
- Static blog listing page
- Responsive layout foundation

### 🚧 In Progress

- Editorial UI refinement
- Payload data integration
- Dynamic blog pages
- Search functionality
- SEO enhancements

---

## 🎯 Project Goal

Build a fast, scalable, SEO-friendly publishing platform with a premium editorial experience while providing a modern content management workflow for writers and editors.

---

## 📄 License

Private project.