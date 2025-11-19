<template>
  <div class="address-manager">
    <!-- 地址表格表头 -->
    <table class="address-table-header">
      <thead>
        <tr>
          <th>序号</th>
          <th>收件人</th>
          <th>地址</th>
          <th>手机</th>
          <th>是否默认</th>
          <th>操作</th>
        </tr>
      </thead>
    </table>

    <!-- 增加按钮行 -->
    <div class="add-row">
      <button class="add-btn" @click="handleAdd">
        <el-icon><CirclePlus /></el-icon>
        增加
      </button>
    </div>

    <!-- 温馨提示 -->
    <div class="tips-box">
      <h4>温馨提示</h4>
      <ul>
        <li>1.您最多可添加20个车票快递地址，对已支付的地址30天内不可删除与修改。</li>
        <li>2.请您准确完整的填写收件地址、收件人姓名、手机号码等信息，并保持电话畅通，以免耽误接收车票。</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { CirclePlus } from '@element-plus/icons-vue'

const handleAdd = () => {
  console.log('点击增加地址');
};
</script>

<style scoped>
.address-manager {
  width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Microsoft YaHei", sans-serif;
}

.address-table-header {
  width: 100%;
  border-collapse: collapse;
  background-color: #f5f5f5;
}

.address-table-header th {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
  color: #666;
  font-weight: normal;
}

.add-row {
  background-color: #e9f7fa;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #bce8f1;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background: none;
  color: #000;
  cursor: pointer;
}

.add-btn .el-icon {
  font-size: 16px;
  color: #28a745;
}

.tips-box {
  background-color: #fff3e0;
  border: 1px solid #ffe0b2;
  padding: 15px;
  margin-top: 10px;
}

.tips-box h4 {
  margin-top: 0;
  color: #e65100;
  font-size: 16px;
}

.tips-box ul {
  padding-left: 20px;
  margin: 10px 0;
  text-align: left;
}

.tips-box li {
  color: #666;
  margin-bottom: 5px;
  font-size: 14px;
}
</style>