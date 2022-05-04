<template>
  <div class="companies content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Акциялар</p>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Символ</th>
            <th>Компания</th>
            <th>Бағасы</th>
            <th>Саны</th>
            <th>Low</th>
            <th>High</th>
            <th>Open</th>
            <th>Close</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in quotes" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.symbol }}</td>
            <td>{{ companies?.at(index)?.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.inTradeNumberOfShares }} / {{ item.numberOfShares }}</td>
            <td>{{ item.low }}</td>
            <td>{{ item.high }}</td>
            <td>{{ item.open }}</td>
            <td>{{ item.close }}</td>
            <td><router-link class="btn btn-success" :to="{ name: 'CompanyProfile', params: { id: companies?.at(index)?.id } }">Профиль</router-link></td>
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
      quotes: {},
      companies: {}
    }
  },
  methods: {
    async get() {
      await this.axios.get(PREFIX + "/quotes").then(response => {
        if (response.status === 200) {
          this.quotes = response.data.quotes
          this.companies = response.data.companies
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