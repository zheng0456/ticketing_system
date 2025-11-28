<template>
  <div class="admin-return-scenery-container">
    <!-- 搜索和操作区域 -->
    <div class="search-operation-bar">
      <div class="search-area">
        <el-input
          v-model="searchForm.refundNumber"
          placeholder="退票编号"
          style="width: 200px; margin-right: 10px;"
        />
        <el-input
          v-model="searchForm.sceneryName"
          placeholder="景点名称"
          style="width: 200px; margin-right: 10px;"
        />
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </div>
      <div class="operation-area">
        <!-- 退票管理通常是查看和处理，不需要新增按钮 -->
        <el-button type="success" @click="handleBatchExport">批量导出</el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table
      v-loading="loading"
      :data="refundList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="index" label="编号" width="80" type="index" />
      <el-table-column prop="refundNumber" label="退票编号" width="150" />
      <el-table-column prop="originalTicketId" label="原票ID" width="100" />
      <el-table-column prop="sceneryName" label="景点名称" width="120" />
      <el-table-column prop="visitDate" label="游览日期" width="150" />
      <el-table-column prop="passengerName" label="游客姓名" width="120" />
      <el-table-column prop="refundTime" label="退票时间" width="180" />
      <el-table-column prop="refundReason" label="退票原因" width="150" />
      <el-table-column prop="refundAmount" label="退票金额" width="100" />
      <el-table-column prop="handlingFee" label="手续费" width="100" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
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
              v-if="scope.row.status === '待处理'"
              type="success"
              size="small"
              @click="handleApprove(scope.row)"
              style="margin-right: 5px;"
            >
              批准
            </el-button>
            <el-button
              v-if="scope.row.status === '待处理'"
              type="danger"
              size="small"
              @click="handleReject(scope.row)"
            >
              拒绝
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

    <!-- 详情对话框 -->
    <el-dialog
      v-model="detailDialogVisible"
      title="退票详情"
      width="50%"
    >
      <div class="detail-info">
        <div class="detail-item">
          <span class="detail-label">退票编号：</span>
          <span class="detail-value">{{ selectedRefund.refundNumber }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">原票ID：</span>
          <span class="detail-value">{{ selectedRefund.originalTicketId }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">景点名称：</span>
          <span class="detail-value">{{ selectedRefund.sceneryName }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">游览日期：</span>
          <span class="detail-value">{{ selectedRefund.visitDate }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">游客姓名：</span>
          <span class="detail-value">{{ selectedRefund.passengerName }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">退票时间：</span>
          <span class="detail-value">{{ selectedRefund.refundTime }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">退票原因：</span>
          <span class="detail-value">{{ selectedRefund.refundReason }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">退票金额：</span>
          <span class="detail-value">{{ selectedRefund.refundAmount }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">手续费：</span>
          <span class="detail-value">{{ selectedRefund.handlingFee }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">状态：</span>
          <span class="detail-value"><el-tag :type="getStatusType(selectedRefund.status)">{{ selectedRefund.status }}</el-tag></span>
        </div>
        <div class="detail-item">
          <span class="detail-label">处理备注：</span>
          <span class="detail-value">{{ selectedRefund.processRemark || '-' }}</span>
        </div>
      </div>
    </el-dialog>

    <!-- 处理退票对话框 -->
    <el-dialog
      v-model="processDialogVisible"
      :title="processDialogType === 'approve' ? '批准退票' : '拒绝退票'"
      width="40%"
    >
      <el-form
        ref="processFormRef"
        :model="processForm"
        :rules="processRules"
        label-width="100px"
      >
        <el-form-item label="处理备注" prop="remark">
          <el-input v-model="processForm.remark" type="textarea" :rows="4" placeholder="请输入处理备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="processDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleProcessConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AdminReturnScenery',
  data() {
    return {
      // 搜索表单
      searchForm: {
        refundNumber: '',
        sceneryName: ''
      },
      // 退票列表数据
      refundList: [],
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
      // 对话框
      detailDialogVisible: false,
      processDialogVisible: false,
      processDialogType: 'approve',
      // 选中的退票详情
      selectedRefund: {},
      // 处理表单
      processForm: {
        remark: ''
      },
      // 表单验证规则
      processRules: {
        remark: [
          { required: true, message: '请输入处理备注', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.loadRefundList()
  },
  methods: {
    // 获取状态对应的标签类型
    getStatusType(status) {
      const statusMap = {
        '待处理': 'warning',
        '已批准': 'success',
        '已拒绝': 'danger'
      }
      return statusMap[status] || 'info'
    },

    // 加载退票列表
    loadRefundList() {
      this.loading = true
      // 模拟API请求
      setTimeout(() => {
        // 模拟景点退票数据
        this.refundList = [
          {
            id: 1,
            refundNumber: 'RS20240101001',
            originalTicketId: 201,
            sceneryName: '故宫博物院',
            visitDate: '2024-01-15',
            passengerName: '张三',
            refundTime: '2024-01-01 10:30:00',
            refundReason: '行程变更',
            refundAmount: 60,
            handlingFee: 6,
            status: '待处理',
            processRemark: ''
          },
          {
            id: 2,
            refundNumber: 'RS20240101002',
            originalTicketId: 202,
            sceneryName: '长城',
            visitDate: '2024-01-20',
            passengerName: '李四',
            refundTime: '2024-01-01 14:20:00',
            refundReason: '身体不适',
            refundAmount: 40,
            handlingFee: 4,
            status: '已批准',
            processRemark: '情况属实，同意退票'
          },
          {
            id: 3,
            refundNumber: 'RS20240101003',
            originalTicketId: 203,
            sceneryName: '颐和园',
            visitDate: '2024-01-05',
            passengerName: '王五',
            refundTime: '2024-01-04 16:45:00',
            refundReason: '临时有事',
            refundAmount: 0,
            handlingFee: 30,
            status: '已拒绝',
            processRemark: '距离游览日期不足24小时，按规定不予退票'
          },
          {
            id: 4,
            refundNumber: 'RS20240102001',
            originalTicketId: 204,
            sceneryName: '天坛公园',
            visitDate: '2024-01-25',
            passengerName: '赵六',
            refundTime: '2024-01-02 09:15:00',
            refundReason: '买错日期',
            refundAmount: 18,
            handlingFee: 2,
            status: '待处理',
            processRemark: ''
          }
        ]
        this.pagination.total = this.refundList.length
        this.loading = false
      }, 500)
    },
    
    // 搜索
    handleSearch() {
      this.pagination.currentPage = 1
      this.loadRefundList()
    },
    
    // 批量导出
    handleBatchExport() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请选择要导出的退票记录')
        return
      }
      // 模拟导出操作
      this.$message.success('导出成功')
    },
    
    // 详情
    handleDetail(row) {
      this.selectedRefund = { ...row }
      this.detailDialogVisible = true
    },
    
    // 批准退票
    handleApprove(row) {
      this.processDialogType = 'approve'
      this.selectedRefund = { ...row }
      this.processForm = {
        remark: ''
      }
      this.processDialogVisible = true
    },
    
    // 拒绝退票
    handleReject(row) {
      this.processDialogType = 'reject'
      this.selectedRefund = { ...row }
      this.processForm = {
        remark: ''
      }
      this.processDialogVisible = true
    },
    
    // 处理确认
    handleProcessConfirm() {
      this.$refs.processFormRef.validate((valid) => {
        if (valid) {
          // 模拟处理操作
          const index = this.refundList.findIndex(item => item.id === this.selectedRefund.id)
          if (index > -1) {
            const updatedItem = {
              ...this.refundList[index],
              status: this.processDialogType === 'approve' ? '已批准' : '已拒绝',
              processRemark: this.processForm.remark
            }
            this.refundList.splice(index, 1, updatedItem)
            this.$message.success(`退票${this.processDialogType === 'approve' ? '批准' : '拒绝'}成功`)
          }
          this.processDialogVisible = false
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
      this.loadRefundList()
    },
    
    // 当前页改变
    handleCurrentChange(current) {
      this.pagination.currentPage = current
      this.loadRefundList()
    }
  }
}
</script>

<style scoped>
.admin-return-scenery-container {
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