import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useStaticQuery, graphql } from "gatsby";

// 关键：给 framer-motion 配置 SSR 兼容
motion.div.defaultProps = {
  ...motion.div.defaultProps,
  disableLayoutEffect: true, // 禁用服务端的 layoutEffect，避免 SSR 报错
};

const ContactPage = () => {
  // 1. 从 Gatsby 数据层获取数据（构建时已加载，无 undefined 问题）
  const data = useStaticQuery(graphql`
    query ContactDataQuery {
      # 替换为你的真实数据查询（比如从 WordPress/本地 JSON 获取）
      contactJson {
        response_time
        phone
        email
      }
    }
  `);

  // 2. 数据兜底（即使查询无结果也不会 undefined）
  const contactData = data.contactJson || {
    response_time: "24小时内",
    phone: "123-4567-8901",
    email: "contact@example.com",
  };

  // 3. 适配无动画偏好的用户（可选优化）
  const prefersReducedMotion = useReducedMotion();
  const animationVariants = prefersReducedMotion
    ? { initial: {}, animate: {} } // 无动画
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
      };

  // 4. 安全使用动画组件（数据已兜底）
  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...animationVariants}
        transition={{ duration: 0.5 }}
        className="contact-page"
      >
        <h1>联系我们</h1>
        <p>回复时间：{contactData.response_time}</p>
        <p>电话：{contactData.phone}</p>
        <p>邮箱：{contactData.email}</p>
        {/* 其他表单内容 */}
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactPage;
