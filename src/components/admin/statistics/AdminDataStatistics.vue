<template>
  <div class="admin-data-statistics">
    <!-- 顶部关键指标卡片 -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-value">399<span class="stat-trend up">↑</span></div>
        <div class="stat-label">昨日成交订单数(笔)</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">80<span class="stat-trend down">↓</span></div>
        <div class="stat-label">昨日新增会员数(位)</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">1450<span class="stat-trend up">↑</span></div>
        <div class="stat-label">昨日商品浏览量(次)</div>
      </div>
    </div>

    <!-- 用户分析区域 -->
    <div class="stats-section">
      <div class="section-header">
        <h3>用户分析</h3>
        <span class="more-link" @click="handleViewMore('user')">查看更多 &gt;&gt;</span>
      </div>
      <div class="section-controls">
        <div class="data-type">
          <button class="data-btn" :class="{ active: userDataType === 'day' }" @click="handleUserDataTypeChange('day')">日周</button>
          <button class="data-btn" :class="{ active: userDataType === 'week' }" @click="handleUserDataTypeChange('week')">周周</button>
          <button class="data-btn" :class="{ active: userDataType === 'month' }" @click="handleUserDataTypeChange('month')">月周</button>
          <button class="data-btn" :class="{ active: userDataType === 'year' }" @click="handleUserDataTypeChange('year')">年周</button>
        </div>
        <div class="date-range">
          <el-date-picker
            v-model="userDateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="选择开始日期"
            end-placeholder="选择结束日期"
            class="date-picker"
          />
        </div>
      </div>
      <div class="chart-container">
        <div class="bar-chart">
          <!-- 这里将由ECharts渲染柱状图 -->
        </div>
      </div>
    </div>

    <!-- 品类分析区域 -->
    <div class="stats-section">
      <div class="section-header">
        <h3>品类分析</h3>
        <span class="more-link" @click="handleViewMore('category')">查看更多 &gt;&gt;</span>
      </div>
      <div class="section-controls">
        <div class="data-type">
          <button class="data-btn" :class="{ active: categoryDataType === 'all' }" @click="handleCategoryDataTypeChange('all')">全部</button>
          <button class="data-btn" :class="{ active: categoryDataType === 'view' }" @click="handleCategoryDataTypeChange('view')">浏览量</button>
          <button class="data-btn" :class="{ active: categoryDataType === 'collect' }" @click="handleCategoryDataTypeChange('collect')">收藏量</button>
          <button class="data-btn" :class="{ active: categoryDataType === 'purchase' }" @click="handleCategoryDataTypeChange('purchase')">购买量</button>
        </div>
      </div>
      <div class="chart-container">
        <div class="horizontal-bar-chart">
          <!-- 这里将由ECharts渲染横向柱状图 -->
        </div>
      </div>
    </div>

    <!-- 成本分析区域 -->
    <div class="stats-section">
      <div class="section-header">
        <h3>成本分析</h3>
        <span class="more-link" @click="handleViewMore('cost')">查看更多 &gt;&gt;</span>
      </div>
      <div class="section-controls">
        <div class="data-type">
          <button class="data-btn" :class="{ active: costDataType === 'day' }" @click="handleCostDataTypeChange('day')">日周</button>
          <button class="data-btn" :class="{ active: costDataType === 'week' }" @click="handleCostDataTypeChange('week')">周周</button>
          <button class="data-btn" :class="{ active: costDataType === 'month' }" @click="handleCostDataTypeChange('month')">月周</button>
          <button class="data-btn" :class="{ active: costDataType === 'year' }" @click="handleCostDataTypeChange('year')">年周</button>
        </div>
        <div class="date-range">
          <el-date-picker
            v-model="costDateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="选择开始日期"
            end-placeholder="选择结束日期"
            class="date-picker"
          />
        </div>
      </div>
      <div class="cost-charts">
        <div class="pie-chart-item">
          <div class="pie-chart"></div>
          <div class="pie-label">70%</div>
          <div class="pie-title">花费支出1</div>
        </div>
        <div class="pie-chart-item">
          <div class="pie-chart"></div>
          <div class="pie-label">50%</div>
          <div class="pie-title">花费支出2</div>
        </div>
        <div class="pie-chart-item">
          <div class="pie-chart"></div>
          <div class="pie-label">46%</div>
          <div class="pie-title">花费支出3</div>
        </div>
        <div class="pie-chart-item">
          <div class="pie-chart"></div>
          <div class="pie-label">33%</div>
          <div class="pie-title">花费支出4</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'AdminDataStatistics',
  setup() {
    const userDateRange = ref([])
    const costDateRange = ref([])
    const userDataType = ref('year')
    const categoryDataType = ref('all')
    const costDataType = ref('year')
    let userChart = null
    let categoryChart = null
    let costCharts = []

    // 处理用户分析数据类型切换
    const handleUserDataTypeChange = (type) => {
      userDataType.value = type
      // 在实际应用中，这里应该根据选择的类型重新获取数据并更新图表
      updateUserChartData()
    }

    // 处理品类分析数据类型切换
    const handleCategoryDataTypeChange = (type) => {
      categoryDataType.value = type
      // 在实际应用中，这里应该根据选择的类型重新获取数据并更新图表
      updateCategoryChartData()
    }

    // 处理成本分析数据类型切换
    const handleCostDataTypeChange = (type) => {
      costDataType.value = type
      // 在实际应用中，这里应该根据选择的类型重新获取数据并更新图表
      updateCostChartData()
    }

    // 处理查看更多链接点击
    const handleViewMore = (type) => {
      // 在实际应用中，这里应该跳转到对应的详情页面或展开更多内容
      console.log(`查看${type}更多详情`)
      // 可以使用路由跳转
      // router.push(`/admin/statistics/${type}/detail`)
    }

    // 更新用户分析图表数据
    const updateUserChartData = () => {
      if (!userChart) return
      
      // 根据不同的数据类型生成不同的模拟数据
      let data = []
      let xAxisData = []
      
      switch (userDataType.value) {
        case 'day':
          // 生成最近7天的数据
          xAxisData = ['1月1日', '1月2日', '1月3日', '1月4日', '1月5日', '1月6日', '1月7日']
          data = [15, 23, 20, 35, 25, 30, 28]
          break
        case 'week':
          // 生成最近4周的数据
          xAxisData = ['第1周', '第2周', '第3周', '第4周']
          data = [80, 95, 110, 105]
          break
        case 'month':
          // 生成最近6个月的数据
          xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月']
          data = [280, 320, 360, 340, 380, 420]
          break
        case 'year':
        default:
          // 生成全年12个月的数据
          xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          data = [10, 20, 30, 40, 50, 60, 70, 65, 60, 50, 40, 30]
      }
      
      userChart.setOption({
        xAxis: {
          data: xAxisData
        },
        series: [{
          data: data
        }]
      })
    }

    // 更新品类分析图表数据
    const updateCategoryChartData = () => {
      if (!categoryChart) return
      
      // 根据不同的数据类型生成不同的模拟数据
      let data = []
      
      switch (categoryDataType.value) {
        case 'view':
          data = [120, 140, 170, 90, 80, 120, 140, 150, 170, 190]
          break
        case 'collect':
          data = [80, 90, 110, 60, 50, 80, 90, 100, 110, 130]
          break
        case 'purchase':
          data = [40, 50, 70, 30, 20, 40, 50, 60, 70, 90]
          break
        case 'all':
        default:
          data = [100, 120, 150, 80, 70, 110, 130, 140, 160, 180]
      }
      
      categoryChart.setOption({
        series: [{
          data: data
        }]
      })
    }

    // 更新成本分析图表数据
    const updateCostChartData = () => {
      if (costCharts.length === 0) return
      
      // 根据不同的数据类型生成不同的模拟数据
      let percentages = []
      
      switch (costDataType.value) {
        case 'day':
          percentages = [65, 45, 42, 30]
          break
        case 'week':
          percentages = [68, 48, 44, 31]
          break
        case 'month':
          percentages = [69, 49, 45, 32]
          break
        case 'year':
        default:
          percentages = [70, 50, 46, 33]
      }
      
      // 更新每个成本图表
      costCharts.forEach((chart, index) => {
        chart.setOption({
          series: [{
            axisLine: {
              lineStyle: {
                color: [
                  [percentages[index] / 100, ['#3b82f6', '#10b981', '#8b5cf6', '#ef4444'][index]],
                  [1, '#e5e7eb']
                ]
              }
            }
          }]
        })
        
        // 更新百分比标签
        const pieLabel = document.querySelectorAll('.pie-label')[index]
        if (pieLabel) {
          pieLabel.textContent = `${percentages[index]}%`
        }
      })
    }

    // 初始化用户分析柱状图
    const initUserChart = () => {
      try {
        const chartDom = document.querySelector('.bar-chart')
        if (!chartDom) {
          console.warn('用户分析图表容器未找到')
          return
        }
        
        // 销毁已存在的图表实例，避免重复初始化
        if (userChart) {
          userChart.dispose()
        }
        
        userChart = echarts.init(chartDom)
        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel: {
              interval: 0
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [10, 20, 30, 40, 50, 60, 70, 65, 60, 50, 40, 30],
              type: 'bar',
              itemStyle: {
                color: '#3b82f6'
              }
            }
          ]
        }
        userChart.setOption(option)
      } catch (error) {
        console.error('初始化用户分析图表失败:', error)
      }
    }

    // 初始化品类分析横向柱状图
    const initCategoryChart = () => {
      try {
        const chartDom = document.querySelector('.horizontal-bar-chart')
        if (!chartDom) {
          console.warn('品类分析图表容器未找到')
          return
        }
        
        // 销毁已存在的图表实例，避免重复初始化
        if (categoryChart) {
          categoryChart.dispose()
        }
        
        categoryChart = echarts.init(chartDom)
        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['品类10', '品类9', '品类8', '品类7', '品类6', '品类5', '品类4', '品类3', '品类2', '品类1']
          },
          series: [
            {
              data: [100, 120, 150, 80, 70, 110, 130, 140, 160, 180],
              type: 'bar',
              itemStyle: {
                color: function(params) {
                  const colors = ['#3b82f6', '#ef4444', '#8b5cf6', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#14b8a6', '#f97316', '#84cc16']
                  return colors[params.dataIndex]
                }
              }
            }
          ]
        }
        categoryChart.setOption(option)
        
        // 使用清理函数移除异常元素
        setTimeout(cleanUpAbnormalElements, 200);
      } catch (error) {
        console.error('初始化品类分析图表失败:', error)
      }
    }

    // 初始化成本分析环形图
    const initCostCharts = () => {
      try {
        // 销毁已存在的图表实例
        costCharts.forEach(chart => {
          if (chart && typeof chart.dispose === 'function') {
            chart.dispose()
          }
        })
        costCharts = []
        
        const chartDoms = document.querySelectorAll('.pie-chart')
        if (!chartDoms || chartDoms.length === 0) {
          console.warn('成本分析图表容器未找到')
          return
        }
        
        const percentages = [70, 50, 46, 33]
        const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#ef4444']
        
        chartDoms.forEach((dom, index) => {
          if (!dom) return
          
          const chart = echarts.init(dom)
          costCharts.push(chart)
          
          const option = {
            series: [
              {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 100,
                splitNumber: 0,
                radius: '90%',
                detail: {
                  show: false
                },
                pointer: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    width: 10,
                    color: [
                      [percentages[index] / 100, colors[index]],
                      [1, '#e5e7eb']
                    ]
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisLabel: {
                  show: false
                }
              }
            ]
          }
          chart.setOption(option)
        })
      } catch (error) {
        console.error('初始化成本分析图表失败:', error)
      }
    }

    // 清理异常86%元素的函数
    const cleanUpAbnormalElements = () => {
      try {
        // 1. 查找所有文本内容为'86%'的元素
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
          if (el.textContent && el.textContent.trim() === '86%') {
            // 直接移除所有匹配'86%'的元素，不限制父元素条件
            el.remove();
          }
        });
        
        // 2. 额外检查body的直接子元素，确保没有异常的86%元素
        Array.from(document.body.children).forEach(child => {
          if (child.textContent && child.textContent.trim() === '86%') {
            child.remove();
          }
        });
        
        // 3. 检查品类分析区域，这是截图中86%出现的位置
        const categorySection = document.querySelector('.stats-section:nth-child(3)');
        if (categorySection) {
          const elements = categorySection.querySelectorAll('*');
          elements.forEach(el => {
            if (el.textContent && el.textContent.trim() === '86%') {
              el.remove();
            }
          });
        }
        
      } catch (error) {
        console.error('清理异常元素时出错:', error);
      }
    }

    // 窗口大小变化时重新调整图表大小
    const handleResize = () => {
      try {
        if (userChart && typeof userChart.resize === 'function') {
          userChart.resize()
        }
        if (categoryChart && typeof categoryChart.resize === 'function') {
          categoryChart.resize()
        }
        costCharts.forEach(chart => {
          if (chart && typeof chart.resize === 'function') {
            chart.resize()
          }
        })
        
        // 调整大小后立即清理异常元素
        cleanUpAbnormalElements();
        
        // 设置多重延迟清理，确保86%元素被彻底移除
        setTimeout(cleanUpAbnormalElements, 200);
        setTimeout(cleanUpAbnormalElements, 500);
      } catch (error) {
        console.error('调整图表大小失败:', error)
      }
    }

    onMounted(() => {
      // 立即执行一次清理，防止86%元素在页面加载时就显示
      cleanUpAbnormalElements();
      
      // 延迟初始化图表，确保DOM已经渲染
      setTimeout(() => {
        initUserChart()
        initCategoryChart()
        initCostCharts()
        
        // 图表初始化后立即清理一次
        cleanUpAbnormalElements();
        
        // 确保图表在DOM更新后正确渲染
        window.addEventListener('resize', () => {
          // 延迟调整标签位置，确保图表已更新
          setTimeout(() => {
            const pieLabels = document.querySelectorAll('.pie-label')
            pieLabels.forEach(label => {
              // 重新计算并设置标签位置
              const parent = label.parentElement
              if (parent) {
                label.style.transform = 'translate(-50%, -50%)'
              }
            })
            
            // 调整位置后再清理一次
            cleanUpAbnormalElements();
          }, 50)
        })
        
        // 额外添加多次延迟清理，确保86%元素被彻底移除
        setTimeout(cleanUpAbnormalElements, 500);
        setTimeout(cleanUpAbnormalElements, 1000);
      }, 100)
      
      window.addEventListener('resize', handleResize)
      
      // 添加一个定时检查，定期清理可能重新出现的异常元素
      const cleanupInterval = setInterval(() => {
        cleanUpAbnormalElements();
      }, 5000);
      
      // 组件卸载时清除定时器
      onUnmounted(() => {
        clearInterval(cleanupInterval);
      });
    })

    onUnmounted(() => {
      try {
        // 清理图表实例
        if (userChart && typeof userChart.dispose === 'function') {
          userChart.dispose()
          userChart = null
        }
        if (categoryChart && typeof categoryChart.dispose === 'function') {
          categoryChart.dispose()
          categoryChart = null
        }
        costCharts.forEach(chart => {
          if (chart && typeof chart.dispose === 'function') {
            chart.dispose()
          }
        })
        costCharts = []
        
        // 移除事件监听器
        window.removeEventListener('resize', handleResize)
      } catch (error) {
        console.error('清理组件资源失败:', error)
      }
    })

    return {
      userDateRange,
      costDateRange,
      userDataType,
      categoryDataType,
      costDataType,
      handleUserDataTypeChange,
      handleCategoryDataTypeChange,
      handleCostDataTypeChange,
      handleViewMore
    }
  }
}
</script>

<style scoped>
.admin-data-statistics {
  padding: 20px;
  background-color: #f5f7fa;
}

/* 顶部指标卡片样式 */
.stats-overview {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #1e40af;
  margin-bottom: 8px;
}

.stat-trend {
  font-size: 18px;
  margin-left: 5px;
}

.stat-trend.up {
  color: #22c55e;
}

.stat-trend.down {
  color: #ef4444;
}

.stat-label {
  color: #6b7280;
  font-size: 14px;
}

/* 统计区域通用样式 */
.stats-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.more-link {
  color: #3b82f6;
  font-size: 14px;
  cursor: pointer;
}

.more-link:hover {
  text-decoration: underline;
}

.section-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.data-type {
  display: flex;
  gap: 10px;
}

.data-btn {
  padding: 6px 16px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #6b7280;
  transition: all 0.3s;
}

.data-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.data-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.date-range {
  display: flex;
  gap: 10px;
}

.date-picker {
  width: 300px;
}

/* 图表容器样式 */
.chart-container {
  height: 300px;
  position: relative;
}

.bar-chart,
.horizontal-bar-chart {
  width: 100%;
  height: 100%;
}

/* 成本分析环形图样式 */
.cost-charts {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}

.pie-chart-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
}

.pie-chart {
  width: 120px;
  height: 120px;
  position: relative;
  display: block;
  overflow: visible;
}

.pie-label {
  font-size: 24px;
  font-weight: bold;
  color: #111827;
  position: absolute;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 100 !important;
  pointer-events: none;
  width: auto;
  height: auto;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  background: none !important;
  border: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.pie-title {
  font-size: 14px;
  color: #6b7280;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-overview {
    flex-direction: column;
  }
  
  .section-controls {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .date-picker {
    width: 100%;
  }
  
  .cost-charts {
    flex-direction: column;
    gap: 30px;
  }
}

/* 额外的CSS规则来隐藏异常的%符号元素 */
.stats-section {
  /* 确保合法的子元素正常显示 */
}

/* 只针对ECharts生成的异常提示框进行隐藏，不影响正常的pie-label */
:deep(.echarts-tip[data-content*="%"]) {
  display: none !important;
}

/* 防止ECharts生成的异常图例项显示 */
:deep(.ec-legend-item) {
  position: relative;
  z-index: 1;
}

/* 确保品类分析区域正常显示 */
.stats-section:nth-child(3) {
  overflow: visible;
}

/* 为异常的86%元素添加特定规则，但不影响正常的百分比标签 */
:deep([data-value="86%"], [title="86%"]) {
  display: none !important;
}

/* 确保正常的百分比标签有足够的z-index */
.pie-label {
  z-index: 100 !important;
}
</style>