<template>
  <div class="companies content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Компаниялар</p>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Аты</th>
            <th>Компания туралы</th>
            <th>Сектор</th>
            <th>Капитализация</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="company in companies" :key="company.id">
            <td>{{ company.id }}</td>
            <td>{{ company.name }}</td>
            <td>{{ company.description }}</td>
            <td>{{ company.sector }}</td>
            <td>{{ (Math.floor(Math.random() * 101) + 1) * 100_000 }}</td>
            <td>
              <router-link :to="{ name: 'CompanyProfile', params: { id: company.id } }" class="btn btn-success">Толығырақ</router-link>
            </td>
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
      companies: {}
    }
  },
  methods: {
    async getCompanies() {
      await this.axios.get(PREFIX + "/companies").then(response => {
        if (response.status === 200) {
          this.companies = response.data.companies
        }
      })
    }
  },
  mounted() {
    this.getCompanies()
  }
}
</script>

<style scoped>

</style>