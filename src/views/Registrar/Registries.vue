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
                <div><b>Тикер эмитента</b></div>
                <small class="form-text text-muted">Ти́кер (англ. ticker symbol) — краткое название в биржевой
                  информации котируемых инструментов (акций, облигаций, индексов).</small>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">#</span>
                  <input type="text" class="form-control" placeholder="Ticker эмитента" aria-label="Ticker"
                         aria-describedby="basic-addon1" v-model="filterTicker">
                </div>
              </div>

              <div>
                <div><b>Название эмитента</b></div>
                <div class="input-group input-group mb-3">
                  <input type="text" class="form-control" aria-label="Sizing example input"
                         placeholder="Названия эмитента" aria-describedby="inputGroup-sizing-sm" v-model="filterName">
                </div>
              </div>

              <div>
                <label for="sector">Отрасль</label>
                <select class="form-control" name="sector" id="sector" v-model="filterSector" required>
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
              </div>

            </div>
          </li>
          <li>
            <div class="mt-2 d-flex justify-content-around">
              <button type="button" class="btn btn-danger" @click="resetData">Сбросить</button>
              <button type="button" class="btn btn-success" @click="findData">Применить</button>
            </div>
          </li>
        </ul>
      </div>
      <div style="display:flex; flex-direction: column; justify-content: space-around; align-items: center"
           class="mt-2">


        <div class="info-box" v-for="(i, ind) in issuers" :key="ind">
          <div class="info-box-content">
            <span class="badge badge-primary" style="width: 100px">{{ i.date }}</span>
            <h3>Ticker: {{ i.ticker }}</h3>
            <h2>Название: {{ i.name }}</h2>
            <span class="info-box-text">Отрасль компании: {{ i.categoryCompany }}</span>
            <span class="info-box-number">Количество акции: {{ i.outputStocks }}</span>
          </div>

          <div class="small-box bg-gradient-success" style="width: 200px">
            <div class="inner">
              <h4>{{ i.addUsers }}</h4>
              <p>Пользователи зарегистрировались в этом реестре за последнии день</p>
            </div>
            <div class="icon">
              <i class="fas fa-user-plus" style="width: 50px"></i>
            </div>
            <a class="small-box-footer" @click="pushRouter(i.ticker)">
              Больше информации <i class="fas fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registries",
  data() {
    return {
      dictSectors: [
        {value: 28, name: 'Информационные технологии'},
        {value: 13, name: 'Здравохранение'},
        {value: 12, name: 'Потребительская дискреция'},
        {value: 11, name: 'Финансы'},
        {value: 10, name: 'Коммуникационные услуги'},
        {value: 8, name: 'Индустрияльные'},
        {value: 6, name: 'Потребительские товары'},
        {value: 4, name: 'Энергия'},
        {value: 3, name: 'Недвижимость'},
        {value: 2, name: 'Материалы'},
        {value: 1, name: 'Утилиты'}
      ],
      curData: [
        {
          date: '2022-04-15',
          ticker: 'KZTK',
          name: 'Казактелеком',
          outputStocks: 400,
          inputStocks: 4000,
          categoryCompany: 'Утилиты',
          coef: 12,
          addUsers: 145
        },
        {
          date: '2022-03-20',
          ticker: 'KSPI',
          name: 'Каспий банк',
          outputStocks: 6000,
          inputStocks: 14000,
          categoryCompany: 'Информационные технологии',
          coef: 18,
          addUsers: 1596
        },
        {
          date: '2022-01-10',
          ticker: 'TSH',
          name: 'Тенгиз "Шеврон"',
          outputStocks: 1800,
          inputStocks: 4000,
          categoryCompany: 'Индустрияльные',
          coef: 9,
          addUsers: 586
        },
        {
          date: '2022-04-13',
          ticker: 'KTZH',
          name: 'Казакстан темір жолы',
          outputStocks: 200,
          inputStocks: 800,
          categoryCompany: 'Индустрияльные',
          coef: 5,
          addUsers: 58
        },
        {
          date: '2022-02-02',
          ticker: 'NIT',
          name: 'НИТ',
          outputStocks: 750,
          inputStocks: 3800,
          categoryCompany: 'Информационные технологии',
          coef: 18,
          addUsers: 105
        }
      ],
      issuers: [],
      filtredData: [],
      filterTicker: null,
      filterName: null,
      filterSector: 28
    }
  },
  created() {
    this.issuers = this.curData;
  },
  methods: {
    pushRouter(ticker) {
      this.$router.push(`/registries/${ticker}`)
    },
    findData() {
      const filterSectorName = this.dictSectors.find(d => d.value === this.filterSector).name

      this.filtredData = [];
      this.issuers.forEach(i => {
        if (i.categoryCompany.toLowerCase() === filterSectorName.toLowerCase()) {
          if (this.filterName !== null && this.filterTicker !== null) {
            if (i.ticker.toUpperCase() === this.filterTicker.toUpperCase()
                && i.name.toLowerCase() === this.filterName.toLowerCase()) {
              this.filtredData.push(JSON.parse(JSON.stringify(i)));
            }
          }
          else if (this.filterName !== null && this.filterTicker === null) {
            if (i.name.toLowerCase() === this.filterName.toLowerCase()) {
              this.filtredData.push(JSON.parse(JSON.stringify(i)));
            }
          }
          else if (this.filterName === null && this.filterTicker !== null) {
            if (i.ticker.toUpperCase() === this.filterTicker.toUpperCase()) {
              this.filtredData.push(JSON.parse(JSON.stringify(i)));
            }
          }
          else {
            this.filtredData.push(JSON.parse(JSON.stringify(i)));
          }
        }
      });
      if (this.filtredData && this.filtredData.length > 0) {
        this.issuers = this.filtredData;
      }
    },
    resetData() {
      this.filterName = null;
      this.filterTicker = null;
      this.filtredData = [];
      this.issuers = this.curData;
    }
  }
}
</script>

<style scoped>

</style>