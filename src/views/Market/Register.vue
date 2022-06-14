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
            <option value="registrar">Регистратор</option>
            <option value="clearing">Клиринг</option>
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

        <div class="callout callout-warning" v-show="form.role === 'clearing'">
          <h5>Клиринг</h5>
          <p>Клиринг – қаржылық мәмілелерді реттеу процедурасы; яғни сатушыға ақша қаражатын және сатып алушыға бағалы қағаздарды дұрыс және уақтылы беру. Көбінесе клиринг кезінде мамандандырылған ұйым делдал ретінде әрекет етеді және мәміле жасайтын тараптар арасындағы тапсырыстарды келісу үшін үнсіз сатып алушы мен сатушы рөлін алады. Клиринг нарықтағы барлық сатып алу және сату тапсырыстарын сәйкестендіру үшін қажет. Ол біркелкі және тиімдірек нарықтарды қамтамасыз етеді, өйткені тараптар мәмілелер жасайтын әрбір жеке тарапқа емес, клирингтік корпорацияға аударымдар жасай алады.</p>
        </div>


        <div class="callout callout-warning" v-show="form.role === 'registrar'">
          <h5>Регистратор</h5>
          <p>Тіркеуші (тізілім жүргізушісі) эмитенттің нұсқауы бойынша эмитенттің бағалы қағаздарының иелерінің есебін (тізілімін) жүргізеді.</p>
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
          <select v-model="form.sectorId" class="form-control" name="sector" id="sector" required>
            <option :value="null">Сектор таңдаңыз</option>
            <option v-for="sector in sectors" :key="sector.id" :value="sector.id">{{ sector.name }}</option>
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

    <div class="card" v-show="form.role === 'registrar'">
      <div class="card-header">
        <p class="card-title">Тіркеуші</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Коммиссия (фиксированная) ₸</label>
          <input v-model="form.commission" type="number" min="1" name="commission" class="form-control" required>
          <small class="form-text text-muted">тіркеуші мәміле тараптарынан аударымдық өкімдердің санымен айқындалатын
            және барлық заңды және жеке тұлғалар үшін бірдей, бірақ <strong>мәміле көлемінен пайызбен алуға болмайтын </strong>
            алым алуға құқылы</small>
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
        sectorId: 1,
        employees: 1,
        commission: 13
      },
      sectors: {}
    }
  },
  methods: {
    async submit() {
      console.log(PREFIX)
      await this.axios.post(PREFIX + "/market/register", this.form).then(response => {
        if (response.status === 200) {
          console.log(response.data)
          this.$store.commit('setUser', response.data)
          
          if (response.data.company) {
            this.$store.commit('setCompany', response.data)
          }
          
          // this.$notify({ type: 'success', title: 'Добро пожаловать!', text: 'Вы успешно зарегистрировались!' })
          this.$router.push({ name: 'Index' })
        }
      }).catch(error => console.log(error))
    },
    async get() {
      await this.axios.get(PREFIX + "/sectors").then(response => {
        if (response.status === 200) {
          this.sectors = response.data
          this.form.sectorId = this.sectors[0].id
        }
      })
    }
  },
  mounted() {
    this.get()
  }
}
</script>

<style scoped>

</style>