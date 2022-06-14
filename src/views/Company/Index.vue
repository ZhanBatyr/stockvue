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
          <tr v-for="(company, index) in companies" :key="index">
            <td>{{ company.id }}</td>
            <td>{{ company.name }}</td>
            <td>{{ company.description }}</td>
            <td>{{ sectors?.at(index)?.name }}</td>
            <td >{{ accounts?.at(index)?.amount }}</td>
            <td>
              <router-link :to="{ name: 'CompanyProfile', params: { id: company.id } }" class="btn btn-success">Профиль</router-link>
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
      companies: {},
      accounts: {},
      sectors: {}
    }
  },
  methods: {
    async getCompanies() {
      await this.axios.get(PREFIX + "/companies").then(response => {
        if (response.status === 200) {
          this.companies = response.data.companies
          this.accounts = response.data.accounts
          this.sectors = response.data.sectors
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