<template>
  <div class="payment-view">
    <PageHeader />
    <HeaderNav />
    <div class="payment-content">
      <Payment 
        :orderData="orderData"
        @cancel="handleCancel"
        @success="handleSuccess"
        @viewOrder="handleViewOrder"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageHeader from '@/components/index/Header.vue'
import HeaderNav from '@/components/index/HeaderNav.vue'
import Payment from '@/components/payment/Payment.vue';

const route = useRoute();
const router = useRouter();

const orderData = ref({});

onMounted(() => {
  if (route.query.orderData) {
    try {
      orderData.value = JSON.parse(route.query.orderData);
    } catch (error) {
      console.error('解析订单数据失败:', error);
    }
  }
});

const handleCancel = () => {
  router.back();
};

const handleSuccess = (data) => {
  console.log('支付成功:', data);
};

const handleViewOrder = () => {
  router.push('/order');
};
</script>

<style scoped>
.payment-view {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.payment-content {
  width: 100%;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
