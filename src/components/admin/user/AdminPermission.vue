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
          v-model="searchForm.username"
          placeholder="请输入用户名"
          clearable
          class="search-input"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-select
          v-model="searchForm.role"
          placeholder="选择角色"
          clearable
          class="search-select"
        >
          <el-option label="普通用户" value="user"></el-option>
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="超级管理员" value="super-admin"></el-option>
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
        <el-table-column prop="id" label="用户ID" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="role" label="角色" width="120">
          <template #default="scope">
            <el-tag
              :type="
                scope.row.role === 'super-admin'
                  ? 'success'
                  : scope.row.role === 'admin'
                  ? 'primary'
                  : 'info'
              "
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
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="userForm.username"
            :disabled="dialogType === 'edit'"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userForm.nickname" placeholder="请输入昵称"></el-input>
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
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="普通用户" value="user"></el-option>
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="超级管理员" value="super-admin"></el-option>
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
          <el-input v-model="selectedUser.username" disabled></el-input>
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
        username: '',
        role: ''
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
        id: '',
        username: '',
        nickname: '',
        password: '',
        email: '',
        phone: '',
        role: 'user',
        permissions: []
      },
      selectedUser: {},
      // 用于防抖动的定时器引用
      dialogTimer: null,
      loadingTimer: null,
      debounceTimer: null,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度至少为 6 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
        ],
        phone: [
          { message: '请输入有效的手机号', trigger: 'blur', pattern: /^1[3-9]\d{9}$/ }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' }
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
      // 创建模拟数据
      const mockData = [
        {
          id: 1,
          username: 'admin',
          nickname: '超级管理员',
          email: 'admin@example.com',
          phone: '13800138000',
          role: 'super-admin',
          status: '1',
          createTime: new Date('2023-01-01'),
          permissions: ['user:read', 'user:create', 'user:update', 'user:delete', 'train:read', 'train:create', 'train:update', 'train:delete', 'order:read', 'order:update', 'system:config']
        },
        {
          id: 2,
          username: 'manager',
          nickname: '管理员',
          email: 'manager@example.com',
          phone: '13800138001',
          role: 'admin',
          status: '1',
          createTime: new Date('2023-01-02'),
          permissions: ['user:read', 'user:update', 'train:read', 'train:create', 'train:update', 'order:read', 'order:update']
        },
        {
          id: 3,
          username: 'user1',
          nickname: '普通用户',
          email: 'user1@example.com',
          phone: '13800138002',
          role: 'user',
          status: '1',
          createTime: new Date('2023-01-03'),
          permissions: ['user:read', 'train:read', 'order:read']
        }
      ];
      
      // 使用setTimeout和requestAnimationFrame双重保障避免ResizeObserver循环
      setTimeout(() => {
        requestAnimationFrame(() => {
          // 使用nextTick确保DOM完全更新后再设置数据
          this.$nextTick(() => {
            // 根据搜索条件过滤数据
            let filteredData = mockData.filter(item => {
              // 用户名筛选
              const usernameMatch = !this.searchForm.username || 
                                   item.username.toLowerCase().includes(this.searchForm.username.toLowerCase()) ||
                                   item.nickname.toLowerCase().includes(this.searchForm.username.toLowerCase());
              // 角色筛选
              const roleMatch = !this.searchForm.role || item.role === this.searchForm.role;
              
              return usernameMatch && roleMatch;
            });
            
            // 避免直接替换数组，使用push/pop等方法可能更安全
            this.userList.splice(0, this.userList.length);
            filteredData.forEach(item => this.userList.push({...item}));
            this.pagination.total = filteredData.length;
            
            // 再次使用nextTick确保数据更新完成后再关闭loading
            this.$nextTick(() => {
              this.loading = false;
            });
          });
        });
      }, 50);
    }, 50);
  },
    // 搜索用户
    handleSearch() {
      this.pagination.currentPage = 1;
      this.loadUserList();
    },
    // 重置搜索
    resetSearch() {
      this.searchForm = {
        username: '',
        role: ''
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
        id: '',
        username: '',
        nickname: '',
        password: '',
        email: '',
        phone: '',
        role: 'user',
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
        
        // 使用requestAnimationFrame和setTimeout结合避免ResizeObserver循环
        requestAnimationFrame(() => {
          setTimeout(() => {
            let updateData = null;
            
            if (this.dialogType === 'add') {
              updateData = {
                ...this.userForm,
                id: Date.now(),
                status: '1',
                createTime: new Date()
              };
            }
            
            // 使用nextTick确保DOM稳定后再更新数据和关闭对话框
            this.$nextTick(() => {
              if (this.dialogType === 'add') {
                this.userList.push(updateData);
              } else {
                const index = this.userList.findIndex(item => item.id === this.userForm.id);
                if (index !== -1) {
                  // 使用对象展开而不是直接替换，避免触发深层次的DOM更新
                  Object.assign(this.userList[index], this.userForm);
                }
              }
              
              this.pagination.total = this.userList.length;
              
              // 再次使用nextTick确保数据更新完成
              this.$nextTick(() => {
                this.loading = false;
                // 延迟关闭对话框，避免快速连续的DOM变化
                setTimeout(() => {
                  this.dialogVisible = false;
                  this.$message.success(this.dialogType === 'add' ? '添加成功' : '编辑成功');
                }, 50);
              });
            });
          }, 200);
        });
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
        // 模拟删除
        setTimeout(() => {
          const index = this.userList.findIndex(item => item.id === user.id);
          if (index !== -1) {
            this.userList.splice(index, 1);
          }
          this.pagination.total = this.userList.length;
          this.loading = false;
          this.$message.success('删除成功');
        }, 500);
      }).catch(() => {});
    },
    // 状态变化
    handleStatusChange(user) {
      this.$confirm('确定要修改该用户状态吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟状态更新
        this.$message.success('状态更新成功');
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
        'user': '普通用户',
        'admin': '管理员',
        'super-admin': '超级管理员'
      };
      return roleMap[role] || role;
    },
    // 获取角色类型
    getRoleType(role) {
      const typeMap = {
        'user': 'info',
        'admin': 'primary',
        'super-admin': 'success'
      };
      return typeMap[role] || 'info';
    },
    // 判断是否是当前登录用户
    isCurrentUser(user) {
      // 这里假设当前登录用户是admin
      return user.username === 'admin';
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