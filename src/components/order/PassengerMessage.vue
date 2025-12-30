<template>
  <div class="passenger-message">
    <!-- 警告提示 -->
    <div class="warning-tip">
      <svg class="warning-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#FF9500"/>
      </svg>
      <span class="warning-text">如旅客身份信息未能在添加后的24小时内通过核验,请乘车人持有效身份证原件到车站办理身份核验。</span>
    </div>

    <!-- 基本信息 -->
    <div class="form-section">
      <h3 class="section-title">基本信息</h3>
      <div class="form-content">
        <div class="form-item">
          <label class="form-label">
            <span class="required-mark">*</span>
            证件类型
          </label>
          <select v-model="formData.idType" class="form-select">
            <option value="居民身份证">居民身份证</option>
            <option value="港澳居民来往内地通行证">港澳居民来往内地通行证</option>
            <option value="台湾居民来往大陆通行证">台湾居民来往大陆通行证</option>
            <option value="护照">护照</option>
          </select>
        </div>

        <div class="form-item">
          <label class="form-label">
            <span class="required-mark">*</span>
            姓名
          </label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="formData.name" 
              placeholder="请输入姓名" 
              class="form-input"
            >
            <span class="input-hint">姓名填写规则 (用于身份核验)</span>
          </div>
        </div>

        <div class="form-item">
          <label class="form-label">
            <span class="required-mark">*</span>
            证件号码
          </label>
          <div class="input-wrapper">
            <input 
              type="text" 
              v-model="formData.idNumber" 
              placeholder="请填写证件号码" 
              class="form-input"
            >
            <span class="input-hint">用于身份核验,请正确填写。</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系方式 -->
    <div class="form-section">
      <h3 class="section-title">联系方式(请提供乘车人真实有效的联系方式)</h3>
      <div class="form-content">
        <div class="form-item">
          <label class="form-label">手机号码</label>
          <div class="phone-input-wrapper">
            <select v-model="formData.countryCode" class="country-code-select">
              <option value="+86">+86</option>
            </select>
            <input 
              type="tel" 
              v-model="formData.phone" 
              placeholder="请填写手机号码" 
              class="form-input phone-input"
            >
          </div>
          <p class="contact-hint">
            请您填写乘车人真实有效的联系方式,以便接收铁路部门推送的重要服务信息,以及在紧急特殊情况下的联系。
          </p>
        </div>
      </div>
    </div>

    <!-- 附加信息 -->
    <div class="form-section">
      <h3 class="section-title">附加信息</h3>
      <div class="form-content">
        <div class="form-item">
          <label class="form-label">
            <span class="required-mark">*</span>
            优惠(待)类型
          </label>
          <select v-model="formData.discountType" class="form-select">
            <option value="成人">成人</option>
            <option value="学生">学生</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="form-actions">
      <button class="cancel-btn" @click="handleCancel">取消</button>
      <button class="save-btn" @click="handleSave">保存</button>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';
import api from '@/api/index.js';

// 定义 props
const props = defineProps({
  editData: {
    type: Object,
    default: null
  }
});

// 定义 emits
const emit = defineEmits(['cancel', 'save']);

// 表单数据
const formData = reactive({
  idType: '居民身份证',
  name: '',
  idNumber: '',
  countryCode: '+86',
  phone: '',
  discountType: '成人'
});

// 监听 editData 变化，填充表单（编辑模式）
watch(() => props.editData, (newData) => {
  if (newData) {
    formData.idType = newData.idType || '居民身份证';
    formData.name = newData.name || '';
    formData.idNumber = newData.idNumber || '';
    formData.countryCode = newData.countryCode || '+86';
    formData.phone = newData.phone || '';
    formData.discountType = newData.discountType || '成人';
  } else {
    // 重置表单
    formData.idType = '居民身份证';
    formData.name = '';
    formData.idNumber = '';
    formData.countryCode = '+86';
    formData.phone = '';
    formData.discountType = '成人';
  }
}, { immediate: true });

// 取消操作
const handleCancel = () => {
  emit('cancel');
};

// 表单验证
const validateForm = () => {
  if (!formData.name || !formData.name.trim()) {
    alert('请输入姓名');
    return false;
  }
  if (!formData.idNumber || !formData.idNumber.trim()) {
    alert('请输入证件号码');
    return false;
  }
  // 可以添加更多验证规则
  return true;
};

// 保存操作
const handleSave = async () => {
  if (!validateForm()) {
    return;
  }
  
  try {
    // 调用添加乘车人接口
    await api.post('/user/passenger/add', { ...formData });
    
    // 保存成功提示
    ElMessage.success('乘车人添加成功');
    
    // 保存成功后通知父组件
    emit('save', { ...formData });
  } catch (error) {
    console.error('添加乘车人失败:', error);
    // 失败提示
    ElMessage.error(error.response?.data?.msg || '添加乘车人失败，请检查网络连接或稍后重试');
  }
};
</script>

<style scoped>
.passenger-message {
  flex: 1;
  padding: 20px;
  font-family: "Microsoft YaHei", sans-serif;
  background-color: #fff;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

/* 警告提示 */
.warning-tip {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px;
  background-color: #FFF7E6;
  border-left: 3px solid #FF9500;
  margin-bottom: 24px;
  border-radius: 4px;
}

.warning-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.warning-text {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

/* 表单区块 */
.form-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
}

.form-content {
  padding-left: 20px;
}

/* 表单项 */
.form-item {
  margin-bottom: 24px;
  text-align: left;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
  font-weight: 500;
  text-align: left;
}

.required-mark {
  color: #f56c6c;
  margin-right: 4px;
}

/* 输入框 */
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #FF9500;
}

.form-input::placeholder {
  color: #c0c4cc;
}

.input-hint {
  font-size: 12px;
  color: #909399;
}

/* 下拉选择框 */
.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}

.form-select:focus {
  border-color: #FF9500;
}

/* 手机号码输入 */
.phone-input-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
}

.country-code-select {
  width: 80px;
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  padding-right: 28px;
}

.country-code-select:focus {
  border-color: #FF9500;
}

.phone-input {
  flex: 1;
}

.contact-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
  line-height: 1.6;
}

/* 操作按钮 */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #ebeef5;
}

.cancel-btn,
.save-btn {
  padding: 10px 32px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
}

.cancel-btn {
  background-color: #fff;
  color: #606266;
}

.cancel-btn:hover {
  background-color: #f5f7fa;
  border-color: #c0c4cc;
}

.save-btn {
  background-color: #FF9500;
  color: #fff;
  border-color: #FF9500;
}

.save-btn:hover {
  background-color: #ffad33;
  border-color: #ffad33;
}
</style>

<script>
export default {
  name: 'PassengerMessage'
}
</script>
