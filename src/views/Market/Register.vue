<template>
  <div class="register content p-3">
    <div class="card mb-3">
      <div class="card-header">
        <p class="card-title">Тіркелу</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="role">Рөлді таңдау</label>
          <select v-model="form.role" class="form-control" name="role" id="role">
            <option :value="null">Рөлді таңдаңыз</option>
            <option value="company">Компания-эмитент</option>
            <option value="broker">Брокер</option>
            <option value="dealer">Дилер</option>
          </select>
        </div>

        <div class="callout callout-warning" v-show="form.role === 'company'">
          <h5>Компания-эмитент</h5>
          <p>Компания эмитент - өз қызметін дамыту және қаржыландыру үшін бағалы қағаздарды шығарған (шығарған) ұйым; электрондық құрылғыны немесе басқа арнайы құралды (микросұлба, чип, бағдарлама және т.б.) әзірлеген және шығарған заңды тұлға</p>
        </div>

        <div class="callout callout-warning" v-show="form.role === 'broker'">
          <h5>Брокер</h5>
          <p>Брокер — инвестор мен бағалы қағаздар биржасы арасында делдал қызметін атқаратын жеке немесе заңды тұлға. Бағалы қағаздар биржалары тек сол биржаның мүшелері болып табылатын жеке тұлғалардың немесе фирмалардың тапсырыстарын қабылдайтындықтан, жеке трейдерлер мен инвесторлар биржа мүшелерінің қызметтерін қажет етеді. Брокерлер бұл қызметті ұсынады және комиссиялар, алымдар немесе биржаның өзі арқылы әртүрлі тәсілдермен өтеледі. Investopedia барлық үздік брокерлерді үнемі қарастырады және инвесторларға қай брокер өздеріне қолайлы екенін анықтауға көмектесу үшін ең жақсы онлайн брокерлер мен сауда платформаларының тізімін жасайды.</p>
        </div>

        <div class="callout callout-warning" v-show="form.role === 'dealer'">
          <h5>Дилер</h5>
          <p>Дилеры - брокер арқылы немесе басқа жолмен болсын, өз шотына бағалы қағаздарды сатып алатын және сататын тұлға немесе фирма. Дилер өз клиенттерінің атынан тапсырыстарды орындайтын агент ретінде әрекет ететін брокерге қарағанда, өз шотындағы сауда-саттықта принципал ретінде әрекет етеді.</p>
        </div>
        
      </div>
    </div>
    
    <div class="card" v-show="form.role === 'company'">
      <div class="card-header">
        <p class="card-title">Компания</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="name">Компании аты</label>
          <input v-model="form.name" type="text" name="name" id="name" class="form-control" required>
          <small class="form-text text-muted">Сіздің эмитент компанияңыздың атауы</small>
        </div>
        <div class="form-group">
          <label for="description">Компания сипаттамасы</label>
          <textarea class="form-control" v-model="form.description" name="description" id="description" cols="30" rows="3" required></textarea>
          <small class="form-text text-muted">Сіздің эмитент компанияңыздың сипаттамасы</small>
        </div>
        <div class="form-group">
          <label for="sector">Сектор</label>
          <select v-model="form.sector" class="form-control" name="sector" id="sector" required>
            <option value="28">Ақпараттық технологиялар</option>
            <option value="13">Денсаулық сақтау</option>
            <option value="12">Тұтынушының қалауы</option>
            <option value="11">Қаржы</option>
            <option value="10">Байланыс қызметтері</option>
            <option value="8">Индустриялық</option>
            <option value="6">Тұтыну тауарлары</option>
            <option value="4">Энергия</option>
            <option value="3">Меншік</option>
            <option value="2">Материалдар</option>
            <option value="1">Утилиталар</option>
          </select>
          <small class="form-text text-muted">Сектор - бұл компаниялар бірдей немесе байланысты әрекеттерді, өнімдерді немесе қызметтерді бөлісетін экономика саласы.</small>
        </div>
        <div class="form-group">
          <label for="name">Қызметкерлер саны</label>
          <input v-model="form.employees" type="number" min="1" name="employees" id="employees" class="form-control" required>
          <small class="form-text text-muted">Сіздің компанияңыздағы қызметкерлер саны</small>
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
          <small class="form-text text-muted">Комиссия – брокер немесе инвестициялық кеңесші инвестициялық кеңес беру немесе клиент үшін бағалы қағаздарды сатып алу және сатуды өңдеу үшін алатын қызмет ақысы.</small>
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
          <small class="form-text text-muted">Комиссия – брокер немесе инвестициялық кеңесші инвестициялық кеңес беру немесе клиент үшін бағалы қағаздарды сатып алу және сатуды өңдеу үшін алатын қызмет ақысы.</small>
        </div>
      </div>
    </div>

    <button class="btn btn-success" v-if="form.role != null" @click="submit">Тіркелу</button>
    
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
        commission: 13
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
          
          if (response.data.company) {
            this.$store.commit('setCompany', response.data)
          }
          
          this.$notify({ type: 'success', title: 'Добро пожаловать!', text: 'Вы успешно зарегистрировались!' })
          this.$router.push({ name: 'Index' })
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