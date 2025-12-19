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
        <el-table-column prop="trainNo" label="车次号" width="120" />
        <el-table-column prop="trainType" label="车型" width="120">
          <template #default="scope">
            <el-tag :type="getTypeTagType(scope.row.trainType)">
              {{ getTypeText(scope.row.trainType) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="出发时间" width="200" />
        <el-table-column prop="endTime" label="到达时间" width="200" />
        <el-table-column prop="fuyiTime" label="服役年限" width="120">
          <template #default="scope">
            <span>{{ scope.row.fuyiTime }}年</span>
          </template>
        </el-table-column>
        <el-table-column prop="operateStatus" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="getStatusTagType(scope.row.operateStatus)">
              {{ getStatusText(scope.row.operateStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="maintenanceTime" label="最后检修日期" width="200" />
        <el-table-column prop="note" label="备注" width="180" />
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
        </el-row>
        <!-- 软卧、硬卧、硬座车厢数量（普通列车和动车） -->
        <el-row :gutter="20" v-if="trainForm.trainType === 'normal' || trainForm.trainType === 'bullet'">
          <el-col :span="12">
            <el-form-item label="软卧车厢数量" prop="softSleeperCarriages">
              <el-input-number
                v-model="trainForm.softSleeperCarriages"
                :min="0"
                :max="20"
                placeholder="请输入软卧车厢数量"
                @keydown.prevent
                class="carriage-input"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="硬卧车厢数量" prop="hardSleeperCarriages">
              <el-input-number
                v-model="trainForm.hardSleeperCarriages"
                :min="0"
                :max="50"
                placeholder="请输入硬卧车厢数量"
                @keydown.prevent
                class="carriage-input"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="trainForm.trainType === 'normal' || trainForm.trainType === 'bullet'">
          <el-col :span="12">
            <el-form-item label="硬座车厢数量" prop="hardSeatCarriages">
              <el-input-number
                v-model="trainForm.hardSeatCarriages"
                :min="0"
                :max="100"
                placeholder="请输入硬座车厢数量"
                @keydown.prevent
                class="carriage-input"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 一等座、二等座、商务座车厢数量（高铁） -->
        <el-row :gutter="20" v-if="trainForm.trainType === 'high-speed'">
          <el-col :span="12">
            <el-form-item label="一等座车厢数量" prop="firstClassCarriages">
              <el-input-number
                v-model="trainForm.firstClassCarriages"
                :min="0"
                :max="20"
                placeholder="请输入一等座车厢数量"
                @keydown.prevent
                class="carriage-input"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="二等座车厢数量" prop="secondClassCarriages">
              <el-input-number
                v-model="trainForm.secondClassCarriages"
                :min="0"
                :max="50"
                placeholder="请输入二等座车厢数量"
                @keydown.prevent
                class="carriage-input"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="trainForm.trainType === 'high-speed'">
          <el-col :span="12">
            <el-form-item label="商务座车厢数量" prop="businessClassCarriages">
              <el-input-number
                v-model="trainForm.businessClassCarriages"
                :min="0"
                :max="10"
                placeholder="请输入商务座车厢数量"
                @keydown.prevent
                class="carriage-input"
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
                :step="0.1"
                :precision="1"
                placeholder="请输入服役年限"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="始发站" prop="startStation">
              <el-select v-model="trainForm.startStation" placeholder="请选择始发站" style="width: 100%;">
                <el-option
                  v-for="station in stationOptions"
                  :key="station.id"
                  :label="station.stationName"
                  :value="station.id"
                  :disabled="station.id === trainForm.endStation"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="终点站" prop="endStation">
              <el-select v-model="trainForm.endStation" placeholder="请选择终点站" style="width: 100%;">
                <el-option
                  v-for="station in stationOptions"
                  :key="station.id"
                  :label="station.stationName"
                  :value="station.id"
                  :disabled="station.id === trainForm.startStation"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="出发时间" prop="departureTime">
              <el-date-picker
                v-model="trainForm.departureTime"
                type="datetime"
                placeholder="请选择出发时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%;"
                is-range="false"
                :picker-options="{
                  selectableRange: '00:00:00-23:59:59'
                }"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到达时间" prop="arrivalTime">
              <el-date-picker
                v-model="trainForm.arrivalTime"
                type="datetime"
                placeholder="请选择到达时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%;"
                is-range="false"
                :picker-options="{
                  selectableRange: '00:00:00-23:59:59'
                }"
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
            <span class="detail-label">车次号：</span>
            <span class="detail-value">{{ selectedTrain.trainNo }}</span>
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
          <div class="detail-item">
            <span class="detail-label">状态：</span>
            <span class="detail-value">
              <el-tag :type="getStatusTagType(selectedTrain.operateStatus)">
                {{ getStatusText(selectedTrain.operateStatus) }}
              </el-tag>
            </span>
          </div>
        </div>
        <!-- 普通列车和动车车厢信息 -->
        <div class="detail-row" v-if="selectedTrain.trainType === 'normal' || selectedTrain.trainType === 'bullet'">
          <div class="detail-item">
            <span class="detail-label">软卧车厢数量：</span>
            <span class="detail-value">{{ selectedTrain.softSleeperCarriages || 0 }}节</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">硬卧车厢数量：</span>
            <span class="detail-value">{{ selectedTrain.hardSleeperCarriages || 0 }}节</span>
          </div>
        </div>
        <div class="detail-row" v-if="selectedTrain.trainType === 'normal' || selectedTrain.trainType === 'bullet'">
          <div class="detail-item">
            <span class="detail-label">硬座车厢数量：</span>
            <span class="detail-value">{{ selectedTrain.hardSeatCarriages || 0 }}节</span>
          </div>
        </div>
        <!-- 高铁车厢信息 -->
        <div class="detail-row" v-if="selectedTrain.trainType === 'high-speed'">
          <div class="detail-item">
            <span class="detail-label">一等座车厢数量：</span>
            <span class="detail-value">{{ selectedTrain.firstClassCarriages || 0 }}节</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">二等座车厢数量：</span>
            <span class="detail-value">{{ selectedTrain.secondClassCarriages || 0 }}节</span>
          </div>
        </div>
        <div class="detail-row" v-if="selectedTrain.trainType === 'high-speed'">
          <div class="detail-item">
            <span class="detail-label">商务座车厢数量：</span>
            <span class="detail-value">{{ selectedTrain.businessClassCarriages || 0 }}节</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">创建时间：</span>
            <span class="detail-value">{{ selectedTrain.createTime }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">服役年限：</span>
            <span class="detail-value">{{ selectedTrain.fuyiTime }}年</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">最后检修日期：</span>
            <span class="detail-value">{{ selectedTrain.maintenance_time || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">下一次检修日期：</span>
            <span class="detail-value">{{ getNextMaintenanceDate(selectedTrain.maintenance_time) }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">始发站：</span>
            <span class="detail-value">{{ getStationName(selectedTrain.startStationId) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">终点站：</span>
            <span class="detail-value">{{ getStationName(selectedTrain.endStationId) }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">出发时间：</span>
            <span class="detail-value">{{ selectedTrain.startTime || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">到达时间：</span>
            <span class="detail-value">{{ selectedTrain.endTime || '-' }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="detail-label">运行时长：</span>
            <span class="detail-value">{{ selectedTrain.runDuration || '-' }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item full-width">
            <span class="detail-label">备注：</span>
            <span class="detail-value">{{ selectedTrain.note || '-' }}</span>
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
      // 车站列表数据
      stationOptions: [],
      // 表单数据
      trainForm: {
        trainId: '',
        trainNumber: '',
        trainType: '',
        manufactureDate: '',
        serviceLife: 0.0,
        status: '',
        lastMaintenanceDate: '',
        remark: '',
        startStation: '',
        endStation: '',
        departureTime: '',
        arrivalTime: '',
        // 车厢类型数量
        softSleeperCarriages: 0, // 软卧车厢数量
        hardSleeperCarriages: 0, // 硬卧车厢数量
        hardSeatCarriages: 0,    // 硬座车厢数量
        firstClassCarriages: 0,   // 一等座车厢数量
        secondClassCarriages: 0,  // 二等座车厢数量
        businessClassCarriages: 0 // 商务座车厢数量
      },
      // 表单验证规则
      formRules: {
        trainNumber: [
          { required: true, message: '请输入车次号', trigger: 'blur' }
        ],
        trainType: [
          { required: true, message: '请选择车型', trigger: 'change' }
        ],
        manufactureDate: [
          { required: true, message: '请选择制造日期', trigger: 'change' }
        ],
        lastMaintenanceDate: [
          { required: true, message: '请选择最后检修日期', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        startStation: [
          { required: true, message: '请选择始发站', trigger: 'change' }
        ],
        endStation: [
          { required: true, message: '请选择终点站', trigger: 'change' }
        ],
        departureTime: [
          { required: true, message: '请选择出发时间', trigger: 'change' }
        ],
        arrivalTime: [
          { required: true, message: '请选择到达时间', trigger: 'change' }
        ],
        // 车厢类型数量验证（必填，根据车型动态显示）
        softSleeperCarriages: [
          { required: true, message: '请输入软卧车厢数量', trigger: 'change' },
          { type: 'number', min: 0, message: '请输入有效的软卧车厢数量', trigger: 'change' }
        ],
        hardSleeperCarriages: [
          { required: true, message: '请输入硬卧车厢数量', trigger: 'change' },
          { type: 'number', min: 0, message: '请输入有效的硬卧车厢数量', trigger: 'change' }
        ],
        hardSeatCarriages: [
          { required: true, message: '请输入硬座车厢数量', trigger: 'change' },
          { type: 'number', min: 0, message: '请输入有效的硬座车厢数量', trigger: 'change' }
        ],
        firstClassCarriages: [
          { required: true, message: '请输入一等座车厢数量', trigger: 'change' },
          { type: 'number', min: 0, message: '请输入有效的一等座车厢数量', trigger: 'change' }
        ],
        secondClassCarriages: [
          { required: true, message: '请输入二等座车厢数量', trigger: 'change' },
          { type: 'number', min: 0, message: '请输入有效的二等座车厢数量', trigger: 'change' }
        ],
        businessClassCarriages: [
          { required: true, message: '请输入商务座车厢数量', trigger: 'change' },
          { type: 'number', min: 0, message: '请输入有效的商务座车厢数量', trigger: 'change' }
        ],
        serviceLife: [
          { required: true, message: '请输入服役年限', trigger: 'change' },
          { type: 'number', min: 0, max: 30, message: '请输入有效的服役年限', trigger: 'change' }
        ]
      },
      // 选中的车辆
      selectedTrain: {}
    }
  },
  mounted() {
    this.loadTrainData()
    this.loadStations()
  },
  methods: {
    // 获取车型标签类型
    getTypeTagType(type) {
      // 统一将车型转换为英文格式
      const typeEng = typeof type === 'string' ? {
        '高铁': 'high-speed',
        '动车': 'bullet',
        '普通列车': 'normal'
      }[type] || type : type
      
      const typeMap = {
        'high-speed': 'success',
        'bullet': 'primary',
        'normal': 'info'
      }
      return typeMap[typeEng] || 'default'
    },

    // 获取车型文本
    getTypeText(type) {
      // 如果已经是中文，直接返回
      const chineseTypes = ['高铁', '动车', '普通列车']
      if (typeof type === 'string' && chineseTypes.includes(type)) {
        return type
      }
      
      const typeMap = {
        'high-speed': '高铁',
        'bullet': '动车',
        'normal': '普通列车'
      }
      return typeMap[type] || type
    },

    // 获取状态标签类型
    getStatusTagType(status) {
      // 统一将状态转换为数字
      const statusNum = typeof status === 'string' ? {
        'running': 1,
        'maintenance': 2,
        'stopped': 0
      }[status] || status : status
      
      const statusMap = {
        1: 'success',  // 运行中
        2: 'warning',  // 维修中
        0: 'danger'   // 停运
      }
      return statusMap[statusNum] || 'default'
    },

    // 获取状态文本
    getStatusText(status) {
      // 统一将状态转换为数字
      const statusNum = typeof status === 'string' ? {
        'running': 1,
        'maintenance': 2,
        'stopped': 0
      }[status] || status : status
      
      const statusMap = {
        1: '运行中',  // 运行中
        2: '维修中',  // 维修中
        0: '停运'     // 停运
      }
      return statusMap[statusNum] || status
    },

    // 计算下一次检修日期
    getNextMaintenanceDate(lastDate) {
      if (!lastDate) return '-'  
      let date
      // 如果是字符串格式，尝试转换为Date对象
      if (typeof lastDate === 'string') {
        date = new Date(lastDate)
        // 如果转换失败，返回'-'
        if (isNaN(date.getTime())) return '-'  
      } else if (lastDate instanceof Date) {
        // 如果已经是Date对象，直接使用
        date = lastDate
      } else {
        // 其他类型，返回'-'
        return '-'  
      }
      date.setMonth(date.getMonth() + 3) // 假设每3个月检修一次
      return date.toISOString().split('T')[0]
    },
    
    // 根据站点ID获取站点名称
    getStationName(stationId) {
      if (!stationId) return '-'
      const station = this.stationOptions.find(s => s.id === stationId)
      return station ? station.stationName : '-'  
    },
    
    // 根据站点ID列表获取站点名称列表
    getStationNames(stationIds) {
      if (!stationIds || !Array.isArray(stationIds) || stationIds.length === 0) return '-'
      return stationIds.map(id => this.getStationName(id)).join('，')
    },

    // 加载车辆数据
    loadTrainData() {
      this.loading = true
      // 将搜索参数中的车型从英文转换为中文
      const searchData = { ...this.searchParams }
      if (searchData.trainType) {
        const trainTypeMap = {
          'high-speed': '高铁',
          'bullet': '动车',
          'normal': '普通列车'
        }
        searchData.trainType = trainTypeMap[searchData.trainType] || searchData.trainType
      }
      // 向后端发送POST请求获取车辆数据
      api.post('/inventory/admin/train', {
        ...searchData,
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      })
      .then(response => {
        console.log('完整响应对象:', response)
        console.log('响应状态:', response.status)
        console.log('响应状态文本:', response.statusText)
        const data = response.data
        // 打印接口返回的数据到控制台
        console.log('接口返回的数据:', data)
        // 打印数据类型
        console.log('数据类型:', Array.isArray(data) ? '数组' : typeof data)
        
        // 打印数据的所有属性
        console.log('数据属性:', Object.keys(data))
        
        // 设置车辆列表 - 处理多种数据格式
        let trainData = []
        let totalCount = 0
        
        // 如果是直接返回ArrayList数组
        if (Array.isArray(data)) {
          console.log('直接使用数组数据，长度:', data.length)
          trainData = data
          totalCount = data.length
        } 
        // 如果是包含list字段的对象
        else if (data && data.list) {
          console.log('使用data.list字段，类型:', Array.isArray(data.list) ? '数组' : typeof data.list, '长度:', Array.isArray(data.list) ? data.list.length : 0)
          trainData = Array.isArray(data.list) ? data.list : []
          totalCount = data.total || 0
        } 
        // 如果是包含data字段的对象（可能的其他格式）
        else if (data && data.data) {
          console.log('使用data.data字段，类型:', Array.isArray(data.data) ? '数组' : typeof data.data, '长度:', Array.isArray(data.data) ? data.data.length : 0)
          trainData = Array.isArray(data.data) ? data.data : []
          totalCount = data.total || trainData.length
        }
        // 如果是包含records字段的对象（Ant Design Pro 常用格式）
        else if (data && data.records) {
          console.log('使用data.records字段，类型:', Array.isArray(data.records) ? '数组' : typeof data.records, '长度:', Array.isArray(data.records) ? data.records.length : 0)
          trainData = Array.isArray(data.records) ? data.records : []
          totalCount = data.total || trainData.length
        }
        // 如果是包含items字段的对象（另一种常见格式）
        else if (data && data.items) {
          console.log('使用data.items字段，类型:', Array.isArray(data.items) ? '数组' : typeof data.items, '长度:', Array.isArray(data.items) ? data.items.length : 0)
          trainData = Array.isArray(data.items) ? data.items : []
          totalCount = data.total || trainData.length
        } 
        // 默认处理
        else {
          console.log('未识别的数据格式，设置为空数组')
          trainData = []
          totalCount = 0
        }
        
        // 打印处理后的数据
        console.log('处理后的trainData:', trainData)
        console.log('处理后的trainData长度:', trainData.length)
        console.log('处理后的totalCount:', totalCount)
        
        // 设置到组件数据
        this.trainList = trainData
        this.pagination.total = totalCount
        
        console.log('组件trainList:', this.trainList)
        console.log('组件trainList长度:', this.trainList.length)
        
        // 计算统计数据
        this.calculateStatistics(this.trainList)
      })
      .catch(error => {
        console.error('加载车辆数据失败:', error)
        console.error('错误配置:', error.config)
        if (error.response) {
          console.error('错误响应状态:', error.response.status)
          console.error('错误响应数据:', error.response.data)
        } else if (error.request) {
          console.error('没有收到响应:', error.request)
        } else {
          console.error('请求错误:', error.message)
        }
        this.$message.error('加载车辆数据失败，请稍后重试')
        // 确保trainList至少是空数组
        this.trainList = []
        this.pagination.total = 0
        this.calculateStatistics(this.trainList)
      })
      .finally(() => {
        this.loading = false
      })
    },

    // 加载车站列表
    async loadStations() {
      try {
        const response = await api.post('/inventory/admin/trainStation', {
          pageNum: 1,
          pageSize: 1000 // 设置一个足够大的页码，确保获取所有车站
        })
        this.stationOptions = response.data?.data || []
      } catch (error) {
        console.error('加载车站列表失败:', error)
        this.$message.error('加载车站列表失败，请稍后重试')
      }
    },

    // 计算统计数据
    calculateStatistics(data) {
      this.totalTrains = data.length
      // 统一使用数字状态进行过滤，使用operateStatus字段
      this.runningTrains = data.filter(item => {
        // 处理可能的字符串状态（如从后端返回的数字或前端显示的字符串）
        const status = typeof item.operateStatus === 'string' ? {
          'running': 1,
          'maintenance': 2,
          'stopped': 0
        }[item.operateStatus] || item.operateStatus : item.operateStatus
        return status === 1
      }).length
      this.maintenanceTrains = data.filter(item => {
        const status = typeof item.operateStatus === 'string' ? {
          'running': 1,
          'maintenance': 2,
          'stopped': 0
        }[item.operateStatus] || item.operateStatus : item.operateStatus
        return status === 2
      }).length
      this.stoppedTrains = data.filter(item => {
        const status = typeof item.operateStatus === 'string' ? {
          'running': 1,
          'maintenance': 2,
          'stopped': 0
        }[item.operateStatus] || item.operateStatus : item.operateStatus
        return status === 0
      }).length
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
      // 复制行数据
      this.trainForm = { ...row }
      // 将数字状态转换为字符串格式，以便下拉选择框显示
      const statusMap = {
        1: 'running',  // 运行中
        2: 'maintenance',  // 维修中
        0: 'stopped'  // 停运
      }
      if (typeof this.trainForm.status === 'number') {
        this.trainForm.status = statusMap[this.trainForm.status] || 'stopped'
      }
      
      // 将中文车型转换为英文格式，以便下拉选择框显示
      const trainTypeMap = {
        '高铁': 'high-speed',
        '动车': 'bullet',
        '普通列车': 'normal'
      }
      if (typeof this.trainForm.trainType === 'string') {
        this.trainForm.trainType = trainTypeMap[this.trainForm.trainType] || this.trainForm.trainType
      }
      
      this.dialogVisible = true
    },

    // 批量编辑
    handleBatchEdit() {
      this.$message.success('批量编辑功能待实现')
    },

    // 删除车辆
    async handleDelete(row) {
      try {
        await this.$confirm(`确定要删除车辆 ${row.trainNumber} 吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        
        // 发送删除请求
        await api.delete(`/inventory/admin/train/delete/${row.trainId}`)
        this.$message.success('删除成功')
        this.loadTrainData()
      } catch (error) {
        if (error !== 'cancel') {
          console.error('删除失败:', error)
          this.$message.error('删除失败，请稍后重试')
        } else {
          this.$message.info('已取消删除')
        }
      }
    },

    // 批量删除
    async handleBatchDelete() {
      if (this.selectedRows.length === 0) return
      
      try {
        await this.$confirm(`确定要删除选中的 ${this.selectedRows.length} 辆车辆吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        
        // 获取选中的车辆ID列表
        const ids = this.selectedRows.map(row => row.trainId).join(',')
        // 发送批量删除请求
        await api.delete(`/inventory/admin/train/deletes/${ids}`)
        this.$message.success('批量删除成功')
        this.loadTrainData()
      } catch (error) {
        if (error !== 'cancel') {
          console.error('批量删除失败:', error)
          this.$message.error('批量删除失败，请稍后重试')
        } else {
          this.$message.info('已取消删除')
        }
      }
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

    // 日期格式化函数
    formatDate(date) {
      if (!date) return ''
      let dateObj
      // 如果是字符串格式，尝试转换为Date对象
      if (typeof date === 'string') {
        dateObj = new Date(date)
        // 如果转换失败，返回空字符串
        if (isNaN(dateObj.getTime())) return ''
      } else if (date instanceof Date) {
        // 如果已经是Date对象，直接使用
        dateObj = date
      } else {
        // 其他类型，返回空字符串
        return ''
      }
      // 转换为yyyy-mm-dd格式
      const year = dateObj.getFullYear()
      const month = String(dateObj.getMonth() + 1).padStart(2, '0')
      const day = String(dateObj.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

    // 表单提交
    async handleSubmit() {
      this.$refs.trainForm.validate(async (valid) => {
        if (valid) {
          try {
            // 复制表单数据
            const formData = { ...this.trainForm }
            
            // 格式化日期字段为yyyy-mm-dd格式
            formData.manufactureDate = this.formatDate(formData.manufactureDate)
            formData.lastMaintenanceDate = this.formatDate(formData.lastMaintenanceDate)
            
            // 将状态从字符串转换为数字
            const statusMap = {
              'running': 1,  // 运行中
              'maintenance': 2,  // 维修中
              'stopped': 0  // 停运
            }
            formData.status = statusMap[formData.status] || 0
            
            // 将车型从英文转换为中文
            const trainTypeMap = {
              'high-speed': '高铁',
              'bullet': '动车',
              'normal': '普通列车'
            }
            formData.trainType = trainTypeMap[formData.trainType] || formData.trainType
            
            // 确保服役年限为字符串格式的浮点数（如"1.0"），防止JSON序列化时丢失小数位
            formData.serviceLife = parseFloat(formData.serviceLife).toFixed(1)
            
            if (this.dialogType === 'add') {
              // 添加车辆
              const addResponse = await api.post('/inventory/admin/train/add', formData)
              console.log('添加列车API返回数据:', addResponse.data)
            } else {
              // 编辑车辆
              await api.put('/inventory/admin/train/update', formData)
            }
            this.$message.success(`${this.dialogType === 'add' ? '添加' : '编辑'}成功`)
            this.dialogVisible = false
            this.loadTrainData()
          } catch (error) {
            console.error(`${this.dialogType === 'add' ? '添加' : '编辑'}失败:`, error)
            this.$message.error(`${this.dialogType === 'add' ? '添加' : '编辑'}失败，请稍后重试`)
          }
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
        manufactureDate: '',
        serviceLife: 0.0,
        status: '',
        lastMaintenanceDate: '',
        remark: '',
        startStation: '',
        endStation: '',
        departureTime: '',
        arrivalTime: '',
        // 车厢类型数量
        softSleeperCarriages: 0, // 软卧车厢数量
        hardSleeperCarriages: 0, // 硬卧车厢数量
        hardSeatCarriages: 0,    // 硬座车厢数量
        firstClassCarriages: 0,   // 一等座车厢数量
        secondClassCarriages: 0,  // 二等座车厢数量
        businessClassCarriages: 0 // 商务座车厢数量
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
  .carriage-input .el-input__inner {
    pointer-events: none;
  }
</style>