<template>
  <div class="companies content p-3">
    <h3 class="m-2">
      Реестр "{{this.dataIssuers.find(d => d.ticker === $route.params.ticker).name}}"
    </h3>
    <h5>
      Всего пакет акции на рынке {{this.dataIssuers.find(d => d.ticker === $route.params.ticker).outputStocks}}
    </h5>
    <div class="card p-3">
      <table class="table table-dark table-striped">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ФИО</th>
          <th scope="col">Эл. адрес</th>
          <th scope="col">Пакет акции(шт.)</th>
          <th scope="col">Дата приобретения акции</th>
          <th scope="col">Счет</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Jhon Jhones</td>
          <td>jhon@gmail.com</td>
          <td>250</td>
          <td>10-04-2022</td>
          <td>QIWI</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Will Smith</td>
          <td>will_smit@gmail.com</td>
          <td>1500</td>
          <td>23-10-2021</td>
          <td>Pay pal</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registries",
  data() {
    return {
      dataIssuers: [
        {
          date: '2022-04-15',
          ticker: 'KZTK',
          name: 'Казактелеком',
          outputStocks: 400,
          inputStocks: 4000,
          categoryCompany: 'Связь',
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
          categoryCompany: 'Производства нефти',
          coef: 9,
          addUsers: 586
        },
        {
          date: '2022-04-13',
          ticker: 'KTZH',
          name: 'Казакстан темір жолы',
          outputStocks: 200,
          inputStocks: 800,
          categoryCompany: 'Железная дорога',
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
      selectedApplication: null,
      selectedIndex: null
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>