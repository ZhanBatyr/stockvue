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
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in quotes" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.symbol }}</td>
            <td>{{ item.company?.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.numberOfShares }}</td>
            <td>
              <button @click="accept(item.id)" class="btn btn-success">Қабылдау</button>
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
      quotes: {}
    }
  },
  methods: {
    async getQuotes() {
      await this.axios.get(PREFIX + "/quotes/registrar").then(response => {
        if (response.status === 200) {
          this.quotes = response.data.quotes
        }
      })
    },
    async accept(quoteId) {
      await this.axios.post(PREFIX + "/quotes/" + quoteId + "/accept").then(response => {
        if (response.status === 200) {
          this.$notify({
            type: "success",
            title: "Сәтті қабылданды"
          })
          this.$router.go(0)
        }
      })
    }
  },
  mounted() {
    this.getQuotes()
  }
}
</script>

<style scoped>

</style>