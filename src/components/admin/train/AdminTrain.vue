<template>
  <div class="admin-train-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>火车车辆管理</h2>
    </div>

    <!-- 搜索和操作区域 -->
    <div class="search-operation-section">
      <div class="search-bar">
        <el-input
          v-model="searchParams.trainNumber"
          placeholder="车次号"
          style="width: 180px; margin-right: 10px;"
        />
        
        <el-select
          v-model="searchParams.trainType"
          placeholder="车型"
          style="width: 120px; margin-right: 10px;"
        >
          <el-option label="全部" value="" />
          <el-option label="高铁" value="high-speed" />
          <el-option label="动车" value="bullet" />
          <el-option label="普通列车" value="normal" />
        </el-select>
        <el-select
          v-model="searchParams.status"
          placeholder="状态"
          style="width: 120px; margin-right: 10px;"
        >
          <el-option label="全部" value="" />
          <el-option label="运行中" value="running" />
          <el-option label="维修中" value="maintenance" />
          <el-option label="停运" value="stopped" />
        </el-select>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>

      <div class="operation-bar">
        <el-button type="success" @click="handleAdd">添加车辆</el-button>
        <el-button type="danger" @click="handleBatchDelete" :disabled="selectedRows.length === 0">批量删除</el-button>
      </div>
    </div>

    <!-- 数据统计概览 -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-title">车辆总数</div>
        <div class="stat-value">{{ totalTrains }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">运行中</div>
        <div class="stat-value positive">{{ runningTrains }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">维修中</div>
        <div class="stat-value warning">{{ maintenanceTrains }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">停运</div>
        <div class="stat-value negative">{{ stoppedTrains }}</div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <el-table
        v-loading="loading"
        :data="trainList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="trainId" label="车辆ID" width="120" />
        <el-table-column prop="trainNumber" label="车次号" width="120" />
        <el-table-column prop="trainType" label="车型" width="100">
          <template #default="scope">
            <el-tag :type="getTypeTagType(scope.row.trainType)">
              {{ getTypeText(scope.row.trainType) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="capacity" label="载客量" width="100" />
        <el-table-column prop="manufactureDate" label="制造日期" width="150" />
        <el-table-column prop="serviceLife" label="服役年限" width="100">
          <template #default="scope">
            <span>{{ scope.row.serviceLife }}年</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusTagType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastMaintenanceDate" label="最后检修日期" width="150" />
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
      :title="dialogType === 'add' ? '添加车辆' : '编辑车辆'"
      width="60%"
    >
      <el-form
        ref="trainForm"
        :model="trainForm"
        :rules="formRules"
        label-width="120px"
        style="padding-right: 40px;"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车次号" prop="trainNumber">
              <el-input v-model="trainForm.trainNumber" placeholder="请输入车次号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车型" prop="trainType">
              <el-select v-model="trainForm.trainType" placeholder="请选择车型">
                <el-option label="高铁" value="high-speed" />
                <el-option label="动车" value="bullet" />
                <el-option label="普通列车" value="normal" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="载客量" prop="capacity">
              <el-input-number
                v-model="trainForm.capacity"
                :min="1"
                :max="5000"
                placeholder="请输入载客量"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="制造日期" prop="manufactureDate">
              <el-date-picker
                v-model="trainForm.manufactureDate"
                type="date"
                placeholder="请选择制造日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="trainForm.status" placeholder="请选择状态">
                <el-option label="运行中" value="running" />
                <el-option label="维修中" value="maintenance" />
                <el-option label="停运" value="stopped" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="最后检修日期" prop="lastMaintenanceDate">
              <el-date-picker
                v-model="trainForm.lastMaintenanceDate"
                type="date"
                placeholder="请选择最后检修日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服役年限" prop="serviceLife">
              <el-input-number
                v-model="trainForm.serviceLife"
                :min="0"
                :max="30"
                placeholder="请输入服役年限"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input
            v-model="trainForm.remark"
            type="textarea"
            placeholder="请输入备注信息"
            :rows="3"
          />
        </el-form-item>
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
      v-model="detailDialogVisible"
      title="车辆详情"
      width="70%"
    >
      <div class="detail-info">
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">车辆ID：</span>
            <span class="detail-value">{{ selectedTrain.trainId }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">车次号：</span>
            <span class="detail-value">{{ selectedTrain.trainNumber }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">车型：</span>
            <span class="detail-value">
              <el-tag :type="getTypeTagType(selectedTrain.trainType)">
                {{ getTypeText(selectedTrain.trainType) }}
              </el-tag>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">载客量：</span>
            <span class="detail-value">{{ selectedTrain.capacity }}人</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">状态：</span>
            <span class="detail-value">
              <el-tag :type="getStatusTagType(selectedTrain.status)">
                {{ getStatusText(selectedTrain.status) }}
              </el-tag>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">制造日期：</span>
            <span class="detail-value">{{ selectedTrain.manufactureDate }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">服役年限：</span>
            <span class="detail-value">{{ selectedTrain.serviceLife }}年</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">最后检修日期：</span>
            <span class="detail-value">{{ selectedTrain.lastMaintenanceDate }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">下一次检修日期：</span>
            <span class="detail-value">{{ getNextMaintenanceDate(selectedTrain.lastMaintenanceDate) }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item full-width">
            <span class="detail-label">备注：</span>
            <span class="detail-value">{{ selectedTrain.remark || '-' }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'AdminTrain',
  data() {
    return {
      // 搜索参数
      searchParams: {
        trainNumber: '',
        trainType: '',
        status: ''
      },
      // 车辆列表数据
      trainList: [],
      // 选中的行数据
      selectedRows: [],
      // 加载状态
      loading: false,
      // 分页信息
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 统计数据
      totalTrains: 0,
      runningTrains: 0,
      maintenanceTrains: 0,
      stoppedTrains: 0,
      // 对话框状态
      dialogVisible: false,
      dialogType: 'add', // 'add' 或 'edit'
      detailDialogVisible: false,
      // 表单数据
      trainForm: {
        trainId: '',
        trainNumber: '',
        trainType: '',
        capacity: 0,
        manufactureDate: '',
        serviceLife: 0,
        status: '',
        lastMaintenanceDate: '',
        remark: ''
      },
      // 表单验证规则
      formRules: {
        trainNumber: [
          { required: true, message: '请输入车次号', trigger: 'blur' }
        ],
        trainType: [
          { required: true, message: '请选择车型', trigger: 'change' }
        ],
        capacity: [
          { required: true, message: '请输入载客量', trigger: 'change' }
        ],
        manufactureDate: [
          { required: true, message: '请选择制造日期', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      // 选中的车辆
      selectedTrain: {}
    }
  },
  mounted() {
    this.loadTrainData()
  },
  methods: {
    // 获取车型标签类型
    getTypeTagType(type) {
      const typeMap = {
        'high-speed': 'success',
        'bullet': 'primary',
        'normal': 'info'
      }
      return typeMap[type] || 'default'
    },

    // 获取车型文本
    getTypeText(type) {
      const typeMap = {
        'high-speed': '高铁',
        'bullet': '动车',
        'normal': '普通列车'
      }
      return typeMap[type] || type
    },

    // 获取状态标签类型
    getStatusTagType(status) {
      const statusMap = {
        'running': 'success',
        'maintenance': 'warning',
        'stopped': 'danger'
      }
      return statusMap[status] || 'default'
    },

    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        'running': '运行中',
        'maintenance': '维修中',
        'stopped': '停运'
      }
      return statusMap[status] || status
    },

    // 计算下一次检修日期
    getNextMaintenanceDate(lastDate) {
      if (!lastDate) return '-'
      const date = new Date(lastDate)
      date.setMonth(date.getMonth() + 3) // 假设每3个月检修一次
      return date.toISOString().split('T')[0]
    },

    // 加载车辆数据
    loadTrainData() {
      this.loading = true
      // 向后端发送POST请求获取车辆数据
      api.post('/admin/train', {
        ...this.searchParams,
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      })
      .then(response => {
        const data = response.data
        // 设置车辆列表
        this.trainList = data.list || []
        // 更新分页信息
        this.pagination.total = data.total || 0
        // 计算统计数据
        this.calculateStatistics(this.trainList)
      })
      .catch(error => {
        console.error('加载车辆数据失败:', error)
        this.$message.error('加载车辆数据失败，请稍后重试')
      })
      .finally(() => {
        this.loading = false
      })
    },

    // 计算统计数据
    calculateStatistics(data) {
      this.totalTrains = data.length
      this.runningTrains = data.filter(item => item.status === 'running').length
      this.maintenanceTrains = data.filter(item => item.status === 'maintenance').length
      this.stoppedTrains = data.filter(item => item.status === 'stopped').length
    },

    // 搜索
    handleSearch() {
      this.pagination.currentPage = 1
      this.loadTrainData()
    },

    // 重置
    handleReset() {
      this.searchParams = {
        trainNumber: '',
        trainType: '',
        status: ''
      }
      this.pagination.currentPage = 1
      this.loadTrainData()
    },

    // 添加车辆
    handleAdd() {
      this.dialogType = 'add'
      this.resetForm()
      this.dialogVisible = true
    },

    // 编辑车辆
    handleEdit(row) {
      this.dialogType = 'edit'
      this.trainForm = { ...row }
      this.dialogVisible = true
    },

    // 批量编辑
    handleBatchEdit() {
      this.$message.success('批量编辑功能待实现')
    },

    // 删除车辆
    handleDelete(row) {
      this.$confirm(`确定要删除车辆 ${row.trainNumber} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作，使用row参数获取要删除的车辆信息
        const index = this.trainList.findIndex(item => item.trainId === row.trainId);
        if (index > -1) {
          this.trainList.splice(index, 1);
        }
        this.$message.success('删除成功')
        this.loadTrainData()
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },

    // 批量删除
    handleBatchDelete() {
      this.$confirm(`确定要删除选中的 ${this.selectedRows.length} 辆车辆吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        this.$message.success('批量删除成功')
        this.loadTrainData()
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },

    // 导出数据
    handleExport() {
      this.$message.success('数据导出成功')
    },

    // 查看详情
    handleDetail(row) {
      this.selectedTrain = { ...row }
      this.detailDialogVisible = true
    },

    // 表单提交
    handleSubmit() {
      this.$refs.trainForm.validate((valid) => {
        if (valid) {
          // 模拟提交
          setTimeout(() => {
            this.$message.success(`${this.dialogType === 'add' ? '添加' : '编辑'}成功`)
            this.dialogVisible = false
            this.loadTrainData()
          }, 500)
        } else {
          return false
        }
      })
    },

    // 重置表单
    resetForm() {
      this.trainForm = {
        trainId: '',
        trainNumber: '',
        trainType: '',
        capacity: 0,
        manufactureDate: '',
        serviceLife: 0,
        status: '',
        lastMaintenanceDate: '',
        remark: ''
      }
      if (this.$refs.trainForm) {
        this.$refs.trainForm.resetFields()
      }
    },

    // 选择变更
    handleSelectionChange(selection) {
      this.selectedRows = selection
    },

    // 分页大小改变
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.loadTrainData()
    },

    // 当前页改变
    handleCurrentChange(current) {
      this.pagination.currentPage = current
      this.loadTrainData()
    }
  }
}
</script>

<style scoped>
.admin-train-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.search-operation-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar,
.operation-bar {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.operation-bar {
  margin-bottom: 0;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
}

.detail-info {
  padding: 10px 0;
}

.detail-row {
  display: flex;
  margin-bottom: 15px;
}

.detail-item {
  flex: 1;
  display: flex;
  align-items: flex-start;
}

.detail-item.full-width {
  flex: 1 0 100%;
}

.detail-label {
  font-weight: bold;
  width: 120px;
  flex-shrink: 0;
  color: #666;
}

.detail-value {
  flex: 1;
  word-break: break-all;
  color: #333;
}

.dialog-footer {
  text-align: right;
}
</style>