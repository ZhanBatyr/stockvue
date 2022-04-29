<template>
  <div class="content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Кредит алу</p>
      </div>
      <div class="card-body">
        <form @submit.prevent="submit">
          <div class="form-group">
            <label>Сомма</label>
            <input type="number" min="1000" class="form-control" name="amount" v-model="form.amount">
          </div>
          <div class="form-group">
            <label>Периодтар</label>
            <input type="number" min="3" class="form-control" name="periods" v-model="form.periods">
          </div>
          <div class="form-group">
            <label>Процент</label>
            <input type="number" class="form-control" readonly name="percent" v-model="form.percent">
          </div>
          <button class="btn btn-success">Кредит алу</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {PREFIX} from "@/api";

export default {
  name: "Credit",
  data() {
    return {
      form: {
        userId: null,
        amount: null,
        periods: null,
        percent: 13
      }
    }
  },
  methods: {
    async submit() {
      await this.axios.post(PREFIX + "/credits", this.form).then(response => {
        if (response.status === 200) {
          this.$router.push({ name: 'Credits' })
        }
      })
    }
  },
  mounted() {
    this.form.userId = this.$store.state.user.id
  }
}
</script>

<style scoped>

</style>