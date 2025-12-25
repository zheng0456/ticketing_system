<template>
  <div class="admin-ticket-container">
    <!-- 搜索和操作区域 -->
    <div class="search-operation-bar">
      <div class="search-area">
        <el-input
          v-model="searchForm.trainNumber"
          placeholder="车次"
          style="width: 200px; margin-right: 10px;"
        />
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </div>
      <div class="operation-area">
        <el-button type="success" @click="handleBatchInsert">批量新增</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="danger" @click="handleDeleteSelected">删除</el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table
      v-loading="loading"
      :data="ticketList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="trainNumber" label="车次" width="120" />
      <el-table-column prop="departureStation" label="出发站" width="150" />
      <el-table-column prop="arrivalStation" label="到达站" width="150" />
      <el-table-column prop="departureTime" label="出发时间" width="150" />
      <el-table-column prop="arrivalTime" label="到达时间" width="150" />
      <el-table-column prop="price" label="价格" width="100" />
      <el-table-column prop="seatCount" label="座位类型" width="100" />
      <el-table-column prop="trainType" label="车型" width="100" />
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <div style="display: flex; align-items: center;">
            <el-button
              type="primary"
              size="small"
              @click="handleDetail(scope.row)"
              style="margin-right: 5px;"
            >
              详情
            </el-button>
            <el-button
              type="warning"
              size="small"
              @click="handleEdit(scope.row)"
              style="margin-right: 5px;"
            >
              修改
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </div>
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

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增火车票' : '修改火车票'"
      width="60%"
    >
      <el-form
        ref="ticketFormRef"
        :model="ticketForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="车次" prop="trainNumber">
          <el-select v-model="ticketForm.trainNumber" placeholder="请选择车次" style="width: 100%">
            <el-option
              v-for="train in trainList"
              :key="train.trainNumber || train.trainNo || train.id"
              :label="train.trainNumber || train.trainNo"
              :value="train.trainNumber || train.trainNo"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="ticketForm.price" placeholder="请输入价格" type="number" />
        </el-form-item>
        <el-form-item label="座位类型" prop="seatCount">
          <el-input v-model.number="ticketForm.seatCount" placeholder="请输入座位数" type="number" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDialogConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 详情对话框 -->
    <el-dialog
      v-model="detailDialogVisible"
      title="火车票详情"
      width="50%"
    >
      <div class="detail-info">
        <div class="detail-item">
          <span class="detail-label">车次：</span>
          <span class="detail-value">{{ selectedTicket.trainNumber }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">出发站：</span>
          <span class="detail-value">{{ selectedTicket.departureStation }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">到达站：</span>
          <span class="detail-value">{{ selectedTicket.arrivalStation }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">出发时间：</span>
          <span class="detail-value">{{ selectedTicket.departureTime }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">到达时间：</span>
          <span class="detail-value">{{ selectedTicket.arrivalTime }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">价格：</span>
          <span class="detail-value">{{ selectedTicket.price }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">座位数：</span>
          <span class="detail-value">{{ selectedTicket.seatCount }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">车型：</span>
          <span class="detail-value">{{ selectedTicket.trainType }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'AdminTicket',
  data() {
    return {
      // 搜索表单
      searchForm: {
        trainNumber: ''
      },
      // 火车票列表数据
      ticketList: [],
      // 车次列表数据
      trainList: [],
      // 站点列表数据
      stationOptions: [],
      // 选中的行数据
      selectedRows: [],
      // 加载状态
      loading: false,
      // 分页信息
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 4
      },
      // 对话框
      dialogVisible: false,
      detailDialogVisible: false,
      dialogType: 'add',
      // 表单数据
      ticketForm: {
        id: '',
        trainNumber: '',
        departureStation: '',
        arrivalStation: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        seatCount: '',
        trainType: ''
      },
      // 选中的火车票详情
      selectedTicket: {},
      // 表单验证规则
      rules: {
        trainNumber: [
          { required: true, message: '请选择车次', trigger: 'change' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'change' }
        ],
        departureStation: [
          { required: true, message: '请输入出发站', trigger: 'blur' }
        ],
        arrivalStation: [
          { required: true, message: '请输入到达站', trigger: 'blur' }
        ],
        departureTime: [
          { required: true, message: '请输入出发时间', trigger: 'blur' }
        ],
        arrivalTime: [
          { required: true, message: '请输入到达时间', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { type: 'number', message: '请输入有效的数字', trigger: 'blur' }
        ],
        seatCount: [
          { required: true, message: '请输入座位数', trigger: 'blur' },
          { type: 'number', message: '请输入有效的数字', trigger: 'blur' }
        ],
        trainType: [
          { required: true, message: '请输入车型', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.loadTicketList()
    this.loadTrainList()
    this.loadStationOptions()
  },
  methods: {
    // 加载火车票列表
    loadTicketList() {
      this.loading = true
      // 通过POST请求获取火车票列表数据
      api.post('/inventory/admin/ticket', {
        trainNumber: this.searchForm.trainNumber,
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      })
        .then(response => {
          if (response.data.success) {
            this.ticketList = response.data.data.list
            this.pagination.total = response.data.data.total
          } else {
            this.$message.error(response.data.message || '获取数据失败')
            this.ticketList = []
            this.pagination.total = 0
          }
          this.loading = false
        })
        .catch(error => {
          console.error('获取火车票列表失败:', error)
          this.$message.error('网络错误，获取数据失败')
          this.ticketList = []
          this.pagination.total = 0
          this.loading = false
        })
    },
    
    // 加载车次列表
    loadTrainList() {
      // 通过POST请求获取车次数据，与AdminTrainPassStation.vue保持一致的参数格式
      api.post('/inventory/admin/train', {
        page: 1,
        pageSize: 1000
      })
        .then(response => {
          const data = response.data
          let trainData = []
          
          // 处理多种可能的数据格式，与AdminTrainPassStation.vue保持一致
          if (Array.isArray(data)) {
            trainData = data
          } else if (data && data.list) {
            trainData = Array.isArray(data.list) ? data.list : []
          } else if (data && data.data) {
            trainData = Array.isArray(data.data) ? data.data : []
          } else if (data && data.records) {
            trainData = Array.isArray(data.records) ? data.records : []
          } else if (data && data.items) {
            trainData = Array.isArray(data.items) ? data.items : []
          } else {
            // 如果以上格式都不匹配，尝试直接使用data
            trainData = data
          }
          
          // 确保trainData是数组
          if (!Array.isArray(trainData)) {
            trainData = []
          }
          
          console.log('处理后的车次数据:', trainData)
          this.trainList = trainData
        })
        .catch(error => {
          console.error('获取车次数据失败:', error)
          this.$message.error('网络错误，获取车次数据失败')
          this.trainList = []
        })
    },
    
    // 加载站点列表
    loadStationOptions() {
      // 通过POST请求获取站点数据，与AdminTrainPassStation.vue保持一致的参数格式
      api.post('/inventory/admin/trainStation', {
        pageNum: 1,
        pageSize: 1000
      })
        .then(response => {
          const data = response.data
          let stationData = []
          
          // 处理多种可能的数据格式，与AdminTrainPassStation.vue保持一致
          if (Array.isArray(data)) {
            stationData = data
          } else if (data && data.list) {
            stationData = Array.isArray(data.list) ? data.list : []
          } else if (data && data.data) {
            stationData = Array.isArray(data.data) ? data.data : []
          } else if (data && data.records) {
            stationData = Array.isArray(data.records) ? data.records : []
          } else if (data && data.items) {
            stationData = Array.isArray(data.items) ? data.items : []
          } else {
            // 如果以上格式都不匹配，尝试直接使用data
            stationData = data
          }
          
          // 确保stationData是数组
          if (!Array.isArray(stationData)) {
            stationData = []
          }
          
          console.log('处理后的站点数据:', stationData)
          this.stationOptions = stationData
        })
        .catch(error => {
          console.error('获取站点数据失败:', error)
          this.$message.error('网络错误，获取站点数据失败')
          this.stationOptions = []
        })
    },
    
    // 搜索
    handleSearch() {
      this.pagination.currentPage = 1
      this.loadTicketList()
    },
    
    // 批量插入
    handleBatchInsert() {
      // 这里可以实现批量插入的逻辑
      this.$message.info('批量插入功能待实现')
      // 后续可以添加批量导入文件或表单等功能
    },
    
    // 新增
    handleAdd() {
      this.dialogType = 'add'
      this.ticketForm = {
        id: '',
        trainNumber: '',
        departureStation: '',
        arrivalStation: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        seatCount: '',
        trainType: ''
      }
      this.dialogVisible = true
    },
    
    // 编辑
    handleEdit(row) {
      this.dialogType = 'edit'
      this.ticketForm = { ...row }
      this.dialogVisible = true
    },
    
    // 详情
    handleDetail(row) {
      this.selectedTicket = { ...row }
      this.detailDialogVisible = true
    },
    
    // 删除
    handleDelete(row) {
      this.$confirm('确定要删除该火车票吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        const index = this.ticketList.findIndex(item => item.id === row.id)
        if (index > -1) {
          this.ticketList.splice(index, 1)
          this.pagination.total--
        }
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    
    // 批量删除
    handleDeleteSelected() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请选择要删除的火车票')
        return
      }
      
      this.$confirm(`确定要删除选中的 ${this.selectedRows.length} 个火车票吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟批量删除操作
        const ids = this.selectedRows.map(row => row.id)
        this.ticketList = this.ticketList.filter(item => !ids.includes(item.id))
        this.pagination.total -= this.selectedRows.length
        this.selectedRows = []
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    
    // 表单提交
    handleDialogConfirm() {
      this.$refs.ticketFormRef.validate((valid) => {
        if (valid) {
          if (this.dialogType === 'add') {
            // 新增操作：发送POST请求
                api.post('/inventory/admin/ticket/add', this.ticketForm)
                  .then(response => {
                    if (response.data.success) {
                      // 请求成功后刷新列表
                      this.loadTicketList()
                      this.$message.success('新增成功')
                      this.dialogVisible = false
                    } else {
                      this.$message.error(response.data.message || '新增失败')
                    }
                  })
                  .catch(error => {
                    console.error('新增失败:', error)
                    this.$message.error('网络错误，新增失败')
                  })
          } else {
            // 模拟编辑
            const index = this.ticketList.findIndex(item => item.id === this.ticketForm.id)
            if (index > -1) {
              this.ticketList.splice(index, 1, { ...this.ticketForm })
              this.$message.success('修改成功')
              this.dialogVisible = false
            }
          }
        }
      })
    },
    
    // 选择变更
    handleSelectionChange(selection) {
      this.selectedRows = selection
    },
    
    // 分页大小改变
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.loadTicketList()
    },
    
    // 当前页改变
    handleCurrentChange(current) {
      this.pagination.currentPage = current
      this.loadTicketList()
    }
  }
}
</script>

<style scoped>
.admin-ticket-container {
  padding: 20px;
  background-color: #f5f7fa;
}

.search-operation-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-area {
  display: flex;
  align-items: center;
}

.operation-area {
  display: flex;
  align-items: center;
}

.operation-area .el-button {
  margin-left: 10px;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.detail-info {
  padding: 20px;
}

.detail-item {
  display: flex;
  margin-bottom: 15px;
  align-items: flex-start;
}

.detail-label {
  font-weight: bold;
  width: 100px;
  flex-shrink: 0;
}

.detail-value {
  flex: 1;
  word-break: break-all;
}
</style>