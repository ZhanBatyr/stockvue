<template>
  <div class="profile content p-3">
    <div class="card" v-if="company">
      <div class="card-header">
        <p class="card-title">Компания-эмитент - <strong>{{ company.name }}</strong></p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Название</label>
          <input type="text" readonly v-model="company.name" class="form-control">
        </div>
        <div class="form-group">
          <label>Описание</label>
          <input type="text" readonly v-model="company.description" class="form-control">
        </div>
        <div class="form-group">
          <label>Количество сотрудников</label>
          <input type="text" readonly v-model="company.employees" class="form-control">
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <p class="card-title"><strong>{{ company.name }}</strong> - Компания акциясы туралы</p>
      </div>
      <div class="card-body">
        <h3 style="color: red">У компании-эмитента еще нет размещенных акции!</h3>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <p class="card-title">Initial Public Offering</p>
      </div>
      <div class="card-body">
        <div class="callout callout-warning">
          <h5>IPO</h5>
          <p>Первичное публичное предложение (IPO) относится к процессу предложения акций частной корпорации населению при новом выпуске акций. IPO позволяет компании привлечь капитал от публичных инвесторов. Переход от частной компании к публичной может быть важным моментом для частных инвесторов, чтобы полностью реализовать прибыль от своих инвестиций, поскольку он обычно включает эмиссионный доход для нынешних частных инвесторов. Между тем, он также позволяет публичным инвесторам участвовать в размещении.</p>
        </div>
        <div class="form-group">
          <label>Символ</label>
          <input type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>Выделенная сумма</label>
          <input type="text" class="form-control">
          <small class="form-text text-muted">Доступная сумма: 10 000 000. <span style="color: red">Пороговая сумма: 3 000 000</span></small>
        </div>
        <div class="form-group">
          <label>Количество акции</label>
          <input type="text" class="form-control">
        </div>
        <button class="btn btn-success">Продолжить</button>
      </div>
    </div>
  </div>
</template>

<script>
import {PREFIX} from "@/api";

export default {
  name: "Profile",
  data() {
    return {
      company: {}
    }
  },
  methods: {
    async getCompany() {
      await this.axios.get(PREFIX + "/companies/" + this.$route.params.id).then(response => {
        if (response.status === 200) {
          this.company = response.data.company
        }
      })
    }
  },
  mounted() {
    this.getCompany()
  }
}
</script>

<style scoped>

</style>