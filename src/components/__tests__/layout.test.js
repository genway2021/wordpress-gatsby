import React from 'react';
import { render, screen } from '@testing-library/react';
import { useStaticQuery, useLocation } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../layout';

// Mock Gatsby hooks
jest.mock('gatsby', () => ({
  useStaticQuery: jest.fn(),
  graphql: jest.fn(),
}));

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock Header component
jest.mock('../header', () => {
  return function MockHeader({ siteTitle }) {
    return <header data-testid="header">{siteTitle}</header>;
  };
});

describe('Layout Component', () => {
  const mockStaticQueryData = {
    site: {
      siteMetadata: {
        title: 'Test Site',
      },
    },
    footerCategory: {
      nodes: [
        {
          parsedData: {
            text: '© 2023 Test Site',
            links: [
              { url: 'https://example.com/privacy', title: 'Privacy' },
              { url: 'https://example.com/terms', title: 'Terms' },
            ],
            github: {
              url: 'https://github.com/testuser',
              text: 'GitHub',
            },
          },
        },
      ],
    },
  };

  beforeEach(() => {
    useStaticQuery.mockReturnValue(mockStaticQueryData);
    useLocation.mockReturnValue({ pathname: '/' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders layout structure correctly', () => {
      render(<Layout><div>Test Content</div></Layout>);
      
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByText('© 2023 Test Site')).toBeInTheDocument();
    });

    test('renders header with correct site title', () => {
      render(<Layout><div>Content</div></Layout>);
      
      const header = screen.getByTestId('header');
      expect(header).toHaveTextContent('Test Site');
    });

    test('renders main content area', () => {
      render(<Layout><div>Test Content</div></Layout>);
      
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Footer Rendering', () => {
    test('renders footer with text and links when data is available', () => {
      render(<Layout><div>Content</div></Layout>);
      
      expect(screen.getByText('© 2023 Test Site')).toBeInTheDocument();
      expect(screen.getByText('Privacy')).toBeInTheDocument();
      expect(screen.getByText('Terms')).toBeInTheDocument();
      expect(screen.getByText('GitHub')).toBeInTheDocument();
    });

    test('renders footer links with correct href attributes', () => {
      render(<Layout><div>Content</div></Layout>);
      
      const privacyLink = screen.getByText('Privacy');
      const termsLink = screen.getByText('Terms');
      const githubLink = screen.getByText('GitHub');
      
      expect(privacyLink).toHaveAttribute('href', 'https://example.com/privacy');
      expect(termsLink).toHaveAttribute('href', 'https://example.com/terms');
      expect(githubLink).toHaveAttribute('href', 'https://github.com/testuser');
    });

    test('shows error message when footer data is missing', () => {
      useStaticQuery.mockReturnValue({
        ...mockStaticQueryData,
        footerCategory: { nodes: [] },
      });
      
      render(<Layout><div>Content</div></Layout>);
      
      expect(screen.getByText('Footer加载失败')).toBeInTheDocument();
    });

    test('handles missing footer data gracefully', () => {
      useStaticQuery.mockReturnValue({
        site: { siteMetadata: { title: 'Test Site' } },
        footerCategory: { nodes: [{ parsedData: null }] },
      });
      
      render(<Layout><div>Content</div></Layout>);
      
      expect(screen.getByText('Footer加载失败')).toBeInTheDocument();
    });
  });

  describe('Path-based Styling', () => {
    test('applies correct styles for root path', () => {
      useLocation.mockReturnValue({ pathname: '/' });
      
      render(<Layout><div>Content</div></Layout>);
      
      const mainContent = screen.getByRole('main').firstChild;
      expect(mainContent).toHaveStyle({
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0',
      });
    });

    test('applies correct styles for non-root paths', () => {
      useLocation.mockReturnValue({ pathname: '/posts' });
      
      render(<Layout><div>Content</div></Layout>);
      
      const mainContent = screen.getByRole('main').firstChild;
      expect(mainContent).toHaveStyle({
        margin: '0 auto',
        maxWidth: '1200px',
        padding: 'var(--size-gutter)',
      });
    });

    test('applies correct padding for nested paths', () => {
      useLocation.mockReturnValue({ pathname: '/posts/some-post' });
      
      render(<Layout><div>Content</div></Layout>);
      
      const mainContent = screen.getByRole('main').firstChild;
      expect(mainContent).toHaveStyle({
        paddingTop: 'calc(var(--size-gutter) + 60px)',
      });
    });
  });

  describe('Error Handling', () => {
    test('handles missing site metadata gracefully', () => {
      useStaticQuery.mockReturnValue({
        site: { siteMetadata: {} },
        footerCategory: { nodes: [] },
      });
      
      render(<Layout><div>Content</div></Layout>);
      
      const header = screen.getByTestId('header');
      expect(header).toHaveTextContent('Title');
    });

    test('handles GraphQL query failure gracefully', () => {
      useStaticQuery.mockImplementation(() => {
        throw new Error('GraphQL query failed');
      });
      
      expect(() => render(<Layout><div>Content</div></Layout>)).toThrow('GraphQL query failed');
    });
  });

  describe('Footer Link Behavior', () => {
    test('renders multiple footer links with separators', () => {
      render(<Layout><div>Content</div></Layout>);
      
      expect(screen.getByText('Privacy')).toBeInTheDocument();
      expect(screen.getByText('•')).toBeInTheDocument();
      expect(screen.getByText('Terms')).toBeInTheDocument();
    });

    test('renders GitHub link with correct attributes', () => {
      render(<Layout><div>Content</div></Layout>);
      
      const githubLink = screen.getByText('GitHub');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('does not render GitHub link when data is missing', () => {
      const dataWithoutGithub = {
        ...mockStaticQueryData,
        footerCategory: {
          nodes: [{
            parsedData: {
              text: '© 2023 Test Site',
              links: [],
            },
          }],
        },
      };
      
      useStaticQuery.mockReturnValue(dataWithoutGithub);
      render(<Layout><div>Content</div></Layout>);
      
      expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    test('renders with correct CSS classes and inline styles', () => {
      render(<Layout><div>Content</div></Layout>);
      
      const layout = document.querySelector('div[style*="min-height: 100vh"]');
      expect(layout).toBeInTheDocument();
      expect(layout).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        background: '#fafdff',
      });
    });

    test('renders footer with correct styles', () => {
      render(<Layout><div>Content</div></Layout>);
      
      const footer = screen.getByRole('contentinfo') || document.querySelector('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveStyle({
        height: '60px',
        background: '#fff',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
      });
    });
  });
});