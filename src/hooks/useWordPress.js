import { useState, useEffect } from 'react'
import { 
  getSocialMediaFromCategory,
  getHeroFromCategory,
  getAboutFromCategory,
  getFooterFromCategory,
  getPostsPageMetaFromCategory,
  getCommentsPageMetaFromCategory,
  getContactFromCategory
} from '../services/wordpressApi'

// 从分类获取社交媒体数据的 Hook
export const useSocialMediaFromCategory = () => {
  const [socialMedia, setSocialMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSocialMediaFromCategory();
        setSocialMedia(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMedia();
  }, []);

  return { socialMedia, loading, error };
};

// 专门请求hero数据的Hook
export const useHeroFromCategory = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getHeroFromCategory();
        setHeroData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  return { heroData, loading, error };
};

// 专门请求aboutData的Hook
export const useAboutFromCategory = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAboutFromCategory();
        setAboutData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  return { aboutData, loading, error };
};

// 专门请求footer数据的Hook
export const useFooterFromCategory = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFooterFromCategory();
        setFooterData(data.footer || data); // 兼容直接是footer对象或外层包裹footer
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  return { footerData, loading, error };
};

// 专门请求posts页面主标题、副标题的Hook
export const usePostsPageMetaFromCategory = () => {
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPostsPageMetaFromCategory();
        setMeta(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMeta();
  }, []);

  return { meta, loading, error };
};

// 专门请求comments页面主标题、副标题、准则列表的Hook
export const useCommentsPageMetaFromCategory = () => {
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCommentsPageMetaFromCategory();
        setMeta(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMeta();
  }, []);

  return { meta, loading, error };
};

// 专门请求contact页面数据的Hook
export const useContactFromCategory = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getContactFromCategory();
        setContactData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  return { contactData, loading, error };
}; 