<template>
  <div class="companies content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Транзакциялар</p>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Сумма</th>
            <th>Өзгеріс</th>
            <th>Дата</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in transactions" :class="{'bg-green': item.change === '+', 'bg-red': item.change === '-'}" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.change }}</td>
            <td>{{ new Date(Date.parse(item.transactionAt)).toLocaleDateString() + " " + new Date(Date.parse(item.transactionAt)).toLocaleTimeString() }}</td>
          </tr>
          </tbody>
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
      transactions: {}
    }
  },
  methods: {
    async get() {
      await this.axios.get(PREFIX + "/transactions/" + this.$store.state.user.id).then(response => {
        if (response.status === 200) {
          this.transactions = response.data.transactions
        }
      })
    }
  },
  mounted() {
    this.get()
  }
}
</script>

<style scoped>

</style>