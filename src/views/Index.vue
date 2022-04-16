<template>
    <div class="main content p-3">
        <div class="row">
          <div class="col-3">
              <div class="card">
                <div class="card-header">
                  <p class="card-title">Шолу</p>
                </div>
                <div class="card-body">
                  <div class="form-group">
                    <label>Қолданушы</label>
                    <input type="text" readonly class="form-control form-control-border" v-model="user.username">
                  </div>
                  <div class="form-group">
                    <label>Рөлі</label>
                    <input type="text" readonly class="form-control form-control-border" v-model="user.role">
                  </div>
                  <div class="form-group">
                    <label>Аккаунт бағасы</label>
                    <input type="text" readonly class="form-control form-control-border" v-model="user.netWorth">
                    <small class="text-form text-muted">тенге</small>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-9">
            <div class="card">
              <div class="card-header">
                <p class="card-title">
                  Аккаунт өзгерісі
                </p>
              </div>
              <div class="card-body">
                
              </div>
            </div>
          </div>
          <div class="col-12" v-if="user.role !== 'broker'">
            <div class="card" >
              <div class="card-header">
                <p class="card-title">
                  Қолданушы бағалы қағаздары
                </p>
              </div>
              <div class="card-body p-0">
                <table class="table table-striped">
                  
                </table>
              </div>
            </div>
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
     user: {}
    }
  },
  mounted() {
   console.log(this.$store.getters.user)
    this.getUser()
  },
  methods: {
    async getUser() {
      await this.axios.get(PREFIX + "/users/" + this.$store.state.user.id).then(response => {
        if(response.status === 200) {
          this.user = response.data.user
        }
      })
    }
  }
}
</script>

<style>

</style>