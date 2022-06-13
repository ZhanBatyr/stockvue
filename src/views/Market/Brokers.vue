<template>
  <div class="content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Брокерлер</p>
      </div>
      <div class="body p-0">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Аты-жөні</th>
            <th>Электронды пошта</th>
            <th>Рөлі</th>
            <th>Комиссия</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="broker in brokers" :key="broker.id">
            <td>{{ broker.id }}</td>
            <td>{{ broker.username }}</td>
            <td>{{ broker.email }}</td>
            <td>{{ broker.role }}</td>
            <td>{{ broker.commission }}%</td>
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
  name: "Brokers",
  data() {
    return {
      brokers: {}
    }
  },
  methods: {
    async getBrokers() { 
      return this.axios.get(PREFIX + "/users/brokers").then(response => {
        if (response.status === 200) {
          this.brokers = response.data
        }
      })
    }
  },
  mounted() {
    this.getBrokers()
  }
}
</script>

<style scoped>

</style>