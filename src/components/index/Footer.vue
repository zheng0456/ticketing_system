<template>
  <footer class="page-footer">
    <div class="footer-content"> 
      <div class="footer-section">
        <p class="system-desc">
          便捷的在线购票平台，为您提供景点门票、酒店预订、出行指南等一站式服务。
        </p>
      </div>
      <div class="footer-section">
        <p class="copyright">
          © 2026 郑锦春 作品<br>
          版权所有 | 保留所有权利
        </p>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2026 外出购票系统. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PageFooter'
}
</script>

<style scoped>
.page-footer {
  background: #667eea;
  color: white;
  padding: 40px 0 20px;
  margin-top: 60px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  padding: 0 20px;
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: 600;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 5px 0;
  border-left: 3px solid transparent;
  padding-left: 10px;
}

.footer-link:hover {
  color: #ffffff;
  border-left-color: #ffffff;
  transform: translateX(5px);
}

.system-desc {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-size: 14px;
}

.copyright {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.6;
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 15px;
  }
  
  .page-footer {
    padding: 30px 0 15px;
    margin-top: 40px;
  }
  
  .footer-section h3 {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .page-footer {
    padding: 20px 0 10px;
  }
  
  .footer-content {
    gap: 20px;
  }
}
</style>