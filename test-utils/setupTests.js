import '@testing-library/jest-dom';

// Mock CSS imports
jest.mock('\\.css$', () => ({}));
jest.mock('\\.scss$', () => ({}));
jest.mock('\\.sass$', () => ({}));
jest.mock('\\.less$', () => ({}));

// Mock image imports
jest.mock('\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$', () => ({
  __esModule: true,
  default: 'test-file-stub',
}));

// Mock Gatsby static queries
jest.mock('gatsby', () => ({
  useStaticQuery: jest.fn(),
  graphql: jest.fn(),
  Link: jest.fn(({ to, children, ...props }) => (
    <a href={to} {...props}>{children}</a>
  )),
}));

// Mock window APIs that aren't available in JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock fetch if not available
if (!global.fetch) {
  global.fetch = require('jest-fetch-mock');
}