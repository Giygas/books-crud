# 📚 Books CRUD Application

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.0-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3.0-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Passing-20E3B2?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

A modern, full-stack web application built with Nuxt 3 that demonstrates comprehensive CRUD operations for managing a book library. This project showcases proficiency with contemporary web technologies and best practices.

## 🚀 Tech Stack & Architecture

### Frontend

- **Nuxt 3** - Vue.js meta-framework for SSR/SSG
- **Vue 3** with Composition API and TypeScript
- **Tailwind CSS** for utility-first styling
- **Radix Vue** - Unstyled, accessible UI components
- **Shadcn/Nuxt** - Beautiful component library
- **Vue Sonner** - Elegant toast notifications
- **VeeValidate + Zod** - Form validation and schema validation

### Backend

- **Nuxt Server API** - Full-stack API routes
- **Drizzle ORM** - Type-safe SQL toolkit
- **Turso (LibSQL)** - Edge-native SQLite database
- **Zod** - Runtime type validation

### Development Tools

- **TypeScript** for type safety
- **ESLint + Prettier** for code quality
- **Drizzle Kit** for database migrations
- **Vitest** for unit testing

## ✨ Features

- **Full CRUD Operations**: Create, read, update, and delete books
- **Type-Safe Database**: End-to-end TypeScript safety from database to UI
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Form Validation**: Client and server-side validation with Zod schemas
- **Dark Mode**: Built-in theme switching
- **Modern UI**: Accessible components with Radix Vue
- **Database Migrations**: Version-controlled database schema
- **API Documentation**: RESTful API design
- **Unit Testing**: Comprehensive test coverage for API endpoints and schemas
- **Loading States**: Loading indicators and skeleton screens for better UX
- **Empty States**: Consistent empty state UI with helpful actions
- **Smooth Transitions**: Hover effects and animations for better interactivity

## 🏗️ Architecture Highlights

### Database Schema

```sql
books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  publication_year INTEGER NOT NULL,
  isbn INTEGER UNIQUE,
  cover_URL TEXT NOT NULL,
  open_library_key TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### API Endpoints

- `GET /api/books` - Fetch all books
- `POST /api/books` - Create new book
- `GET /api/books/[id]` - Fetch specific book
- `PUT /api/books/[id]` - Update book
- `DELETE /api/books/[id]` - Delete book

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- Turso account for database

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd books-crud
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Add your Turso database credentials
   ```

4. **Set up database**

   ```bash
   pnpm db:generate  # Generate migrations
   pnpm db:migrate   # Run migrations
   pnpm db:seed      # Seed with sample data
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

Visit `http://localhost:3000` to see the application.

## 📦 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:prettier` - Check Prettier formatting
- `pnpm lintfix` - Fix linting issues
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with sample data
- `pnpm test` - Run tests in watch mode
- `pnpm test:run` - Run all tests once
- `pnpm test:ui` - Run tests with UI interface

## 📊 Project Metrics

- **📁 25+ Components** - Reusable UI components with consistent design system
- **🧪 12 Tests** - Comprehensive unit test coverage for API and schemas
- **🔗 5 API Endpoints** - Full CRUD operations with proper validation
- **📱 100% Responsive** - Mobile-first design approach
- **🎨 2 UI Themes** - Light and dark mode support
- **⚡ SSR Ready** - Server-side rendering for optimal performance

## 🎯 What This Project Demonstrates

### Technical Skills

- **Full-Stack Development**: End-to-end application development with Nuxt 3
- **Type Safety**: TypeScript throughout the stack with Zod validation
- **Modern Frameworks**: Nuxt 3, Vue 3 Composition API, and contemporary tooling
- **Database Design**: SQL schema design with Drizzle ORM and Turso
- **API Development**: RESTful API design with proper error handling
- **Form Handling**: Complex form validation with VeeValidate + Zod
- **Component Architecture**: Reusable, composable UI components with Radix Vue
- **UX/UI Implementation**: Loading states, empty states, and smooth transitions
- **Testing Strategy**: Unit testing with Vitest and comprehensive mocking

### Best Practices Implemented

- **Code Quality**: ESLint, Prettier, and TypeScript strict mode
- **Security**: Input validation and SQL injection prevention
- **Performance**: SSR optimization and efficient data fetching
- **Accessibility**: ARIA-compliant UI components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **User Experience**: Loading feedback, empty states, and smooth transitions
- **Component Reusability**: Consistent design system with reusable components

## 🚀 Deployment Ready

This application is production-ready and can be deployed to various platforms:

### Recommended Platforms

- **[Vercel](https://vercel.com)** - ⭐ Recommended for Nuxt applications
- **[Netlify](https://netlify.com)** - Static site generation with CI/CD
- **[Railway](https://railway.app)** - Full-stack deployment with database
- **[DigitalOcean](https://digitalocean.com)** - Custom deployment options

### Deployment Features

- ✅ Environment variable configuration
- ✅ Database migration scripts
- ✅ Production build optimization
- ✅ SEO-friendly meta tags
- ✅ Error handling and logging

## 🎨 UI/UX Features

This project demonstrates modern UI/UX patterns and best practices:

### Loading States

- **Skeleton Screens**: Content placeholders that match the actual layout
- **Spinners & Indicators**: Multiple loading animation types
- **Progressive Loading**: Images and content load smoothly
- **Form Submission Feedback**: Disabled states and loading indicators

### Empty States

- **Helpful Messaging**: Clear guidance when no data exists
- **Action-Oriented**: Provides clear next steps for users
- **Consistent Design**: Unified empty state experience

### Micro-interactions

- **Hover Effects**: Interactive feedback on buttons and cards
- **Smooth Transitions**: CSS transitions for state changes
- **Loading Animations**: Subtle animations improve perceived performance
- **Responsive Feedback**: Visual feedback for all user actions

### Component System

- **LoadingSpinner**: Reusable loading component with multiple variants
- **EmptyState**: Consistent empty state handling
- **Enhanced Tables**: Loading rows and better accessibility
- **Smart Forms**: Loading states and validation feedback

## 🧪 Testing

This project includes comprehensive unit tests for API endpoints and schema validation.

### Test Coverage

- **Schema Validation**: Tests for book data validation and type coercion
- **API Structure**: Verification that all endpoints exist and are importable
- **Database Operations**: Tests for database connection and schema availability

### Running Tests

```bash
pnpm test:run    # Run all tests once
pnpm test         # Run tests in watch mode
pnpm test:ui      # Run tests with UI interface
```

See [docs/TESTING.md](docs/TESTING.md) for detailed testing documentation.

## 📚 Learning Resources

This project implements patterns and concepts from:

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix Vue](https://www.radix-vue.com/)
- [Vitest Testing](https://vitest.dev/)

---

Built with ❤️ using modern web technologies to demonstrate full-stack development capabilities.
