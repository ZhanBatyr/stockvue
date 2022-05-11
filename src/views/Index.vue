// eslint-disable
<template>
    <div class="main content p-3">
        <div class="row">
          <div class="col-3">
              <div class="card">
                <div class="card-header">
                  <p class="card-title">Шолу</p>
                </div>
                <div class="card-body">
                  <div class="form-group">
                    <label>Қолданушы</label>
                    <input type="text" readonly class="form-control form-control-border" v-model="user.username">
                  </div>
                  <div class="form-group">
                    <label>Рөлі</label>
                    <input type="text" readonly class="form-control form-control-border" v-model="user.role">
                  </div>
                  <div class="form-group">
                    <label>Аккаунтағы сомма</label>
                    <input :style="{ color: user?.transactions?.at(-1)?.change === '+' ? 'green' : 'red' }" type="text" readonly class="form-control form-control-border" :value="user.account?.amount">
                    <small class="text-form text-muted">тенге</small>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-9">
            <div class="card" v-if="user.role !== 'registrar'">
              <div class="card-header">
                <p class="card-title">
                  Аккаунт өзгерісі
                </p>
              </div>
              <div class="card-body">
                <canvas ref="transactions" id="transactions"></canvas>
              </div>
            </div>
          </div>
          <div class="col-12" v-if="user.role !== 'broker' && user.role !== 'registrar'">
            <div class="card" >
              <div class="card-header">
                <p class="card-title">
                  Қолданушы бағалы қағаздары
                </p>
              </div>
              <div class="card-body p-0">
                <table class="table table-striped">
                  <tr>
                    <th>Акция</th>
                    <th>Саны</th>
                  </tr>
                  <tr v-for="stock in stocks" :key="stock">
                    <td>{{ stock?.quote?.symbol }}</td>
                    <td>{{ stock?.qty }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="col-12" v-if="user.role !== 'broker' && user.role !== 'registrar'">
            <div class="card" >
              <div class="card-header">
                <p class="card-title">
                  Қолданушы тапсырыстары
                </p>
              </div>
              <div class="card-body p-0">
                <table class="table table-striped">
                  <tr>
                    <th>ID</th>
                    <th>Типі</th>
                    <th>Акция</th>
                    <th>Саны</th>
                    <th>Мерзімі</th>
                    <th>Әрекет</th>
                  </tr>
                  <tr v-for="order in orders" :class="{ 'bg-red': !order.isActive }" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.type === 0 ? 'Сатып алу' : 'Сату' }}</td>
                    <td>{{ order.quote?.symbol }}</td>
                    <td>{{ order.numberOfShares }}</td>
                    <td>{{ new Date(Date.parse(order.placedAt)).toLocaleDateString() }}</td>
                    <td>
                      <button @click="closeOrder(order.id)" v-if="order.isActive" class="btn btn-success">Жабу</button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
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
      user: {},
      orders: {},
      stocks: {}
    }
  },
  mounted() {
    this.getUser()
    this.getOrders()
    this.getStocks()
  },
  updated() {
    const ctx = document.getElementById('transactions').getContext('2d');
    
    const dates = []
    this.user?.transactions?.forEach(x => dates.push(new Date(Date.parse(x.transactionAt)).toLocaleDateString() + " " + new Date(Date.parse(x.transactionAt)).toLocaleTimeString()))
    
    const amounts = []
    this.user?.transactions?.forEach(x => amounts.push(x.amount))
    
    console.log(dates)
    
    const data = {
      labels: dates,
      datasets: [{
        label: 'Account',
        data: amounts,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    const config = {
      type: 'line',
      data: data,
    };
    const myChart = new Chart(ctx, config)
  },
  methods: {
    async getUser() {
      await this.axios.get(PREFIX + "/users/" + this.$store.state.user.id).then(response => {
        if(response.status === 200) {
          this.user = response.data.user
          this.user.account = response.data.account
          this.user.transactions = response.data.transactions
        }
      })
    },
    async getOrders() {
      await this.axios.get(PREFIX + "/orders/user/" + this.$store.state.user.id).then(response => {
        if (response.status === 200) {
          this.orders = response.data.orders
        }
      })
    },
    async closeOrder(order_id) {
      await this.axios.post(PREFIX + "/market/" + order_id + "/cancel").then(response => {
        if (response.status === 200) {
          this.$notify({
            type: 'success',
            title: 'Тапсырыс сәтті жабылды!'
          })
        }
      })
    },
    async getStocks() {
      await this.axios.get(PREFIX + "/stocks/user/" + this.$store.state.user.id).then(response => {
        if (response.status === 200) {
          this.stocks = response.data.stocks
        }
      })
    }
  }
}
</script>

<style>

</style>