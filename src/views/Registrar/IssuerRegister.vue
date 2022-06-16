<template>
  <div class="companies content p-3">
    <h3 class="m-2">
      Тізілім {{this.issuerData[0].quote.symbol}}
    </h3>
    <h5>
      Нарықтағы барлық акциялар {{allNumShares}}
    </h5>
    <div class="card p-3">
      <table class="table table-dark table-striped">
        <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Аты</th>
          <th scope="col">Эл. почта</th>
          <th scope="col">Роль</th>
          <th scope="col">Акция саны</th>
          <th scope="col">Қабылданды</th>
          <th scope="col">Салынды</th>
          <th scope="col">Жабылды</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(f, ind) in finishData" :key="f.id">
          <th scope="row">{{ind+1}}</th>
          <td>{{ f.username }}</td>
          <td>{{ f.email }}</td>
          <td>{{ f.role }}</td>
          <td>{{ f.numberOfShares }}</td>
          <td>{{ f.isConfirmed }}</td>
          <td>{{ f.placedAt }}</td>
          <td>{{ f.closedAt }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {PREFIX} from "@/api";

export default {
  name: "Registries",
  data() {
    return {
      issuerData: [],
      finishData: [],
      quoteId: null,
      allNumShares: 0,
      selectedApplication: null,
      selectedIndex: null
    }
  },
  async created() {
    this.quoteId = this.$route.params.quoteId
    await this.getQuote()
    await this.prepareData()
  },
  methods: {
    async getQuote() {
      await this.axios.get(PREFIX + "/orders/quote/" + this.quoteId).then(response => {
        if (response.status === 200) {
          this.issuerData = response.data.orders
        }
      })
    },
    async prepareData() {
      this.allNumShares = 0;
      for (let i = 0; i < this.issuerData.length; i++) {
        await this.axios.get(PREFIX + "/users/" + this.issuerData[i].userId).then(response => {
          if (response.status === 200) {
            const userInfo = response.data.user;
            const infoObj = {
              username: userInfo.username,
              email: userInfo.email,
              role: userInfo.role,
              numberOfShares: this.issuerData[i].numberOfShares,
              isConfirmed: this.issuerData[i].isConfirmed,
              placedAt: this.issuerData[i].placedAt,
              closedAt: this.issuerData[i].closedAt
            }
            this.allNumShares += this.issuerData[i].numberOfShares

            this.finishData.push(infoObj)
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>