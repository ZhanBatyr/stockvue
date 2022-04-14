<template>
  <div class="login-page">
    <div class="card card-outline card-orange" style="min-width: 360px">
      <div class="card-header text-center">
        <router-link :to="{ name: 'Login' }" class="h1"><b>Stock</b>App</router-link>
      </div>
      <div class="card-body">
        <form @submit.prevent="submit">
          <div class="input-group mb-3">
            <input type="email" v-model="form.email" class="form-control" placeholder="Почта">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input type="password" v-model="form.password" class="form-control" placeholder="Пароль">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="submit" class="btn btn-primary btn-block">Войти</button>
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
          this.$store.commit('setToken', response.data.token)
          this.$store.commit('setUser', response.data)
          this.$notify({ type: 'success', title: 'Добро пожаловать!', text: 'Вы успешно вошли в аккаунт!' })
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