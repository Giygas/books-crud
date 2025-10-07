# Testing Documentation

## Overview

This project includes basic unit tests for the API endpoints and schema validation using Vitest.

## Test Structure

### Schema Tests (`tests/schemas/book.test.ts`)

- Tests book schema validation for both insert and select operations
- Validates data coercion (string to number conversion)
- Tests required field validation
- Tests nullable field handling

### API Tests (`tests/api/books.test.ts`)

- Tests basic functionality of book schemas
- Validates that all API endpoints exist and can be imported
- Tests database connection availability
- Tests schema table availability

## Running Tests

### Run all tests once

```bash
npm run test:run
```

### Run tests in watch mode

```bash
npm run test
```

### Run tests with UI

```bash
npm run test:ui
```

## Test Configuration

The tests are configured with:

- **Vitest**: Modern testing framework
- **happy-dom**: Lightweight DOM environment
- **Global mocking**: Database and H3 utilities are mocked for testing

## Current Test Coverage

✅ **Schema Validation** (6 tests)

- Book insert schema validation
- Book select schema validation
- Data type coercion
- Required field validation
- Nullable field handling

✅ **API Structure** (6 tests)

- Schema validation functionality
- API endpoint existence verification
- Database connection availability
- Schema table availability

## Next Steps for Testing

To expand test coverage, consider adding:

1. **Integration Tests**

   - Full API endpoint testing with real database
   - Request/response validation
   - Error handling scenarios

2. **Component Tests**

   - Vue component testing
   - User interaction testing
   - Form validation testing

3. **E2E Tests**
   - Full application flow testing
   - Browser automation testing
   - Cross-browser compatibility

## Mocking Strategy

The current setup mocks:

- **Database operations**: All Drizzle ORM operations
- **H3 utilities**: Nuxt server utilities
- **External dependencies**: Third-party services

This allows for fast, isolated unit tests without requiring a real database connection.
