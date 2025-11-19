<template>
  <div class="passenger-manager">
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
          <td>{{ item.idType }}</td>
          <td>{{ formatIdNumber(item.idNumber) }}</td>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 模拟表格数据
const tableData = ref([
  {
    id: 1,
    name: '郑锦春',
    idType: '居民身份证',
    idNumber: '1526**********712',
    phone: '(+86)138****7017',
    checked: false
  },
  {
    id: 2,
    name: '刘伯伟',
    idType: '居民身份证',
    idNumber: '1526**********512',
    phone: '(+86)153****2480',
    checked: false
  },
  {
    id: 3,
    name: '童方正',
    idType: '居民身份证',
    idNumber: '1502**********012',
    phone: '(+86)151****8894',
    checked: false
  },
  {
    id: 4,
    name: '赵嘉俊',
    idType: '居民身份证',
    idNumber: '1526**********01X',
    phone: '(+86)138****6684',
    checked: false
  },
  {
    id: 5,
    name: '邢建宇',
    idType: '居民身份证',
    idNumber: '4117**********436',
    phone: '(+86)132****2244',
    checked: false
  },
  {
    id: 6,
    name: '郑利平',
    idType: '居民身份证',
    idNumber: '1526**********717',
    phone: '(+86)130****9838',
    checked: false
  }
]);

const searchName = ref('');
const selectAll = ref(false);

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
  console.log('添加乘客');
};

// 批量删除
const handleBatchDelete = () => {
  const selectedIds = filteredData.value.filter(item => item.checked).map(item => item.id);
  if (selectedIds.length === 0) {
    alert('请选择要删除的乘客');
    return;
  }
  tableData.value = tableData.value.filter(item => !selectedIds.includes(item.id));
};

// 单行删除
const handleDelete = (id) => {
  if (confirm('确定要删除该乘客吗？')) {
    tableData.value = tableData.value.filter(item => item.id !== id);
  }
};

// 编辑
const handleEdit = (id) => {
  console.log('编辑乘客，ID：', id);
};

// 格式化证件号码（脱敏）
const formatIdNumber = (idNumber) => {
  return idNumber.replace(/(.{6})(.*)(.{3})/, '$1**********$3');
};
</script>

<style scoped>
.passenger-manager {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Microsoft YaHei", sans-serif;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

.search-btn {
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #f5f5f5;
}

.action-bar {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}

.add-btn, .batch-delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  text-align: center;
}

.add-btn {
  background-color: #28a745;
  padding-right:30px;
}

.batch-delete-btn {
  background-color: #dc3545;
  padding-right:30px;
}

.icon {
  vertical-align: middle;
}

.passenger-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #bce8f1;
}

.passenger-table th, .passenger-table td {
  border: 1px solid #bce8f1;
  padding: 10px;
  text-align: center;
}

.passenger-table th {
  background-color: #e9f7fa;
  font-weight: 600;
}

.table-row:hover {
  background-color: #f8f9fa;
}

.verify-icon {
  vertical-align: middle;
}

.operation-col {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.delete-btn, .edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.delete-btn:hover svg, .edit-btn:hover svg {
  transform: scale(1.1);
  transition: transform 0.2s;
}
</style>

<script>
export default {
  name: 'PassengerManager'
}
</script>