<template>
  <div class="content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Акциялар қозғалысы</p>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>#</th>
            <th>Акция</th>
            <th>Сатушы</th>
            <th>Сатып алушы</th>
            <th>Мерзімі</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="movement in movements" :key="movement.id">
            <td>{{ movement.id }}</td>
            <td>{{ movement.stock?.quote?.symbol }}</td>
            <td>{{ movement.from?.username }}</td>
            <td>{{ movement.to?.username }}</td>
            <td>{{ movement.movedAt }}</td>
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
      movements: {}
    }
  },
  methods: {
    async getMovements() {
      await this.axios.get(PREFIX + "/movements").then(response => {
        if (response.status === 200) {
          this.movements = response.data.movements
        }
      })
    }
  },
  mounted() {
    this.getMovements()
  }
}
</script>

<style scoped>

</style>