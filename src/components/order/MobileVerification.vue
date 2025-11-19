<template>
  <div class="phone-verification">
    <h3>手机核验</h3>
    <div class="form-item">
      <label class="form-label"><span class="required">*</span> 原手机号：</label>
      <span class="original-phone">+86-138****7017</span>
      <span class="verified">已通过核验</span>
    </div>
    <div class="form-item">
      <label class="form-label"><span class="required">*</span> 新手机号：</label>
      <select class="country-code">
        <option value="+86">+86</option>
        <!-- 可根据需求添加其他国家码 -->
      </select>
      <input type="tel" v-model="newPhone" placeholder="请输入新手机号" class="phone-input" />
    </div>
    <div class="form-item">
      <label class="form-label"><span class="required">*</span> 登录密码：</label>
      <input type="password" v-model="loginPwd" placeholder="请输入登录密码" class="pwd-input" />
      <span class="tip">正确输入密码才能修改密保</span>
    </div>
    <div class="btn-group">
      <button class="cancel-btn" @click="handleCancel">取消</button>
      <button class="confirm-btn" @click="handleConfirm">确认</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newPhone = ref('');
const loginPwd = ref('');

const handleCancel = () => {
  // 取消操作逻辑，如重置表单或关闭弹窗
  newPhone.value = '';
  loginPwd.value = '';
};

const handleConfirm = () => {
  // 确认操作逻辑，如提交表单到后端
  if (!newPhone.value || !loginPwd.value) {
    alert('请填写完整信息');
    return;
  }
  console.log('提交数据：', { newPhone: newPhone.value, loginPwd: loginPwd.value });
  // 这里可添加axios请求等实际业务逻辑
};
</script>

<style scoped>
.phone-verification {
  border: 1px solid #e5e7eb;
  padding: 20px;
  width: 800px;
  height: 700px;
  margin: 0 auto;
}

h3 {
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: 600;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.form-label {
  width: 100px;
  text-align: right;
  margin-right: 12px;
  color: #333;
}

.original-phone {
  color: #666;
  margin-right: 8px;
}

.verified {
  color: #409EFF;
}

.required {
  color: red;
}

.country-code {
  width: 60px;
  height: 32px;
  border: 1px solid #dcdcdc;
  border-radius: 4px 0 0 4px;
  margin-right: -1px;
}

.phone-input, .pwd-input {
  height: 30px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 0 8px;
  width: 200px;
}

.tip {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
}

.btn-group {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

.cancel-btn {
  height: 32px;
  padding: 0 16px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

.confirm-btn {
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  background-color: #ff9900;
  color: #fff;
  cursor: pointer;
}
</style>