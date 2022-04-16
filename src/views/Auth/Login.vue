<template>
  <div class="login-page">
    <div class="card card-outline card-orange" style="min-width: 360px">
      <div class="card-header text-center">
        <router-link :to="{ name: 'Login' }" class="h1"><b>Game</b>Stock</router-link>
      </div>
      <div class="card-body">
        <form @submit.prevent="submit">
          <div class="input-group mb-3">
            <input type="email" v-model="form.email" class="form-control" placeholder="Электронды пошта">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input type="password" v-model="form.password" class="form-control" placeholder="Құпия сөз">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="submit" class="btn btn-primary btn-block">Кіру</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {PREFIX} from "@/api";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: null,
        password: null
      },
    }
  },
  methods: {
    async submit() {
      await this.axios.post(PREFIX + "/auth/login", this.form).then(response => {
        if (response.status === 200) {
          console.log(response.data)
          this.$store.commit('setToken', response.data.token)
          this.$store.commit('setUser', response.data)
          this.$notify({ type: 'success', title: 'Қош келдіңіз!', text: 'Сіз аккаунтқа сәтті кірдіңіз!' })
          this.$router.push({ name: 'Index' })
        }
      }).catch(response => console.log(response))
    },
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>