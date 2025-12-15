// 评论页面样式 - 只保留页面布局样式
export const commentsPageStyles = `
  body {
    background: linear-gradient(120deg, #f8fafc 0%, #f5f7fa 100%) !important;
    min-height: 100vh;
  }
  :root {
    --size-content: 1200px !important;
  }
  .comments-page-container {
    max-width: 1200px !important;
    margin: 0 auto !important;
    padding: 0 2rem !important;
  }
  @media (max-width: 768px) {
    .comments-page-container {
      padding: 0 1rem !important;
    }
  }
` 