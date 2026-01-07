<template>
  <div class="admin-permission">
    <el-page-header
      @back="goBack"
      content="权限管理"
      class="permission-header"
    >
    </el-page-header>

    <el-card class="permission-card">
      <template #header>
        <div class="card-header">
          <span>用户权限列表</span>
          <el-button type="primary" @click="handleAddUser">添加用户</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <div class="search-section">
        <el-input
          v-model="searchForm.user_name"
          placeholder="请输入用户名"
          clearable
          class="search-input"
          @input="handleSearchInput"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-select
          v-model="searchForm.role_id"
          placeholder="选择角色"
          clearable
          class="search-select"
          @change="handleSearchInput"
        >
          <el-option label="普通用户" value="1"></el-option>
          <el-option label="车票管理员" value="2"></el-option>
          <el-option label="超级管理员" value="3"></el-option>
          <el-option label="途径站点管理员" value="4"></el-option>
          <el-option label="列车管理员" value="5"></el-option>
          <el-option label="站点管理员" value="6"></el-option>
        </el-select>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </div>

      <!-- 用户列表 -->
      <el-table
        v-loading="loading"
        :data="userList"
        style="width: 100%"
        border
      >

        <el-table-column prop="userName" label="用户名" width="180"></el-table-column>

        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="role" label="角色" width="120">
          <template #default="scope">
            <el-tag
              :type="getRoleType(scope.row.role)"
            >
              {{ getRoleLabel(scope.row.role) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180">
          <template #default="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="1"
              inactive-value="0"
              @change="handleStatusChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleEditUser(scope.row)">
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDeleteUser(scope.row)"
              :disabled="isCurrentUser(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 添加/编辑用户对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '添加用户' : '编辑用户'"
      width="500px"
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="userForm.userName"
            :disabled="dialogType === 'edit'"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        
        <el-form-item
          v-if="dialogType === 'add'"
          label="密码" 
          prop="password"
        >
          <el-input
            v-model="userForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择角色" multiple>
            <el-option label="普通用户" value="1"></el-option>
            <el-option label="车票管理员" value="2"></el-option>
            <el-option label="超级管理员" value="3"></el-option>
            <el-option label="途径站点管理员" value="4"></el-option>
            <el-option label="列车管理员" value="5"></el-option>
            <el-option label="站点管理员" value="6"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 权限设置对话框 -->
    <el-dialog
      v-model="permissionDialogVisible"
      title="权限设置"
      width="600px"
    >
      <el-form ref="permissionFormRef" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="selectedUser.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="当前角色">
          <el-tag :type="getRoleType(selectedUser.role)">
            {{ getRoleLabel(selectedUser.role) }}
          </el-tag>
        </el-form-item>
        <el-form-item label="权限列表">
          <el-checkbox-group v-model="selectedUser.permissions">
            <el-checkbox value="user:read" label="查看用户"></el-checkbox>
            <el-checkbox value="user:create" label="创建用户"></el-checkbox>
            <el-checkbox value="user:update" label="编辑用户"></el-checkbox>
            <el-checkbox value="user:delete" label="删除用户"></el-checkbox>
            <el-checkbox value="train:read" label="查看火车信息"></el-checkbox>
            <el-checkbox value="train:create" label="创建火车信息"></el-checkbox>
            <el-checkbox value="train:update" label="编辑火车信息"></el-checkbox>
            <el-checkbox value="train:delete" label="删除火车信息"></el-checkbox>
            <el-checkbox value="order:read" label="查看订单"></el-checkbox>
            <el-checkbox value="order:update" label="编辑订单状态"></el-checkbox>
            <el-checkbox value="system:config" label="系统配置"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="permissionDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue';
import api from '@/api';

export default {
  name: 'AdminPermission',
  components: {
    Search
  },
  // 全局ResizeObserver错误处理修复
  created() {
    // 保存原始的ResizeObserver构造函数
    this.originalResizeObserver = window.ResizeObserver;
    // 覆盖ResizeObserver以捕获循环错误
    window.ResizeObserver = class ResizeObserver extends this.originalResizeObserver {
      constructor(callback) {
        super((entries, observer) => {
          // 使用requestAnimationFrame避免循环
          requestAnimationFrame(() => {
            try {
              callback(entries, observer);
            } catch (error) {
              // 静默处理ResizeObserver循环错误
              if (error.toString().includes('ResizeObserver loop')) {
                console.warn('ResizeObserver loop detected, handled gracefully');
              } else {
                throw error;
              }
            }
          });
        });
      }
    };
  },
  beforeUnmount() {
    // 恢复原始的ResizeObserver构造函数
    if (this.originalResizeObserver) {
      window.ResizeObserver = this.originalResizeObserver;
    }
    // 清理定时器
    if (this.dialogTimer) {
      clearTimeout(this.dialogTimer);
    }
    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
    }
    // 清理防抖动定时器
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  },

  data() {
    return {
      loading: false,
      searchForm: {
        user_name: '',
        role_id: ''
      },
      userList: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 使用响应式标志控制对话框显示，避免直接操作visible属性导致的DOM抖动
      dialogVisible: false,
      permissionDialogVisible: false,
      dialogType: 'add',
      userForm: {
          userName: '',
          password: '',
          phone: '',
          role: [''],
          permissions: []
        },
      selectedUser: {},
      // 用于防抖动的定时器引用
      dialogTimer: null,
      loadingTimer: null,
      debounceTimer: null,
      rules: {
        role: [
          { required: true, message: '请选择角色', trigger: 'change' },
          { validator: this.validateRoles, trigger: 'change' }
        ]
      }
    };
  },
  mounted() {
    // 简化初始化加载，确保组件完全渲染后再加载数据
    this.$nextTick(() => {
      this.loadUserList();
    });
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    // 加载用户列表 - 采用更强的防抖动和异步处理
  loadUserList: function() {
    // 使用防抖动避免频繁调用
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    this.debounceTimer = setTimeout(() => {
      this.loading = true;
      
      // 发送真实API请求获取用户列表
      api.post('/user/permission/list', this.searchForm)
        .then(response => {
          // 打印后端返回的数据结构
          console.log('Backend response data:', response.data);
          // 使用setTimeout和requestAnimationFrame双重保障避免ResizeObserver循环
          setTimeout(() => {
            requestAnimationFrame(() => {
              // 使用nextTick确保DOM完全更新后再设置数据
              this.$nextTick(() => {
                // 处理返回的数据，应用筛选逻辑
                let filteredData = response.data;
                
                // 确保filteredData是一个数组
                if (!Array.isArray(filteredData)) {
                  // 如果API返回的是包含数组的对象，尝试获取正确的属性
                  filteredData = filteredData.data || [];
                }
                
                // 合并相同user_id的数据
                const mergedUsers = {};
                filteredData.forEach(item => {
                  const userId = item.user_id;
                  if (mergedUsers[userId]) {
                    // 如果用户已存在，合并角色（假设role_id是可以多选的）
                    if (item.role_id) {
                      // 确保role_id是字符串类型
                      const roleId = String(item.role_id);
                      if (!Array.isArray(mergedUsers[userId].role)) {
                        mergedUsers[userId].role = [String(mergedUsers[userId].role)];
                      }
                      if (!mergedUsers[userId].role.includes(roleId)) {
                        mergedUsers[userId].role.push(roleId);
                      }
                    }
                  } else {
                    // 如果用户不存在，创建新用户对象
                    mergedUsers[userId] = {
                      // 基本信息
                      id: item.id,
                      user_id: item.user_id,
                      // 映射字段
                      userName: item.user_name,  // 后端user_name → 前端userName
                      phone: item.phone || '',  // 确保phone有默认值
                      role: item.role_id ? [String(item.role_id)] : [],       // 确保role始终是字符串数组
                      createTime: item.register_time,  // 后端register_time → 前端createTime
                      // 状态处理：确保与表格的switch组件兼容
                      status: item.status ? '1' : '0',  // 布尔值转换为字符串'1'/'0'
                      // 保留其他字段
                      password: item.password
                    };
                  }
                });
                
                // 避免直接替换数组，使用push/pop等方法可能更安全
                this.userList.splice(0, this.userList.length);
                Object.values(mergedUsers).forEach(user => {
                  this.userList.push(user);
                });
                this.pagination.total = Object.values(mergedUsers).length;
                
                // 再次使用nextTick确保数据更新完成后再关闭loading
                this.$nextTick(() => {
                  this.loading = false;
                });
              });
            });
          }, 50);
        })
        .catch(error => {
          // 错误处理
          console.error('获取用户列表失败:', error);
          this.$message.error(error.response?.data?.message || '获取用户列表失败，请稍后重试');
          
          // 关闭loading状态
          this.loading = false;
        });
    }, 50);
  },
    // 搜索用户
    handleSearch() {
      this.pagination.currentPage = 1;
      this.loadUserList();
    },
    // 输入变化时的搜索处理（带防抖）
    handleSearchInput() {
      this.pagination.currentPage = 1;
      this.loadUserList();
    },
    // 重置搜索
    resetSearch() {
      this.searchForm = {
        user_name: '',
        role_id: ''
      };
      this.pagination.currentPage = 1;
      this.loadUserList();
    },
    // 分页大小变化
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.loadUserList();
    },
    // 页码变化
    handleCurrentChange(current) {
      this.pagination.currentPage = current;
      this.loadUserList();
    },
    // 添加用户 - 采用更严格的异步处理避免DOM抖动
  handleAddUser() {
    this.dialogType = 'add';
    this.resetForm();
    
    // 清理之前的定时器
    if (this.dialogTimer) {
      clearTimeout(this.dialogTimer);
    }
    
    // 多重异步保障：nextTick + setTimeout + requestAnimationFrame
    this.$nextTick(() => {
      this.dialogTimer = setTimeout(() => {
        requestAnimationFrame(() => {
          this.dialogVisible = true;
        });
      }, 100);
    });
  },
    // 编辑用户 - 采用更严格的异步处理避免DOM抖动
  handleEditUser(user) {
    this.dialogType = 'edit';
    // 深拷贝用户对象避免引用问题
    this.userForm = JSON.parse(JSON.stringify(user));
    
    // 清理之前的定时器
    if (this.dialogTimer) {
      clearTimeout(this.dialogTimer);
    }
    
    // 多重异步保障：nextTick + setTimeout + requestAnimationFrame
    this.$nextTick(() => {
      this.dialogTimer = setTimeout(() => {
        requestAnimationFrame(() => {
          this.dialogVisible = true;
        });
      }, 100);
    });
  },
    // 重置表单
    resetForm() {
      this.userForm = {
        userName: '',
        password: '',
        phone: '',
        role: ['1'],
        permissions: []
      };
      if (this.$refs.userFormRef) {
        this.$refs.userFormRef.resetFields();
      }
    },
    // 提交表单 - 优化异步处理避免DOM快速变化
  handleSubmit() {
    this.$refs.userFormRef.validate((valid) => {
      if (valid) {
        this.loading = true;
        
        if (this.dialogType === 'add') {
          // 添加用户时发送真实API请求
          api.post('/user/permission/add', this.userForm)
            .then(() => {
              this.loading = false;
              this.dialogVisible = false;
              this.$message.success('添加成功');
              // 重新加载用户列表
              this.loadUserList();
            })
            .catch(error => {
              this.loading = false;
              this.$message.error(error.response?.data?.message || '添加失败，请稍后重试');
            });
        } else {
          // 编辑用户时发送真实API请求
          api.post('/user/permission/update', {
            user_id: this.userForm.user_id,
            phone: this.userForm.phone,
            role: this.userForm.role,
            permissions: this.userForm.permissions
          }).then(() => {
            this.loading = false;
            this.dialogVisible = false;
            this.$message.success('编辑成功');
            // 重新加载用户列表以确保数据一致性
            this.loadUserList();
          }).catch(error => {
            this.loading = false;
            this.$message.error(error.response?.data?.message || '编辑失败，请稍后重试');
          });
        }
      }
    });
  },
    // 删除用户
    handleDeleteUser(user) {
      this.$confirm('确定要删除该用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        // 发送真实API请求删除用户
        api.post('/user/permission/delete', {
          user_id: user.user_id
        }).then(() => {
          this.loading = false;
          this.$message.success('删除成功');
          // 重新加载用户列表以确保数据一致性
          this.loadUserList();
        }).catch(error => {
          this.loading = false;
          this.$message.error(error.response?.data?.message || '删除失败，请稍后重试');
        });
      }).catch(() => {});
    },
    // 状态变化
    handleStatusChange(user) {
      this.$confirm('确定要修改该用户状态吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        // 发送真实API请求更新用户状态
        api.post('/user/permission/update', {
          user_id: user.user_id,
          status: user.status
        }).then(() => {
          this.loading = false;
          this.$message.success('状态更新成功');
          // 重新加载用户列表以确保数据一致性
          this.loadUserList();
        }).catch(error => {
          this.loading = false;
          this.$message.error(error.response?.data?.message || '状态更新失败，请稍后重试');
          // 恢复原来的状态
          user.status = user.status === '1' ? '0' : '1';
        });
      }).catch(() => {
        // 恢复原来的状态
        user.status = user.status === '1' ? '0' : '1';
      });
    },
    // 格式化日期
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleString('zh-CN');
    },
    // 获取角色标签
    getRoleLabel(role) {
      const roleMap = {
        '1': '普通用户',
        '2': '车票管理员',
        '3': '超级管理员',
        '4': '途径站点管理员',
        '5': '列车管理员',
        '6': '站点管理员'
      };
      
      if (Array.isArray(role)) {
        // 如果是数组，返回所有角色标签的拼接
        return role.map(r => roleMap[r] || r).join(', ');
      }
      
      return roleMap[role] || role;
    },
    // 获取角色类型
    getRoleType(role) {
      const typeMap = {
        '1': 'info',      // 普通用户 - 蓝色
        '2': 'primary',   // 车票管理员 - 紫色
        '3': 'success',   // 超级管理员 - 绿色
        '4': 'warning',   // 途径站点管理员 - 橙色
        '5': 'danger',    // 列车管理员 - 红色
        '6': 'info'       // 站点管理员 - 蓝色
      };
      
      if (Array.isArray(role)) {
        // 如果是数组，返回第一个角色的类型
        return typeMap[role[0]] || 'info';
      }
      
      return typeMap[role] || 'info';
    },
    // 判断是否是当前登录用户
    isCurrentUser(user) {
      // 这里假设当前登录用户是admin
      return user.userName === 'admin';
    },
    // 角色选择验证
    validateRoles(rule, value, callback) {
      // 确保value是数组
      const roles = Array.isArray(value) ? value : value ? [value] : [];
      if (roles.length === 0) {
        callback(new Error('请选择角色'));
        return;
      }

      // 判断是否选择了普通用户
      const hasUser = roles.includes('1');
      // 判断是否选择了超级管理员
      const hasSuperAdmin = roles.includes('3');
      // 判断是否选择了其他管理员角色
      const adminRoles = ['2', '4', '5', '6'];
      const hasOtherAdmin = adminRoles.some(role => roles.includes(role));

      // 规则1：选择普通用户不能选择任何管理员角色
      if (hasUser && hasOtherAdmin) {
        callback(new Error('普通用户不能同时拥有管理员角色'));
        return;
      }

      // 规则2：选择超级管理员不能选择其他管理员角色
      if (hasSuperAdmin && hasOtherAdmin) {
        callback(new Error('超级管理员不能同时拥有其他管理员角色'));
        return;
      }

      callback();
    }
  }
};
</script>

<style scoped>
.admin-permission {
  padding: 20px;
}

.permission-header {
  margin-bottom: 20px;
}

.permission-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.search-input {
  width: 200px;
  margin-right: 10px;
}

.search-select {
  width: 150px;
  margin-right: 10px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>