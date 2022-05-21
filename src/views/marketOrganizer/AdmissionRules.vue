<template>
  <div class="companies content p-3">
    <h3 class="m-2">
      Допуск акций для размещение на фондовой рынок
    </h3>
    <div class="card p-3">
      <div class="card p-3">
        <table class="table table-bordered table-striped">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Наименование эмитента</th>
            <th scope="col">Срок существования эмитента (не менее 3 лет)</th>
            <th scope="col">Валюта баланса (итоговая сумма отчета о финансовом положении эмитента по активу)</th>
            <th scope="col">
              Объем продаж (выручка, доход от основной деятельности) эмитента
              (Не менее 3 000 000-кратного размера МРП за каждый из трех последних лет)
            </th>
            <th scope="col">Действующая рейтинговая оценка эмитента</th>
            <th scope="col">
              Количество объявленных простых акций
              (Не менее 100 000 штук)
            </th>
            <th scope="col">
              Количество объявленных привилегированных акций
              (Не менее 10 000 штук)
            </th>
            <th scope="col">Допустить</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(i, index) in issuers" :key="index">
            <th scope="row">{{index + 1}}</th>
            <td>{{i.name}}</td>
            <td>{{i.term}}</td>
            <td>{{i.balanceCurrency}}</td>
            <td>{{i.volumeOfSales}}</td>
            <td>{{i.rating}}</td>
            <td>{{i.numberOfSimpleShares}}</td>
            <td>{{i.numberOfPrivilegedShares}}</td>
            <td>
              <div style="margin-left: 20px">
                <input class="form-check-input" type="checkbox" v-model="i.allow" id="flexCheckDefault">
              </div>
            </td>
          </tr>
          </tbody>
        </table>

        <button type="button" class="btn btn-secondary btn-sm"
                data-bs-toggle="modal" data-bs-target="#exampleModal">Отклонить заявку</button>
      </div>

      <div class="d-flex justify-content-end">
        <button type="button" @click="allowIssuers" class="btn btn-primary">Допустить акции</button>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Информация про эмитента</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div>Каспий банк(KSPI)</div>
              <div>1952.42 цена продажи</div>
              <div><span style="color: red">-0.26%</span> за 24 часа</div>
              <div>
                <div>
                  <div>Изменение цены</div>
                  <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                      <th scope="col">
                        Период
                      </th>
                      <th scope="col">
                        Изменение
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>День</td>
                      <td style="color: red">-0.27%</td>
                    </tr>
                    <tr>
                      <td>Неделя</td>
                      <td style="color: red">-1.07%</td>
                    </tr>
                    <tr>
                      <td>Месяц</td>
                      <td style="color: green">0.87%</td>
                    </tr>
                    <tr>
                      <td>3 месяца</td>
                      <td style="color: green">6.27%</td>
                    </tr>
                    <tr>
                      <td>6 месяца</td>
                      <td style="color: green">9.57%</td>
                    </tr>
                    <tr>
                      <td>Год</td>
                      <td style="color: green">8.84%</td>
                    </tr>
                    <tr>
                      <td>С начало года</td>
                      <td style="color: green">6.63%</td>
                    </tr>
                    </tbody>
                  </table>

                  <div class="progress">
                  <div class="progress-bar bg-info" style="width: 28%"></div>
                  </div>

                  <div class="d-flex justify-content-between">
                    <div>28% продают</div>
                    <div>72% покупают</div>
                  </div>

                </div>
                <div>

                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Нет</button>
              <button type="button" class="btn btn-primary" @click="deleteApplication" data-bs-dismiss="modal">Да</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdmissionRules",
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
      issuers: [
        {
          name: 'Каспий банк',
          term: '10 лет',
          balanceCurrency: 800000000,
          volumeOfSales: 500000000,
          rating: 10,
          numberOfSimpleShares: 250000,
          numberOfPrivilegedShares: 31000,
          allow: false
        },
        {
          name: 'Казахмыс',
          term: '27 лет',
          balanceCurrency: 8898540000,
          volumeOfSales: 5000000000,
          rating: 5,
          numberOfSimpleShares: 500000,
          numberOfPrivilegedShares: 45000,
          allow: false
        },
        {
          name: 'Alfa банк',
          term: '4 лет',
          balanceCurrency: 50800000,
          volumeOfSales: 2400000,
          rating: 16,
          numberOfSimpleShares: 140000,
          numberOfPrivilegedShares: 10000,
          allow: false
        },
        {
          name: 'Петро Казахстан',
          term: '31 лет',
          balanceCurrency: 890000000000,
          volumeOfSales: 500000000,
          rating: 3,
          numberOfSimpleShares: 170000,
          numberOfPrivilegedShares: 14000,
          allow: false
        },
      ]
    }
  },
  methods: {
    allowIssuers() {
      let allowedIssuers = 0;
      this.issuers.forEach(el => {
        if (el.allow) {
          allowedIssuers++;
        }
      })
      this.$notify({ type: 'success', title: 'Уведомление', text: allowedIssuers + ' эмитентов допущено из ' + this.issuers.length })
      console.log(this.issuers)
    }
  }
}
</script>

<style scoped>

</style>