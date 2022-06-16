<template>
  <div class="companies content p-3">
    <h3 class="m-2">
      Реестр
    </h3>
    <div class="card p-3">
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
          Фильтр
        </button>
        <ul class="dropdown-menu p-3" aria-labelledby="dropdownMenuLink">
          <li>
            <div style="width: 400px; display: flex; flex-direction: column; align-items: flex-start;">
              <div>
                <div><b>Эмитент тикері</b></div>
                <small class="form-text text-muted">Тикер (ағыл. ticker символы) – баға белгіленетін құралдардың
                  (акциялар, облигациялар, индекстер) биржа ақпаратындағы қысқаша атауы.</small>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">#</span>
                  <input type="text" class="form-control" placeholder="Эмитент тикері" aria-label="Ticker"
                         aria-describedby="basic-addon1" v-model="filterTicker">
                </div>
              </div>

              <div>
                <div><b>Эмитент аты</b></div>
                <div class="input-group input-group mb-3">
                  <input type="text" class="form-control" aria-label="Sizing example input"
                         placeholder="Эмитент аты" aria-describedby="inputGroup-sizing-sm" v-model="filterName">
                </div>
              </div>

              <div>
                <label for="sector">Сектор</label>
                <select class="form-control" name="sector" id="sector" v-model="filterSector" required>
                  <option :value="null">Тандамау</option>
                  <option v-for="s in dictSectors" :key="s.id" :value="s.id">{{s.name}}</option>
                </select>
              </div>

            </div>
          </li>
          <li>
            <div class="mt-2 d-flex justify-content-around">
              <button type="button" class="btn btn-danger" @click="resetData">Қалпына келтіру</button>
              <button type="button" class="btn btn-success" @click="findData">Қабылдау</button>
            </div>
          </li>
        </ul>
      </div>
      <div style="display:flex; flex-direction: column; justify-content: space-around; align-items: center"
           class="mt-2">


        <div class="info-box" v-for="i in data" :key="i.id">
<!--          <div>{{i}}</div>-->
          <div class="info-box-content">
            <span class="badge badge-primary" style="width: 100px">{{ i.createdAt.split('T')[0] }}</span>
            <h3>Ticker: {{ i.symbol }}</h3>
            <h2>Название: {{ i.company.name }}</h2>
            <span class="info-box-text">Компания секторы: {{ i.company.sectorName }}</span>
            <span class="info-box-number">Акциялар саны: {{ i.numberOfShares}}</span>
          </div>

          <div class="small-box bg-gradient-success" style="width: 200px">
            <div class="inner">
              <h4>{{ i.buyEmployeesNum }}</h4>
              <p>Қолданушылар бүгін осы реестрға тіркелген</p>
            </div>
            <div class="icon">
              <i class="fas fa-user-plus" style="width: 50px"></i>
            </div>
            <a class="small-box-footer" @click="pushRouter(i.id)">
              Көбірек ақпарат алу <i class="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {PREFIX} from "@/api";

export default {
  name: "Registries",
  data() {
    return {
      dictSectors: [],
      curData: [],
      issuers: [],
      sectors: [],
      data: null,
      filtredData: [],
      filterTicker: null,
      filterName: null,
      filterSector: null
    }
  },
  async created() {
    // this.issuers = this.curData;
    await this.get();
    await this.getData();
    await this.prepareDate();
  },
  methods: {
    async getData() {
      await this.axios.get(PREFIX + "/companies").then(response => {
        if (response.status === 200) {
          this.issuers = response.data.companies
          this.sectors = response.data.sectors
        }
      })
    },
    async prepareDate() {
      this.data = [];
      for (let i = 0; i < this.issuers.length; i++) {
        await this.axios.get(PREFIX + "/companies/" + this.issuers[i].id)
            .then(async response => {
          if (response.status === 200) {
            const curData = response.data.quote
            curData.company.sectorName = this.sectors[i].name;
            await this.axios.get(PREFIX + "/orders/quote/" + curData.id)
                .then(response => {
                  if (response.status === 200) {
                    curData.buyEmployeesNum = response.data.orders.length
                  }
                })

            this.data.push(curData)
            this.curData.push(curData)
          }
        })
      }
    },
    pushRouter(ticker) {
      this.$router.push(`/registries/${ticker}`)
    },
    findData() {
      // const filterSectorName = this.data.find(d => d.company.sectorId === this.filterSector).company.name

      this.filtredData = [];
      this.data = this.curData;
      this.data.forEach(i => {
        if (this.filterSector && i.company.sectorId === this.filterSector) {
          if (this.filterName !== null && this.filterName !== '' && this.filterTicker !== null && this.filterTicker !== '') {
            if (i.symbol.toUpperCase() === this.filterTicker.toUpperCase()
                && i.company.name.toLowerCase() === this.filterName.toLowerCase()) {
              this.filtredData.push(JSON.parse(JSON.stringify(i)));
            }
          }
          else if (this.filterName !== null && this.filterName !== '' && (this.filterTicker === null || this.filterTicker === '')) {
            if (i.company.name.toLowerCase() === this.filterName.toLowerCase()) {
              this.filtredData.push(JSON.parse(JSON.stringify(i)));
            }
          }
          else if ((this.filterName === null || this.filterName === '') && this.filterTicker !== null && this.filterTicker !== '') {
            if (i.symbol.toUpperCase() === this.filterTicker.toUpperCase()) {
              this.filtredData.push(JSON.parse(JSON.stringify(i)));
            }
          }
          else {
            this.filtredData.push(JSON.parse(JSON.stringify(i)));
          }
        }
        else if (!this.filterSector) {
          if (this.filterName !== null && this.filterName !== '' && this.filterTicker !== null && this.filterTicker !== '') {
            if (i.symbol.toUpperCase() === this.filterTicker.toUpperCase()
                && i.company.name.toLowerCase() === this.filterName.toLowerCase()) {
              this.filtredData.push(JSON.parse(JSON.stringify(i)));
            }
          }
          else if (this.filterName !== null && this.filterName !== '' && (this.filterTicker === null || this.filterTicker === '')) {
            if (i.company.name.toLowerCase() === this.filterName.toLowerCase()) {
              this.filtredData.push(JSON.parse(JSON.stringify(i)));
            }
          }
          else if ((this.filterName === null || this.filterName === '') && this.filterTicker !== null && this.filterTicker !== '') {
            if (i.symbol.toUpperCase() === this.filterTicker.toUpperCase()) {
              this.filtredData.push(JSON.parse(JSON.stringify(i)));
            }
          }
          else {
            this.filtredData.push(JSON.parse(JSON.stringify(i)));
          }
        }
      });
      if (this.filtredData && this.filtredData.length > 0) {
        this.data = this.filtredData;
      }
    },
    resetData() {
      this.filterName = null;
      this.filterTicker = null;
      this.filtredData = [];
      this.data = this.curData;
    },
    async get() {
      await this.axios.get(PREFIX + "/sectors").then(response => {
        if (response.status === 200) {
          this.dictSectors = response.data
          this.filterSector = null;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>