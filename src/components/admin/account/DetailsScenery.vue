<template>
  <div class="details-scenery-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>景点票收支明细</h2>
    </div>

    <!-- 搜索和筛选区域 -->
    <div class="search-filter-section">
      <div class="search-bar">
        <el-input
          v-model="searchParams.sceneryName"
          placeholder="景点名称"
          style="width: 180px; margin-right: 10px;"
        />
        <el-input
          v-model="searchParams.orderId"
          placeholder="订单号"
          style="width: 200px; margin-right: 10px;"
        />
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 300px; margin-right: 10px;"
        />
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>

      <div class="filter-bar">
        <el-select
          v-model="filterParams.transactionType"
          placeholder="交易类型"
          style="width: 120px; margin-right: 10px;"
        >
          <el-option label="全部" value="" />
          <el-option label="购票" value="purchase" />
          <el-option label="退票" value="refund" />
          <el-option label="改签" value="change" />
        </el-select>
        <el-select
          v-model="filterParams.status"
          placeholder="交易状态"
          style="width: 120px; margin-right: 10px;"
        >
          <el-option label="全部" value="" />
          <el-option label="成功" value="success" />
          <el-option label="失败" value="failed" />
          <el-option label="处理中" value="processing" />
        </el-select>
        <el-button type="success" @click="handleExport">导出数据</el-button>
      </div>
    </div>

    <!-- 数据统计概览 -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-title">总收入</div>
        <div class="stat-value">¥{{ totalIncome }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">总支出</div>
        <div class="stat-value negative">¥{{ totalExpense }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-title">净收入</div>
        <div class="stat-value" :class="{ positive: netIncome > 0, negative: netIncome < 0 }">
          ¥{{ netIncome }}
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-title">交易笔数</div>
        <div class="stat-value">{{ totalTransactions }}</div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <el-table
        v-loading="loading"
        :data="transactionList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="流水号" width="100" />
        <el-table-column prop="orderId" label="订单号" width="180" />
        <el-table-column prop="sceneryName" label="景点名称" width="150" />
        <el-table-column prop="sceneryId" label="景点ID" width="100" />
        <el-table-column prop="visitDate" label="游览日期" width="120" />
        <el-table-column prop="transactionType" label="交易类型" width="100">
          <template #default="scope">
            <el-tag :type="getTypeTagType(scope.row.transactionType)">
              {{ getTypeText(scope.row.transactionType) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额" width="100">
          <template #default="scope">
            <span :class="{ positive: scope.row.amount > 0, negative: scope.row.amount < 0 }">
              {{ scope.row.amount > 0 ? '+' : '' }}{{ scope.row.amount }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="transactionTime" label="交易时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusTagType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="150" />
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleDetail(scope.row)"
            >
              详情
            </el-button>
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

    <!-- 详情对话框 -->
    <el-dialog
      v-model="detailDialogVisible"
      title="交易详情"
      width="50%"
    >
      <div class="detail-info">
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">流水号：</span>
            <span class="detail-value">{{ selectedTransaction.id }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">订单号：</span>
            <span class="detail-value">{{ selectedTransaction.orderId }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">景点名称：</span>
            <span class="detail-value">{{ selectedTransaction.sceneryName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">景点ID：</span>
            <span class="detail-value">{{ selectedTransaction.sceneryId }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">游览日期：</span>
            <span class="detail-value">{{ selectedTransaction.visitDate }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">交易类型：</span>
            <span class="detail-value">
              <el-tag :type="getTypeTagType(selectedTransaction.transactionType)">
                {{ getTypeText(selectedTransaction.transactionType) }}
              </el-tag>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">门票类型：</span>
            <span class="detail-value">{{ selectedTransaction.ticketType || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">门票数量：</span>
            <span class="detail-value">{{ selectedTransaction.quantity || 0 }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">交易金额：</span>
            <span class="detail-value" :class="{ positive: selectedTransaction.amount > 0, negative: selectedTransaction.amount < 0 }">
              ¥{{ selectedTransaction.amount }}
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">手续费：</span>
            <span class="detail-value">¥{{ selectedTransaction.fee || 0 }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">交易时间：</span>
            <span class="detail-value">{{ selectedTransaction.transactionTime }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">交易状态：</span>
            <span class="detail-value">
              <el-tag :type="getStatusTagType(selectedTransaction.status)">
                {{ getStatusText(selectedTransaction.status) }}
              </el-tag>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item full-width">
            <span class="detail-label">备注：</span>
            <span class="detail-value">{{ selectedTransaction.remark || '-' }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DetailsScenery',
  data() {
    return {
      // 搜索参数
      searchParams: {
        sceneryName: '',
        orderId: ''
      },
      // 日期范围
      dateRange: null,
      // 筛选参数
      filterParams: {
        transactionType: '',
        status: ''
      },
      // 交易列表数据
      transactionList: [],
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
      totalIncome: 0,
      totalExpense: 0,
      netIncome: 0,
      totalTransactions: 0,
      // 详情对话框
      detailDialogVisible: false,
      selectedTransaction: {}
    }
  },
  mounted() {
    this.loadTransactionData()
  },
  methods: {
    // 获取交易类型标签类型
    getTypeTagType(type) {
      const typeMap = {
        'purchase': 'success',
        'refund': 'warning',
        'change': 'info'
      }
      return typeMap[type] || 'primary'
    },

    // 获取交易类型文本
    getTypeText(type) {
      const typeMap = {
        'purchase': '购票',
        'refund': '退票',
        'change': '改签'
      }
      return typeMap[type] || type
    },

    // 获取状态标签类型
    getStatusTagType(status) {
      const statusMap = {
        'success': 'success',
        'failed': 'danger',
        'processing': 'warning'
      }
      return statusMap[status] || 'info'
    },

    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        'success': '成功',
        'failed': '失败',
        'processing': '处理中'
      }
      return statusMap[status] || status
    },

    // 加载交易数据
    loadTransactionData() {
      this.loading = true
      // 模拟API请求
      setTimeout(() => {
        // 模拟景点票收支数据
        const mockData = [
          {
            id: 'TXN202401010101',
            orderId: 'ORD202401010101',
            sceneryName: '故宫博物院',
            sceneryId: 'SC001',
            visitDate: '2024-01-10',
            ticketType: '成人票',
            quantity: 2,
            transactionType: 'purchase',
            amount: 240,
            fee: 0,
            transactionTime: '2024-01-01 10:30:00',
            status: 'success',
            remark: '正常购票'
          },
          {
            id: 'TXN202401010102',
            orderId: 'ORD202401010102',
            sceneryName: '长城',
            sceneryId: 'SC002',
            visitDate: '2024-01-15',
            ticketType: '成人票',
            quantity: 3,
            transactionType: 'purchase',
            amount: 150,
            fee: 0,
            transactionTime: '2024-01-01 11:45:00',
            status: 'success',
            remark: '正常购票'
          },
          {
            id: 'TXN202401020101',
            orderId: 'ORD202401010103',
            sceneryName: '颐和园',
            sceneryId: 'SC003',
            visitDate: '2024-01-20',
            ticketType: '联票',
            quantity: 2,
            transactionType: 'refund',
            amount: -160,
            fee: 16,
            transactionTime: '2024-01-02 09:15:00',
            status: 'success',
            remark: '用户申请退票'
          },
          {
            id: 'TXN202401020102',
            orderId: 'ORD202401020101',
            sceneryName: '兵马俑',
            sceneryId: 'SC004',
            visitDate: '2024-01-25',
            ticketType: '成人票',
            quantity: 1,
            transactionType: 'purchase',
            amount: 120,
            fee: 0,
            transactionTime: '2024-01-02 14:30:00',
            status: 'success',
            remark: '正常购票'
          },
          {
            id: 'TXN202401030101',
            orderId: 'ORD202401020102',
            sceneryName: '黄山风景区',
            sceneryId: 'SC005',
            visitDate: '2024-02-05',
            ticketType: '套票',
            quantity: 2,
            transactionType: 'change',
            amount: 40,
            fee: 5,
            transactionTime: '2024-01-03 10:20:00',
            status: 'success',
            remark: '改签差价'
          },
          {
            id: 'TXN202401030102',
            orderId: 'ORD202401020101',
            sceneryName: '兵马俑',
            sceneryId: 'SC004',
            visitDate: '2024-01-25',
            ticketType: '成人票',
            quantity: 1,
            transactionType: 'refund',
            amount: -120,
            fee: 12,
            transactionTime: '2024-01-03 15:40:00',
            status: 'success',
            remark: '用户申请退票'
          },
          {
            id: 'TXN202401040101',
            orderId: 'ORD202401040101',
            sceneryName: '西湖',
            sceneryId: 'SC006',
            visitDate: '2024-02-10',
            ticketType: '游船票',
            quantity: 4,
            transactionType: 'purchase',
            amount: 320,
            fee: 0,
            transactionTime: '2024-01-04 09:10:00',
            status: 'success',
            remark: '正常购票'
          },
          {
            id: 'TXN202401040102',
            orderId: 'ORD202401040102',
            sceneryName: '张家界国家森林公园',
            sceneryId: 'SC007',
            visitDate: '2024-02-15',
            ticketType: '三日票',
            quantity: 2,
            transactionType: 'purchase',
            amount: 348,
            fee: 0,
            transactionTime: '2024-01-04 11:30:00',
            status: 'success',
            remark: '正常购票'
          },
          {
            id: 'TXN202401050101',
            orderId: 'ORD202401050101',
            sceneryName: '布达拉宫',
            sceneryId: 'SC008',
            visitDate: '2024-03-01',
            ticketType: '成人票',
            quantity: 1,
            transactionType: 'purchase',
            amount: 200,
            fee: 0,
            transactionTime: '2024-01-05 13:45:00',
            status: 'success',
            remark: '正常购票'
          },
          {
            id: 'TXN202401050102',
            orderId: 'ORD202401030101',
            sceneryName: '黄山风景区',
            sceneryId: 'SC005',
            visitDate: '2024-02-05',
            ticketType: '套票',
            quantity: 2,
            transactionType: 'refund',
            amount: -388,
            fee: 39,
            transactionTime: '2024-01-05 16:20:00',
            status: 'failed',
            remark: '银行卡余额不足'
          }
        ]

        // 应用筛选条件
        let filteredData = [...mockData]
        
        // 应用搜索条件
        if (this.searchParams.sceneryName) {
          filteredData = filteredData.filter(item => 
            item.sceneryName.toLowerCase().includes(this.searchParams.sceneryName.toLowerCase())
          )
        }
        
        if (this.searchParams.orderId) {
          filteredData = filteredData.filter(item => 
            item.orderId.toLowerCase().includes(this.searchParams.orderId.toLowerCase())
          )
        }
        
        // 应用日期范围筛选
        if (this.dateRange && this.dateRange.length === 2) {
          const startTime = new Date(this.dateRange[0]).setHours(0, 0, 0, 0)
          const endTime = new Date(this.dateRange[1]).setHours(23, 59, 59, 999)
          filteredData = filteredData.filter(item => {
            const transactionDate = new Date(item.transactionTime)
            return transactionDate >= startTime && transactionDate <= endTime
          })
        }
        
        // 应用交易类型筛选
        if (this.filterParams.transactionType) {
          filteredData = filteredData.filter(item => 
            item.transactionType === this.filterParams.transactionType
          )
        }
        
        // 应用交易状态筛选
        if (this.filterParams.status) {
          filteredData = filteredData.filter(item => 
            item.status === this.filterParams.status
          )
        }
        
        // 计算统计数据
        this.calculateStatistics(filteredData)
        
        // 设置交易列表
        this.transactionList = filteredData
        this.pagination.total = filteredData.length
        this.loading = false
      }, 500)
    },

    // 计算统计数据
    calculateStatistics(data) {
      this.totalIncome = data
        .filter(item => item.amount > 0)
        .reduce((sum, item) => sum + item.amount, 0)
      
      this.totalExpense = Math.abs(
        data
          .filter(item => item.amount < 0)
          .reduce((sum, item) => sum + item.amount, 0)
      )
      
      this.netIncome = this.totalIncome - this.totalExpense
      this.totalTransactions = data.length
    },

    // 搜索
    handleSearch() {
      this.pagination.currentPage = 1
      this.loadTransactionData()
    },

    // 重置
    handleReset() {
      this.searchParams = {
        sceneryName: '',
        orderId: ''
      }
      this.dateRange = null
      this.filterParams = {
        transactionType: '',
        status: ''
      }
      this.pagination.currentPage = 1
      this.loadTransactionData()
    },

    // 导出数据
    handleExport() {
      this.$message.success('数据导出成功')
    },

    // 查看详情
    handleDetail(row) {
      this.selectedTransaction = { ...row }
      this.detailDialogVisible = true
    },

    // 选择变更
    handleSelectionChange(selection) {
      this.selectedRows = selection
    },

    // 分页大小改变
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.loadTransactionData()
    },

    // 当前页改变
    handleCurrentChange(current) {
      this.pagination.currentPage = current
      this.loadTransactionData()
    }
  }
}
</script>

<style scoped>
.details-scenery-container {
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

.search-filter-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar,
.filter-bar {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.filter-bar {
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
  width: 100px;
  flex-shrink: 0;
  color: #666;
}

.detail-value {
  flex: 1;
  word-break: break-all;
  color: #333;
}

.positive {
  color: #67c23a;
}

.negative {
  color: #f56c6c;
}
</style>