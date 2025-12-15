/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "@reach/router"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      # Footer 数据
      footerCategory: allWordPressCategory(filter: { slug: { eq: "footer" } }) {
        nodes {
          parsedData
        }
      }
    }
  `)

  const location = useLocation()
  const footerData = data.footerCategory?.nodes[0]?.parsedData || null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        background: '#fafdff',
      }}
    >
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main style={{ flex: 1 }}>
        <div
          style={
            location.pathname === '/'
              ? {
                  maxWidth: '1200px',
                  margin: '0 auto',
                  padding: 0,
                }
              : {
                  margin: `0 auto`,
                  maxWidth: `1200px`,
                  padding: `var(--size-gutter)`,
                  paddingTop: `calc(var(--size-gutter) + 60px)`
                }
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <footer
        style={{
          height: '60px',
          background: '#fff',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 -1px 8px rgba(0,0,0,0.03)',
          position: 'relative',
          left: 0,
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          paddingLeft: '2rem',
          paddingRight: '2rem',
        }}>
          <div style={{
            flex: 1,
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            gap: '0.5rem',
          }}>
            {!footerData && <span style={{ color: 'red' }}>Footer加载失败</span>}
            {footerData && (
              <>
                {footerData.text}
                {footerData.links && footerData.links.length > 0 && (
                  <>
                    {' • '}
                    {footerData.links.map((link, idx) => (
                      <React.Fragment key={link.url}>
                        <a href={link.url} style={{ color: '#000', textDecoration: 'none', margin: '0 0.5em' }}>{link.title}</a>
                        {idx < footerData.links.length - 1 && '•'}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
          {footerData && footerData.github && (
            <a 
              href={footerData.github.url} 
              style={{ 
                color: '#000', 
                textDecoration: 'none',
                paddingBottom: '1px',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginLeft: '1.5rem',
                paddingRight: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#76cfc5';
                e.target.style.textDecoration = 'underline';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#000';
                e.target.style.textDecoration = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {footerData.github.text}
            </a>
          )}
        </div>
      </footer>
    </div>
  )
}

export default Layout
