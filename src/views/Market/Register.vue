<template>
  <div class="register content p-3">
    <div class="card mb-3">
      <div class="card-header">
        <p class="card-title">Регистрация</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="role">Выберите роль</label>
          <select v-model="form.role" class="form-control" name="role" id="role">
            <option :value="null">Выберите роль</option>
            <option value="company">Компания-эмитент</option>
            <option value="broker">Брокер</option>
            <option value="dealer">Дилер</option>
            <option value="registrar">Регистратор</option>
          </select>
        </div>

        <div class="callout callout-warning" v-show="form.role === 'company'">
          <h5>Компания-эмитент</h5>
          <p>Компания эмитент - это организация, выпустившая (эмитировавшая) ценные бумаги для развития и финансирования своей деятельности; юридическое лицо, разработавшее и выпустившее электронное устройство или другое специальное средство (микросхему, чип, программу и т.п.)</p>
        </div>

        <div class="callout callout-warning" v-show="form.role === 'broker'">
          <h5>Брокер</h5>
          <p>Брокер — это физическое или юридическое лицо, выступающее в качестве посредника между инвестором и биржей ценных бумаг. Поскольку биржи ценных бумаг принимают заказы только от частных лиц или фирм, которые являются членами этой биржи, индивидуальные трейдеры и инвесторы нуждаются в услугах членов биржи. Брокеры предоставляют эту услугу и получают компенсацию различными способами, либо в виде комиссий, сборов, либо за счет самой биржи. Investopedia регулярно проводит обзоры всех ведущих брокеров и составляет список лучших онлайн-брокеров и торговых платформ, чтобы помочь инвесторам принять решение о том, какой брокер лучше всего подходит для них.</p>
        </div>

        <div class="callout callout-warning" v-show="form.role === 'dealer'">
          <h5>Дилер</h5>
          <p>Дилеры — это люди или фирмы, которые покупают и продают ценные бумаги за свой счет, будь то через брокера или иным образом. Дилер действует как принципал в торговле за свой счет, в отличие от брокера, который действует как агент, выполняющий заказы от имени своих клиентов.</p>
        </div>

        <div class="callout callout-warning" v-show="form.role === 'registrar'">
          <h5>Регистратор</h5>
          <p>Регистратор — это (держатель реестра) по заданию эмитента ведет учет(реестр) владельцев ценных бумаг эмитента.</p>
        </div>
        
      </div>
    </div>
    
    <div class="card" v-show="form.role === 'company'">
      <div class="card-header">
        <p class="card-title">Компания</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="name">Название компании</label>
          <input v-model="form.name" type="text" name="name" id="name" class="form-control" required>
          <small class="form-text text-muted">Название вашей компании-эмитента</small>
        </div>
        <div class="form-group">
          <label for="description">Описание компании</label>
          <textarea class="form-control" v-model="form.description" name="description" id="description" cols="30" rows="3" required></textarea>
          <small class="form-text text-muted">Описание вашей компании-эмитента</small>
        </div>
        <div class="form-group">
          <label for="sector">Сектор</label>
          <select v-model="form.sector" class="form-control" name="sector" id="sector" required>
            <option value="28">Информационные технологии</option>
            <option value="13">Здравохранение</option>
            <option value="12">Потребительская дискреция</option>
            <option value="11">Финансы</option>
            <option value="10">Коммуникационные услуги</option>
            <option value="8">Индустрияльные</option>
            <option value="6">Потребительские товары</option>
            <option value="4">Энергия</option>
            <option value="3">Недвижимость</option>
            <option value="2">Материалы</option>
            <option value="1">Утилиты</option>
          </select>
          <small class="form-text text-muted">Сектор — область экономики, в которой компании совместно используют один и тот же или родственные виды деятельности, продукты или услуги.</small>
        </div>
        <div class="form-group">
          <label for="name">Количество сотрудников</label>
          <input v-model="form.employees" type="number" min="1" name="employees" id="employees" class="form-control" required>
          <small class="form-text text-muted">Количество сотрудников в вашей компании</small>
        </div>
      </div>
    </div>

    <div class="card" v-show="form.role === 'broker'">
      <div class="card-header">
        <p class="card-title">Брокер</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Коммиссия %</label>
          <input v-model="form.commission" type="number" min="1" name="commission" class="form-control" required>
          <small class="form-text text-muted">Комиссия — это сервисный сбор, взимаемый брокером или инвестиционным консультантом за предоставление инвестиционного совета или обработку операций по покупке и продаже ценных бумаг для клиента.</small>
        </div>
      </div>
    </div>

    <div class="card" v-show="form.role === 'dealer'">
      <div class="card-header">
        <p class="card-title">Дилер</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Коммиссия %</label>
          <input v-model="form.commission" type="number" min="1" name="commission" class="form-control" required>
          <small class="form-text text-muted">Комиссия — это сервисный сбор, взимаемый брокером или инвестиционным консультантом за предоставление инвестиционного совета или обработку операций по покупке и продаже ценных бумаг для клиента.</small>
        </div>
      </div>
    </div>

    <div class="card" v-show="form.role === 'registrar'">
      <div class="card-header">
        <p class="card-title">Регистратор</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Коммиссия (фиксированная) ₸</label>
          <input v-model="form.commission" type="number" min="1" name="commission" class="form-control" required>
          <small class="form-text text-muted">Комиссия(фиксированная) — держатель реестра имеет право взимать со сторон по сделке плату, которая определяется числом распоряжений о передаче прав и одинакова для всех юридических и физических лиц, <strong>но не может назначаться в виде процента от объема операции</strong>.</small>
        </div>
      </div>
    </div>

    <button class="btn btn-success" v-if="form.role != null" @click="submit">Продолжить</button>
    
  </div>
</template>

<script>
import {PREFIX} from "@/api";

export default {
  name: "Register",
  data() {
    return {
      form: {
        role: null,
        name: '',
        description: '',
        sector: 28,
        employees: 1,
        commission: 0
      }
    }
  },
  methods: {
    async submit() {
      this.form.sector = parseInt(this.form.sector)

      await this.axios.post(PREFIX + "/market/register", this.form).then(response => {
        console.log(response.data)
        if (response.status === 200) {
          this.$store.commit('setUser', response.data)
          this.$notify({ type: 'success', title: 'Добро пожаловать!', text: 'Вы успешно зарегистрировались!' })
          if (this.$store.state.user.role === 'registrar') {
            this.$router.push({ name: 'panelForRegistrar' })
          } else {
            this.$router.push({ name: 'Index' })
          }
        }
      }).catch(error => console.log(error))
    }
  },
  mounted() {
    console.log(this.$store.state.user)
  }
}
</script>

<style scoped>

</style>