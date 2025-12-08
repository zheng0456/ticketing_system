<template>
  <div class="admin-train-station-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>火车车站管理</h2>
    </div>

    <!-- 搜索和操作区域 -->
    <div class="search-operation-section">
      <div class="search-bar">
        
        <el-input
          v-model="searchParams.stationName"
          placeholder="车站名称"
          style="width: 200px; margin-right: 10px;"
        />
        <el-input
          v-model="searchParams.city"
          placeholder="所在城市"
          style="width: 180px; margin-right: 10px;"
        />
        <el-select
          v-model="searchParams.status"
          placeholder="状态"
          style="width: 120px; margin-right: 10px;"
        >
          <el-option label="全部" value="" />
          <el-option label="运营中" value="operating" />
          <el-option label="建设中" value="building" />
          <el-option label="已关闭" value="closed" />
        </el-select>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>

      <div class="operation-bar">
        <el-button type="success" @click="handleAdd">添加车站</el-button>
        <el-button type="danger" @click="handleBatchDelete" :disabled="selectedRows.length === 0">批量删除</el-button>
      </div>
    </div>

    <!-- 数据统计概览 -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-title">车站总数</div>
        <div class="stat-value">{{ totalStations }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">运营中</div>
        <div class="stat-value positive">{{ operatingStations }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">建设中</div>
        <div class="stat-value warning">{{ buildingStations }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">已关闭</div>
        <div class="stat-value negative">{{ closedStations }}</div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <el-table
        v-loading="loading"
        :data="stationList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="stationName" label="车站名称" width="180" />
        <el-table-column prop="city" label="所在城市" width="120" />
        <el-table-column prop="province" label="所在省份" width="120" />
        <el-table-column prop="address" label="详细地址" width="250" />
        <el-table-column prop="openDate" label="开通日期" width="150" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusTagType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <div style="display: flex; align-items: center;">
              <el-button
                type="primary"
                size="small"
                @click="handleEdit(scope.row)"
                style="margin-right: 5px;"
              >
                编辑
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDelete(scope.row)"
                style="margin-right: 5px;"
              >
                删除
              </el-button>
              <el-button
                type="info"
                size="small"
                @click="handleDetail(scope.row)"
              >
                详情
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

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

    <!-- 添加/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '添加车站' : '编辑车站'"
      width="60%"
    >
      <el-form
        ref="stationForm"
        :model="stationForm"
        :rules="formRules"
        label-width="120px"
        style="padding-right: 40px;"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车站名称" prop="stationName">
              <el-input v-model="stationForm.stationName" placeholder="请输入车站名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所在城市" prop="city">
              <el-input v-model="stationForm.city" placeholder="请输入所在城市" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在省份" prop="province">
              <el-input v-model="stationForm.province" placeholder="请输入所在省份" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="stationForm.address" placeholder="请输入详细地址" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开通日期" prop="openDate">
              <el-date-picker
                v-model="stationForm.openDate"
                type="date"
                placeholder="请选择开通日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="stationForm.status" placeholder="请选择状态">
                <el-option label="运营中" value="operating" />
                <el-option label="建设中" value="building" />
                <el-option label="已关闭" value="closed" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="stationForm.remark"
                placeholder="请输入备注信息"
                type="textarea"
                :rows="3"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 详情对话框 -->
    <el-dialog
      v-model="detailVisible"
      title="车站详情"
      width="60%"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="车站名称">{{ detailData.stationName }}</el-descriptions-item>
        <el-descriptions-item label="所在城市">{{ detailData.city }}</el-descriptions-item>
        <el-descriptions-item label="所在省份">{{ detailData.province }}</el-descriptions-item>
        <el-descriptions-item label="开通日期">{{ detailData.openDate }}</el-descriptions-item>
        <el-descriptions-item label="详细地址" :span="2">{{ detailData.address }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusTagType(detailData.status)">
            {{ getStatusText(detailData.status) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ detailData.remark || '无' }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../../api'

export default {
  name: 'AdminTrainStation',
  data() {
    return {
      // 加载状态
      loading: false,
      // 车站列表数据
      stationList: [],
      // 搜索参数
      searchParams: {
        stationName: '',
        city: '',
        status: ''
      },
      // 分页参数
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 选中的行
      selectedRows: [],
      // 对话框显示状态
      dialogVisible: false,
      detailVisible: false,
      // 对话框类型：add 或 edit
      dialogType: 'add',
      // 表单数据
      stationForm: {
        stationName: '',
        city: '',
        province: '',
        address: '',
        openDate: '',
        status: 'operating',
        remark: ''
      },
      // 详情数据
      detailData: {},
      // 表单验证规则
      formRules: {
        stationName: [
          { required: true, message: '请输入车站名称', trigger: 'blur' },
          { min: 1, max: 50, message: '车站名称长度应在 1 到 50 个字符之间', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入所在城市', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请输入所在省份', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { max: 200, message: '详细地址长度不能超过 200 个字符', trigger: 'blur' }
        ],
        openDate: [
          { required: true, message: '请选择开通日期', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      // 统计数据
      totalStations: 0,
      operatingStations: 0,
      buildingStations: 0,
      closedStations: 0
    };
  },
  mounted() {
    // 初始化时加载数据
    this.loadStationList();
  },
  methods: {
    // 加载车站列表
    async loadStationList() {
      this.loading = true;
      try {
        // 发送POST请求到指定端点
        const { data } = await api.post('/inventory/admin/trainStation', {
          ...this.searchParams,
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        });
        
        this.stationList = data.list || [];
        this.pagination.total = data.total || 0;
        
        // 计算统计数据
        this.loadStatistics();
        
      } catch (error) {
        this.$message.error('获取车站列表失败');
        console.error('Error loading station list:', error);
      } finally {
        this.loading = false;
      }
    },
    
    // 计算统计数据
    loadStatistics() {
      try {
        this.totalStations = this.stationList.length;
        this.operatingStations = this.stationList.filter(station => station.status === 'operating').length;
        this.buildingStations = this.stationList.filter(station => station.status === 'building').length;
        this.closedStations = this.stationList.filter(station => station.status === 'closed').length;
      } catch (error) {
        console.error('Error calculating statistics:', error);
      }
    },
    
    // 搜索
    handleSearch() {
      this.pagination.currentPage = 1;
      this.loadStationList();
    },
    
    // 重置搜索条件
    handleReset() {
      this.searchParams = {
        stationName: '',
        city: '',
        status: ''
      };
      this.pagination.currentPage = 1;
      this.loadStationList();
    },
    
    // 分页大小变化
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.loadStationList();
    },
    
    // 页码变化
    handleCurrentChange(current) {
      this.pagination.currentPage = current;
      this.loadStationList();
    },
    
    // 选择行变化
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    
    // 打开添加对话框
    handleAdd() {
      this.dialogType = 'add';
      this.resetForm();
      this.dialogVisible = true;
    },
    
    // 打开编辑对话框
    handleEdit(row) {
      this.dialogType = 'edit';
      this.stationForm = { ...row };
      this.dialogVisible = true;
    },
    
    // 打开详情对话框
    handleDetail(row) {
      this.detailData = { ...row };
      this.detailVisible = true;
    },
    
    // 删除单个车站
    async handleDelete() {
      try {
        await this.$confirm('确定要删除该车站吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        
        // 这里应该是实际的API调用
        // await this.$api.trainStation.delete(row.stationId);
        
        this.$message.success('删除成功');
        this.loadStationList();
        this.loadStatistics();
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败');
          console.error('Error deleting station:', error);
        }
      }
    },
    
    // 批量删除
    async handleBatchDelete() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请选择要删除的车站');
        return;
      }
      
      try {
        await this.$confirm(`确定要删除选中的 ${this.selectedRows.length} 个车站吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        
        // 这里应该是实际的API调用
        // const ids = this.selectedRows.map(row => row.stationId);
        // await this.$api.trainStation.batchDelete(ids);
        
        this.$message.success('批量删除成功');
        this.loadStationList();
        this.loadStatistics();
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('批量删除失败');
          console.error('Error batch deleting stations:', error);
        }
      }
    },
    
    // 提交表单
    async handleSubmit() {
      try {
        await this.$refs.stationForm.validate();
        
        // 准备提交数据，确保日期格式正确
        const submitData = { ...this.stationForm };
        
        // 手动格式化日期为yyyy-MM-dd HH:mm:ss
        if (submitData.openDate) {
          console.log('原始日期值:', submitData.openDate);
          console.log('日期类型:', typeof submitData.openDate);
          
          // 确保获取到有效的Date对象
          const date = submitData.openDate instanceof Date ? submitData.openDate : new Date(submitData.openDate);
          
          if (isNaN(date.getTime())) {
            console.error('无法解析的日期');
          } else {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            submitData.openDate = `${year}-${month}-${day} 00:00:00`;
          }
          
          console.log('格式化后日期:', submitData.openDate);
        }
        
        if (this.dialogType === 'add') {
          // 发送POST请求添加车站
          await api.post('/inventory/admin/trainStation/add', submitData);
          this.$message.success('添加成功');
        } else {
          // 这里应该是实际的API调用
          // await this.$api.trainStation.update(this.stationForm.stationId, this.stationForm);
          this.$message.success('更新成功');
        }
        
        this.dialogVisible = false;
        this.loadStationList();
        this.loadStatistics();
      } catch (error) {
        if (error !== false) { // 表单验证失败不显示错误消息
          this.$message.error(this.dialogType === 'add' ? '添加失败' : '更新失败');
          console.error(`Error ${this.dialogType}ing station:`, error);
        }
      }
    },
    
    // 重置表单
    resetForm() {
      if (this.$refs.stationForm) {
        this.$refs.stationForm.resetFields();
      }
      this.stationForm = {
        stationName: '',
        city: '',
        province: '',
        address: '',
        openDate: '',
        status: 'operating',
        remark: ''
      };
    },
    
    // 获取状态标签类型
    getStatusTagType(status) {
      const typeMap = {
        'operating': 'success',
        'building': 'warning',
        'closed': 'danger'
      };
      return typeMap[status] || 'info';
    },
    
    // 获取状态文本
    getStatusText(status) {
      const textMap = {
        'operating': '运营中',
        'building': '建设中',
        'closed': '已关闭'
      };
      return textMap[status] || status;
    }
  }
};
</script>

<style scoped>
.admin-train-station-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e7ed;
}

.page-header h2 {
  margin: 0;
  color: #303133;
  font-weight: 600;
}

.search-operation-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.operation-bar {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.stats-overview {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-title {
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
}

.stat-value.positive {
  color: #67c23a;
}

.stat-value.warning {
  color: #e6a23c;
}

.stat-value.negative {
  color: #f56c6c;
}

.table-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.pagination-container {
  background-color: #fff;
  padding: 15px 20px;
  border-radius: 4px;
  display: flex;
  justify-content: flex-end;
}
</style>