<template>
  <div class="auth-container">
    <!-- 背景装饰 -->
    <div class="bg-decoration"></div>
    
    <!-- 主卡片 -->
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="system-title">出行通</h1>
        
        <!-- 切换标签 -->
        <div class="tab-switch">
          <button 
            class="tab-btn" 
            :class="{ active: isLogin }" 
            @click="isLogin = true"
          >
            登录
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: !isLogin }" 
            @click="isLogin = false"
          >
            注册
          </button>
        </div>
      </div>
      
      <!-- 登录表单 -->
      <el-form 
        v-if="isLogin" 
        :model="loginForm" 
        :rules="loginRules" 
        ref="loginRef"
        class="auth-form"
      >
        <el-form-item prop="username">
          <el-input 
            v-model="loginForm.username" 
            placeholder="请输入用户名/手机号"
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="loginForm.password" 
            placeholder="请输入密码" 
            :type="loginPasswordVisible ? 'text' : 'password'"
            
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
            <template #suffix>
              <i @click="loginPasswordVisible = !loginPasswordVisible">
                <el-icon v-if="loginPasswordVisible"><Hide /></el-icon>
                <el-icon v-else><View /></el-icon>
              </i>
            </template>
          </el-input>
        </el-form-item>
        
        <div class="form-actions">
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
          <a href="#" class="forgot-link">忘记密码?</a>
        </div>
        
        <el-button 
          type="primary" 
          class="submit-btn" 
          @click="handleLogin"
        >
          登录
        </el-button>
      </el-form>
      
      <!-- 注册表单 -->
      <el-form 
        v-else 
        :model="registerForm" 
        :rules="registerRules" 
        ref="registerRef"
        class="auth-form"
      >
        <el-form-item prop="username">
          <el-input 
            v-model="registerForm.username" 
            placeholder="请设置用户名" 
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="phone">
          <el-input 
            v-model="registerForm.phone" 
            placeholder="请输入手机号"
          >
            <template #prefix>
              <el-icon><Phone /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="registerForm.password" 
            placeholder="请设置密码" 
            :type="registerPasswordVisible ? 'text' : 'password'"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
            <template #suffix>
              <i @click="registerPasswordVisible = !registerPasswordVisible">
                <el-icon v-if="registerPasswordVisible"><Hide /></el-icon>
                <el-icon v-else><View /></el-icon>
              </i>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="confirmPassword">
          <el-input 
            v-model="registerForm.confirmPassword" 
            placeholder="请确认密码" 
            :type="registerPasswordVisible ? 'text' : 'password'"
          >
          <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          <template #suffix>
              <i @click="registerPasswordVisible = !registerPasswordVisible">
                <el-icon v-if="registerPasswordVisible"><Hide /></el-icon>
                <el-icon v-else><View /></el-icon>
              </i>
            </template>
        </el-input>
        </el-form-item>
        
        <el-button 
          type="primary" 
          class="submit-btn" 
          @click="handleRegister"
        >
          注册
        </el-button>
      </el-form>
    </div>
    
    <!-- 页脚 -->
    <footer class="auth-footer">
      <p>© 2025 出行通购票系统</p>
    </footer>
  </div>
</template>

<script>
/* eslint-disable */
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { Hide, View, User, Phone, Lock, Check } from '@element-plus/icons-vue';
import api from '@/api/index.js';

// 状态管理
const isLogin = ref(true);
const rememberMe = ref(false);
const loginPasswordVisible = ref(false);
const registerPasswordVisible = ref(false);

// 表单引用
const loginRef = ref(null);
const registerRef = ref(null);

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: ''
});

// 注册表单数据
const registerForm = reactive({
  username: '',
  phone: '',
  password: '',
  confirmPassword: ''
});

// 登录表单验证规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
};

// 注册表单验证规则
const registerRules = {
  username: [
    { required: true, message: '请设置用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请设置密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

// 登录处理
const handleLogin = async () => {
  try {
    await loginRef.value.validate();
    // 实际项目中调用登录API
    const response = await api.post('/login', {
      username: loginForm.username,
      password: loginForm.password
    });
    
    if (response.data.success) {
      ElMessage.success('登录成功');
      // 登录成功后跳转到首页或之前的页面
      // router.push('/home');
    } else {
      ElMessage.error(response.data.message || '登录失败');
    }
  } catch (error) {
    console.error('登录请求失败:', error);
    ElMessage.error('登录失败，请检查网络连接或稍后重试');
  }
};

// 注册处理
const handleRegister = async () => {
  try {
    await registerRef.value.validate();
    // 调用注册API
    const response = await api.post('/register', {
      username: registerForm.username,
      phone: registerForm.phone,
      password: registerForm.password
    });
    
    if (response.data.success) {
      ElMessage.success('注册成功，请登录');
      isLogin.value = true;
    } else {
      ElMessage.error(response.data.message || '注册失败');
    }
  } catch (error) {
    console.error('注册请求失败:', error);
    ElMessage.error('注册失败，请检查网络连接或稍后重试');
  }
};

// 导出组件
export default {
  name: 'UserLogin', // 更改组件名称为多单词
  components: {
    Hide,
    View,
    User,
    Phone,
    Lock,
    Check
  },
  setup() {
    return {
      isLogin,
      rememberMe,
      loginPasswordVisible,
      registerPasswordVisible,
      loginRef,
      registerRef,
      loginForm,
      registerForm,
      loginRules,
      registerRules,
      handleLogin,
      handleRegister
    };
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  position: relative;
  overflow: hidden;
}

.bg-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(64, 158, 255, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(64, 158, 255, 0.1) 0%, transparent 40%);
  z-index: 0;
}

.auth-card {
  width: 400px;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.system-title {
  font-size: 28px;
  font-weight: 600;
  color: #1d2129;
  margin: 0 0 10px 0;
}

.tab-switch {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}

.tab-btn {
  flex: 1;
  padding: 10px 0;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #86909c;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.tab-btn.active {
  color: #409eff;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #409eff;
}

.auth-form {
  width: 100%;
}

/* 设置表单元素高度为50px */
.auth-form :deep(.el-input__wrapper) {
  height: 50px;
}

.auth-form :deep(.el-button) {
  height: 50px;
}

.el-form-item {
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.forgot-link {
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
}

.forgot-link:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
}

/* 添加鼠标悬停样式 */
.auth-form .el-input__suffix i {
  cursor: pointer;
}

.auth-form .el-input__suffix i:hover {
  cursor: pointer;
}

/* 修改密码可见性图标的鼠标样式 */
.auth-form .el-input__suffix i:hover {
  cursor: pointer;
}
</style>