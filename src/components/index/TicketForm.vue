<template>
  <div class="ticket-form-container">
    <div class="ticket-form">
      <div class="tab-nav">
        <button class="tab-btn active">单程</button>
        <button class="tab-btn">往返</button>
        <button class="tab-btn">中转换乘</button>
        <button class="tab-btn">退改签</button>
      </div>
      <div class="form-group">
        <label>出发地</label>
        <input type="text" placeholder="南都" />
      </div>
      <div class="form-group">
        <label>到达地</label>
        <input type="text" placeholder="集宁南" />
      </div>
      <div class="form-group">
        <label>出发日期</label>
        <input type="date" :value="new Date().toISOString().split('T')[0]" />
      </div>
      <div class="form-group checkbox-group">
        <input type="checkbox" id="student" />
        <label for="student">学生</label>
        <input type="checkbox" id="high-speed" />
        <label for="high-speed">高铁/动车</label>
      </div>
      <button class="query-btn">查询</button>
      <div class="history-links">
        <a href="#">南都-集宁南</a>
        <a href="#">删除历史</a>
      </div>
    </div>
    <div class="app-promotion">
      <div class="app-info">
        <h2>12306APP</h2>
        <p>随时随地掌握列车新动态</p>
        <p>扫描二维码安装铁路12306</p>
      </div>
      <div class="qrcode">
        <img src="https://via.placeholder.com/100" alt="二维码" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticket-form-container {
  display: flex;
  padding: 20px;
  background: #f5f5f5;
}
.ticket-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-right: 20px;
  width: 300px;
}
.tab-nav {
  display: flex;
  margin-bottom: 20px;
}
.tab-btn {
  padding: 8px 15px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
}
.tab-btn.active {
  background: #0066cc;
  color: #fff;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #666;
}
.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.checkbox-group {
  display: flex;
  align-items: center;
}
.checkbox-group input {
  width: auto;
  margin-right: 5px;
}
.checkbox-group label {
  display: inline;
  margin-right: 15px;
}
.query-btn {
  width: 100%;
  padding: 10px;
  background: #ff6600;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.history-links {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
}
.history-links a {
  color: #0066cc;
  text-decoration: none;
}
.app-promotion {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
}
.app-info {
  margin-right: 20px;
}
.app-info h2 {
  font-size: 24px;
  margin-bottom: 10px;
}
.app-info p {
  margin-bottom: 5px;
  font-size: 16px;
}
.qrcode img {
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
}
</style>