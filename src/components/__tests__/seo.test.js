import React from 'react';
import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import Seo from '../seo';

// Mock Gatsby hooks
jest.mock('gatsby', () => ({
  useStaticQuery: jest.fn(),
  graphql: jest.fn(),
}));

// Mock Helmet
jest.mock('react-helmet', () => {
  return function MockHelmet({ children }) {
    return <head>{children}</head>;
  };
});

describe('Seo Component', () => {
  const mockSiteData = {
    site: {
      siteMetadata: {
        title: 'Test Site',
        description: 'Test description',
        author: 'Test Author',
        siteUrl: 'https://example.com',
      },
    },
  };

  beforeEach(() => {
    useStaticQuery.mockReturnValue(mockSiteData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders basic SEO meta tags', () => {
      render(<Seo title="Test Page" />);
      
      const titleTag = document.querySelector('title');
      expect(titleTag).toBeInTheDocument();
      expect(titleTag.textContent).toBe('Test Page | Test Site');
    });

    test('renders meta description', () => {
      render(<Seo title="Test Page" />);
      
      const descriptionMeta = document.querySelector('meta[name="description"]');
      expect(descriptionMeta).toBeInTheDocument();
      expect(descriptionMeta).getAttribute('content')).toBe('Test description');
    });

    test('renders author meta tag', () => {
      render(<Seo title="Test Page" />);
      
      const authorMeta = document.querySelector('meta[name="author"]');
      expect(authorMeta).toBeInTheDocument();
      expect(authorMeta.getAttribute('content')).toBe('Test Author');
    });
  });

  describe('Title Handling', () => {
    test('combines page title with site title when site title exists', () => {
      render(<Seo title="About Us" />);
      
      const titleTag = document.querySelector('title');
      expect(titleTag.textContent).toBe('About Us | Test Site');
    });

    test('uses only page title when site title is missing', () => {
      useStaticQuery.mockReturnValue({
        site: {
          siteMetadata: {
            title: '',
            description: 'Test description',
            author: 'Test Author',
            siteUrl: 'https://example.com',
          },
        },
      });
      
      render(<Seo title="About Us" />);
      
      const titleTag = document.querySelector('title');
      expect(titleTag.textContent).toBe('About Us');
    });

    test('handles custom description', () => {
      render(<Seo title="Test Page" description="Custom description" />);
      
      const descriptionMeta = document.querySelector('meta[name="description"]');
      expect(descriptionMeta.getAttribute('content')).toBe('Custom description');
    });
  });

  describe('Open Graph Tags', () => {
    test('renders OG type as website by default', () => {
      render(<Seo title="Test Page" />);
      
      const ogType = document.querySelector('meta[property="og:type"]');
      expect(ogType).toBeInTheDocument();
      expect(ogType.getAttribute('content')).toBe('website');
    });

    test('renders OG type as article when article prop is true', () => {
      render(<Seo title="Test Page" article={true} />);
      
      const ogType = document.querySelector('meta[property="og:type"]');
      expect(ogType.getAttribute('content')).toBe('article');
    });

    test('renders OG URL', () => {
      render(<Seo title="Test Page" />);
      
      const ogUrl = document.querySelector('meta[property="og:url"]');
      expect(ogUrl).toBeInTheDocument();
      expect(ogUrl.getAttribute('content')).toBe('https://example.com');
    });

    test('renders OG title', () => {
      render(<Seo title="Test Page" />);
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle).toBeInTheDocument();
      expect(ogTitle.getAttribute('content')).toBe('Test Page');
    });

    test('renders OG description', () => {
      render(<Seo title="Test Page" />);
      
      const ogDescription = document.querySelector('meta[property="og:description"]');
      expect(ogDescription).toBeInTheDocument();
      expect(ogDescription.getAttribute('content')).toBe('Test description');
    });

    test('renders OG site name', () => {
      render(<Seo title="Test Page" />);
      
      const ogSiteName = document.querySelector('meta[property="og:site_name"]');
      expect(ogSiteName).toBeInTheDocument();
      expect(ogSiteName.getAttribute('content')).toBe('Test Site');
    });
  });

  describe('Twitter Cards', () => {
    test('renders Twitter card type', () => {
      render(<Seo title="Test Page" />);
      
      const twitterCard = document.querySelector('meta[name="twitter:card"]');
      expect(twitterCard).toBeInTheDocument();
      expect(twitterCard.getAttribute('content')).toBe('summary_large_image');
    });

    test('renders Twitter creator', () => {
      render(<Seo title="Test Page" />);
      
      const twitterCreator = document.querySelector('meta[name="twitter:creator"]');
      expect(twitterCreator).toBeInTheDocument();
      expect(twitterCreator.getAttribute('content')).toBe('Test Author');
    });

    test('renders Twitter title', () => {
      render(<Seo title="Test Page" />);
      
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      expect(twitterTitle).toBeInTheDocument();
      expect(twitterTitle.getAttribute('content')).toBe('Test Page');
    });

    test('renders Twitter description', () => {
      render(<Seo title="Test Page" />);
      
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      expect(twitterDescription).toBeInTheDocument();
      expect(twitterDescription.getAttribute('content')).toBe('Test description');
    });
  });

  describe('Additional SEO Tags', () => {
    test('renders robots meta tag', () => {
      render(<Seo title="Test Page" />);
      
      const robots = document.querySelector('meta[name="robots"]');
      expect(robots).toBeInTheDocument();
      expect(robots.getAttribute('content')).toBe('index, follow');
    });

    test('renders viewport meta tag', () => {
      render(<Seo title="Test Page" />);
      
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeInTheDocument();
      expect(viewport.getAttribute('content')).toBe('width=device-width, initial-scale=1');
    });

    test('renders canonical link', () => {
      render(<Seo title="Test Page" />);
      
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical).toBeInTheDocument();
      expect(canonical.getAttribute('href')).toBe('https://example.com');
    });
  });

  describe('Children Rendering', () => {
    test('renders additional children inside Helmet', () => {
      render(
        <Seo title="Test Page">
          <meta name="custom-tag" content="custom-value" />
        </Seo>
      );
      
      const customTag = document.querySelector('meta[name="custom-tag"]');
      expect(customTag).toBeInTheDocument();
      expect(customTag.getAttribute('content')).toBe('custom-value');
    });

    test('renders multiple children', () => {
      render(
        <Seo title="Test Page">
          <meta name="custom1" content="value1" />
          <meta name="custom2" content="value2" />
          <link rel="alternate" href="https://alternate.com" />
        </Seo>
      );
      
      expect(document.querySelector('meta[name="custom1"]')).toBeInTheDocument();
      expect(document.querySelector('meta[name="custom2"]')).toBeInTheDocument();
      expect(document.querySelector('link[rel="alternate"]')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('handles missing site metadata gracefully', () => {
      useStaticQuery.mockReturnValue({
        site: {
          siteMetadata: {},
        },
      });
      
      render(<Seo title="Test Page" />);
      
      const titleTag = document.querySelector('title');
      expect(titleTag.textContent).toBe('Test Page');
    });

    test('handles missing site description', () => {
      useStaticQuery.mockReturnValue({
        site: {
          siteMetadata: {
            title: 'Test Site',
          },
        },
      });
      
      render(<Seo title="Test Page" description="Custom description" />);
      
      const descriptionMeta = document.querySelector('meta[name="description"]');
      expect(descriptionMeta.getAttribute('content')).toBe('Custom description');
    });

    test('handles GraphQL query failure', () => {
      useStaticQuery.mockImplementation(() => {
        throw new Error('GraphQL query failed');
      });
      
      expect(() => render(<Seo title="Test Page" />)).toThrow('GraphQL query failed');
    });
  });

  describe('Edge Cases', () => {
    test('handles empty title', () => {
      render(<Seo title="" />);
      
      const titleTag = document.querySelector('title');
      expect(titleTag.textContent).toBe('Test Site');
    });

    test('handles undefined description', () => {
      render(<Seo title="Test Page" description={undefined} />);
      
      const descriptionMeta = document.querySelector('meta[name="description"]');
      expect(descriptionMeta.getAttribute('content')).toBe('Test description');
    });

    test('handles null description', () => {
      render(<Seo title="Test Page" description={null} />);
      
      const descriptionMeta = document.querySelector('meta[name="description"]');
      expect(descriptionMeta.getAttribute('content')).toBe('Test description');
    });

    test('handles article prop with false value', () => {
      render(<Seo title="Test Page" article={false} />);
      
      const ogType = document.querySelector('meta[property="og:type"]');
      expect(ogType.getAttribute('content')).toBe('website');
    });
  });
});