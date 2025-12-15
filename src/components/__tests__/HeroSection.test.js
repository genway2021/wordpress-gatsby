import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useStaticQuery, graphql } from 'gatsby';
import HeroSection from '../HeroSection';

// Mock Gatsby hooks
jest.mock('gatsby', () => ({
  useStaticQuery: jest.fn(),
  graphql: jest.fn(),
}));

// Mock the home styles
jest.mock('../../styles/homeStyles', () => ({
  heroStyles: {
    btn: {
      background: '#ec6664',
      color: '#fff',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      boxShadow: '0 4px 15px rgba(236, 102, 100, 0.3)',
      transition: 'all 0.3s ease',
    },
    btnHover: {
      background: '#d48a88',
      transform: 'scale(1.05)',
      boxShadow: '0 6px 20px rgba(236, 102, 100, 0.4)',
    },
    btnAlt: {
      background: 'transparent',
      color: '#ec6664',
      border: '2px solid #ec6664',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
    btnAltHover: {
      background: '#ec6664',
      color: '#fff',
      transform: 'scale(1.05)',
    },
    socialIconBtn: {
      color: '#666',
      fontSize: '20px',
      padding: '8px',
      borderRadius: '50%',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    socialIconHover: {
      color: '#ec6664',
      transform: 'scale(1.2)',
    },
    svgHover: {
      transform: 'scale(1.2)',
    },
    avatarStyle: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      border: '4px solid #ec6664',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    avatarHover: {
      transform: 'scale(1.1)',
      borderColor: '#d48a88',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    },
  },
}));

// Mock the useHeroFromCategory hook
jest.mock('../../hooks/useWordPress', () => ({
  useHeroFromCategory: () => ({
    heroData: null,
    loading: false,
    error: null,
  }),
  useSocialMediaFromCategory: () => ({
    socialMedia: [],
    loading: false,
    error: null,
  }),
}));

describe('HeroSection Component', () => {
  const mockHeroData = {
    title: 'Welcome to My Blog',
    subtitle: 'Web Developer & Designer',
    description: 'Creating beautiful and functional web experiences',
    avatar: 'https://example.com/avatar.jpg',
    primaryButton: { text: 'View Posts', url: '/posts' },
    secondaryButton: { text: 'Contact Me', url: '/contact' },
    socialMedia: [
      { platform: 'github', url: 'https://github.com/test', icon: 'github-icon' },
      { platform: 'twitter', url: 'https://twitter.com/test', icon: 'twitter-icon' },
    ],
  };

  const mockSocialMediaData = [
    { platform: 'github', url: 'https://github.com/testuser', icon: 'github.svg' },
    { platform: 'twitter', url: 'https://twitter.com/testuser', icon: 'twitter.svg' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/testuser', icon: 'linkedin.svg' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useStaticQuery.mockReturnValue({
      heroCategory: {
        nodes: [
          {
            parsedData: mockHeroData,
          },
        ],
      },
      socialsCategory: {
        nodes: [
          {
            parsedData: mockSocialMediaData,
          },
        ],
      },
    });
  });

  describe('Basic Rendering', () => {
    test('renders hero section with title and subtitle', () => {
      render(<HeroSection />);

      expect(screen.getByText('Welcome to My Blog')).toBeInTheDocument();
      expect(screen.getByText('Web Developer & Designer')).toBeInTheDocument();
      expect(screen.getByText('Creating beautiful and functional web experiences')).toBeInTheDocument();
    });

    test('renders avatar image', () => {
      render(<HeroSection />);

      const avatar = screen.getByAltText('Profile');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    test('renders primary and secondary buttons', () => {
      render(<HeroSection />);

      expect(screen.getByText('View Posts')).toBeInTheDocument();
      expect(screen.getByText('Contact Me')).toBeInTheDocument();
    });

    test('renders social media icons', () => {
      render(<HeroSection />);

      expect(screen.getByTitle('GitHub')).toBeInTheDocument();
      expect(screen.getByTitle('Twitter')).toBeInTheDocument();
      expect(screen.getByTitle('LinkedIn')).toBeInTheDocument();
    });
  });

  describe('Button Interactions', () => {
    test('applies hover effects to primary button', () => {
      render(<HeroSection />);

      const primaryBtn = screen.getByText('View Posts');
      
      fireEvent.mouseOver(primaryBtn);
      expect(primaryBtn).toHaveStyle({
        background: '#d48a88',
        transform: 'scale(1.05)',
      });

      fireEvent.mouseOut(primaryBtn);
      expect(primaryBtn).toHaveStyle({
        background: '#ec6664',
        transform: 'scale(1)',
      });
    });

    test('applies hover effects to secondary button', () => {
      render(<HeroSection />);

      const secondaryBtn = screen.getByText('Contact Me');
      
      fireEvent.mouseOver(secondaryBtn);
      expect(secondaryBtn).toHaveStyle({
        background: '#ec6664',
        color: '#fff',
        transform: 'scale(1.05)',
      });

      fireEvent.mouseOut(secondaryBtn);
      expect(secondaryBtn).toHaveStyle({
        background: 'transparent',
        color: '#ec6664',
        transform: 'scale(1)',
      });
    });
  });

  describe('Social Media Icons', () => {
    test('applies hover effects to social icons', () => {
      render(<HeroSection />);

      const githubIcon = screen.getByTitle('GitHub').closest('button');
      
      fireEvent.mouseOver(githubIcon);
      expect(githubIcon).toHaveStyle({
        color: '#ec6664',
      });

      fireEvent.mouseOut(githubIcon);
      expect(githubIcon).toHaveStyle({
        color: '#666',
      });
    });

    test('renders social icons with correct URLs', () => {
      render(<HeroSection />);

      const githubIcon = screen.getByTitle('GitHub').closest('a');
      const twitterIcon = screen.getByTitle('Twitter').closest('a');
      
      expect(githubIcon).toHaveAttribute('href', 'https://github.com/testuser');
      expect(twitterIcon).toHaveAttribute('href', 'https://twitter.com/testuser');
    });

    test('opens social links in new tab', () => {
      render(<HeroSection />);

      const githubIcon = screen.getByTitle('GitHub').closest('a');
      expect(githubIcon).toHaveAttribute('target', '_blank');
      expect(githubIcon).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Avatar Interactions', () => {
    test('applies hover effects to avatar', () => {
      render(<HeroSection />);

      const avatar = screen.getByAltText('Profile');
      
      fireEvent.mouseOver(avatar);
      expect(avatar).toHaveStyle({
        transform: 'scale(1.1)',
        borderColor: '#d48a88',
      });

      fireEvent.mouseOut(avatar);
      expect(avatar).toHaveStyle({
        transform: 'scale(1)',
        borderColor: '#ec6664',
      });
    });
  });

  describe('Data Handling', () => {
    test('handles missing hero data gracefully', () => {
      useStaticQuery.mockReturnValue({
        heroCategory: { nodes: [] },
        socialsCategory: { nodes: [] },
      });

      render(<HeroSection />);

      // Should not crash and should render with default/empty values
      expect(document.querySelector('section')).toBeInTheDocument();
    });

    test('handles missing social media data', () => {
      useStaticQuery.mockReturnValue({
        heroCategory: {
          nodes: [{ parsedData: mockHeroData }],
        },
        socialsCategory: { nodes: [] },
      });

      render(<HeroSection />);

      expect(screen.getByText('Welcome to My Blog')).toBeInTheDocument();
      expect(screen.queryByTitle('GitHub')).not.toBeInTheDocument();
    });

    test('handles missing optional hero fields', () => {
      const partialHeroData = {
        title: 'Simple Title',
        subtitle: 'Simple Subtitle',
        // Missing other fields
      };

      useStaticQuery.mockReturnValue({
        heroCategory: {
          nodes: [{ parsedData: partialHeroData }],
        },
        socialsCategory: { nodes: [] },
      });

      render(<HeroSection />);

      expect(screen.getByText('Simple Title')).toBeInTheDocument();
      expect(screen.getByText('Simple Subtitle')).toBeInTheDocument();
    });

    test('handles missing buttons', () => {
      const heroWithoutButtons = {
        ...mockHeroData,
        primaryButton: null,
        secondaryButton: null,
      };

      useStaticQuery.mockReturnValue({
        heroCategory: {
          nodes: [{ parsedData: heroWithoutButtons }],
        },
        socialsCategory: { nodes: [] },
      });

      render(<HeroSection />);

      expect(screen.queryByText('View Posts')).not.toBeInTheDocument();
      expect(screen.queryByText('Contact Me')).not.toBeInTheDocument();
    });

    test('handles missing avatar', () => {
      const heroWithoutAvatar = {
        ...mockHeroData,
        avatar: null,
      };

      useStaticQuery.mockReturnValue({
        heroCategory: {
          nodes: [{ parsedData: heroWithoutAvatar }],
        },
        socialsCategory: { nodes: [] },
      });

      render(<HeroSection />);

      expect(screen.queryByAltText('Profile')).not.toBeInTheDocument();
      expect(screen.getByText('Welcome to My Blog')).toBeInTheDocument();
    });
  });

  describe('Button Link Behavior', () => {
    test('primary button links to correct URL', () => {
      render(<HeroSection />);

      const primaryBtn = screen.getByText('View Posts').closest('a');
      expect(primaryBtn).toHaveAttribute('href', '/posts');
    });

    test('secondary button links to correct URL', () => {
      render(<HeroSection />);

      const secondaryBtn = screen.getByText('Contact Me').closest('a');
      expect(secondaryBtn).toHaveAttribute('href', '/contact');
    });

    test('handles buttons without URLs', () => {
      const heroWithButtonWithoutUrl = {
        ...mockHeroData,
        primaryButton: { text: 'Click Me' },
        secondaryButton: { text: 'No URL' },
      };

      useStaticQuery.mockReturnValue({
        heroCategory: {
          nodes: [{ parsedData: heroWithButtonWithoutUrl }],
        },
        socialsCategory: { nodes: [] },
      });

      render(<HeroSection />);

      const primaryBtn = screen.getByText('Click Me');
      expect(primaryBtn.closest('a')).toBeNull();
    });
  });

  describe('Accessibility', () => {
    test('social icons have proper titles', () => {
      render(<HeroSection />);

      expect(screen.getByTitle('GitHub')).toBeInTheDocument();
      expect(screen.getByTitle('Twitter')).toBeInTheDocument();
      expect(screen.getByTitle('LinkedIn')).toBeInTheDocument();
    });

    test('avatar has proper alt text', () => {
      render(<HeroSection />);

      const avatar = screen.getByAltText('Profile');
      expect(avatar).toBeInTheDocument();
    });

    test('buttons are keyboard accessible', () => {
      render(<HeroSection />);

      const socialIcons = screen.getAllByRole('button');
      socialIcons.forEach(icon => {
        expect(icon).not.toBeDisabled();
      });
    });
  });

  describe('Error States', () => {
    test('handles GraphQL query error', () => {
      useStaticQuery.mockImplementation(() => {
        throw new Error('GraphQL error');
      });

      expect(() => render(<HeroSection />)).toThrow('GraphQL error');
    });

    test('handles malformed data', () => {
      useStaticQuery.mockReturnValue({
        heroCategory: {
          nodes: [{
            parsedData: 'invalid data',
          }],
        },
        socialsCategory: { nodes: [] },
      });

      expect(() => render(<HeroSection />).toThrow());
    });
  });

  describe('Component Structure', () => {
    test('renders main section with correct structure', () => {
      render(<HeroSection />);

      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    test('renders container divs with proper classes', () => {
      render(<HeroSection />);

      const heroContainer = document.querySelector('.hero-container');
      expect(heroContainer).toBeInTheDocument();
    });
  });
});