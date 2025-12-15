import * as React from "react"
import { useState, useMemo } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PostsPage = ({ data }) => {
  // 从GraphQL查询结果中获取数据
  const postsData = data.allWordPressPost.nodes
  const categoriesData = data.allWordPressCategory.nodes
  
  // 查找Posts分类
  const postsCategory = categoriesData.find(cat => 
    cat.name === 'Posts' || 
    cat.name === 'posts' ||
    cat.name.toLowerCase().includes('posts')
  )
  
  const metaData = postsCategory?.parsedData || {}
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [expandedPosts, setExpandedPosts] = useState(new Set())
  const [hoveredRow, setHoveredRow] = useState(null)

  // 获取所有唯一的标签
  const allTags = useMemo(() => {
    const tags = new Set()
    if (postsData && Array.isArray(postsData)) {
      postsData.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach(tag => tags.add(tag))
        }
      })
    }
    return Array.from(tags).sort()
  }, [postsData])

  // 筛选文章
  const filteredPosts = useMemo(() => {
    if (!postsData || !Array.isArray(postsData)) {
      return []
    }
    return postsData.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => post.tags.includes(tag))
      
      return matchesSearch && matchesTags
    })
  }, [postsData, searchTerm, selectedTags])

  // 按日期分组posts
  const groupedPosts = useMemo(() => {
    const groups = {};
    filteredPosts.forEach(post => {
      // 提取日期部分，去掉时间部分
      const dateOnly = post.date.split('T')[0];
      if (!groups[dateOnly]) groups[dateOnly] = [];
      groups[dateOnly].push(post);
    });
    // 保持日期降序
    return Object.entries(groups).sort((a, b) => new Date(b[0]) - new Date(a[0]));
  }, [filteredPosts]);

  // 切换标签选择
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // 切换文章展开状态
  const toggleExpanded = (postId) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 柳条装饰SVG组件
  const WillowDecoration = ({ isLeft = true }) => (
    <div
      style={{
        width: '24px',
        height: '36px',
        transform: isLeft ? 'scaleX(1)' : 'scaleX(-1)',
        opacity: 0.8,
        background: 'linear-gradient(135deg, #76cfc5 0%, #ffb400 50%, #ec6664 100%)',
        WebkitMask: 'url(/svg/willow-decoration.svg) no-repeat center',
        WebkitMaskSize: 'contain',
        mask: 'url(/svg/willow-decoration.svg) no-repeat center',
        maskSize: 'contain'
      }}
    />
  )

  // 在PostsPage组件内添加一个生成随机时长的函数
  const getRandomReadTime = () => `${Math.floor(Math.random() * 16) + 5} min read`;

  return (
  <Layout>
      <Seo 
        title={metaData?.title || 'Posts'} 
        description={metaData?.subtitle || 'Browse all posts'}
      />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            background: linear-gradient(120deg, #f8fafc 0%, #e6f7f4 100%) !important;
            min-height: 100vh;
          }
          :root {
            --size-content: 1200px !important;
          }
          .posts-page-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 2rem !important;
            /* background: white !important; */
          }
        `
      }} />
      
      <div className="posts-page-container">
        {/* 页面标题 */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, #76cfc5 0%, #ffb400 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            {metaData?.title || 'Posts'}
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666', 
            margin: '0 auto'
          }}>
            {metaData?.subtitle || 'Browse all posts'}
          </p>
        </div>

        {/* 搜索和筛选区域 */}
        <div style={{ 
          marginBottom: '2rem',
          padding: '1.5rem 0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '1rem',
          }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              color: '#333',
              margin: 0,
              whiteSpace: 'nowrap'
            }}>
              Filter by tags:
            </h3>
            <div style={{ flex: 1 }} />
            <div style={{ width: '300px' }}>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#76cfc5'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            width: '100%'
          }}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  border: '2px solid',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: selectedTags.includes(tag) ? '#76cfc5' : 'transparent',
                  borderColor: selectedTags.includes(tag) ? '#76cfc5' : '#ddd',
                  color: selectedTags.includes(tag) ? 'white' : '#666'
                }}
                onMouseEnter={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.target.style.borderColor = '#76cfc5'
                    e.target.style.color = '#76cfc5'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.target.style.borderColor = '#ddd'
                    e.target.style.color = '#666'
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 文章列表 */}
        <div style={{ marginTop: '2rem' }}>
          {filteredPosts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              color: '#666',
              fontSize: '1.1rem'
            }}>
              No posts found matching your criteria.
            </div>
          ) : (
            groupedPosts.map(([date, posts]) => (
              <div key={date} style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                marginBottom: '2.5rem',
                padding: '2.5rem 2rem 2rem 2rem',
                border: '1px solid #e9ecef',
              }}>
                <div style={{
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#179b8e',
                  marginBottom: '2rem',
                  letterSpacing: '0.02em',
                }}>{formatDate(date)}</div>
                <div style={{ width: '100%' }}>
                  {posts.map((post, index) => {
                    const isExpanded = expandedPosts.has(post.wordpressId);
                    return (
                      <React.Fragment key={post.wordpressId}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'stretch',
                          /* borderBottom: index === posts.length - 1 ? 'none' : '1px solid #f0f0f0', */
                          transition: 'all 0.3s',
                          cursor: 'pointer',
                          background: isExpanded ? 'rgba(118,207,197,0.06)' : 'none',
                          borderRadius: isExpanded ? '12px 12px 0 0' : 0,
                        }}
                        onMouseEnter={e => setHoveredRow(post.wordpressId)}
                        onMouseLeave={e => setHoveredRow(null)}
                        >
                          {/* 标题列（带柳条装饰） */}
                          <div style={{
                            flex: 2,
                            display: 'flex',
                            alignItems: 'center',
                            minWidth: 0,
                            padding: '1.5rem 1rem',
                            background: hoveredRow === post.wordpressId ? 'rgba(118,207,197,0.08)' : 'transparent',
                            borderRadius: '8px',
                            transition: 'background 0.3s ease',
                          }}>
                            <div style={{ 
                              width: '40px', 
                              display: 'flex', 
                              justifyContent: 'flex-end', 
                              alignItems: 'center',
                              marginRight: '0.5rem', 
                              cursor: 'default',
                              height: '36px'
                            }}>
                              <WillowDecoration isLeft={false} />
                            </div>
                            <h3 style={{
                              fontSize: '1.6rem',
                              fontWeight: '600',
                              margin: '0',
                              color: '#333',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              flex: 1,
                              minWidth: 0,
                              lineHeight: '1.2',
                              display: 'flex',
                              alignItems: 'center',
                              height: '36px'
                            }}>
                              <a 
                                href={`/post/${post.slug}`}
                                style={{
                                  color: 'inherit',
                                  textDecoration: 'none',
                                  transition: 'color 0.2s, transform 0.2s cubic-bezier(0.4,0,0.2,1)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: 'inline-block',
                                  maxWidth: '100%'
                                }}
                                onMouseEnter={e => {
                                  e.target.style.color = '#76cfc5';
                                  e.target.style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={e => {
                                  e.target.style.color = '#333';
                                  e.target.style.transform = 'translateY(0)';
                                }}
                                onClick={e => e.stopPropagation()}
                              >
                                {post.title}
                              </a>
                            </h3>
                            <div style={{ 
                              width: '40px', 
                              display: 'flex', 
                              justifyContent: 'flex-start', 
                              alignItems: 'center',
                              marginLeft: '0.5rem', 
                              cursor: 'default',
                              height: '36px'
                            }}>
                              <WillowDecoration isLeft={true} />
                            </div>
                          </div>
                          {/* 标签列 */}
                          <div style={{
                            flex: 1.2,
                            display: 'flex',
                            alignItems: 'center',
                            padding: '1.5rem 1rem',
                            minWidth: '150px',
                            flexWrap: 'wrap',
                            rowGap: '0.3rem',
                            background: hoveredRow === post.wordpressId ? 'rgba(118,207,197,0.08)' : 'transparent',
                            borderRadius: '8px',
                            transition: 'background 0.3s ease',
                          }}>
                            {post.tags && post.tags.length > 0 && (
                              <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '0.3rem',
                                flexWrap: 'nowrap',
                                width: '100%',
                                overflow: 'hidden',
                              }}>
                                {post.tags.slice(0, 2).map((tag, i) => (
                                  <span key={tag + i} style={{
                                    background: '#edf2f7',
                                    color: '#4a5568',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '15px',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* 展开按钮列 */}
                          <div style={{
                            flex: '0 0 80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem 1rem',
                            background: hoveredRow === post.wordpressId ? 'rgba(118,207,197,0.08)' : 'transparent',
                            borderRadius: '8px',
                            transition: 'background 0.3s ease',
                          }}>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                toggleExpanded(post.wordpressId);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                color: '#76cfc5',
                                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                outline: 'none',
                                opacity: isExpanded ? 1 : (hoveredRow === post.wordpressId ? 1 : 0),
                                visibility: isExpanded ? 'visible' : (hoveredRow === post.wordpressId ? 'visible' : 'hidden'),
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.color = '#ffb400';
                                e.currentTarget.style.transform = (isExpanded ? 'rotate(180deg)' : 'rotate(0deg)') + ' scale(1.25)';
                                e.currentTarget.style.boxShadow = '0 2px 12px rgba(255,180,0,0.18)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.color = '#76cfc5';
                                e.currentTarget.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              <span style={{ fontSize: '1.2rem', display: 'inline-block', transition: 'inherit' }}>↓</span>
                            </button>
                          </div>
                        </div>
                        {/* 展开内容 */}
                        <div
                          style={{
                            maxHeight: isExpanded ? '320px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)',
                            background: 'none',
                            borderRadius: 0,
                            margin: isExpanded ? '0.5rem 0 1.5rem 0' : '0',
                            boxShadow: 'none',
                            display: 'flex',
                            alignItems: 'flex-start',
                            padding: isExpanded ? '2rem 0 2rem 0' : '0 0 0 0',
                            gap: '2rem',
                            pointerEvents: isExpanded ? 'auto' : 'none',
                          }}
                        >
                          {/* 左侧：描述、时长、按钮 */}
                          <div style={{ flex: 2, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingLeft: '3rem' }}>
                            <div style={{ fontSize: '1.1rem', color: '#333', marginBottom: '1rem', lineHeight: 1.7 }}>{post.excerpt.replace(/<[^>]+>/g, '')}</div>
                            {/* Read more + 时长 */}
                            <div
                              style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', marginBottom: 0 }}
                              onMouseEnter={e => setHoveredRow(post.wordpressId)}
                              onMouseLeave={e => setHoveredRow(null)}
                            >
                              <a 
                                href={`/post/${post.slug}`}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  color: hoveredRow === post.wordpressId ? '#5bc0ae' : '#76cfc5',
                                  textDecoration: 'none',
                                  fontSize: '1.15rem',
                                  fontWeight: 600,
                                  transition: 'color 0.3s, transform 0.3s',
                                  padding: '0.7rem 0',
                                  cursor: 'pointer',
                                  border: 'none',
                                  background: 'none',
                                  transform: hoveredRow === post.wordpressId ? 'translateX(10px)' : 'none',
                                }}
                              >
                                Read more <span style={{ fontSize: '1.2rem' }}>→</span>
                              </a>
                              <span style={{ fontSize: '0.95rem', color: '#888', margin: 0, whiteSpace: 'nowrap' }}>⏱️ {post.readTime || getRandomReadTime()}</span>
                            </div>
                          </div>
                          {/* 右侧：封面图 */}
                          <div style={{
                            flex: 1.2,
                            minWidth: '180px',
                            maxWidth: '330px',
                            height: '200px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            {post.featuredImage ? (
                              // 如果有特色图片，显示真实图片
                              <img 
                                src={post.featuredImage}
                                alt={post.title}
                                style={{
                                  width: 'auto',
                                  height: 'auto',
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  objectFit: 'contain',
                                }}
                                onError={(e) => {
                                  // 如果图片加载失败，显示默认SVG
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            {/* 默认SVG封面图（当没有特色图片或图片加载失败时显示） */}
                            <div style={{
                              display: post.featuredImage ? 'none' : 'flex',
                              width: '100%',
                              height: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              {(() => {
                                const svgs = [
                                  // 蓝色
                                  <svg key="blue" width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="180" height="200" rx="16" fill="#4299e1"/>
                                    <rect x="30" y="60" width="80" height="30" rx="8" fill="#fff"/>
                                    <circle cx="50" cy="75" r="6" fill="#4299e1"/>
                                    <circle cx="70" cy="75" r="6" fill="#4299e1"/>
                                    <rect x="30" y="110" width="40" height="16" rx="8" fill="#fff"/>
                                  </svg>,
                                  // 绿色
                                  <svg key="green" width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="180" height="200" rx="16" fill="#38b2ac"/>
                                    <rect x="30" y="50" width="90" height="20" rx="10" fill="#fff"/>
                                    <rect x="30" y="80" width="70" height="20" rx="10" fill="#fff"/>
                                    <circle cx="120" cy="60" r="7" fill="#38b2ac"/>
                                    <circle cx="100" cy="90" r="7" fill="#38b2ac"/>
                                  </svg>,
                                  // 橙色
                                  <svg key="orange" width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="180" height="200" rx="16" fill="#ed8936"/>
                                    <rect x="40" y="40" width="70" height="40" rx="8" fill="#fff"/>
                                    <rect x="50" y="55" width="50" height="8" rx="4" fill="#ed8936"/>
                                    <circle cx="60" cy="120" r="12" fill="#fff"/>
                                    <circle cx="100" cy="120" r="12" fill="#fff"/>
                                  </svg>
                                ];
                                return svgs[index % svgs.length];
                              })()}
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
  </Layout>
)
}

export default PostsPage

// GraphQL查询
export const query = graphql`
  query PostsPageQuery {
    allWordPressPost(sort: {date: DESC}) {
      nodes {
        wordpressId
        title
        slug
        excerpt
        content
        date
        author
        authorAvatar
        featuredImage
        categories
        tags
        readTime
      }
    }
    allWordPressCategory {
      nodes {
        name
        parsedData
      }
    }
  }
` 