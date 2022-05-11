<script>
import {PREFIX} from "@/api";

export default {
  name: "Profile",
  data() {
    return {
      company: {},
      current: {},
      form: {
        symbol: '',
        assets: '',
        numberOfShares: '',

      },
      amount: 0,
      snapshots: {},
      chart: {
        options: null,
        series: null,
        show: false
      },
      order: {
        quoteId: null,
        numberOfShares: null,
        type: 0,
        brokerId: null
      },
      brokers: {},
      stocksCount: 0
    }
  },
  methods: {
    async getCompany() {
      await this.axios.get(PREFIX + "/companies/" + this.$route.params.id).then(response => {
        if (response.status === 200) {
          this.company = response.data.company
          this.company.quote = response.data.quote
          this.snapshots = response.data.snapshots
          this.stocksCount = response.data.stocks
          
          if (this.company.quote) {
            this.chart.options = {
              chart: {
                type: 'candlestick',
                height: 350
              },
              title: {
                text: this.company?.name + " - " + this.company?.quote?.symbol,
                align: 'left'
              },
              xaxis: {
                type: 'datetime'
              },
              yaxis: {
                tooltip: {
                  enabled: true
                }
              }
            }

            const quote = this.company?.quote
            let data = []

            data.push({
              x: new Date(Date.parse(this.company?.quote?.createdAt)),
              y: [quote.open, quote.high, quote.low, quote.close]
            })
            
            if (this.snapshots) {
              for (const snapshot of this.snapshots) {
                data.push({
                  x: Date.parse(snapshot.date),
                  y: [snapshot.open, snapshot.high, snapshot.low, snapshot.close]
                })
              }
            }

            
            
            this.chart.series = [{
              data: data
            }]
            
            this.chart.show = true
          }
          
        }
      })
    },
    async updateCompany() {
      await this.axios.put(PREFIX + "/companies/" + this.$route.params.id, this.company).then(response => {
        if (response.status === 200) {
          this.$notify({
            type: "success",
            title: "Сәтті өзгертілді!"
          })
        }
      })
    },
    async getUser() {
      await this.axios.get(PREFIX + "/users/" + this.$store.state.user.id).then(response => {
        if (response.status === 200) {
          this.current = response.data
        }
      })
    },
    async makeIpo() {
      await this.axios.post(PREFIX + "/market/ipo", this.form).then(response => {
        if (response.status === 200) {
          this.$router.push({ name: "Quotes" })
        }
      })
    },
    async placeOrder() {
      this.order.quoteId = this.company?.quote?.id
      
      if (this.$store.state.user.role === 'dealer')
        this.order.brokerId = this.$store.state.user.id
      
      await this.axios.post(PREFIX + "/market/" + this.company?.quote?.id + "/order", this.order).then(response => {
        if (response.status === 200) {
          const order = response.data.order
          
          if (response.data?.sale === true) {
            this.$router.go(0)
            this.$notify({
              type: "success",
              title: "Акциялар сатылымға сәтті қойылды"
            })
          }
          
          this.$router.push({ name: 'ConfirmOrder', params: { id: order.id } })
        }
      })
    },
    async getBrokers() {
      await this.axios.get(PREFIX + "/users/brokers").then(response => {
        if (response.status === 200) {
          this.brokers = response.data
        }
      })
    }
  },
  mounted() {
    this.getCompany()
    this.getUser()
    this.getBrokers()
  },
  computed: {
    user() { return this.$store.state.user }
  },
}
</script>

<template>
  <div class="profile content p-3">
    <div class="card" v-if="company">
      <div class="card-header">
        <p class="card-title">Компания-эмитент - <strong>{{ company.name }}</strong></p>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateCompany">
          <div class="form-group">
            <label>Аты</label>
            <input type="text" :readonly="company.id !== user.companyId" v-model="company.name" class="form-control">
          </div>
          <div class="form-group">
            <label>Сипаттамасы</label>
            <input type="text" :readonly="company.id !== user.companyId" v-model="company.description" class="form-control">
          </div>
          <div class="form-group">
            <label>Жұмысшылар саны</label>
            <input type="text" :readonly="company.id !== user.companyId" v-model="company.employees" class="form-control">
          </div>
          <button  v-show="company.id === user.companyId" class="btn btn-success">Сақтау</button>
        </form>
      </div>
    </div>

    <div class="card" v-show="company.id !== user.companyId && user.role !== 'broker' && company.quote">
      <div class="card-header">
        <p class="card-title">Акцияны сатып алу/сату</p>
      </div>
      <div class="card-body">
        <form @submit.prevent="placeOrder">
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label>Әрекет</label>
                <select v-model="order.type" class="form-control">
                  <option :value="0">Сатып алу</option>
                  <option :value="1">Сату</option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label>Акция саны</label>
                <input type="number" min="1" v-model="order.numberOfShares" :max="company?.quote?.inTradeNumberOfShares" class="form-control">
                <small class="form-text text-muted">Акциялар саны: {{ company?.quote?.inTradeNumberOfShares }}. Сіздің акцияларыңыз: {{ stocksCount }}</small>
              </div>
            </div>
            <div class="col-12">
              <div v-if="user.role === 'company'" class="form-group">
                <label>Брокер</label>
                <select v-model="order.brokerId" class="form-control">
                  <option :value="null">Брокерді таңдаңыз</option>
                  <option :value="broker.id" v-for="broker in brokers" :key="broker.id">
                    {{ broker.username }} - Комиссия: {{ broker.commission }}%
                  </option>
                </select>
              </div>
            </div>
          </div>
          <button class="btn btn-success">Тапсырыс беру</button>
        </form>
      </div>
    </div>
    
    <div class="card" v-if="!company.quote">
      <div class="card-header">
        <p class="card-title">Эмитент-компанияның акциясы</p>
      </div>
      <div class="card-body text-center">
        <h3 class="text-red">Эмитент-компания акция шығарған жоқ!</h3>
      </div>
    </div>
    <div class="card" v-else>
      <div class="card-header">
        <p class="card-title">Эмитент-компанияның акциясы</p>
      </div>
      <div class="card-body">
        <h3>{{ company.name }} - {{ company.quote?.symbol }}</h3>
        <div id="chart">
          <apexchart v-if="this.chart.show" type="candlestick" height="350" :options="this.chart.options" :series="this.chart.series"></apexchart>
        </div>
      </div>
    </div>
    
    <div class="card mb-2" v-if="company.id === user.companyId && !company.quote">
      <div class="card-header">
        <p class="card-title">Initial Public Offering</p>
      </div>
      <div class="card-body">
        <form @submit.prevent="makeIpo">
          <div class="callout callout-warning">
            <h5>IPO</h5>
            <p>Алғашқы жария орналастыру (IPO) жеке корпорацияның акцияларын жаңа акциялар шығарылымында халыққа ұсыну процесін білдіреді. IPO компанияға мемлекеттік инвесторлардан капитал тартуға мүмкіндік береді. Жеке компаниядан мемлекеттік компанияға көшу жеке инвесторлар үшін өз инвестицияларының қайтарымдылығын толықтай жүзеге асыру үшін маңызды уақыт болуы мүмкін, өйткені ол әдетте ағымдағы жеке инвесторлар үшін акциялардың сыйақысын қамтиды. Сонымен қатар, ол мемлекеттік инвесторларға ұсынысқа қатысуға мүмкіндік береді.</p>
          </div>
          <div class="form-group">
            <label>Символ</label>
            <input type="text" v-model="form.symbol" class="form-control">
          </div>
          <div class="form-group">
            <label>Бөлінген сома</label>
            <input max="3000000" v-model="form.assets" type="number" class="form-control">
            <small class="form-text text-muted">Қолжетімді сома: {{ current.account?.amount }}. <span style="color: red">Шекті сома: 3000000</span></small>
          </div>
          <div class="form-group">
            <label>Акциялар саны</label>
            <input v-model="form.numberOfShares" type="number" min="100" class="form-control">
          </div>
          <button type="submit" class="btn btn-success">Сақтау</button>
        </form>
      </div>
    </div>
  </div>
</template>



<style scoped>

</style>