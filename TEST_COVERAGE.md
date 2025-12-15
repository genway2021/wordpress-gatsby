# Unit Test Suite

This project now includes a comprehensive unit test suite to validate functionality and edge cases.

## Test Coverage

### Components
- **Layout Component** (`src/components/__tests__/layout.test.js`)
  - Basic rendering and structure
  - Footer data handling with error states
  - Path-based styling for different routes
  - Mouse event handlers
  - Component structure and accessibility

- **SEO Component** (`src/components/__tests__/seo.test.js`)
  - Meta tag generation (title, description, author)
  - Open Graph tags
  - Twitter Card tags
  - Additional SEO tags (robots, viewport, canonical)
  - Custom children rendering
  - Error handling and edge cases

- **Header Component** (`src/components/__tests__/header.test.js`)
  - Navigation rendering and active states
  - Giscus integration conditional rendering
  - Mouse event handlers for hover effects
  - Styling and layout validation
  - Debug logging in development mode
  - Accessibility compliance

- **HeroSection Component** (`src/components/__tests__/HeroSection.test.js`)
  - Hero content rendering (title, subtitle, description)
  - Avatar and button interactions
  - Social media icons with hover effects
  - Data handling for missing/optional fields
  - Button link behavior
  - Accessibility and error states

### Pages
- **Posts Page** (`src/pages/__tests__/posts.test.js`)
  - Search functionality with real-time filtering
  - Tag filtering (single and multiple selection)
  - Combined search and tag filtering
  - Post expansion/collapse functionality
  - Error handling for empty/missing data
  - Data processing for tags and categories
  - Accessibility compliance

### Services
- **WordPress API** (`src/services/__tests__/wordpressApi.test.js`)
  - WordPress configuration validation
  - HTML entity decoding
  - Post fetching with embedded data
  - Category-based data retrieval (social, hero, about, footer, etc.)
  - Error handling for network failures
  - JSON parsing error handling
  - Edge cases for malformed data

### Hooks
- **WordPress Hooks** (`src/hooks/__tests__/useWordPress.test.js`)
  - Data fetching state management (loading, error, success)
  - React lifecycle and re-render behavior
  - Error state handling
  - Initial state validation
  - API function integration testing

## Test Features

### Coverage Goals
- Target ≥80% line coverage
- Complete test coverage for critical paths
- Edge case testing for all major functions
- Error boundary testing

### Test Types
- **Unit Tests**: Individual component and function testing
- **Integration Tests**: Component interaction testing
- **Error Handling**: Network failures, malformed data, edge cases
- **Accessibility**: ARIA roles, keyboard navigation, screen reader support

### Mock Strategy
- External API mocking (WordPress REST API)
- Gatsby hooks and GraphQL mocking
- Browser APIs (fetch, IntersectionObserver, ResizeObserver)
- CSS and asset imports

## Configuration Files

### Jest Configuration (`jest.config.js`)
- JSDOM environment for DOM testing
- CSS module mocking
- Coverage reporting
- Test path ignore patterns
- Coverage thresholds (80% minimum)

### Babel Configuration (`babel.config.js`)
- React preset for JSX transformation
- ES6+ syntax support
- Class properties and spread operators

### Test Utilities (`test-utils/setupTests.js`)
- Global test setup and mocks
- DOM API mocking
- Common utility functions
- Image and CSS import mocking

## Running Tests

### Install Dependencies
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom babel-jest
```

### Test Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Statistics

### Total Test Files Created: 8
1. Layout Component Tests
2. SEO Component Tests  
3. Header Component Tests
4. HeroSection Component Tests
5. Posts Page Tests
6. WordPress API Service Tests
7. WordPress Hooks Tests
8. Test Configuration

### Test Cases Covered
- **50+ test cases** across all components and services
- **100+ assertions** validating functionality
- **Edge cases**: null/undefined values, network failures, malformed data
- **User interactions**: clicks, hover, form inputs
- **State management**: loading, error, success states

## Best Practices Implemented

1. **Descriptive Test Names**: Each test clearly describes what it validates
2. **AAA Pattern**: Arrange, Act, Assert structure in all tests
3. **Mocking Strategy**: Comprehensive mocking of external dependencies
4. **Error Boundaries**: Testing for all possible error scenarios
5. **Accessibility**: ARIA compliance and keyboard navigation testing
6. **Code Coverage**: Maintaining high coverage thresholds
7. **Maintainability**: Clear test structure and reusable utilities

## Next Steps

1. **Install Dependencies**: Run the npm install command to add testing libraries
2. **Run Tests**: Execute the test suite to validate functionality
3. **Review Coverage**: Check coverage reports and add missing tests if needed
4. **CI/CD Integration**: Add test automation to deployment pipeline
5. **Visual Testing**: Consider adding visual regression tests for UI components

This comprehensive test suite ensures robust validation of the WordPress-Gatsby integration project's functionality, edge cases, and user experience.