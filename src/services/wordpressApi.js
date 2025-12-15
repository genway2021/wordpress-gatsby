// WordPress API 服务
const WORDPRESS_URL = process.env.GATSBY_WORDPRESS_URL

// 检查是否配置了 WordPress URL
export const isWordPressConfigured = () => {
  return !!WORDPRESS_URL && WORDPRESS_URL !== 'https://your-wordpress-site.com';
}

// HTML解码函数
const decodeHtmlEntities = (text) => {
  if (!text) return text;
  
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

// 获取单个文章详情
export const getPost = async (slug) => {
  try {
    const siteName = WORDPRESS_URL.replace('https://', '').replace('http://', '').replace('.wordpress.com', '');
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${siteName}.wordpress.com/posts?slug=${slug}&_embed`);
    const posts = await response.json();
    
    if (!posts || posts.length === 0) {
      throw new Error(`Post with slug "${slug}" not found`);
    }
    
    const post = posts[0];
    
    // 获取作者信息
    let author = "Someone";
    if (post._embedded && post._embedded.author && post._embedded.author[0]) {
      author = post._embedded.author[0].name;
    }
    
    // 获取分类信息
    const categories = [];
    if (post._embedded && post._embedded['wp:term']) {
      post._embedded['wp:term'].forEach(termGroup => {
        termGroup.forEach(term => {
          if (term.taxonomy === 'category') {
            categories.push(term.name);
          }
        });
      });
    }
    
    // 获取标签信息
    const tags = [];
    if (post._embedded && post._embedded['wp:term']) {
      post._embedded['wp:term'].forEach(termGroup => {
        termGroup.forEach(term => {
          if (term.taxonomy === 'post_tag') {
            tags.push(term.name);
          }
        });
      });
    }
    
    // 获取特色图片
    let featuredImage = null;
    if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
      featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
    }
    
    return {
      id: post.id,
      title: decodeHtmlEntities(post.title.rendered),
      content: post.content.rendered,
      excerpt: decodeHtmlEntities(post.excerpt.rendered),
      slug: post.slug,
      date: post.date,
      modified: post.modified,
      author: author,
      authorAvatar: post._embedded?.author?.[0]?.avatar_urls?.['96'] || null,
      featuredImage: featuredImage,
      categories: categories,
      tags: tags,
      readTime: Math.ceil(post.content.rendered.split(' ').length / 200) + ' min read'
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

// 从分类获取社交媒体数据
export const getSocialMediaFromCategory = async () => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/categories?slug=socials`);
    const categories = await response.json();
    
    if (categories.length === 0) {
      throw new Error('Socials category not found');
    }
    
    const category = categories[0];
    const description = category.description;
    
    if (!description) {
      throw new Error('No description found in socials category');
    }
    
    try {
      const socialsData = JSON.parse(description);
      
      // 确保返回的是数组格式
      if (Array.isArray(socialsData)) {
        return socialsData;
      } else if (socialsData.socials && Array.isArray(socialsData.socials)) {
        return socialsData.socials;
      } else {
        throw new Error('Invalid socials data structure');
      }
    } catch (parseError) {
      console.error('Error parsing socials data:', parseError);
      throw new Error('Invalid JSON in socials category description');
    }
  } catch (error) {
    console.error('Error fetching socials from category:', error);
    throw error;
  }
};

// 从分类获取Hero数据
export const getHeroFromCategory = async () => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/categories?slug=hero`);
    const categories = await response.json();
    
    if (categories.length === 0) {
      throw new Error('Hero category not found');
    }
    
    const category = categories[0];
    const description = category.description;
    
    if (!description) {
      throw new Error('No description found in hero category');
    }
    
    try {
      const heroData = JSON.parse(description);
      return heroData;
    } catch (parseError) {
      console.error('Error parsing hero data:', parseError);
      throw new Error('Invalid JSON in hero category description');
    }
  } catch (error) {
    console.error('Error fetching hero from category:', error);
    throw error;
  }
};

// 从分类获取About数据
export const getAboutFromCategory = async () => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/categories?slug=about`);
    const categories = await response.json();
    
    if (categories.length === 0) {
      throw new Error('About category not found');
    }
    
    const category = categories[0];
    const description = category.description;
    
    if (!description) {
      throw new Error('No description found in about category');
    }
    
    try {
      const aboutData = JSON.parse(description);
      return aboutData;
    } catch (parseError) {
      console.error('Error parsing about data:', parseError);
      throw new Error('Invalid JSON in about category description');
    }
  } catch (error) {
    console.error('Error fetching about from category:', error);
    throw error;
  }
};

// 从分类获取Footer数据
export const getFooterFromCategory = async () => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/categories?slug=footer`);
    const categories = await response.json();
    
    if (categories.length === 0) {
      throw new Error('Footer category not found');
    }
    
    const category = categories[0];
    const description = category.description;
    
    if (!description) {
      throw new Error('No description found in footer category');
    }
    
    try {
      const footerData = JSON.parse(description);
      return footerData;
    } catch (parseError) {
      console.error('Error parsing footer data:', parseError);
      throw new Error('Invalid JSON in footer category description');
    }
  } catch (error) {
    console.error('Error fetching footer from category:', error);
    throw error;
  }
};

// 从分类获取Posts页面元数据
export const getPostsPageMetaFromCategory = async () => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/categories?slug=posts`);
    const categories = await response.json();
    
    if (categories.length === 0) {
      throw new Error('Posts category not found');
    }
    
    const category = categories[0];
    const description = category.description;
    
    if (!description) {
      throw new Error('No description found in posts category');
    }
    
    try {
      const postsData = JSON.parse(description);
      return postsData;
    } catch (parseError) {
      console.error('Error parsing posts data:', parseError);
      throw new Error('Invalid JSON in posts category description');
    }
  } catch (error) {
    console.error('Error fetching posts from category:', error);
    throw error;
  }
};

// 从分类获取Comments页面元数据
export const getCommentsPageMetaFromCategory = async () => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/categories?slug=comments`);
    const categories = await response.json();
    
    if (categories.length === 0) {
      throw new Error('Comments category not found');
    }
    
    const category = categories[0];
    const description = category.description;
    
    if (!description) {
      throw new Error('No description found in comments category');
    }
    
    try {
      const commentsData = JSON.parse(description);
      return commentsData;
    } catch (parseError) {
      console.error('Error parsing comments data:', parseError);
      throw new Error('Invalid JSON in comments category description');
    }
  } catch (error) {
    console.error('Error fetching comments from category:', error);
    throw error;
  }
};

// 从分类获取Contact数据
export const getContactFromCategory = async () => {
  try {
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/categories?slug=contact`);
    const categories = await response.json();
    
    if (categories.length === 0) {
      throw new Error('Contact category not found');
    }
    
    const category = categories[0];
    const description = category.description;
    
    if (!description) {
      throw new Error('No description found in contact category');
    }
    
    try {
      const contactData = JSON.parse(description);
      return contactData;
    } catch (parseError) {
      console.error('Error parsing contact data:', parseError);
      throw new Error('Invalid JSON in contact category description');
    }
  } catch (error) {
    console.error('Error fetching contact from category:', error);
    throw error;
  }
}; 