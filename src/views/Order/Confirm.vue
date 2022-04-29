<template>
  <div class="content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">
          Тапсырысты растау
        </p>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <tr>
            <td>Акция</td>
            <td>{{ order?.quote?.symbol }}</td>
          </tr>
          <tr>
            <td>Тип</td>
            <td>{{ order?.type === 0 ? 'Сатып алу' : 'Сату' }}</td>
          </tr>
          <tr>
            <td>Саны</td>
            <td>{{ order?.numberOfShares }}</td>
          </tr>
          <tr>
            <td>Брокер</td>
            <td>{{ order?.broker?.username }}</td>
          </tr>
          <tr>
            <td>Брокер комиссиясы</td>
            <td>{{ order?.broker?.commission }}</td>
          </tr>
          <tr>
            <td>Бір акция бағасы</td>
            <td>{{ order?.quote?.price }}</td>
          </tr>
          <tr>
            <td>Сомма</td>
            <td>
              ~ {{ ((order?.quote?.price * order?.numberOfShares) + order?.quote?.price * order?.numberOfShares * order?.broker?.commission / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  }}
            </td>
          </tr>
        </table>
        <button @click="confirmOrder" class="btn btn-success">Растау</button>
      </div>
    </div>
  </div>
</template>

<script>
import {PREFIX} from "@/api";

export default {
  name: "Confirm",
  data() {
    return {
      order: {}
    }
  },
  methods: {
    async getOrder() {
      await this.axios.get(PREFIX + "/orders/" + this.$route.params.id).then(response => {
        if (response.status === 200) {
          this.order = response.data.order
        }
      })
    },
    async confirmOrder() {
      await this.axios.post(PREFIX + "/market/" + this.order?.id + "/confirm").then(response => {
        if (response.status === 200) {
          this.$router.push({ name: 'Index' })
        }
      })
    }
  },
  mounted() {
    this.getOrder()
  }
}
</script>

<style scoped>

</style>