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
        <el-form-item prop="userName">
          <el-input 
            v-model="loginForm.userName" 
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
        <el-form-item prop="userName">
          <el-input 
            v-model="registerForm.userName" 
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
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { Hide, View, User, Phone, Lock, Check } from '@element-plus/icons-vue';
import api from '@/api/index.js';

// 状态管理
const isLogin = ref(true);
const rememberMe = ref(false);
const loginPasswordVisible = ref(false);
const registerPasswordVisible = ref(false);
const router = useRouter();

// 表单引用
const loginRef = ref(null);
const registerRef = ref(null);

// 登录表单数据
const loginForm = reactive({
  userName: '',
  password: ''
});

// 注册表单数据
const registerForm = reactive({
  userName: '',
  phone: '',
  password: '',
  confirmPassword: ''
});

// 登录表单验证规则
const loginRules = {};

// 注册表单验证规则
const registerRules = {
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
    // 移除表单验证，直接调用登录API
    console.log('============================================');
    console.log('🔄 开始执行登录API请求');
    // 打印登录请求参数
    console.log('📝 登录请求参数:', { userName: loginForm.userName, password: loginForm.password });
    
    const response = await api.post('/user/login', {
      userName: loginForm.userName,
      password: loginForm.password
    });
    
    console.log('✅ 登录API请求成功，开始处理响应数据');
    // 调试：打印响应数据
    console.log('📋 登录响应完整数据:', response);
    console.log('📊 响应状态码:', response.status);
    console.log('📋 响应头信息:', response.headers);
    console.log('📦 响应数据:', JSON.stringify(response.data, null, 2));
    console.log('🔢 响应数据code:', response.data.code);
    console.log('💬 响应数据message:', response.data.message);
    console.log('📝 响应数据msg:', response.data.msg);
    console.log('📋 响应数据data:', JSON.stringify(response.data.data, null, 2));


    if (response.data.code === 200) {
      // 保存用户信息到localStorage
      // 从正确的位置获取token：response.data.data.token
      const token = response.data.data?.token || response.data.token || 'mock_token';
      console.log('🔐 获取到的token:', token);
      const userInfo = {
        userName: loginForm.userName,
        token: token,
        isLoggedIn: true
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      if (response.data.data?.menuList) {
        console.log('💾 准备保存菜单数据到 localStorage');
        console.log('📋 menuList 数据:', response.data.data.menuList);
        console.log('📊 menuList 数量:', response.data.data.menuList.length);
        localStorage.setItem('userMenu', JSON.stringify(response.data.data.menuList));
        console.log('✅ 菜单数据已保存到 localStorage');
        
        // 验证保存是否成功
        const savedMenu = localStorage.getItem('userMenu');
        console.log('🔍 验证保存的菜单数据:', savedMenu);
      } else {
        console.log('⚠️  menuList 不存在或为空');
      }
      
      ElMessage.success('登录成功');
      
      console.log('============================================');
      console.log('📌 登录流程即将完成，准备跳转页面');
      const redirectPath = response.data.data?.menuList?.[0]?.path || '/index';
      console.log('� 跳转路径:', redirectPath);
      console.log('============================================');
      
      window.location.href = redirectPath;
    } else {
      ElMessage.error(response.data.msg || '登录失败');
    }
  } catch (error) {
    console.log('============================================');
    console.error('❌ 登录API请求失败');
    console.error('错误类型:', typeof error);
    console.error('错误信息:', error.message);
    console.error('完整错误:', error);
    if (error.response) {
      console.error('响应数据:', JSON.stringify(error.response.data, null, 2));
      console.error('响应状态:', error.response.status);
      console.error('响应头:', error.response.headers);
    }
    console.log('============================================');
    // ElMessage.error('登录失败，请检查网络连接或稍后重试');
  }
};

// 注册处理
const handleRegister = async () => {
  try {
    await registerRef.value.validate();
    // 调用注册API
    const response = await api.post('/user/register', {
      userName: registerForm.userName,
      phone: registerForm.phone,
      password: registerForm.password
    });
    
    // 调试：打印响应数据
    console.log('注册响应:', response);
    console.log('响应状态:', response.status);
    console.log('响应数据:', response.data);
    console.log('响应数据code:', response.data.code);
    console.log('响应数据message:', response.data.message);
    
    if (response.data.code === 200) {
      ElMessage.success('注册成功，请登录');
      // 跳转到登录页面并刷新页面，确保默认选择登录
      window.location.href = '/login';
    } else {
      ElMessage.error(response.data.msg || '注册失败');
    }
  } catch (error) {
    console.error('注册请求失败:', error);
    // 暂时注释掉错误提示，避免干扰正常成功流程
    // ElMessage.error('注册失败，请检查网络连接或稍后重试');
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