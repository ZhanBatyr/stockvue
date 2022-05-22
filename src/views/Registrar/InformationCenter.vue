<template>
  <div class="companies content p-3">
    <h3 class="m-2">
      Предстоящие собрания
    </h3>
    <div class="card p-3">
      <div style="display:flex; flex-direction: column; justify-content: space-around; align-items: center"
           class="mt-2">


        <div class="info-box d-flex justify-content-between" v-for="(i, ind) in issuers" :key="ind">
          <div class="info-box-content">
            <h3>Ticker: {{ i.ticker }}</h3>
            <h2>Название: {{ i.name }}</h2>
            <span class="info-box-text">Отрасль компании: {{ i.categoryCompany }}</span>
            <span class="info-box-number">Количество всех акционеров: {{ i.allShareholders }}</span>
          </div>

          <div class="info-box" style="width: 400px">
            <span class="info-sbox-icon bg-info"><i class="far fa-bookmark"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">Собрания</span>
              <span class="info-box-number">Участвует {{i.participatingShareholders}} акционеры</span>
              <div class="progress">
                <div class="progress-bar bg-info" :style="{ width: ((i.participatingShareholders / i.allShareholders) * 100).toFixed(2) + '%' }"></div>
              </div>
              <div class="progress-description">
                у {{ ((i.participatingShareholders / i.allShareholders) * 100).toFixed(2)}}%  процентов акционеров есть больше процента акций
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformationCenter",
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
          participatingShareholders: 15,
          allShareholders: 40,
        },
        {
          date: '2022-03-20',
          ticker: 'KSPI',
          name: 'Каспий банк',
          outputStocks: 6000,
          inputStocks: 14000,
          categoryCompany: 'Информационные технологии',
          coef: 18,
          participatingShareholders: 159,
          allShareholders: 220
        },
        {
          date: '2022-01-10',
          ticker: 'TSH',
          name: 'Тенгиз "Шеврон"',
          outputStocks: 1800,
          inputStocks: 4000,
          categoryCompany: 'Индустрияльные',
          coef: 9,
          participatingShareholders: 80,
          allShareholders: 180
        },
        {
          date: '2022-04-13',
          ticker: 'KTZH',
          name: 'Казакстан темір жолы',
          outputStocks: 200,
          inputStocks: 800,
          categoryCompany: 'Индустрияльные',
          coef: 5,
          participatingShareholders: 18,
          allShareholders: 26
        },
        {
          date: '2022-02-02',
          ticker: 'NIT',
          name: 'НИТ',
          outputStocks: 750,
          inputStocks: 3800,
          categoryCompany: 'Информационные технологии',
          coef: 18,
          participatingShareholders: 85,
          allShareholders: 126
        }
      ],
      issuers: []
    }
  },
  created() {
    this.issuers = this.curData;
  },
  methods: {
  }
}
</script>

<style scoped>

</style>