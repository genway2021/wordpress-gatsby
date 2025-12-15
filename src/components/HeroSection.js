import * as React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import { heroStyles } from '../styles/homeStyles'

// 鼠标悬停事件处理函数
function handleBtnMouseOver(e) {
  Object.assign(e.target.style, heroStyles.btnHover);
}
function handleBtnMouseOut(e) {
  e.target.style.background = heroStyles.btn.background;
  e.target.style.transform = 'scale(1)';
  e.target.style.boxShadow = heroStyles.btn.boxShadow;
}
function handleBtnAltMouseOver(e) {
  Object.assign(e.target.style, heroStyles.btnAltHover);
}
function handleBtnAltMouseOut(e) {
  e.target.style.background = heroStyles.btnAlt.background;
  e.target.style.color = heroStyles.btnAlt.color;
  e.target.style.border = heroStyles.btnAlt.border;
  e.target.style.transform = 'scale(1)';
  e.target.style.boxShadow = heroStyles.btn.boxShadow;
}

function handleSocialIconMouseOver(e) {
  e.currentTarget.style.color = heroStyles.socialIconHover.color;
  const img = e.currentTarget.querySelector('img');
  if (img) {
    Object.assign(img.style, heroStyles.svgHover);
  }
}
function handleSocialIconMouseOut(e) {
  e.currentTarget.style.color = heroStyles.socialIconBtn.color;
  const img = e.currentTarget.querySelector('img');
  if (img) {
    img.style.transform = 'scale(1)';
  }
}
function handleAvatarMouseOver(e) {
  Object.assign(e.target.style, heroStyles.avatarHover);
}
function handleAvatarMouseOut(e) {
  e.target.style.transform = 'scale(1)';
  e.target.style.boxShadow = heroStyles.avatarStyle.boxShadow;
  e.target.style.borderColor = heroStyles.avatarStyle.border;
}

const HeroSection = () => {
  // 使用 GraphQL 查询获取预取的 WordPress 数据
  const data = useStaticQuery(graphql`
    query HeroData {
      heroCategory: allWordPressCategory(filter: { slug: { eq: "hero" } }) {
        nodes {
          parsedData
        }
      }
      socialsCategory: allWordPressCategory(filter: { slug: { eq: "socials" } }) {
        nodes {
          parsedData
        }
      }
    }
  `);

  const heroData = data.heroCategory?.nodes[0]?.parsedData || null;
  const socialMediaData = data.socialsCategory?.nodes[0]?.parsedData || {};

  // 适配对象结构：只取 social 字段数组
  const socialMediaForHome = Array.isArray(socialMediaData.socials)
    ? socialMediaData.socials.filter(item => item.type === 'social')
    : [];
  console.log('socialMediaForHome:', socialMediaForHome);
  // 如果没有数据，显示加载状态
  if (!heroData) {
    return <div>Loading hero data...</div>;
  }

  // 适配不同的数据结构
  let basic, buttons;
  
  if (heroData.basic) {
    // 如果是标准格式
    basic = heroData.basic;
    buttons = heroData.buttons;
  } else if (heroData.title) {
    // 如果是 WordPress 解析的格式
    basic = {
      title: heroData.title || "Welcome",
      name: heroData.name || heroData.title || "Developer",
      description: heroData.description || heroData.content || "A passionate web developer",
      avatar: heroData.avatar || "https://avatars.githubusercontent.com/u/20943608?v=4"
    };
    buttons = heroData.buttons || [
      { text: "View Posts", link: "/posts", type: "primary" },
      { text: "Contact Me", link: "/contact", type: "secondary" }
    ];
  } else {
    // 默认数据
    basic = {
      title: "Welcome",
      name: "Developer",
      description: "A passionate web developer",
      avatar: "https://avatars.githubusercontent.com/u/20943608?v=4"
    };
    buttons = [
      { text: "View Posts", link: "/posts", type: "primary" },
      { text: "Contact Me", link: "/contact", type: "secondary" }
    ];
  }

  // Hero内容的动画样式
  const heroContentStyle = {
    opacity: heroData ? 1 : 0,
    transform: heroData ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 1.2s ease-out, transform 1.2s ease-out'
  };

  // 头像图片的动画样式 - 在社交媒体列表开始渲染时才显示
  const avatarStyle = {
    ...heroStyles.avatarStyle,
    opacity: socialMediaForHome && socialMediaForHome.length > 0 ? 1 : 0,
    transform: socialMediaForHome && socialMediaForHome.length > 0 ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 1.2s ease-out, transform 1.2s ease-out'
  };

  // 社交媒体列表的样式，包含淡入动画
  const socialListStyle = {
    ...heroStyles.socialList,
    opacity: socialMediaForHome && socialMediaForHome.length > 0 ? 1 : 0,
    transform: socialMediaForHome && socialMediaForHome.length > 0 ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 1.2s ease-out, transform 1.2s ease-out'
  };

  // 社交媒体图标的动画样式
  const getSocialIconStyle = (index) => ({
    ...heroStyles.socialIconBtn,
    opacity: socialMediaForHome && socialMediaForHome.length > 0 ? 1 : 0,
    transform: socialMediaForHome && socialMediaForHome.length > 0 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
    transition: `opacity 1s ease-out ${index * 0.15}s, transform 1s ease-out ${index * 0.15}s`
  });

  return (
    <div style={heroStyles.heroSection}>
      <div style={heroStyles.contentWrapper}>
        <div style={heroStyles.leftCol}>
          <div style={heroContentStyle}>
            <p style={heroStyles.normalText}>{basic.title}</p>
            <h1 style={heroStyles.bigText}>{basic.name}</h1>
            <p style={heroStyles.introText}>
              {basic.description}
            </p>
            <div style={heroStyles.btnRow}>
              {buttons && buttons.length > 0 ? (
                buttons.map((button, index) => (
                  <Link 
                    key={index}
                    to={button.link} 
                    style={button.type === 'primary' ? heroStyles.btn : heroStyles.btnAlt} 
                    onMouseOver={button.type === 'primary' ? handleBtnMouseOver : handleBtnAltMouseOver} 
                    onMouseOut={button.type === 'primary' ? handleBtnMouseOut : handleBtnAltMouseOut} 
                    onFocus={button.type === 'primary' ? handleBtnMouseOver : handleBtnAltMouseOver} 
                    onBlur={button.type === 'primary' ? handleBtnMouseOut : handleBtnAltMouseOut}
                  >
                    {button.text}
                  </Link>
                ))
              ) : (
                <>
                  <Link to="/posts" style={heroStyles.btn} onMouseOver={handleBtnMouseOver} onMouseOut={handleBtnMouseOut} onFocus={handleBtnMouseOver} onBlur={handleBtnMouseOut}>View Posts</Link>
                  <Link to="/contact" style={heroStyles.btnAlt} onMouseOver={handleBtnAltMouseOver} onMouseOut={handleBtnAltMouseOut} onFocus={handleBtnAltMouseOver} onBlur={handleBtnAltMouseOut}>Contact Me</Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div style={heroStyles.rightCol}>
          <img 
            src={basic.avatar} 
            alt="avatar" 
            style={avatarStyle} 
            onMouseOver={handleAvatarMouseOver} 
            onMouseOut={handleAvatarMouseOut} 
          />
          <div style={socialListStyle}>
            {socialMediaForHome && socialMediaForHome.length > 0 && socialMediaForHome.map((social, index) => (
              <a 
                key={index}
                href={social.val} 
                style={getSocialIconStyle(index)}
                target="_blank" 
                rel="noopener noreferrer" 
                title={social.name} 
                onMouseOver={handleSocialIconMouseOver} 
                onMouseOut={handleSocialIconMouseOut}
              >
                <img src={`/svg/${social.svg}`} alt={social.name} style={heroStyles.svgStyle} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection 