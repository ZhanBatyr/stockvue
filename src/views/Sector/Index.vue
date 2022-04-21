<template>
  <div class="companies content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Секторлар</p>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Аты</th>
            <th>Бонус</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in sectors" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.bonus }}</td>
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
      sectors: {}
    }
  },
  methods: {
    async get() {
      await this.axios.get(PREFIX + "/sectors").then(response => {
        if (response.status === 200) {
          this.sectors = response.data
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