# Books CRUD Application

A modern, full-stack web application built with Nuxt 3 that demonstrates comprehensive CRUD operations for managing a book library. This project showcases proficiency with contemporary web technologies and best practices.

## 🚀 Tech Stack

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

## 🎯 What This Project Demonstrates

### Technical Skills

- **Full-Stack Development**: End-to-end application development
- **Type Safety**: TypeScript throughout the stack
- **Modern Frameworks**: Nuxt 3, Vue 3, and contemporary tooling
- **Database Design**: SQL schema design and ORM usage
- **API Development**: RESTful API design and implementation
- **Form Handling**: Complex form validation and state management
- **Component Architecture**: Reusable, composable UI components

### Best Practices

- **Code Quality**: ESLint, Prettier, and TypeScript strict mode
- **Security**: Input validation and SQL injection prevention
- **Performance**: SSR/SSG optimization and efficient data fetching
- **Accessibility**: ARIA-compliant UI components
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Comprehensive error boundaries and validation

## 🚀 Deployment

This application can be deployed to various platforms:

- **Vercel** - Recommended for Nuxt applications
- **Netlify** - Static site generation
- **Railway** - Full-stack deployment with database
- **DigitalOcean** - Custom deployment

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
