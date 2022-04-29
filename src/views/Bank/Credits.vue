<template>
  <div class="content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Кредиттер</p>
        <div class="card-tools">
          <router-link :to="{ name: 'Credit' }" class="btn btn-success">Кредит алу</router-link>
        </div>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>#</th>
            <th>Сумма</th>
            <th>Периодтар</th>
            <th>Мерзімі</th>
            <th>Әрекет</th>
          </tr>
          </thead>
          <tbody v-if="credits">
          <tr v-for="credit in credits" :class="{ 'bg-green': credit.isFullyPayed }" :key="credit.id">
            <td>{{ credit.id }}</td>
            <td>{{ credit.amount }}</td>
            <td>{{ credit.payedPeriods }} / {{ credit.periods }}</td>
            <td>{{ new Date(Date.parse(credit.takenAt)).toLocaleDateString() }}</td>
            <td>
              <button v-if="!credit.isFullyPayed" class="btn btn-success" @click="close(credit.id)">Кредитті жабу</button>
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
  name: "Credits",
  data() { 
    return {
      credits: {}
    }
  },
  methods: {
    async getCredits() {
      await this.axios.get(PREFIX + "/credits").then(response => {
        if (response.status === 200) {
          this.credits = response.data.credits
        }
      })
    },
    async close(credit_id) {
      await this.axios.post(PREFIX + "/credits/" + credit_id + "/close").then(response => {
        if (response.status === 200) {
          this.$router.go()
        }
      })
    }
  },
  mounted() {
    this.getCredits()
  }
}
</script>

<style scoped>

</style>