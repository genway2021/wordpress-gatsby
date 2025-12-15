// Mock document.createElement for HTML decoding
global.document = {
  createElement: jest.fn((tag) => {
    if (tag === 'textarea') {
      return {
        innerHTML: '',
        get value() {
          return this.innerHTML;
        }
      };
    }
    return {};
  })
};

// Mock fetch
global.fetch = jest.fn();

import {
  isWordPressConfigured,
  getPost,
  getSocialMediaFromCategory,
  getHeroFromCategory,
  getAboutFromCategory,
  getFooterFromCategory,
  getPostsPageMetaFromCategory,
  getCommentsPageMetaFromCategory,
  getContactFromCategory,
} from '../wordpressApi';

// Mock environment variables
const originalEnv = process.env;

describe('WordPress API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.GATSBY_WORDPRESS_URL = 'https://example.wordpress.com';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('isWordPressConfigured', () => {
    test('returns true when WordPress URL is configured', () => {
      process.env.GATSBY_WORDPRESS_URL = 'https://my-site.wordpress.com';
      
      expect(isWordPressConfigured()).toBe(true);
    });

    test('returns false when WordPress URL is not set', () => {
      delete process.env.GATSBY_WORDPRESS_URL;
      
      expect(isWordPressConfigured()).toBe(false);
    });

    test('returns false when WordPress URL is default placeholder', () => {
      process.env.GATSBY_WORDPRESS_URL = 'https://your-wordpress-site.com';
      
      expect(isWordPressConfigured()).toBe(false);
    });

    test('returns false when WordPress URL is empty', () => {
      process.env.GATSBY_WORDPRESS_URL = '';
      
      expect(isWordPressConfigured()).toBe(false);
    });
  });

  describe('decodeHtmlEntities', () => {
    test('decodes HTML entities correctly', () => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = '&amp;&lt;&gt;&quot;&#39;';
      expect(textarea.value).toBe('&<>"\'');
    });

    test('returns original text when no HTML entities', () => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = 'plain text';
      expect(textarea.value).toBe('plain text');
    });

    test('handles empty string', () => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = '';
      expect(textarea.value).toBe('');
    });

    test('handles null input', () => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = null;
      expect(textarea.value).toBe('');
    });
  });

  describe('getPost', () => {
    const mockPostResponse = {
      data: [
        {
          id: 1,
          slug: 'test-post',
          title: { rendered: 'Test Post Title' },
          content: { rendered: '<p>Test content</p>' },
          excerpt: { rendered: '<p>Test excerpt</p>' },
          date: '2023-01-01T00:00:00',
          modified: '2023-01-02T00:00:00',
          _embedded: {
            author: [
              {
                name: 'Test Author',
                avatar_urls: { '96': 'https://example.com/avatar.jpg' }
              }
            ],
            'wp:term': [
              [
                { name: 'Category1', taxonomy: 'category' },
                { name: 'Tag1', taxonomy: 'post_tag' }
              ],
              [
                { name: 'Category2', taxonomy: 'category' }
              ]
            ],
            'wp:featuredmedia': [
              { source_url: 'https://example.com/featured.jpg' }
            ]
          }
        }
      ]
    };

    test('fetches and returns post data correctly', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockPostResponse.data)
      });

      const result = await getPost('test-post');

      expect(fetch).toHaveBeenCalledWith(
        'https://public-api.wordpress.com/wp/v2/sites/example.wordpress.com/posts?slug=test-post&_embed'
      );
      expect(result).toEqual({
        id: 1,
        title: 'Test Post Title',
        content: '<p>Test content</p>',
        excerpt: '<p>Test excerpt</p>',
        slug: 'test-post',
        date: '2023-01-01T00:00:00',
        modified: '2023-01-02T00:00:00',
        author: 'Test Author',
        authorAvatar: 'https://example.com/avatar.jpg',
        featuredImage: 'https://example.com/featured.jpg',
        categories: ['Category1', 'Category2'],
        tags: ['Tag1'],
        readTime: '2 min read'
      });
    });

    test('handles post not found error', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([])
      });

      await expect(getPost('non-existent-post')).rejects.toThrow(
        'Post with slug "non-existent-post" not found'
      );
    });

    test('handles missing embedded data gracefully', async () => {
      const postWithoutEmbedded = {
        data: [
          {
            id: 1,
            slug: 'test-post',
            title: { rendered: 'Test Post' },
            content: { rendered: '<p>Content</p>' },
            excerpt: { rendered: '<p>Excerpt</p>' },
            date: '2023-01-01T00:00:00',
            modified: '2023-01-02T00:00:00',
            _embedded: {}
          }
        ]
      };

      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(postWithoutEmbedded.data)
      });

      const result = await getPost('test-post');

      expect(result.author).toBe('Someone');
      expect(result.categories).toEqual([]);
      expect(result.tags).toEqual([]);
      expect(result.featuredImage).toBeNull();
      expect(result.authorAvatar).toBeNull();
    });

    test('handles fetch error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getPost('test-post')).rejects.toThrow('Network error');
    });

    test('calculates read time correctly', async () => {
      const longContentPost = {
        data: [
          {
            ...mockPostResponse.data[0],
            content: { rendered: 'word '.repeat(400) } // 400 words
          }
        ]
      };

      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(longContentPost.data)
      });

      const result = await getPost('test-post');
      expect(result.readTime).toBe('3 min read');
    });
  });

  describe('getSocialMediaFromCategory', () => {
    const mockSocialsData = [
      { platform: 'twitter', url: 'https://twitter.com/test' },
      { platform: 'github', url: 'https://github.com/test' }
    ];

    test('fetches and returns social media data as array', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([{
          description: JSON.stringify(mockSocialsData)
        }])
      });

      const result = await getSocialMediaFromCategory();

      expect(fetch).toHaveBeenCalledWith(
        'https://example.wordpress.com/wp-json/wp/v2/categories?slug=socials'
      );
      expect(result).toEqual(mockSocialsData);
    });

    test('handles nested socials structure', async () => {
      const nestedData = { socials: mockSocialsData };
      
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([{
          description: JSON.stringify(nestedData)
        }])
      });

      const result = await getSocialMediaFromCategory();
      expect(result).toEqual(mockSocialsData);
    });

    test('throws error when category not found', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([])
      });

      await expect(getSocialMediaFromCategory()).rejects.toThrow('Socials category not found');
    });

    test('throws error when description is missing', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([{
          description: ''
        }])
      });

      await expect(getSocialMediaFromCategory()).rejects.toThrow('No description found in socials category');
    });

    test('throws error when JSON is invalid', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([{
          description: 'invalid json'
        }])
      });

      await expect(getSocialMediaFromCategory()).rejects.toThrow('Invalid JSON in socials category description');
    });

    test('throws error when data structure is invalid', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([{
          description: JSON.stringify({ invalid: 'structure' })
        }])
      });

      await expect(getSocialMediaFromCategory()).rejects.toThrow('Invalid socials data structure');
    });
  });

  describe('getHeroFromCategory', () => {
    const mockHeroData = {
      title: 'Hero Title',
      subtitle: 'Hero Subtitle',
      description: 'Hero Description'
    };

    test('fetches and returns hero data', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([{
          description: JSON.stringify(mockHeroData)
        }])
      });

      const result = await getHeroFromCategory();

      expect(fetch).toHaveBeenCalledWith(
        'https://example.wordpress.com/wp-json/wp/v2/categories?slug=hero'
      );
      expect(result).toEqual(mockHeroData);
    });

    test('throws error when hero category not found', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([])
      });

      await expect(getHeroFromCategory()).rejects.toThrow('Hero category not found');
    });

    test('throws error when JSON is invalid', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([{
          description: 'invalid json'
        }])
      });

      await expect(getHeroFromCategory()).rejects.toThrow('Invalid JSON in hero category description');
    });
  });

  describe('getAboutFromCategory', () => {
    const mockAboutData = {
      title: 'About Me',
      content: 'About content',
      image: 'https://example.com/about.jpg'
    };

    test('fetches and returns about data', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([{
          description: JSON.stringify(mockAboutData)
        }])
      });

      const result = await getAboutFromCategory();

      expect(fetch).toHaveBeenCalledWith(
        'https://example.wordpress.com/wp-json/wp/v2/categories?slug=about'
      );
      expect(result).toEqual(mockAboutData);
    });

    test('throws error when about category not found', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([])
      });

      await expect(getAboutFromCategory()).rejects.toThrow('About category not found');
    });
  });

  describe('getFooterFromCategory', () => {
    const mockFooterData = {
      text: '© 2023 Test Site',
      links: [{ url: 'https://example.com', title: 'Example' }],
      github: { url: 'https://github.com/test', text: 'GitHub' }
    };

    test('fetches and returns footer data', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([{
          description: JSON.stringify(mockFooterData)
        }])
      });

      const result = await getFooterFromCategory();

      expect(fetch).toHaveBeenCalledWith(
        'https://example.wordpress.com/wp-json/wp/v2/categories?slug=footer'
      );
      expect(result).toEqual(mockFooterData);
    });

    test('throws error when footer category not found', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([])
      });

      await expect(getFooterFromCategory()).rejects.toThrow('Footer category not found');
    });
  });

  describe('getPostsPageMetaFromCategory', () => {
    const mockPostsData = {
      title: 'Posts Page',
      subtitle: 'All posts',
      description: 'List of all posts'
    };

    test('fetches and returns posts page metadata', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([{
          description: JSON.stringify(mockPostsData)
        }])
      });

      const result = await getPostsPageMetaFromCategory();

      expect(fetch).toHaveBeenCalledWith(
        'https://example.wordpress.com/wp-json/wp/v2/categories?slug=posts'
      );
      expect(result).toEqual(mockPostsData);
    });

    test('throws error when posts category not found', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([])
      });

      await expect(getPostsPageMetaFromCategory()).rejects.toThrow('Posts category not found');
    });
  });

  describe('getCommentsPageMetaFromCategory', () => {
    const mockCommentsData = {
      title: 'Comments Page',
      guidelines: ['Be respectful', 'Stay on topic'],
      description: 'Comments section'
    };

    test('fetches and returns comments page metadata', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([{
          description: JSON.stringify(mockCommentsData)
        }])
      });

      const result = await getCommentsPageMetaFromCategory();

      expect(fetch).toHaveBeenCalledWith(
        'https://example.wordpress.com/wp-json/wp/v2/categories?slug=comments'
      );
      expect(result).toEqual(mockCommentsData);
    });

    test('throws error when comments category not found', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([])
      });

      await expect(getCommentsPageMetaFromCategory()).rejects.toThrow('Comments category not found');
    });
  });

  describe('getContactFromCategory', () => {
    const mockContactData = {
      email: 'test@example.com',
      phone: '+1234567890',
      address: '123 Test St'
    };

    test('fetches and returns contact data', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([{
          description: JSON.stringify(mockContactData)
        }])
      });

      const result = await getContactFromCategory();

      expect(fetch).toHaveBeenCalledWith(
        'https://example.wordpress.com/wp-json/wp/v2/categories?slug=contact'
      );
      expect(result).toEqual(mockContactData);
    });

    test('throws error when contact category not found', async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([])
      });

      await expect(getContactFromCategory()).rejects.toThrow('Contact category not found');
    });
  });

  describe('Common Error Handling', () => {
    test('handles network errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getHeroFromCategory()).rejects.toThrow('Network error');
    });

    test('handles HTTP errors', async () => {
      fetch.mockRejectedValueOnce(new Error('HTTP 404 Not Found'));

      await expect(getFooterFromCategory()).rejects.toThrow('HTTP 404 Not Found');
    });

    test('handles JSON parse errors consistently across all functions', async () => {
      fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue([{
          description: 'invalid json'
        }])
      });

      const functions = [
        getSocialMediaFromCategory,
        getHeroFromCategory,
        getAboutFromCategory,
        getFooterFromCategory,
        getPostsPageMetaFromCategory,
        getCommentsPageMetaFromCategory,
        getContactFromCategory
      ];

      for (const func of functions) {
        await expect(func()).rejects.toThrow(/Invalid JSON/);
      }
    });
  });
});