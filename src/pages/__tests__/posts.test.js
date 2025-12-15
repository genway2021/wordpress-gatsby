import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { graphql } from 'gatsby';
import PostsPage from '../posts';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock Link component
jest.mock('gatsby', () => ({
  graphql: jest.fn(),
  Link: jest.fn(({ to, children, ...props }) => (
    <a href={to} {...props}>{children}</a>
  )),
}));

// Mock the useWordPress hooks
jest.mock('../../hooks/useWordPress', () => ({
  usePostsPageMetaFromCategory: () => ({
    meta: null,
    loading: false,
    error: null,
  }),
}));

describe('PostsPage Component', () => {
  const mockData = {
    allWordPressPost: {
      nodes: [
        {
          id: 1,
          title: 'First Post',
          excerpt: 'This is the first post',
          slug: 'first-post',
          date: '2023-01-01',
          author: 'John Doe',
          categories: ['Technology', 'Web'],
          tags: ['react', 'javascript'],
          featuredImage: 'https://example.com/image1.jpg',
        },
        {
          id: 2,
          title: 'Second Post',
          excerpt: 'This is the second post',
          slug: 'second-post',
          date: '2023-01-02',
          author: 'Jane Smith',
          categories: ['Design'],
          tags: ['css', 'ui'],
          featuredImage: 'https://example.com/image2.jpg',
        },
      ],
    },
    allWordPressCategory: {
      nodes: [
        {
          name: 'Posts',
          parsedData: {
            title: 'All Posts',
            subtitle: 'Blog posts about various topics',
          },
        },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders posts page with data', () => {
      render(<PostsPage data={mockData} />);

      expect(screen.getByText('All Posts')).toBeInTheDocument();
      expect(screen.getByText('Blog posts about various topics')).toBeInTheDocument();
      expect(screen.getByText('First Post')).toBeInTheDocument();
      expect(screen.getByText('Second Post')).toBeInTheDocument();
    });

    test('renders search input', () => {
      render(<PostsPage data={mockData} />);

      const searchInput = screen.getByPlaceholderText('Search posts...');
      expect(searchInput).toBeInTheDocument();
    });

    test('renders tag filter buttons', () => {
      render(<PostsPage data={mockData} />);

      expect(screen.getByText('react')).toBeInTheDocument();
      expect(screen.getByText('javascript')).toBeInTheDocument();
      expect(screen.getByText('css')).toBeInTheDocument();
      expect(screen.getByText('ui')).toBeInTheDocument();
    });

    test('renders posts table', () => {
      render(<PostsPage data={mockData} />);

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Author')).toBeInTheDocument();
      expect(screen.getByText('Categories')).toBeInTheDocument();
      expect(screen.getByText('Tags')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    test('filters posts by title search', async () => {
      render(<PostsPage data={mockData} />);

      const searchInput = screen.getByPlaceholderText('Search posts...');
      
      fireEvent.change(searchInput, { target: { value: 'First' } });

      await waitFor(() => {
        expect(screen.getByText('First Post')).toBeInTheDocument();
        expect(screen.queryByText('Second Post')).not.toBeInTheDocument();
      });
    });

    test('filters posts by excerpt search', async () => {
      render(<PostsPage data={mockData} />);

      const searchInput = screen.getByPlaceholderText('Search posts...');
      
      fireEvent.change(searchInput, { target: { value: 'second' } });

      await waitFor(() => {
        expect(screen.getByText('Second Post')).toBeInTheDocument();
        expect(screen.queryByText('First Post')).not.toBeInTheDocument();
      });
    });

    test('is case insensitive', async () => {
      render(<PostsPage data={mockData} />);

      const searchInput = screen.getByPlaceholderText('Search posts...');
      
      fireEvent.change(searchInput, { target: { value: 'FIRST' } });

      await waitFor(() => {
        expect(screen.getByText('First Post')).toBeInTheDocument();
      });
    });

    test('shows all posts when search is cleared', async () => {
      render(<PostsPage data={mockData} />);

      const searchInput = screen.getByPlaceholderText('Search posts...');
      
      fireEvent.change(searchInput, { target: { value: 'First' } });

      await waitFor(() => {
        expect(screen.queryByText('Second Post')).not.toBeInTheDocument();
      });

      fireEvent.change(searchInput, { target: { value: '' } });

      await waitFor(() => {
        expect(screen.getByText('First Post')).toBeInTheDocument();
        expect(screen.getByText('Second Post')).toBeInTheDocument();
      });
    });
  });

  describe('Tag Filtering', () => {
    test('filters posts by selected tag', async () => {
      render(<PostsPage data={mockData} />);

      const reactTag = screen.getByText('react');
      fireEvent.click(reactTag);

      await waitFor(() => {
        expect(screen.getByText('First Post')).toBeInTheDocument();
        expect(screen.queryByText('Second Post')).not.toBeInTheDocument();
      });

      expect(reactTag).toHaveClass('active');
    });

    test('filters posts by multiple tags', async () => {
      render(<PostsPage data={mockData} />);

      const reactTag = screen.getByText('react');
      const cssTag = screen.getByText('css');
      
      fireEvent.click(reactTag);
      fireEvent.click(cssTag);

      await waitFor(() => {
        expect(screen.getByText('First Post')).toBeInTheDocument();
        expect(screen.getByText('Second Post')).toBeInTheDocument();
      });

      expect(reactTag).toHaveClass('active');
      expect(cssTag).toHaveClass('active');
    });

    test('deselects tag when clicked again', async () => {
      render(<PostsPage data={mockData} />);

      const reactTag = screen.getByText('react');
      fireEvent.click(reactTag);

      await waitFor(() => {
        expect(screen.queryByText('Second Post')).not.toBeInTheDocument();
      });

      fireEvent.click(reactTag);

      await waitFor(() => {
        expect(screen.getByText('First Post')).toBeInTheDocument();
        expect(screen.getByText('Second Post')).toBeInTheDocument();
      });

      expect(reactTag).not.toHaveClass('active');
    });
  });

  describe('Combined Filtering', () => {
    test('combines search and tag filtering', async () => {
      render(<PostsPage data={mockData} />);

      const searchInput = screen.getByPlaceholderText('Search posts...');
      const reactTag = screen.getByText('react');

      fireEvent.change(searchInput, { target: { value: 'post' } });
      fireEvent.click(reactTag);

      await waitFor(() => {
        expect(screen.getByText('First Post')).toBeInTheDocument();
        expect(screen.queryByText('Second Post')).not.toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    test('handles empty posts data', () => {
      const emptyData = {
        allWordPressPost: { nodes: [] },
        allWordPressCategory: { nodes: [] },
      };

      render(<PostsPage data={emptyData} />);

      expect(screen.getByText('No posts found')).toBeInTheDocument();
    });

    test('handles missing posts category', () => {
      const dataWithoutCategory = {
        allWordPressPost: { nodes: [] },
        allWordPressCategory: { nodes: [] },
      };

      render(<PostsPage data={dataWithoutCategory} />);

      expect(screen.getByText('All Posts')).toBeInTheDocument(); // Should render default title
    });

    test('handles undefined data', () => {
      const undefinedData = {
        allWordPressPost: { nodes: undefined },
        allWordPressCategory: { nodes: undefined },
      };

      render(<PostsPage data={undefinedData} />);

      expect(screen.getByText('All Posts')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('search input has proper label', () => {
      render(<PostsPage data={mockData} />);

      const searchInput = screen.getByLabelText('Search posts');
      expect(searchInput).toBeInTheDocument();
    });

    test('tag buttons are keyboard accessible', () => {
      render(<PostsPage data={mockData} />);

      const reactTag = screen.getByText('react');
      expect(reactTag.closest('button')).not.toBeDisabled();
    });

    test('table has proper headers', () => {
      render(<PostsPage data={mockData} />);

      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(5); // Title, Date, Author, Categories, Tags
    });
  });

  describe('Component Interactions', () => {
    test('expands post details when expand button is clicked', async () => {
      render(<PostsPage data={mockData} />);

      const expandButtons = screen.getAllByLabelText('Expand post details');
      fireEvent.click(expandButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('This is the first post')).toBeInTheDocument();
      });
    });

    test('collapses post details when clicked again', async () => {
      render(<PostsPage data={mockData} />);

      const expandButtons = screen.getAllByLabelText('Expand post details');
      fireEvent.click(expandButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('This is the first post')).toBeInTheDocument();
      });

      fireEvent.click(expandButtons[0]);

      await waitFor(() => {
        expect(screen.queryByText('This is the first post')).not.toBeInTheDocument();
      });
    });

    test('highlights row on hover', () => {
      render(<PostsPage data={mockData} />);

      const firstRow = screen.getByText('First Post').closest('tr');
      fireEvent.mouseEnter(firstRow);

      expect(firstRow).toHaveStyle('background: #f8f9fa');
    });
  });

  describe('Data Processing', () => {
    test('extracts unique tags correctly', () => {
      const dataWithDuplicateTags = {
        ...mockData,
        allWordPressPost: {
          nodes: [
            ...mockData.allWordPressPost.nodes,
            {
              id: 3,
              title: 'Third Post',
              excerpt: 'Third post excerpt',
              slug: 'third-post',
              date: '2023-01-03',
              author: 'Bob Johnson',
              categories: ['Technology'],
              tags: ['react'], // Duplicate tag
              featuredImage: 'https://example.com/image3.jpg',
            },
          ],
        },
      };

      render(<PostsPage data={dataWithDuplicateTags} />);

      const reactTags = screen.getAllByText('react');
      expect(reactTags).toHaveLength(1); // Should only appear once in tags
    });

    test('handles posts without tags', () => {
      const dataWithoutTags = {
        allWordPressPost: {
          nodes: [
            {
              id: 1,
              title: 'Post without tags',
              excerpt: 'Excerpt',
              slug: 'post-without-tags',
              date: '2023-01-01',
              author: 'Author',
              categories: ['General'],
              tags: [],
              featuredImage: null,
            },
          ],
        },
        allWordPressCategory: { nodes: [] },
      };

      render(<PostsPage data={dataWithoutTags} />);

      expect(screen.getByText('Post without tags')).toBeInTheDocument();
      expect(screen.getByText('General')).toBeInTheDocument();
    });

    test('handles posts without categories', () => {
      const dataWithoutCategories = {
        allWordPressPost: {
          nodes: [
            {
              id: 1,
              title: 'Post without categories',
              excerpt: 'Excerpt',
              slug: 'post-without-categories',
              date: '2023-01-01',
              author: 'Author',
              categories: [],
              tags: ['tag1'],
              featuredImage: null,
            },
          ],
        },
        allWordPressCategory: { nodes: [] },
      };

      render(<PostsPage data={dataWithoutCategories} />);

      expect(screen.getByText('Post without categories')).toBeInTheDocument();
      expect(screen.getByText('tag1')).toBeInTheDocument();
    });
  });
});