// 联系页面样式
export const contactPageStyles = `
  body {
    background: linear-gradient(120deg, #fffaf5 0%, #fff5f0 50%, #fff0eb 100%) !important;
    min-height: 100vh;
  }
  .contact-page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
    width: 100%;
    max-width: 1200px;
  }
  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .contact-title {
      font-size: 2rem !important;
    }
    .contact-subtitle {
      font-size: 1.1rem !important;
    }
  }
` 