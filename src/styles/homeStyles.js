// 首页样式统一管理文件

// ==================== HeroSection 样式 ====================
export const heroStyles = {
  pageStyle: {
    background: '#fafdff',
    fontFamily: 'var(--font-sans)',
  },

  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    gap: '2rem',
    width: '100%',
    alignItems: 'center',
  },

  leftCol: {
    flex: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '2rem',
    height: '100%',
  },

  rightCol: {
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2.5rem',
    height: '100%',
  },

  avatarStyle: {
    width: '280px',
    height: '280px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    marginBottom: '1.2rem',
    border: '4px solid #76cfc5',
    transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.2s',
  },

  avatarHover: {
    transform: 'scale(1.06)',
    boxShadow: '0 8px 32px rgba(118,207,197,0.18)',
    borderColor: '#ec6664',
  },

  socialList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1.5rem',
  },

  socialIconBtn: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    background: 'none',
    color: '#222',
    fontSize: '2.2rem',
    textDecoration: 'none',
    transition: 'color 0.2s',
    boxShadow: 'none',
  },

  svgStyle: {
    width: '36px',
    height: '36px',
    display: 'block',
    transition: 'transform 0.2s',
  },

  socialIconHover: {
    color: '#ec6664',
  },

  svgHover: {
    transform: 'scale(1.18)',
  },

  normalText: {
    fontSize: '1.25rem',
    margin: 0,
    color: '#179b8e',
    fontWeight: 600,
    letterSpacing: '0.01em',
  },

  bigText: {
    fontSize: '3rem',
    fontWeight: 800,
    margin: 0,
    lineHeight: 1.1,
    background: 'linear-gradient(90deg, #76cfc5 0%, #ffb400 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
    zIndex: 1,
  },

  introText: {
    fontSize: '1.18rem',
    margin: 0,
    color: '#444',
    lineHeight: 1.8,
    fontWeight: 400,
  },

  btnRow: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '2.5rem',
    alignItems: 'center',
  },

  btn: {
    padding: '0.9rem 2.2rem',
    fontSize: '1.15rem',
    fontWeight: 700,
    borderRadius: '2rem',
    border: '2px solid #b0c4cc',
    background: 'linear-gradient(90deg, #ffe9b2 0%, #76cfc5 100%)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },

  btnHover: {
    background: 'linear-gradient(90deg, #76cfc5 0%, #ffe9b2 100%)',
    transform: 'scale(1.06)',
    boxShadow: '0 4px 16px rgba(94,194,182,0.18)',
  },

  btnAlt: {
    padding: '0.9rem 2.2rem',
    fontSize: '1.15rem',
    fontWeight: 700,
    borderRadius: '2rem',
    border: '2px solid #b0c4cc',
    background: 'linear-gradient(90deg, #eaf6fa 0%, #c7e6f5 100%)',
    color: '#179b8e',
    cursor: 'pointer',
    transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },

  btnAltHover: {
    background: 'linear-gradient(90deg, #c7e6f5 0%, #eaf6fa 100%)',
    color: '#179b8e',
    border: '2px solid #b0c4cc',
    transform: 'scale(1.06)',
    boxShadow: '0 4px 16px rgba(94,194,182,0.10)',
  },

  heroSection: {
    background: '#fafdff',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    fontFamily: 'var(--font-sans)',
  },
}

// ==================== AboutMe 样式 ====================
export const aboutStyles = {
  aboutSection: {
    background: 'linear-gradient(135deg, #6dd5c7 0%, #5bc0ae 50%, #4db09e 100%)',
    width: '100vw',
    minWidth: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    padding: '4rem 0 8rem 0',
    height: '470px',
    boxSizing: 'border-box',
  },

  newSection: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
    width: '100vw',
    minWidth: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    padding: '4rem 0',
    height: '460px',
    boxSizing: 'border-box',
  },

  thirdSection: {
    background: 'linear-gradient(135deg, #f0a868 0%, #ecb993 50%, #e8a87c 100%)',
    width: '100vw',
    minWidth: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    padding: '4rem 0',
    marginTop: '-140px',
  },

  fourthSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    width: '100vw',
    minWidth: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    padding: '4rem 0',
  },

  fifthSection: {
    background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    width: '100vw',
    minWidth: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    padding: '4rem 0',
  },

  aboutContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#fff',
    textAlign: 'center',
  },

  aboutTitle: {
    fontSize: '2.5rem',
    fontWeight: 800,
    marginBottom: '2rem',
    letterSpacing: '0.01em',
  },

  aboutText: {
    fontSize: '1.25rem',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: 1.9,
    textAlign: 'center',
  },

  projectsContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#fff',
    textAlign: 'center',
  },

  projectsTitle: {
    fontSize: '2.5rem',
    fontWeight: 800,
    marginBottom: '3rem',
    marginTop: '120px',
    letterSpacing: '0.01em',
    color: '#fff',
  },

  projectsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    marginTop: '2rem',
  },

  projectRow: {
    display: 'flex',
    gap: '3rem',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 0',
    maxWidth: '800px',
    margin: '0 auto',
  },

  projectContent: {
    flex: '1 1 50%',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  projectImageContainer: {
    flex: '1 1 50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '320px',
    minWidth: '320px',
  },

  projectImage: {
    width: '100%',
    maxWidth: '400px',
    height: '250px',
    borderRadius: '12px',
    objectFit: 'cover',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },

  projectTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '1.2rem',
  },

  projectDescription: {
    fontSize: '1.25rem',
    color: '#f0f0f0',
    lineHeight: 1.7,
    marginBottom: '1.2rem',
  },

  projectTechnologies: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    justifyContent: 'flex-start',
  },

  technologyTag: {
    background: '#edf2f7',
    color: '#4a5568',
    padding: '0.35rem 1rem',
    borderRadius: '20px',
    fontSize: '1rem',
    fontWeight: 500,
  },

  projectLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '1rem',
  },

  projectLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.15rem',
    fontWeight: 600,
    transition: 'color 0.3s, transform 0.3s',
    padding: '0.7rem 0',
    cursor: 'pointer',
  },

  projectLinkHover: {
    color: '#f0f0f0',
    transform: 'translateX(10px)',
  },

  cardStyle: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '1200px',
    background: '#fff',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    zIndex: 10,
    top: 'calc(100vh + 330px + 70px)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '630px',
  },

  cardTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#ec6664',
    marginBottom: '2rem',
    textAlign: 'center',
  },

  skillsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: '4rem',
  },

  skillRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1.8rem',
  },

  skillItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
  },

  skillItemRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
    flexDirection: 'row-reverse',
  },

  skillLogo: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: '#fff',
    fontWeight: 'bold',
  },

  progressContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  progressContainerLeft: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'flex-end',
  },

  progressBar: {
    width: '100%',
    height: '12px',
    background: '#f0f0f0',
    borderRadius: '6px',
    overflow: 'hidden',
  },

  progressBarLeft: {
    width: '100%',
    height: '12px',
    background: '#f0f0f0',
    borderRadius: '6px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #76cfc5 0%, #ec6664 100%)',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },

  progressFillLeft: {
    height: '100%',
    background: 'linear-gradient(90deg, #ec6664 0%, #76cfc5 100%)',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
    marginLeft: 'auto',
  },

  skillPercentage: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#333',
    minWidth: '50px',
    textAlign: 'center',
  },
}

// 社交媒体图标动画样式
export const socialIconAnimation = {
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px) scale(0.8)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0) scale(1)'
    }
  },
  socialIconAnimated: {
    animation: 'fadeInUp 0.6s ease-out forwards',
    opacity: 0,
    transform: 'translateY(20px) scale(0.8)'
  }
} 