<template>
  <div class="ticket-form-container">
    <div class="ticket-form">
      <div class="tab-nav">
        <button class="tab-btn active">单程</button>
        <button class="tab-btn">往返</button>
        <button class="tab-btn">中转换乘</button>
        <button class="tab-btn">退改签</button>
      </div>
      <div class="form-group inline-group">
        <label>出发地</label>
        <TicketFromCity v-model="departureCity" />
      </div>
      <div class="form-group inline-group">
        <label>到达地</label>
        <input type="text" placeholder="请输入到达地" />
      </div>
      <div class="form-group inline-group">
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
        <a href="#">删除历史</a>
      </div>
    </div>
  </div>
</template>

<script>
import TicketFromCity from './TicketFromCity.vue'

export default {
  name: 'TicketForm',
  components: {
    TicketFromCity
  },
  data() {
    return {
      departureCity: ''
    }
  }
}
</script>

<style scoped>
.ticket-form-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  background: #f5f5f5;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  min-height: 400px;
}
.ticket-form {
  background: #fff;
  padding: 15px;
  border: 1px solid #e1e1e1;
  margin-left: 235px;
  width: 320px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex-shrink: 0;
}
.tab-nav {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 2px solid #ff6600;
}
.tab-btn {
  padding: 8px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  margin-right: 2px;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
}
.tab-btn:hover {
  background: #f8f8f8;
}
.tab-btn.active {
  background: #ff6600;
  color: #fff;
  font-weight: bold;
}
.form-group {
  margin-bottom: 12px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
.inline-group {
  display: flex;
  align-items: center;
}
.inline-group label {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 10px;
  min-width: 60px;
}
.form-group input[type="text"],
.form-group input[type="date"] {
  width: 100%;
  padding: 10px 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  height: 32px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}
.form-group input[type="text"]:focus,
.form-group input[type="date"]:focus {
  outline: none;
  border-color: #ff6600;
  box-shadow: 0 0 3px rgba(255, 102, 0, 0.3);
}
.checkbox-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}
.checkbox-group input[type="checkbox"] {
  width: auto;
  margin-right: 5px;
  vertical-align: middle;
}
.checkbox-group label {
  display: inline;
  margin-right: 0;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}
.query-btn {
  width: 100%;
  padding: 12px;
  background: #ff6600;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}
.query-btn:hover {
  background: #e55500;
}
.history-links {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}
.history-links a {
  color: #0066cc;
  text-decoration: none;
  transition: color 0.3s ease;
}
.history-links a:hover {
  color: #0052a3;
  text-decoration: underline;
}

</style>