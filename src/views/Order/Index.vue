﻿<template>
  <div class="content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Тапсырыстар</p>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped">
          <tr>
            <th>ID</th>
            <th>Типі</th>
            <th>Акция</th>
            <th>Саны</th>
            <th>Әрекет</th>
          </tr>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.type === 0 ? 'Сатып алу' : 'Сату' }}</td>
            <td>{{ order.quoteId }}</td>
            <td>{{ order.numberOfShares }}</td>
            <td>
              <button @click="closeOrder(order.id)" class="btn btn-success">Жабу</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {PREFIX} from "@/api";

export default {
  name: "Index",
  data() {
    return {
      orders: {}
    }
  },
  methods: {
    async getOrders() {
      await this.axios.get(PREFIX + "/orders/active").then(response => {
        if (response.status === 200) {
          this.orders = response.data.orders
        }
      })
    },
    async closeOrder(orderId) {
      await this.axios.post(PREFIX + "/market/" + orderId + "/close").then(response => {
        if (response.status === 200) {
          this.$notify({
            type: "success",
            title: "Тапсырыс сәтті жабылды!"
          })
          this.$router.go(0)
        }
      })
    }
  },
  mounted() {
    this.getOrders()
  }
}
</script>

<style scoped>

</style>