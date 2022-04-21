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
      }
    }
  },
  methods: {
    async getCompany() {
      await this.axios.get(PREFIX + "/companies/" + this.$route.params.id).then(response => {
        if (response.status === 200) {
          this.company = response.data.company
          this.company.quote = response.data.quote
          this.snapshots = response.data.snapshots
          
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
                  x: new Date(Date.parse(snapshot.date)),
                  y: [snapshot.open, snapshot.high, snapshot.low, snapshot.close]
                })
              }
            }

            this.chart.series = [{
              data: [{
                x: new Date(1538778600000),
                y: [6629.81, 6650.5, 6623.04, 6633.33]
              },
                {
                  x: new Date(1538780400000),
                  y: [6632.01, 6643.59, 6620, 6630.11]
                },
                {
                  x: new Date(1538782200000),
                  y: [6630.71, 6648.95, 6623.34, 6635.65]
                },
                {
                  x: new Date(1538784000000),
                  y: [6635.65, 6651, 6629.67, 6638.24]
                },
                {
                  x: new Date(1538785800000),
                  y: [6638.24, 6640, 6620, 6624.47]
                },
                {
                  x: new Date(1538787600000),
                  y: [6624.53, 6636.03, 6621.68, 6624.31]
                },
                {
                  x: new Date(1538789400000),
                  y: [6624.61, 6632.2, 6617, 6626.02]
                },
                {
                  x: new Date(1538791200000),
                  y: [6627, 6627.62, 6584.22, 6603.02]
                },
                {
                  x: new Date(1538793000000),
                  y: [6605, 6608.03, 6598.95, 6604.01]
                },
                {
                  x: new Date(1538794800000),
                  y: [6604.5, 6614.4, 6602.26, 6608.02]
                },
                {
                  x: new Date(1538796600000),
                  y: [6608.02, 6610.68, 6601.99, 6608.91]
                },
                {
                  x: new Date(1538798400000),
                  y: [6608.91, 6618.99, 6608.01, 6612]
                },
                {
                  x: new Date(1538800200000),
                  y: [6612, 6615.13, 6605.09, 6612]
                },
                {
                  x: new Date(1538802000000),
                  y: [6612, 6624.12, 6608.43, 6622.95]
                },
                {
                  x: new Date(1538803800000),
                  y: [6623.91, 6623.91, 6615, 6615.67]
                },
                {
                  x: new Date(1538805600000),
                  y: [6618.69, 6618.74, 6610, 6610.4]
                },
                {
                  x: new Date(1538807400000),
                  y: [6611, 6622.78, 6610.4, 6614.9]
                },
                {
                  x: new Date(1538809200000),
                  y: [6614.9, 6626.2, 6613.33, 6623.45]
                },
                {
                  x: new Date(1538811000000),
                  y: [6623.48, 6627, 6618.38, 6620.35]
                },
                {
                  x: new Date(1538812800000),
                  y: [6619.43, 6620.35, 6610.05, 6615.53]
                },
                {
                  x: new Date(1538814600000),
                  y: [6615.53, 6617.93, 6610, 6615.19]
                },
                {
                  x: new Date(1538816400000),
                  y: [6615.19, 6621.6, 6608.2, 6620]
                },
                {
                  x: new Date(1538818200000),
                  y: [6619.54, 6625.17, 6614.15, 6620]
                },
                {
                  x: new Date(1538820000000),
                  y: [6620.33, 6634.15, 6617.24, 6624.61]
                },
                {
                  x: new Date(1538821800000),
                  y: [6625.95, 6626, 6611.66, 6617.58]
                },
                {
                  x: new Date(1538823600000),
                  y: [6619, 6625.97, 6595.27, 6598.86]
                },
                {
                  x: new Date(1538825400000),
                  y: [6598.86, 6598.88, 6570, 6587.16]
                },
                {
                  x: new Date(1538827200000),
                  y: [6588.86, 6600, 6580, 6593.4]
                },
                {
                  x: new Date(1538829000000),
                  y: [6593.99, 6598.89, 6585, 6587.81]
                },
                {
                  x: new Date(1538830800000),
                  y: [6587.81, 6592.73, 6567.14, 6578]
                },
                {
                  x: new Date(1538832600000),
                  y: [6578.35, 6581.72, 6567.39, 6579]
                },
                {
                  x: new Date(1538834400000),
                  y: [6579.38, 6580.92, 6566.77, 6575.96]
                },
                {
                  x: new Date(1538836200000),
                  y: [6575.96, 6589, 6571.77, 6588.92]
                },
                {
                  x: new Date(1538838000000),
                  y: [6588.92, 6594, 6577.55, 6589.22]
                },
                {
                  x: new Date(1538839800000),
                  y: [6589.3, 6598.89, 6589.1, 6596.08]
                },
                {
                  x: new Date(1538841600000),
                  y: [6597.5, 6600, 6588.39, 6596.25]
                },
                {
                  x: new Date(1538843400000),
                  y: [6598.03, 6600, 6588.73, 6595.97]
                },
                {
                  x: new Date(1538845200000),
                  y: [6595.97, 6602.01, 6588.17, 6602]
                },
                {
                  x: new Date(1538847000000),
                  y: [6602, 6607, 6596.51, 6599.95]
                },
                {
                  x: new Date(1538848800000),
                  y: [6600.63, 6601.21, 6590.39, 6591.02]
                },
                {
                  x: new Date(1538850600000),
                  y: [6591.02, 6603.08, 6591, 6591]
                },
                {
                  x: new Date(1538852400000),
                  y: [6591, 6601.32, 6585, 6592]
                },
                {
                  x: new Date(1538854200000),
                  y: [6593.13, 6596.01, 6590, 6593.34]
                },
                {
                  x: new Date(1538856000000),
                  y: [6593.34, 6604.76, 6582.63, 6593.86]
                },
                {
                  x: new Date(1538857800000),
                  y: [6593.86, 6604.28, 6586.57, 6600.01]
                },
                {
                  x: new Date(1538859600000),
                  y: [6601.81, 6603.21, 6592.78, 6596.25]
                },
                {
                  x: new Date(1538861400000),
                  y: [6596.25, 6604.2, 6590, 6602.99]
                },
                {
                  x: new Date(1538863200000),
                  y: [6602.99, 6606, 6584.99, 6587.81]
                },
                {
                  x: new Date(1538865000000),
                  y: [6587.81, 6595, 6583.27, 6591.96]
                },
                {
                  x: new Date(1538866800000),
                  y: [6591.97, 6596.07, 6585, 6588.39]
                },
                {
                  x: new Date(1538868600000),
                  y: [6587.6, 6598.21, 6587.6, 6594.27]
                },
                {
                  x: new Date(1538870400000),
                  y: [6596.44, 6601, 6590, 6596.55]
                },
                {
                  x: new Date(1538872200000),
                  y: [6598.91, 6605, 6596.61, 6600.02]
                },
                {
                  x: new Date(1538874000000),
                  y: [6600.55, 6605, 6589.14, 6593.01]
                },
                {
                  x: new Date(1538875800000),
                  y: [6593.15, 6605, 6592, 6603.06]
                },
                {
                  x: new Date(1538877600000),
                  y: [6603.07, 6604.5, 6599.09, 6603.89]
                },
                {
                  x: new Date(1538879400000),
                  y: [6604.44, 6604.44, 6600, 6603.5]
                },
                {
                  x: new Date(1538881200000),
                  y: [6603.5, 6603.99, 6597.5, 6603.86]
                },
                {
                  x: new Date(1538883000000),
                  y: [6603.85, 6605, 6600, 6604.07]
                },
                {
                  x: new Date(1538884800000),
                  y: [6604.98, 6606, 6604.07, 6606]
                },
              ]
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
          this.$router.go()
        }
      })
    }
  },
  mounted() {
    this.getCompany()
    this.getUser()
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
            <label>Название</label>
            <input type="text" :readonly="company.id !== user.companyId" v-model="company.name" class="form-control">
          </div>
          <div class="form-group">
            <label>Описание</label>
            <input type="text" :readonly="company.id !== user.companyId" v-model="company.description" class="form-control">
          </div>
          <div class="form-group">
            <label>Количество сотрудников</label>
            <input type="text" :readonly="company.id !== user.companyId" v-model="company.employees" class="form-control">
          </div>
          <button  v-show="company.id === user.companyId" class="btn btn-success">Сақтау</button>
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
    
    <div class="card">
      <div class="card-header">
        <p class="card-title">Акцияны сатып алу/сату</p>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label>Әрекет</label>
              <select name="" class="form-control">
                <option value="">Сатып алу</option>
                <option value="">Сату</option>
              </select>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label>Акция саны</label>
              <input type="number" class="form-control">
              <small class="form-text text-muted">Акциялар саны: 561</small>
            </div>
          </div>
        </div>
        <button class="btn btn-success">Орындау</button>
      </div>
    </div>
    
    
  </div>
</template>



<style scoped>

</style>