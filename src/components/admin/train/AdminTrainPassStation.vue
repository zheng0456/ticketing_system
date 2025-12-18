<template>
  <div class="admin-train-pass-station-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>火车途径站点管理</h2>
    </div>

    <!-- 搜索和操作区域 -->
    <div class="search-operation-section">
      <div class="search-bar">
        <el-input
          v-model="searchParams.trainNumber"
          placeholder="车次号"
          style="width: 180px; margin-right: 10px;"
        />
        <el-input
          v-model="searchParams.stationName"
          placeholder="站点名称"
          style="width: 180px; margin-right: 10px;"
        />
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>

      <div class="operation-bar">
        <el-button type="success" @click="handleAdd">添加站点</el-button>
        <el-button type="danger" @click="handleBatchDelete" :disabled="selectedRows.length === 0">批量删除</el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="table-container">
      <el-table
        v-loading="loading"
        :data="passStationList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="passStationId" label="ID" width="150" />
        <el-table-column prop="trainId" label="车辆ID" width="120" />
        <el-table-column prop="trainNumber" label="车次号" width="120" />
        <el-table-column prop="stationId" label="站点ID" width="120" />
        <el-table-column prop="stationName" label="站点名称" width="150" />
        <el-table-column prop="arrivalTime" label="到达时间" width="180" />
        <el-table-column prop="departureTime" label="离开时间" width="180" />
        <el-table-column prop="stopDuration" label="停留时长（分钟）" width="150" />
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
              >
                删除
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
      :title="dialogType === 'add' ? '添加站点' : '编辑站点'"
      width="60%"
    >
      <el-form
        ref="passStationForm"
        :model="passStationForm"
        :rules="formRules"
        label-width="120px"
        style="padding-right: 40px;"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车次号" prop="trainId">
              <el-select v-model="passStationForm.trainId" placeholder="请选择车次号" style="width: 100%;">
                <el-option
                  v-for="train in trainOptions"
                  :key="train.trainId"
                  :label="train.trainNumber"
                  :value="train.trainId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="站点名称" prop="stationId">
              <el-select v-model="passStationForm.stationId" placeholder="请选择站点" style="width: 100%;">
                <el-option
                  v-for="station in stationOptions"
                  :key="station.stationId"
                  :label="station.stationName"
                  :value="station.stationId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="到达时间" prop="arrivalTime">
              <el-date-picker
                v-model="passStationForm.arrivalTime"
                type="datetime"
                placeholder="请选择到达时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%;"
                :picker-options="{
                  selectableRange: '00:00:00-23:59:59'
                }"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="离开时间" prop="departureTime">
              <el-date-picker
                v-model="passStationForm.departureTime"
                type="datetime"
                placeholder="请选择离开时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%;"
                :picker-options="{
                  selectableRange: '00:00:00-23:59:59'
                }"
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
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'AdminTrainPassStation',
  data() {
    return {
      // 搜索参数
      searchParams: {
        trainNumber: '',
        stationName: ''
      },
      // 途径站点列表数据
      passStationList: [],
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
      // 对话框状态
      dialogVisible: false,
      dialogType: 'add', // 'add' 或 'edit'
      // 车辆列表数据
      trainOptions: [],
      // 站点列表数据
      stationOptions: [],
      // 表单数据
      passStationForm: {
        passStationId: '',
        trainId: '',
        stationId: '',
        arrivalTime: '',
        departureTime: ''
      },
      // 表单验证规则
      formRules: {
        trainId: [
          { required: true, message: '请选择车次号', trigger: 'change' }
        ],
        stationId: [
          { required: true, message: '请选择站点', trigger: 'change' }
        ],
        arrivalTime: [
          { required: true, message: '请选择到达时间', trigger: 'change' }
        ],
        departureTime: [
          { required: true, message: '请选择离开时间', trigger: 'change' }
        ]
      }
    };
  },
  mounted() {
    this.loadPassStationData();
    this.loadTrainOptions();
    this.loadStationOptions();
  },
  methods: {
    // 加载途径站点数据
    async loadPassStationData() {
      this.loading = true;
      try {
        const response = await api.post('/inventory/admin/trainPassStation', {
          page: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
          trainNumber: this.searchParams.trainNumber,
          stationName: this.searchParams.stationName
        });
        this.passStationList = response.data.list || [];
        this.pagination.total = response.data.total || 0;
      } catch (error) {
        this.$message.error('加载数据失败：' + error.message);
      } finally {
        this.loading = false;
      }
    },

    // 加载车辆列表
    async loadTrainOptions() {
      try {
        const response = await api.post('/inventory/admin/train', {
          page: 1,
          pageSize: 1000
        });
        this.trainOptions = response.data.list || [];
      } catch (error) {
        this.$message.error('加载车辆列表失败：' + error.message);
      }
    },

    // 加载站点列表
    async loadStationOptions() {
      try {
        const response = await api.post('/inventory/admin/trainStation', {
          pageNum: 1,
          pageSize: 1000
        });
        this.stationOptions = response.data.data || [];
      } catch (error) {
        this.$message.error('加载站点列表失败：' + error.message);
      }
    },

    // 处理搜索
    handleSearch() {
      this.pagination.currentPage = 1;
      this.loadPassStationData();
    },

    // 处理重置
    handleReset() {
      this.searchParams = {
        trainNumber: '',
        stationName: ''
      };
      this.pagination.currentPage = 1;
      this.loadPassStationData();
    },

    // 处理选择变更
    handleSelectionChange(selection) {
      this.selectedRows = selection;
    },

    // 处理分页大小变更
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.loadPassStationData();
    },

    // 处理当前页变更
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.loadPassStationData();
    },

    // 处理添加
    handleAdd() {
      this.dialogType = 'add';
      this.passStationForm = {
        passStationId: '',
        trainId: '',
        stationId: '',
        arrivalTime: '',
        departureTime: ''
      };
      this.dialogVisible = true;
    },

    // 处理编辑
    handleEdit(row) {
      this.dialogType = 'edit';
      this.passStationForm = {
        passStationId: row.passStationId,
        trainId: row.trainId,
        stationId: row.stationId,
        arrivalTime: row.arrivalTime,
        departureTime: row.departureTime
      };
      this.dialogVisible = true;
    },

    // 处理提交
    async handleSubmit() {
      try {
        await this.$refs.passStationForm.validate();
        
        // 验证离开时间必须大于到达时间
        if (this.passStationForm.arrivalTime && this.passStationForm.departureTime) {
          if (new Date(this.passStationForm.departureTime) <= new Date(this.passStationForm.arrivalTime)) {
            this.$message.error('离开时间必须大于到达时间');
            return;
          }
        }

        if (this.dialogType === 'add') {
          await api.post('/inventory/admin/trainPassStation/add', this.passStationForm);
          this.$message.success('添加成功');
        } else {
          await api.post('/inventory/admin/trainPassStation/update', this.passStationForm);
          this.$message.success('编辑成功');
        }
        
        this.dialogVisible = false;
        this.loadPassStationData();
      } catch (error) {
        if (error !== false) {
          this.$message.error('操作失败：' + error.message);
        }
      }
    },

    // 处理删除
    async handleDelete(row) {
      try {
        await this.$confirm('确定要删除这条记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        
        await api.post('/inventory/admin/trainPassStation/delete', { passStationId: row.passStationId });
        this.$message.success('删除成功');
        this.loadPassStationData();
      } catch (error) {
        if (error !== false) {
          this.$message.error('删除失败：' + error.message);
        }
      }
    },

    // 处理批量删除
    async handleBatchDelete() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请先选择要删除的记录');
        return;
      }

      try {
        await this.$confirm('确定要批量删除选中的记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        
        const ids = this.selectedRows.map(row => row.passStationId);
        await api.post('/inventory/admin/trainPassStation/deleteBatch', { passStationIds: ids });
        this.$message.success('批量删除成功');
        this.loadPassStationData();
      } catch (error) {
        if (error !== false) {
          this.$message.error('批量删除失败：' + error.message);
        }
      }
    }
  }
};
</script>

<style scoped>
.admin-train-pass-station-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.search-operation-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.search-bar {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.operation-bar {
  display: flex;
  justify-content: flex-start;
}

.table-container {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.dialog-footer {
  text-align: right;
}
</style>