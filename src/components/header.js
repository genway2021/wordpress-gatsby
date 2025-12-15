import * as React from "react"
import { Link } from "gatsby"

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  background: 'rgba(250, 253, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
  borderBottom: '1px solid rgba(118,207,197,0.1)',
}
const menuStyle = {
  display: 'flex',
  gap: '2rem',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  alignItems: 'center',
  height: '100%',
}
const siteNameStyle = {
  fontWeight: 700,
  fontSize: '1.5rem',
  letterSpacing: '0.05em',
  color: '#ec6664',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
}
const menuLinkStyle = {
  fontWeight: 700,
  color: '#d48a88',
  textDecoration: 'none',
  fontSize: '1.1rem',
  transition: 'color 0.2s, transform 0.2s',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  padding: '0.25rem 0',
}
const activeMenuLinkStyle = {
  ...menuLinkStyle,
  color: '#ec6664',
}

const Header = ({ siteTitle }) => {
  // 检查 Giscus 环境变量是否配置
  const isGiscusConfigured = typeof window !== 'undefined' && 
                             process.env.GATSBY_GISCUS_REPO && 
                             process.env.GATSBY_GISCUS_REPO_ID && 
                             process.env.GATSBY_GISCUS_CATEGORY_ID;

                             console.log('Giscus config check:', {
                              repo: process.env.GATSBY_GISCUS_REPO,
                              repoId: process.env.GATSBY_GISCUS_REPO_ID,
                              categoryId: process.env.GATSBY_GISCUS_CATEGORY_ID,
                              isConfigured: isGiscusConfigured
                            });
  // 调试信息（开发环境）
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Giscus config check:', {
      repo: process.env.GATSBY_GISCUS_REPO,
      repoId: process.env.GATSBY_GISCUS_REPO_ID,
      categoryId: process.env.GATSBY_GISCUS_CATEGORY_ID,
      isConfigured: isGiscusConfigured
    });
  }

  return (
    <nav style={navStyle}>
      <Link to="/" style={siteNameStyle} onMouseOver={handleSiteNameMouseOver} onMouseOut={handleSiteNameMouseOut}>
        {siteTitle || 'My Portfolio Blog'}
      </Link>
      <ul style={menuStyle}>
        <li style={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: 0 }}>
          <Link to="/" style={menuLinkStyle} getProps={({ isCurrent }) => isCurrent ? { style: activeMenuLinkStyle } : {}}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >Home</Link>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: 0 }}>
          <Link to="/posts" style={menuLinkStyle} getProps={({ isCurrent }) => isCurrent ? { style: activeMenuLinkStyle } : {}}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >Posts</Link>
        </li>
        {isGiscusConfigured && (
          <li style={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: 0 }}>
            <Link to="/comments" style={menuLinkStyle} getProps={({ isCurrent }) => isCurrent ? { style: activeMenuLinkStyle } : {}}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >Comments</Link>
          </li>
        )}
        <li style={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: 0 }}>
          <Link to="/contact" style={menuLinkStyle} getProps={({ isCurrent }) => isCurrent ? { style: activeMenuLinkStyle } : {}}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

function handleMouseOver(e) {
  e.target.style.color = '#ec6664';
  e.target.style.transform = 'scale(1.08)';
}
function handleMouseOut(e) {
  if (e.target.getAttribute('aria-current') !== 'page') {
    e.target.style.color = '#d48a88';
  }
  e.target.style.transform = 'scale(1)';
}

function handleSiteNameMouseOver(e) {
  e.target.style.color = '#ffb400';
  e.target.style.transform = 'scale(1.08)';
}
function handleSiteNameMouseOut(e) {
  e.target.style.color = '#ec6664';
  e.target.style.transform = 'scale(1)';
}

export default Header
