import * as React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"

const getReadTime = (html) => {
  // 简单估算：每分钟200字
  if (!html) return '';
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.length;
  const min = Math.max(1, Math.round(words / 200));
  return `${min} min read`;
};

const PostPage = ({ pageContext }) => {
  const { post } = pageContext;

  if (!post) {
    return (
      <Layout>
        <div style={{ padding: '4rem', textAlign: 'center' }}>Post not found</div>
      </Layout>
    );
  }

  // 兜底处理头像和阅读时长
  const authorAvatar = post.authorAvatar || '/image/20943608.jpeg';
  const readTime = post.readTime || getReadTime(post.content);

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />
      <style dangerouslySetInnerHTML={{
        __html: `
          #gatsby-focus-wrapper > div[style*='max-width'] {
            max-width: 1200px !important;
          }
          .posts-page-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
          }
          .post-content p {
            max-width: none !important;
          }
        `
      }} />
      <main className="posts-page-container">
        {/* 顶部卡片 */}
        <div className="post-header-card" style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          marginBottom: '2.5rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {/* 标题 */}
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: '800',
              background: 'linear-gradient(90deg, #76cfc5 0%, #ffb400 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.2,
              margin: 0,
              wordBreak: 'break-word',
              textAlign: 'left',
              width: '100%',
              display: 'block'
            }}
          >
            {post.title}
          </h1>
          {/* 标签 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1.2rem 0' }}>
            {post.tags && post.tags.map(tag => (
              <span key={tag} style={{
                padding: '0.4rem 1rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                border: '2px solid #76cfc5',
                borderRadius: '20px',
                backgroundColor: 'rgba(118,207,197,0.1)',
                color: '#76cfc5'
              }}>{tag}</span>
            ))}
          </div>
          {/* 作者信息区块（副标题下方，横向排列） */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <img
              src={authorAvatar}
              alt={post.author}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #76cfc5',
                flexShrink: 0,
                display: 'block',
                verticalAlign: 'middle',
                margin: 0
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#333', lineHeight: 1.2 }}>{post.author}</span>
              <span style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.2 }}>
                {post.date ? new Date(post.date).toLocaleDateString() : ''}
              </span>
              <span style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.2 }}>{readTime}</span>
            </div>
          </div>
        </div>
        {/* 正文内容 */}
        <div className="post-content" style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef',
          width: '100%',
          boxSizing: 'border-box',
        }} dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
    </Layout>
  )
}

export default PostPage 