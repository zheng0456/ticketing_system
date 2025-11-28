<template>
  <div class="admin-scenery-container">
    <!-- 搜索和操作区域 -->
    <div class="search-operation-bar">
      <div class="search-area">
        <el-input
          v-model="searchForm.areaName"
          placeholder="景区名称"
          style="width: 200px; margin-right: 10px;"
        />
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </div>
      <div class="operation-area">
        <el-button type="success" @click="handleBatchInsert">批量新增</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="info" @click="handleSetSeckill">设置秒杀</el-button>
        <el-button type="danger" @click="handleDeleteSelected">删除</el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <el-table
      v-loading="loading"
      :data="sceneryList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="index" label="编号" width="80" type="index" />
      <el-table-column prop="sceneryName" label="景点名称" width="180" />
      <el-table-column prop="areaCategory" label="景区分类" width="150" />
      <el-table-column prop="image" label="图片" width="120">
        <template #default="scope">
          <el-image
            :src="scope.row.image"
            fit="cover"
            style="width: 80px; height: 60px;"
            :preview-src-list="[scope.row.image]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="100" />
      <el-table-column prop="ticketCount" label="票数" width="100" />
      <el-table-column prop="openTime" label="开放时间" width="150" />
      <el-table-column prop="servicePhone" label="服务电话" width="150" />
      <el-table-column prop="address" label="详细地址" min-width="200" />
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
      :title="dialogType === 'add' ? '新增景点' : '修改景点'"
      width="60%"
    >
      <el-form
        ref="sceneryFormRef"
        :model="sceneryForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="景点名称" prop="sceneryName">
          <el-input v-model="sceneryForm.sceneryName" placeholder="请输入景点名称" />
        </el-form-item>
        <el-form-item label="景区分类" prop="areaCategory">
          <el-input v-model="sceneryForm.areaCategory" placeholder="请输入景区分类" />
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <el-upload
            class="upload-demo"
            action="#"
            :on-change="handleImageChange"
            :auto-upload="false"
            :show-file-list="true"
          >
            <el-button type="primary">点击上传</el-button>
          </el-upload>
          <el-image
            v-if="sceneryForm.image"
            :src="sceneryForm.image"
            fit="cover"
            style="width: 200px; height: 150px; margin-top: 10px;"
          />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="sceneryForm.price" placeholder="请输入价格" type="number" />
        </el-form-item>
        <el-form-item label="票数" prop="ticketCount">
          <el-input v-model.number="sceneryForm.ticketCount" placeholder="请输入票数" type="number" />
        </el-form-item>
        <el-form-item label="开放时间" prop="openTime">
          <el-input v-model="sceneryForm.openTime" placeholder="请输入开放时间" />
        </el-form-item>
        <el-form-item label="服务电话" prop="servicePhone">
          <el-input v-model="sceneryForm.servicePhone" placeholder="请输入服务电话" />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="sceneryForm.address" placeholder="请输入详细地址" type="textarea" />
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
      title="景点详情"
      width="50%"
    >
      <div class="detail-info">
        <div class="detail-item">
          <span class="detail-label">景点名称：</span>
          <span class="detail-value">{{ selectedScenery.sceneryName }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">景区分类：</span>
          <span class="detail-value">{{ selectedScenery.areaCategory }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">图片：</span>
          <el-image
            v-if="selectedScenery.image"
            :src="selectedScenery.image"
            fit="cover"
            style="width: 300px; height: 200px;"
          />
        </div>
        <div class="detail-item">
          <span class="detail-label">价格：</span>
          <span class="detail-value">{{ selectedScenery.price }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">票数：</span>
          <span class="detail-value">{{ selectedScenery.ticketCount }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">开放时间：</span>
          <span class="detail-value">{{ selectedScenery.openTime }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">服务电话：</span>
          <span class="detail-value">{{ selectedScenery.servicePhone }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">详细地址：</span>
          <span class="detail-value">{{ selectedScenery.address }}</span>
        </div>
      </div>
    </el-dialog>

    <!-- 秒杀设置对话框 -->
    <el-dialog
      v-model="seckillDialogVisible"
      title="设置秒杀"
      width="50%"
    >
      <el-form
        ref="seckillFormRef"
        :model="seckillForm"
        :rules="seckillRules"
        label-width="120px"
      >
        <el-form-item label="景点名称" disabled>
          <el-input v-model="seckillForm.sceneryName" placeholder="景点名称" disabled />
        </el-form-item>
        <el-form-item label="秒杀价格" prop="seckillPrice">
          <el-input v-model.number="seckillForm.seckillPrice" placeholder="请输入秒杀价格" type="number" min="0.01" step="0.01" />
        </el-form-item>
        <el-form-item label="秒杀数量" prop="seckillCount">
          <el-input v-model.number="seckillForm.seckillCount" placeholder="请输入秒杀数量" type="number" min="1" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="seckillForm.startTime"
            type="datetime"
            placeholder="选择开始时间"
            style="width: 100%;"
            :picker-options="{ placement: 'bottom-right' }"
            popper-append-to-body="false"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="seckillForm.endTime"
            type="datetime"
            placeholder="选择结束时间"
            style="width: 100%;"
            :picker-options="{ placement: 'bottom-right' }"
            popper-append-to-body="false"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="seckillDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSeckillConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AdminScenery',
  data() {
    return {
      // 搜索表单
      searchForm: {
        sceneryName: '',
        areaName: ''
      },
      // 景点列表数据
      sceneryList: [
        {
          id: 1,
          sceneryName: '景点名称8',
          areaCategory: '景区分类8',
          image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          price: 8,
          ticketCount: 8,
          openTime: '开放时间8',
          servicePhone: '020-88199998',
          address: '详细地址8'
        },
        {
          id: 2,
          sceneryName: '景点名称7',
          areaCategory: '景区分类7',
          image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          price: 7,
          ticketCount: 7,
          openTime: '开放时间7',
          servicePhone: '020-88199997',
          address: '详细地址7'
        },
        {
          id: 3,
          sceneryName: '景点名称6',
          areaCategory: '景区分类6',
          image: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          price: 6,
          ticketCount: 6,
          openTime: '开放时间6',
          servicePhone: '020-88199996',
          address: '详细地址6'
        },
        {
          id: 4,
          sceneryName: '景点名称5',
          areaCategory: '景区分类5',
          image: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
          price: 5,
          ticketCount: 5,
          openTime: '开放时间5',
          servicePhone: '020-88199995',
          address: '详细地址5'
        }
      ],
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
      seckillDialogVisible: false,
      dialogType: 'add',
      // 表单数据
      sceneryForm: {
        id: '',
        sceneryName: '',
        areaCategory: '',
        image: '',
        price: '',
        ticketCount: '',
        openTime: '',
        servicePhone: '',
        address: ''
      },
      // 选中的景点详情
      selectedScenery: {},
      // 秒杀表单数据
      seckillForm: {
        sceneryId: '',
        sceneryName: '',
        seckillPrice: '',
        seckillCount: '',
        startTime: '',
        endTime: ''
      },
      // 秒杀表单验证规则
      seckillRules: {
        seckillPrice: [
          { required: true, message: '请输入秒杀价格', trigger: 'blur' },
          { type: 'number', min: 0.01, message: '秒杀价格必须大于0', trigger: 'blur' }
        ],
        seckillCount: [
          { required: true, message: '请输入秒杀数量', trigger: 'blur' },
          { type: 'number', min: 1, message: '秒杀数量必须大于0', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ]
      },
      // 表单验证规则
      rules: {
        sceneryName: [
          { required: true, message: '请输入景点名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        areaCategory: [
          { required: true, message: '请输入景区分类', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { type: 'number', message: '请输入有效的数字', trigger: 'blur' }
        ],
        ticketCount: [
          { required: true, message: '请输入票数', trigger: 'blur' },
          { type: 'number', message: '请输入有效的数字', trigger: 'blur' }
        ],
        openTime: [
          { required: true, message: '请输入开放时间', trigger: 'blur' }
        ],
        servicePhone: [
          { required: true, message: '请输入服务电话', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$|^0\d{2,3}-\d{7,8}$/, message: '请输入有效的电话号码', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.loadSceneryList()
  },
  methods: {
    // 加载景点列表
    loadSceneryList() {
      this.loading = true
      // 模拟API请求
      setTimeout(() => {
        // 实际项目中这里应该调用真实的API
        this.loading = false
      }, 500)
    },
    
    // 搜索
    handleSearch() {
      this.pagination.currentPage = 1
      this.loadSceneryList()
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
      this.sceneryForm = {
        id: '',
        sceneryName: '',
        areaCategory: '',
        image: '',
        price: '',
        ticketCount: '',
        openTime: '',
        servicePhone: '',
        address: ''
      }
      this.dialogVisible = true
    },
    
    // 编辑
    handleEdit(row) {
      this.dialogType = 'edit'
      this.sceneryForm = { ...row }
      this.dialogVisible = true
    },
    
    // 详情
    handleDetail(row) {
      this.selectedScenery = { ...row }
      this.detailDialogVisible = true
    },
    
    // 删除
    handleDelete(row) {
      this.$confirm('确定要删除该景点吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        const index = this.sceneryList.findIndex(item => item.id === row.id)
        if (index > -1) {
          this.sceneryList.splice(index, 1)
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
        this.$message.warning('请选择要删除的景点')
        return
      }
      
      this.$confirm(`确定要删除选中的 ${this.selectedRows.length} 个景点吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟批量删除操作
        const ids = this.selectedRows.map(row => row.id)
        this.sceneryList = this.sceneryList.filter(item => !ids.includes(item.id))
        this.pagination.total -= this.selectedRows.length
        this.selectedRows = []
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    
    // 查看评论
    handleViewComments(row) {
      // 这里可以跳转到评论页面或打开评论对话框
      this.$message.info(`查看景点 ${row.sceneryName} 的评论`)
    },
    
    // 设置秒杀
    handleSetSeckill() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请选择要设置秒杀的景点')
        return
      }
      
      if (this.selectedRows.length > 1) {
        this.$message.warning('只能选择一个景点设置秒杀')
        return
      }
      
      const selectedScenery = this.selectedRows[0]
      this.seckillForm = {
        sceneryId: selectedScenery.id,
        sceneryName: selectedScenery.sceneryName,
        seckillPrice: '',
        seckillCount: '',
        startTime: '',
        endTime: ''
      }
      this.seckillDialogVisible = true
    },
    
    // 秒杀设置确认
    handleSeckillConfirm() {
      this.$refs.seckillFormRef.validate((valid) => {
        if (valid) {
          // 验证时间逻辑
          const startTime = new Date(this.seckillForm.startTime)
          const endTime = new Date(this.seckillForm.endTime)
          const now = new Date()
          
          if (startTime < now) {
            this.$message.warning('开始时间不能早于当前时间')
            return
          }
          
          if (endTime <= startTime) {
            this.$message.warning('结束时间必须晚于开始时间')
            return
          }
          
          // 模拟保存秒杀设置
          console.log('秒杀设置:', this.seckillForm)
          this.$message.success('秒杀设置成功')
          this.seckillDialogVisible = false
        }
      })
    },
    
    // 表单提交
    handleDialogConfirm() {
      this.$refs.sceneryFormRef.validate((valid) => {
        if (valid) {
          if (this.dialogType === 'add') {
            // 模拟新增
            const newScenery = {
              ...this.sceneryForm,
              id: Date.now() // 临时ID
            }
            this.sceneryList.unshift(newScenery)
            this.pagination.total++
            this.$message.success('新增成功')
          } else {
            // 模拟编辑
            const index = this.sceneryList.findIndex(item => item.id === this.sceneryForm.id)
            if (index > -1) {
              this.sceneryList.splice(index, 1, { ...this.sceneryForm })
              this.$message.success('修改成功')
            }
          }
          this.dialogVisible = false
        }
      })
    },
    
    // 图片上传处理
    handleImageChange() {
      // 实际项目中这里应该上传图片并获取URL
      // 这里使用模拟图片URL
      this.sceneryForm.image = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    },
    
    // 选择变更
    handleSelectionChange(selection) {
      this.selectedRows = selection
    },
    
    // 分页大小改变
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.loadSceneryList()
    },
    
    // 当前页改变
    handleCurrentChange(current) {
      this.pagination.currentPage = current
      this.loadSceneryList()
    }
  }
}
</script>

<style scoped>
.admin-scenery-container {
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
  
  /* 日期选择器样式 */
  .el-date-editor {
    border: 1px solid #409EFF;
    border-radius: 4px;
    transition: all 0.3s;
  }
  
  .el-date-editor:hover {
    border-color: #66b1ff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
  }
  
  .el-date-editor.is-active {
    border-color: #409EFF;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
  }
</style>