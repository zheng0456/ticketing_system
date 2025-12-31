<template>
  <div class="passenger-manager">
    <!-- 添加/编辑表单页面 -->
    <PassengerMessage 
      v-if="showAddForm" 
      @cancel="handleCancelAdd" 
      @save="handleSavePassenger"
      :editData="currentEditData"
    />
    
    <!-- 列表页面 -->
    <template v-else>
      <!-- 搜索栏 -->
      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchName" 
          placeholder="请输入乘客姓名" 
          class="search-input"
        >
        <button class="search-btn" @click="handleSearch">查询</button>
      </div>

      <!-- 操作栏 -->
      <div class="action-bar">
        <button class="add-btn" @click="handleAdd">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M12 5V19M5 12H19" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          添加
        </button>
        <button class="batch-delete-btn" @click="handleBatchDelete">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M3 6H5M19 6H21M1 6V8C1 10.21 2.79 12 5 12H19C21.21 12 23 10.21 23 8V6M1 10H23M10 14V20M14 14V20M5 14V20" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          批量删除
        </button>
      </div>

      <!-- 表格 -->
      <table class="passenger-table">
        <thead>
          <tr>
            <th><input type="checkbox" v-model="selectAll" @change="handleSelectAll"></th>
            <th>序号</th>
            <th>姓名</th>
            <th>证件类型</th>
            <th>证件号码</th>
            <th>手机/电话</th>
            <th>核验状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredData" :key="item.id" class="table-row">
            <td><input type="checkbox" v-model="item.checked"></td>
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.cardType }}</td>
            <td>{{ formatIdNumber(item.cardId) }}</td>
            <td>{{ item.phone }}</td>
            <td>
              <svg class="verify-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.59 7.58L10 14.17L7.41 11.58L6 13L10 17L18 9L16.59 7.58Z" fill="#28a745"/>
              </svg>
            </td>
            <td class="operation-col">
              <button class="delete-btn" @click="handleDelete(item.id)">
                <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4ZM6 19A2 2 0 0 0 8 21H16A2 2 0 0 0 18 19V7H6V19Z" fill="#dc3545"/>
                </svg>
              </button>
              <button class="edit-btn" @click="handleEdit(item.id)">
                <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M12 20.25C6.82 20.25 2.75 16.18 2.75 11C2.75 5.82 6.82 1.75 12 1.75C17.18 1.75 21.25 5.82 21.25 11C21.25 16.18 17.18 20.25 12 20.25ZM12 2.75C7.39 2.75 3.75 6.39 3.75 11C3.75 15.61 7.39 19.25 12 19.25C16.61 19.25 20.25 15.61 20.25 11C20.25 6.39 16.61 2.75 12 2.75ZM17.25 7.5L15.75 9L16.25 9.5L17.75 8M7.75 15.75L6.25 14.25L10.25 10.25L11.75 11.75L7.75 15.75Z" fill="#007bff"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import PassengerMessage from './PassengerMessage.vue';
import api from '@/api/index.js';
import { ElMessage } from 'element-plus';

// 表格数据
const tableData = ref([]);

const searchName = ref('');
const selectAll = ref(false);
const showAddForm = ref(false);
const currentEditData = ref(null);

// 过滤后的数据
const filteredData = computed(() => {
  if (!searchName.value) {
    return tableData.value;
  }
  return tableData.value.filter(item => 
    item.name.includes(searchName.value)
  );
});

// 全选逻辑
const handleSelectAll = (e) => {
  filteredData.value.forEach(item => {
    item.checked = e.target.checked;
  });
};

// 搜索
const handleSearch = () => {
  console.log('搜索姓名：', searchName.value);
};

// 添加
const handleAdd = () => {
  currentEditData.value = null;
  showAddForm.value = true;
};

// 取消添加/编辑
const handleCancelAdd = () => {
  showAddForm.value = false;
  currentEditData.value = null;
};

// 保存乘客信息
const handleSavePassenger = async (formData) => {
  try {
    if (currentEditData.value && currentEditData.value.id) {
      const response = await api.post('/user/passenger/update', {
        id: currentEditData.value.id,
        name: formData.name,
        phone: formData.phone ? parseInt(formData.phone) : null,
        cardId: formData.idNumber,
        cardType: formData.idType,
        discountType: formData.discountType
      });
      console.log('更新乘车人接口返回数据:', response.data);
      if (response.data.code !== 200) {
        throw new Error(response.data.msg || '更新乘车人信息失败');
      }
      ElMessage.success('乘车人信息更新成功');
    } else {
      console.log('🚀 准备调用添加乘车人API，数据:', formData);
      const response = await api.post('/user/passenger/add', {
        name: formData.name,
        phone: formData.phone,
        cardId: formData.idNumber,
        cardType: formData.idType,
        discountType: formData.discountType
      });
      console.log('✅ 添加乘车人接口返回数据:', response.data);
      if (response.data.code !== 200) {
        throw new Error(response.data.msg || '添加乘车人失败');
      }
      ElMessage.success('乘车人添加成功');
    }
    
    await getPassengerList();
    
    showAddForm.value = false;
    currentEditData.value = null;
  } catch (error) {
    console.error('保存乘客信息失败:', error);
    ElMessage.error(error.response?.data?.msg || '保存乘客信息失败，请检查网络连接或稍后重试');
  }
};

// 批量删除
const handleBatchDelete = async () => {
  const selectedIds = filteredData.value.filter(item => item.checked).map(item => item.id);
  if (selectedIds.length === 0) {
    alert('请选择要删除的乘客');
    return;
  }
  
  try {
    await api.post('/user/passenger/batch-delete', {
      ids: selectedIds
    });
    // 刷新列表
    await getPassengerList();
  } catch (error) {
    console.error('批量删除乘客失败:', error);
  }
};

// 单行删除
const handleDelete = async (id) => {
  if (confirm('确定要删除该乘客吗？')) {
    try {
      await api.post('/user/passenger/delete', {
        id: id
      });
      // 刷新列表
      await getPassengerList();
    } catch (error) {
      console.error('删除乘客失败:', error);
    }
  }
};

// 编辑
const handleEdit = (id) => {
  const passenger = tableData.value.find(item => item.id === id);
  if (passenger) {
    // 解析手机号码，分离国家代码和号码
    let countryCode = '+86';
    let phone = passenger.phone || '';
    
    if (phone) {
      // 尝试匹配国家代码（+86, +852, +853, +886等）
      const phoneMatch = phone.match(/^(\+\d{2,3})(.+)$/);
      if (phoneMatch) {
        countryCode = phoneMatch[1];
        phone = phoneMatch[2];
      }
    }
    
    currentEditData.value = {
      id: passenger.id,
      idType: passenger.cardType,
      name: passenger.name,
      idNumber: passenger.cardId,
      countryCode: countryCode,
      phone: phone,
      discountType: passenger.discountType
    };
    showAddForm.value = true;
  }
};

// 获取乘车人列表
const getPassengerList = async () => {
  try {
    const response = await api.post('/user/passenger/list');
    console.log('📋 获取乘车人列表接口返回数据:', response.data);
    tableData.value = (response.data.data || []).map(item => ({
      ...item,
      checked: false
    }));
  } catch (error) {
    console.error('获取乘车人列表失败:', error);
  }
};

// 格式化证件号码（脱敏）
const formatIdNumber = (idNumber) => {
  if (!idNumber) return '';
  return idNumber.replace(/(.{6})(.*)(.{3})/, '$1**********$3');
};

// 页面加载时获取乘车人列表
onMounted(() => {
  getPassengerList();
});
</script>

<style scoped>
.passenger-manager {
  flex: 1;
  padding: 20px;
  font-family: "Microsoft YaHei", sans-serif;
  background-color: #fff;
}

.search-bar {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 200px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #409EFF;
}

.search-btn {
  padding: 8px 20px;
  background-color: #409EFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #66b1ff;
}

.action-bar {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}

.add-btn, .batch-delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  transition: all 0.3s;
}

.add-btn {
  background-color: #67c23a;
}

.add-btn:hover {
  background-color: #85ce61;
}

.batch-delete-btn {
  background-color: #f56c6c;
}

.batch-delete-btn:hover {
  background-color: #f78989;
}

.icon {
  vertical-align: middle;
  display: inline-block;
}

.passenger-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ebeef5;
  background-color: #fff;
}

.passenger-table th, .passenger-table td {
  border: 1px solid #ebeef5;
  padding: 12px;
  text-align: center;
  font-size: 14px;
}

.passenger-table th {
  background-color: #f5f7fa;
  font-weight: 600;
  color: #606266;
}

.passenger-table th input[type="checkbox"] {
  cursor: pointer;
}

.passenger-table td {
  color: #606266;
}

.passenger-table td input[type="checkbox"] {
  cursor: pointer;
}

.table-row:hover {
  background-color: #f5f7fa;
}

.verify-icon {
  vertical-align: middle;
  display: inline-block;
}

.operation-col {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.delete-btn, .edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.delete-btn:hover, .edit-btn:hover {
  transform: scale(1.1);
}

.delete-btn svg, .edit-btn svg {
  display: block;
}
</style>

<script>
export default {
  name: 'PassengerManager'
}
</script>