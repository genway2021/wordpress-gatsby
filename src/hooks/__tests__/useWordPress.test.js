import { renderHook, act } from '@testing-library/react';
import {
  useSocialMediaFromCategory,
  useHeroFromCategory,
  useAboutFromCategory,
  useFooterFromCategory,
  usePostsPageMetaFromCategory,
  useCommentsPageMetaFromCategory,
  useContactFromCategory,
} from '../useWordPress';

// Mock the WordPress API functions
jest.mock('../../services/wordpressApi', () => ({
  getSocialMediaFromCategory: jest.fn(),
  getHeroFromCategory: jest.fn(),
  getAboutFromCategory: jest.fn(),
  getFooterFromCategory: jest.fn(),
  getPostsPageMetaFromCategory: jest.fn(),
  getCommentsPageMetaFromCategory: jest.fn(),
  getContactFromCategory: jest.fn(),
}));

import {
  getSocialMediaFromCategory,
  getHeroFromCategory,
  getAboutFromCategory,
  getFooterFromCategory,
  getPostsPageMetaFromCategory,
  getCommentsPageMetaFromCategory,
  getContactFromCategory,
} from '../../services/wordpressApi';

describe('WordPress Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSocialMediaFromCategory', () => {
    test('initializes with loading state', () => {
      getSocialMediaFromCategory.mockImplementation(() => new Promise(() => {}));

      const { result } = renderHook(() => useSocialMediaFromCategory());

      expect(result.current.loading).toBe(true);
      expect(result.current.socialMedia).toEqual([]);
      expect(result.current.error).toBe(null);
    });

    test('fetches social media data successfully', async () => {
      const mockData = [
        { platform: 'twitter', url: 'https://twitter.com/test' },
        { platform: 'github', url: 'https://github.com/test' }
      ];
      getSocialMediaFromCategory.mockResolvedValue(mockData);

      const { result } = renderHook(() => useSocialMediaFromCategory());

      expect(result.current.loading).toBe(true);

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.socialMedia).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });

    test('handles API errors correctly', async () => {
      const mockError = new Error('API Error');
      getSocialMediaFromCategory.mockRejectedValue(mockError);

      const { result } = renderHook(() => useSocialMediaFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.socialMedia).toEqual([]);
      expect(result.current.error).toBe('API Error');
    });

    test('calls API function on mount', () => {
      getSocialMediaFromCategory.mockResolvedValue([]);

      renderHook(() => useSocialMediaFromCategory());

      expect(getSocialMediaFromCategory).toHaveBeenCalledTimes(1);
    });

    test('does not call API function on re-render', () => {
      getSocialMediaFromCategory.mockResolvedValue([]);

      const { rerender } = renderHook(() => useSocialMediaFromCategory());

      rerender();

      expect(getSocialMediaFromCategory).toHaveBeenCalledTimes(1);
    });
  });

  describe('useHeroFromCategory', () => {
    test('initializes with loading state', () => {
      getHeroFromCategory.mockImplementation(() => new Promise(() => {}));

      const { result } = renderHook(() => useHeroFromCategory());

      expect(result.current.loading).toBe(true);
      expect(result.current.heroData).toBe(null);
      expect(result.current.error).toBe(null);
    });

    test('fetches hero data successfully', async () => {
      const mockData = {
        title: 'Hero Title',
        subtitle: 'Hero Subtitle',
        description: 'Hero Description'
      };
      getHeroFromCategory.mockResolvedValue(mockData);

      const { result } = renderHook(() => useHeroFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.heroData).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });

    test('handles API errors correctly', async () => {
      const mockError = new Error('Hero fetch failed');
      getHeroFromCategory.mockRejectedValue(mockError);

      const { result } = renderHook(() => useHeroFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.heroData).toBe(null);
      expect(result.current.error).toBe('Hero fetch failed');
    });
  });

  describe('useAboutFromCategory', () => {
    test('fetches about data successfully', async () => {
      const mockData = {
        title: 'About Me',
        content: 'About content',
        image: 'https://example.com/about.jpg'
      };
      getAboutFromCategory.mockResolvedValue(mockData);

      const { result } = renderHook(() => useAboutFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.aboutData).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });

    test('handles API errors correctly', async () => {
      getAboutFromCategory.mockRejectedValue(new Error('About error'));

      const { result } = renderHook(() => useAboutFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.error).toBe('About error');
    });
  });

  describe('useFooterFromCategory', () => {
    test('fetches footer data successfully', async () => {
      const mockData = {
        text: '© 2023 Test Site',
        links: [{ url: 'https://example.com', title: 'Example' }],
        github: { url: 'https://github.com/test', text: 'GitHub' }
      };
      getFooterFromCategory.mockResolvedValue(mockData);

      const { result } = renderHook(() => useFooterFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.footerData).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });

    test('handles footer wrapper object', async () => {
      const mockData = {
        footer: {
          text: '© 2023 Test Site',
          links: [{ url: 'https://example.com', title: 'Example' }]
        }
      };
      getFooterFromCategory.mockResolvedValue(mockData);

      const { result } = renderHook(() => useFooterFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.footerData).toEqual(mockData.footer);
    });

    test('handles API errors correctly', async () => {
      getFooterFromCategory.mockRejectedValue(new Error('Footer error'));

      const { result } = renderHook(() => useFooterFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.error).toBe('Footer error');
    });
  });

  describe('usePostsPageMetaFromCategory', () => {
    test('fetches posts page metadata successfully', async () => {
      const mockData = {
        title: 'Posts Page',
        subtitle: 'All posts',
        description: 'List of all posts'
      };
      getPostsPageMetaFromCategory.mockResolvedValue(mockData);

      const { result } = renderHook(() => usePostsPageMetaFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.meta).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });

    test('handles API errors correctly', async () => {
      getPostsPageMetaFromCategory.mockRejectedValue(new Error('Posts meta error'));

      const { result } = renderHook(() => usePostsPageMetaFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.error).toBe('Posts meta error');
    });
  });

  describe('useCommentsPageMetaFromCategory', () => {
    test('fetches comments page metadata successfully', async () => {
      const mockData = {
        title: 'Comments Page',
        guidelines: ['Be respectful', 'Stay on topic'],
        description: 'Comments section'
      };
      getCommentsPageMetaFromCategory.mockResolvedValue(mockData);

      const { result } = renderHook(() => useCommentsPageMetaFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.meta).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });

    test('handles API errors correctly', async () => {
      getCommentsPageMetaFromCategory.mockRejectedValue(new Error('Comments meta error'));

      const { result } = renderHook(() => useCommentsPageMetaFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.error).toBe('Comments meta error');
    });
  });

  describe('useContactFromCategory', () => {
    test('fetches contact data successfully', async () => {
      const mockData = {
        email: 'test@example.com',
        phone: '+1234567890',
        address: '123 Test St'
      };
      getContactFromCategory.mockResolvedValue(mockData);

      const { result } = renderHook(() => useContactFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.contactData).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });

    test('handles API errors correctly', async () => {
      getContactFromCategory.mockRejectedValue(new Error('Contact error'));

      const { result } = renderHook(() => useContactFromCategory());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.error).toBe('Contact error');
    });
  });

  describe('Common Hook Behaviors', () => {
    test('all hooks set loading to false after completion', async () => {
      const hooks = [
        () => useSocialMediaFromCategory(),
        () => useHeroFromCategory(),
        () => useAboutFromCategory(),
        () => useFooterFromCategory(),
        () => usePostsPageMetaFromCategory(),
        () => useCommentsPageMetaFromCategory(),
        () => useContactFromCategory(),
      ];

      const apiFunctions = [
        getSocialMediaFromCategory,
        getHeroFromCategory,
        getAboutFromCategory,
        getFooterFromCategory,
        getPostsPageMetaFromCategory,
        getCommentsPageMetaFromCategory,
        getContactFromCategory,
      ];

      // Mock all API functions to resolve
      apiFunctions.forEach(fn => fn.mockResolvedValue({}));

      for (const hook of hooks) {
        const { result } = renderHook(hook);
        
        expect(result.current.loading).toBe(true);

        await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.loading).toBe(false);
      }
    });

    test('all hooks initialize with correct default values', () => {
      const hooks = [
        () => useSocialMediaFromCategory(),
        () => useHeroFromCategory(),
        () => useAboutFromCategory(),
        () => useFooterFromCategory(),
        () => usePostsPageMetaFromCategory(),
        () => useCommentsPageMetaFromCategory(),
        () => useContactFromCategory(),
      ];

      // Mock all API functions to never resolve
      const apiFunctions = [
        getSocialMediaFromCategory,
        getHeroFromCategory,
        getAboutFromCategory,
        getFooterFromCategory,
        getPostsPageMetaFromCategory,
        getCommentsPageMetaFromCategory,
        getContactFromCategory,
      ];

      apiFunctions.forEach(fn => fn.mockImplementation(() => new Promise(() => {})));

      const results = hooks.map(hook => renderHook(hook).result.current);

      // Social media hook
      expect(results[0]).toEqual({
        socialMedia: [],
        loading: true,
        error: null,
      });

      // Hero hook
      expect(results[1]).toEqual({
        heroData: null,
        loading: true,
        error: null,
      });

      // About hook
      expect(results[2]).toEqual({
        aboutData: null,
        loading: true,
        error: null,
      });

      // Footer hook
      expect(results[3]).toEqual({
        footerData: null,
        loading: true,
        error: null,
      });

      // Posts meta hook
      expect(results[4]).toEqual({
        meta: null,
        loading: true,
        error: null,
      });

      // Comments meta hook
      expect(results[5]).toEqual({
        meta: null,
        loading: true,
        error: null,
      });

      // Contact hook
      expect(results[6]).toEqual({
        contactData: null,
        loading: true,
        error: null,
      });
    });

    test('all hooks handle null error messages', async () => {
      const hooks = [
        () => useSocialMediaFromCategory(),
        () => useHeroFromCategory(),
        () => useAboutFromCategory(),
        () => useFooterFromCategory(),
        () => usePostsPageMetaFromCategory(),
        () => useCommentsPageMetaFromCategory(),
        () => useContactFromCategory(),
      ];

      const apiFunctions = [
        getSocialMediaFromCategory,
        getHeroFromCategory,
        getAboutFromCategory,
        getFooterFromCategory,
        getPostsPageMetaFromCategory,
        getCommentsPageMetaFromCategory,
        getContactFromCategory,
      ];

      // Mock errors without messages
      apiFunctions.forEach(fn => fn.mockRejectedValue({ message: null }));

      for (const hook of hooks) {
        const { result } = renderHook(hook);

        await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.error).toBe(null);
        expect(result.current.loading).toBe(false);
      }
    });
  });
});