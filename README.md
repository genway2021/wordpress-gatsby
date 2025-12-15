A modern portfolio blog built with Gatsby, featuring static site generation (SSG) with optional WordPress data integration. This project demonstrates how to build a fast, SEO-friendly blog that can work with or without WordPress.

## 🎯 Project Purpose

This project serves as a **portfolio blog template** that combines the best of both worlds:

- **Gatsby's performance**: Static site generation for blazing-fast loading
- **WordPress's content management**: Optional content updates through WordPress admin
- **SEO optimization**: Pre-rendered pages with proper meta tags
- **Modern UI**: Responsive design with smooth animations
- **Zero Configuration**: Works out of the box with local fallback data

Perfect for developers, designers, and content creators who want a fast, maintainable blog with optional content management.

## 🚀 Quick Deploy

### Deploy to EdgeOne

[![Deploy to EdgeOne](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?template=https://github.com/tomcomtang/wordpress-gatsby&output-directory=./public&build-command=npm%20run%20build&install-command=npm%20install)

### Manual Deployment

```bash
# Clone the repository
git clone https://github.com/tomcomtang/wordpress-gatsby.git
cd wordpress-gatsby

# Install dependencies
npm install

# Build and deploy (no environment variables required!)
npm run build
```

## 🌐 Live Demo

**Preview the project:** [https://wordpress-gatsby.edgeone.app/](https://wordpress-gatsby.edgeone.app/)

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Gatsby 4 (React-based static site generator)
- **Content Management**: WordPress REST API (optional)
- **Styling**: CSS Modules with custom styles
- **Comments**: Giscus (GitHub Discussions integration, optional)
- **Deployment**: EdgeOne, or any static hosting

### Data Flow

```
WordPress API (Optional) → Gatsby Build Time → Static HTML/CSS/JS → CDN
```

1. **Build Time Data Fetching**: Gatsby fetches WordPress data during build (if configured)
2. **Fallback Data**: Uses local static data if WordPress is not configured
3. **Static Generation**: Creates pre-rendered HTML pages
4. **No Runtime API Calls**: All content is embedded in the static files
5. **Fast Loading**: Pages load instantly from CDN

### Project Structure

```
src/
├── components/          # React components
│   ├── HeroSection.js   # Homepage hero section
│   ├── AboutMe.js       # About section
│   ├── header.js        # Navigation header
│   └── layout.js        # Main layout wrapper
├── data/
│   └── fallbackData.js  # Local fallback data (used when WP is not configured)
├── pages/               # Page components
│   ├── index.js         # Homepage
│   ├── posts.js         # Blog posts list
│   ├── post/[slug].js   # Individual post pages
│   ├── comments.js      # Comments page (only shown if Giscus is configured)
│   └── contact.js       # Contact page
├── services/
│   └── wordpressApi.js  # WordPress API utilities
└── styles/              # CSS modules and styles
```

## ⚙️ Environment Configuration

### All Environment Variables Are Optional!

This project is designed to work **out of the box** without any configuration. All environment variables are optional:

```bash
# WordPress Configuration (Optional)
# If not set, the site will use local fallback data from src/data/fallbackData.js
GATSBY_WORDPRESS_URL=https://your-wordpress-site.wordpress.com

# Giscus Comments Configuration (Optional)
# If any of these are missing, the Comments menu will NOT be displayed
GATSBY_GISCUS_REPO=your-username/your-repo-name
GATSBY_GISCUS_REPO_ID=your-repo-id
GATSBY_GISCUS_CATEGORY_ID=your-category-id
```

### WordPress Configuration (Optional)

**If `GATSBY_WORDPRESS_URL` is NOT set:**

- ✅ Site works perfectly with local fallback data
- ✅ All pages and functionality are available
- ✅ Content comes from `src/data/fallbackData.js`
- ✅ No external dependencies

**If `GATSBY_WORDPRESS_URL` is set:**

- ✅ Site fetches content from your WordPress site at build time
- ✅ Uses the same data structure as fallback data
- ✅ Automatically generates `posts-list.js` with latest content
- ✅ Falls back to local data if WordPress is unavailable

#### WordPress URL Format

- WordPress.com: `https://your-site.wordpress.com`
- Self-hosted: `https://your-domain.com`

#### Local Testing

For local development and testing, you can set environment variables directly:

```bash
# macOS/Linux
export GATSBY_WORDPRESS_URL=https://your-wordpress-site.wordpress.com

# Windows (Command Prompt)
set GATSBY_WORDPRESS_URL=https://your-wordpress-site.wordpress.com

# Windows (PowerShell)
$env:GATSBY_WORDPRESS_URL="https://your-wordpress-site.wordpress.com"

# Then start the development server
npm run develop
```

### Giscus Comments Configuration (Optional)

**Comments functionality is completely optional:**

- **If NO Giscus variables are set:** Comments menu is hidden, no comment functionality
- **If ALL three Giscus variables are set:** Comments menu appears, full comment functionality

#### Setup Giscus (Optional)

1. Go to [Giscus](https://giscus.app/)
2. Configure with your GitHub repository
3. Copy the configuration values to your `.env` file:
   - `GATSBY_GISCUS_REPO`: Your repository name (e.g., "username/repo")
   - `GATSBY_GISCUS_REPO_ID`: Your repository ID
   - `GATSBY_GISCUS_CATEGORY_ID`: Your category ID
4. The Comments menu will automatically appear in the navigation
5. Comments will appear on blog posts and the comments page

**Testing**: Visit `/giscus-test` to verify your Giscus configuration is working correctly.

## 📝 WordPress Data Structure (Optional)

If you choose to use WordPress, configure your site to match the data structure used in the fallback data. Reference `src/data/fallbackData.js` for the exact format.

### Supported Data Sources

- **ACF Custom Fields**: If you use the ACF plugin (recommended for paid/self-hosted WordPress), create custom fields for your categories or pages. The field structure and content should match the examples in `fallbackData.js`.
- **Category Description**: For WordPress.com free plans, paste JSON data into the category description field (see below for format).

### ACF Data Structure Example

When using ACF, configure your custom fields to match the fallback data structure. For example, for the hero section:

```json
{
  "basic": {
    "name": "Your Name",
    "title": "Welcome Message",
    "description": "Your introduction text",
    "avatar": "https://your-avatar-url.com"
  },
  "buttons": [
    {
      "text": "View Posts",
      "link": "/posts",
      "type": "primary"
    },
    {
      "text": "Contact Me",
      "link": "/contact",
      "type": "secondary"
    }
  ]
}
```

> **Tip:** Always refer to `src/data/fallbackData.js` for the latest data structure examples. Your ACF field group should use the same keys and nesting as the fallback data.

### Required WordPress Categories (for description-based data)

#### 1. Hero Category (slug: "hero")

```json
{
  "basic": {
    "name": "Your Name",
    "title": "Welcome Message",
    "description": "Your introduction text",
    "avatar": "https://your-avatar-url.com"
  },
  "buttons": [
    {
      "text": "View Posts",
      "link": "/posts",
      "type": "primary"
    },
    {
      "text": "Contact Me",
      "link": "/contact",
      "type": "secondary"
    }
  ]
}
```

#### 2. About Category (slug: "about")

```json
{
  "title": "About Me",
  "description": "Your detailed about section content",
  "image": "https://your-image-url.com",
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
```

#### 3. Contact Category (slug: "contact")

```json
{
  "title": "Get In Touch",
  "description": "Contact form description",
  "email": "your-email@example.com",
  "phone": "+1 234 567 8900",
  "address": "Your address here"
}
```

#### 4. Socials Category (slug: "socials")

```json
{
  "socials": [
    {
      "name": "GitHub",
      "url": "https://github.com/yourusername",
      "icon": "github"
    },
    {
      "name": "LinkedIn",
      "url": "https://linkedin.com/in/yourusername",
      "icon": "linkedin"
    }
  ]
}
```

#### 5. Comments Category (slug: "comments")

```json
{
  "title": "Comments Policy",
  "description": "Your comments policy and guidelines",
  "rules": [
    "Be respectful and constructive",
    "No spam or self-promotion",
    "Stay on topic"
  ]
}
```

#### 6. Footer Category (slug: "footer")

```json
{
  "text": "© 2025 Your Name. All rights reserved.",
  "links": [
    {
      "text": "Privacy Policy",
      "url": "/privacy"
    }
  ]
}
```

#### 7. Skills Category (slug: "skills")

```json
[
  {
    "name": "Frontend Development",
    "level": 90,
    "color": "#61dafb"
  },
  {
    "name": "Backend Development",
    "level": 85,
    "color": "#f7df1e"
  }
]
```

#### 8. Projects Category (slug: "projects")

```json
[
  {
    "title": "Project Name",
    "description": "Project description",
    "image": "https://project-image-url.com",
    "url": "https://project-url.com",
    "technologies": ["React", "Node.js", "MongoDB"]
  }
]
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/tomcomtang/wordpress-gatsby.git
   cd wordpress-gatsby
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run develop
   ```

   The site will work immediately with local fallback data!

4. **Optional: Configure WordPress**

   - Create a `.env` file
   - Add your `GATSBY_WORDPRESS_URL`
   - Restart the development server

5. **Optional: Configure Comments**
   - Add Giscus environment variables to `.env`
   - Comments menu will appear automatically

### Build for Production

```bash
npm run build
```

The built site will be in the `public/` directory, ready for deployment.

## 🎨 Customization

### Styling

- Modify `src/styles/` for global styles
- Update component-specific CSS modules
- Customize colors and fonts in CSS variables

### Content

- **With WordPress**: Update content through WordPress admin
- **Without WordPress**: Edit `src/data/fallbackData.js`

### Layout

- Modify components in `src/components/`
- Update page templates in `src/pages/`
- Customize navigation in `src/components/header.js`

## 📦 Deployment

### EdgeOne (Recommended)

Use the "Deploy to EdgeOne" button above for one-click deployment.

### Manual Deployment

Upload the contents of the `public/` directory to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/mit.txt) file for details.

## 🙏 Acknowledgments

- Gatsby team for the amazing static site generator
- WordPress for content management
- Giscus for GitHub Discussions integration
- All contributors and users of this template

---

**Remember**: This template works perfectly without any configuration! All environment variables are optional. Start with `npm install && npm run develop` and you'll have a fully functional portfolio blog.
