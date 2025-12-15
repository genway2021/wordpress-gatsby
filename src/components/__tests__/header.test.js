import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Link } from 'gatsby';
import Header from '../header';

// Mock Gatsby Link
jest.mock('gatsby', () => ({
  Link: jest.fn(({ to, children, getProps, ...props }) => {
    const isCurrent = to === window.location.pathname;
    const style = getProps ? getProps({ isCurrent }).style : {};
    return (
      <a href={to} style={style} {...props}>
        {children}
      </a>
    );
  }),
}));

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    pathname: '/',
  },
  writable: true,
});

// Mock environment variables
const originalEnv = process.env;

describe('Header Component', () => {
  beforeEach(() => {
    // Reset environment variables
    jest.resetModules();
    process.env = { ...originalEnv };
    
    // Mock window object
    Object.defineProperty(window, 'window', {
      value: window,
      writable: true,
    });
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders header with site title', () => {
      render(<Header siteTitle="Test Site" />);
      
      expect(screen.getByText('Test Site')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    test('renders default title when siteTitle is not provided', () => {
      render(<Header />);
      
      expect(screen.getByText('My Portfolio Blog')).toBeInTheDocument();
    });

    test('renders all navigation links', () => {
      render(<Header siteTitle="Test Site" />);
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Posts')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });
  });

  describe('Giscus Integration', () => {
    test('shows Comments link when Giscus is configured', () => {
      // Mock window object
      Object.defineProperty(window, 'window', {
        value: {
          ...window,
          undefined: undefined,
        },
        writable: true,
      });

      // Set environment variables for Giscus
      process.env.GATSBY_GISCUS_REPO = 'test/repo';
      process.env.GATSBY_GISCUS_REPO_ID = 'test-repo-id';
      process.env.GATSBY_GISCUS_CATEGORY_ID = 'test-category-id';
      process.env.NODE_ENV = 'production';

      // Re-import the component to get fresh environment variables
      const FreshHeader = require('../header').default;
      render(<FreshHeader siteTitle="Test Site" />);
      
      expect(screen.getByText('Comments')).toBeInTheDocument();
    });

    test('hides Comments link when Giscus is not configured', () => {
      // Clear environment variables
      delete process.env.GATSBY_GISCUS_REPO;
      delete process.env.GATSBY_GISCUS_REPO_ID;
      delete process.env.GATSBY_GISCUS_CATEGORY_ID;

      const FreshHeader = require('../header').default;
      render(<FreshHeader siteTitle="Test Site" />);
      
      expect(screen.queryByText('Comments')).not.toBeInTheDocument();
    });

    test('hides Comments link when partial Giscus config exists', () => {
      process.env.GATSBY_GISCUS_REPO = 'test/repo';
      delete process.env.GATSBY_GISCUS_REPO_ID;
      delete process.env.GATSBY_GISCUS_CATEGORY_ID;

      const FreshHeader = require('../header').default;
      render(<FreshHeader siteTitle="Test Site" />);
      
      expect(screen.queryByText('Comments')).not.toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    test('renders correct href attributes for links', () => {
      render(<Header siteTitle="Test Site" />);
      
      const homeLink = screen.getByText('Home');
      const postsLink = screen.getByText('Posts');
      const contactLink = screen.getByText('Contact');
      
      expect(homeLink.closest('a')).toHaveAttribute('href', '/');
      expect(postsLink.closest('a')).toHaveAttribute('href', '/posts');
      expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
    });

    test('applies active styles for current page', () => {
      window.location.pathname = '/';
      
      render(<Header siteTitle="Test Site" />);
      
      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toHaveStyle('color: #ec6664');
    });
  });

  describe('Mouse Event Handlers', () => {
    test('handles mouse over on navigation links', () => {
      render(<Header siteTitle="Test Site" />);
      
      const homeLink = screen.getByText('Home');
      fireEvent.mouseOver(homeLink);
      
      expect(homeLink).toHaveStyle('color: #ec6664');
      expect(homeLink).toHaveStyle('transform: scale(1.08)');
    });

    test('handles mouse out on navigation links', () => {
      render(<Header siteTitle="Test Site" />);
      
      const homeLink = screen.getByText('Home');
      fireEvent.mouseOver(homeLink);
      fireEvent.mouseOut(homeLink);
      
      expect(homeLink).toHaveStyle('color: #d48a88');
      expect(homeLink).toHaveStyle('transform: scale(1)');
    });

    test('handles mouse over on site name', () => {
      render(<Header siteTitle="Test Site" />);
      
      const siteName = screen.getByText('Test Site');
      fireEvent.mouseOver(siteName);
      
      expect(siteName).toHaveStyle('color: #ffb400');
      expect(siteName).toHaveStyle('transform: scale(1.08)');
    });

    test('handles mouse out on site name', () => {
      render(<Header siteTitle="Test Site" />);
      
      const siteName = screen.getByText('Test Site');
      fireEvent.mouseOver(siteName);
      fireEvent.mouseOut(siteName);
      
      expect(siteName).toHaveStyle('color: #ec6664');
      expect(siteName).toHaveStyle('transform: scale(1)');
    });

    test('preserves active color on mouse out for current page', () => {
      window.location.pathname = '/';
      
      render(<Header siteTitle="Test Site" />);
      
      const homeLink = screen.getByText('Home');
      fireEvent.mouseOver(homeLink);
      fireEvent.mouseOut(homeLink);
      
      expect(homeLink).toHaveStyle('color: #ec6664');
    });
  });

  describe('Styling and Layout', () => {
    test('renders navigation with correct styles', () => {
      render(<Header siteTitle="Test Site" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveStyle({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      });
    });

    test('renders menu with correct styles', () => {
      render(<Header siteTitle="Test Site" />);
      
      const menu = screen.getByRole('navigation').querySelector('ul');
      expect(menu).toHaveStyle({
        display: 'flex',
        gap: '2rem',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        alignItems: 'center',
        height: '100%',
      });
    });

    test('renders site name link with correct styles', () => {
      render(<Header siteTitle="Test Site" />);
      
      const siteName = screen.getByText('Test Site').closest('a');
      expect(siteName).toHaveStyle({
        fontWeight: 700,
        fontSize: '1.5rem',
        letterSpacing: '0.05em',
        color: '#ec6664',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      });
    });
  });

  describe('Debug Logging', () => {
    test('logs Giscus config in development mode', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      process.env.NODE_ENV = 'development';
      process.env.GATSBY_GISCUS_REPO = 'test/repo';
      process.env.GATSBY_GISCUS_REPO_ID = 'test-repo-id';
      process.env.GATSBY_GISCUS_CATEGORY_ID = 'test-category-id';

      const FreshHeader = require('../header').default;
      render(<FreshHeader siteTitle="Test Site" />);
      
      expect(consoleSpy).toHaveBeenCalledWith('Giscus config check:', expect.any(Object));
      
      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    test('has proper navigation role', () => {
      render(<Header siteTitle="Test Site" />);
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    test('has accessible link text', () => {
      render(<Header siteTitle="Test Site" />);
      
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Posts' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles empty site title', () => {
      render(<Header siteTitle="" />);
      
      expect(screen.getByText('')).toBeInTheDocument();
    });

    test('handles null site title', () => {
      render(<Header siteTitle={null} />);
      
      expect(screen.getByText('')).toBeInTheDocument();
    });

    test('handles undefined site title', () => {
      render(<Header siteTitle={undefined} />);
      
      expect(screen.getByText('My Portfolio Blog')).toBeInTheDocument();
    });
  });
});