<template>
  <div class="companies content p-3">
    <h3 class="m-2">
      Заявка акции эмитентов
    </h3>
    <div class="card p-3">
      <div style="display:flex; justify-content: space-around" class="mt-2">

        <div class="card card-secondary mt-5" style="width: 500px; height: 300px;">
          <div class="card-header" v-if="selectedApplication">
            <h3 class="card-title">{{selectedApplication?.name}}</h3>
            <div class="card-tools">
              <!-- Buttons, labels, and many other things can be placed here! -->
              <!-- Here is a label for example -->
              <span class="badge badge-success">{{selectedApplication?.date}}</span>
            </div>
            <!-- /.card-tools -->
          </div>
          <!-- /.card-header -->
          <div class="card-body" v-if="selectedApplication">
            <h4>Ticker: {{ selectedApplication?.ticker }}</h4>
            <div>Количество акции на биржу: {{selectedApplication?.outputStocks}}</div>
            <div>Количество внутренних акции: {{selectedApplication?.inputStocks}}</div>
            <div>Отрасль компании: {{selectedApplication?.categoryCompany}}</div>

            <div>
              Коэффициент роста: <span class="badge badge-danger">{{selectedApplication?.coef}} %</span>
            </div>

          </div>
          <div class="card-footer" style="display: flex; justify-content: space-between" v-if="selectedApplication">
            <button type="button" class="btn btn-secondary btn-sm"
                    data-bs-toggle="modal" data-bs-target="#exampleModal">Отклонить заявку</button>
            <button type="button" class="btn btn-primary btn-sm">Отправить заявку к организатору рынка</button>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: flex-end">
            <div class="btn-group">
              <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown"
                      aria-expanded="false">
                По умолчанию
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click="newApplications">Новые</a></li>
                <li><a class="dropdown-item" href="#" @click="oldApplications">Старые</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">По умолчанию</a></li>
              </ul>
            </div>
          </div>

          <div class="info-box" v-for="(a, ind) in applications" :key="ind" @click="chooseApplication(a, ind)" style="cursor: pointer">
            <span class="info-box-icon bg-info" style="width: 70px; height: 50px"><i class="far fa-envelope"></i></span>
            <div class="info-box-content">
              <span class="badge badge-primary">{{ a.date }}</span>
              <span class="info-box-text">Ticker: {{ a.ticker }}</span>
              <span class="info-box-text">Название: {{ a.name }}</span>
              <span class="info-box-number">Количество акции: {{ a.outputStocks }}</span>
            </div>
          </div>
        </div>

      </div>


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Отклонение заявки</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Вы действительно хотите отклонить заявку?
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
  name: "PanelForRegistrar",
  data() {
    return {
      applications: [
        {
          date: '2022-04-15',
          ticker: 'KZTK',
          name: 'Казактелеком',
          outputStocks: 400,
          inputStocks: 4000,
          categoryCompany: 'Утилиты',
          coef: 12
        },
        {
          date: '2022-03-20',
          ticker: 'KSPI',
          name: 'Каспи банк',
          outputStocks: 6000,
          inputStocks: 14000,
          categoryCompany: 'Информационные технологии',
          coef: 18
        },
        {
          date: '2022-01-10',
          ticker: 'TSH',
          name: 'Тенгиз "Шеврон"',
          outputStocks: 1800,
          inputStocks: 4000,
          categoryCompany: 'Индустрияльные',
          coef: 9
        },
        {
          date: '2022-04-13',
          ticker: 'KTZH',
          name: 'Казакстан темір жолы',
          outputStocks: 200,
          inputStocks: 800,
          categoryCompany: 'Индустрияльные',
          coef: 5
        },
        {
          date: '2022-02-02',
          ticker: 'NIT',
          name: 'НИТ',
          outputStocks: 750,
          inputStocks: 3800,
          categoryCompany: 'Информационные технологии',
          coef: 18
        }
      ],
      selectedApplication: null,
      selectedIndex: null
    }
  },
  methods: {
    newApplications() {
      const sortedApplications = this.applications.sort((a, b) =>
          new Date(b.date) - new Date(a.date));
      this.applications = sortedApplications;
    },
    oldApplications() {
      const sortedApplications = this.applications.sort((a, b) =>
          new Date(b.date) - new Date(a.date));
      this.applications = sortedApplications.reverse();
    },
    defaultApplications() {
      // get request
    },
    chooseApplication(application, ind) {
      this.selectedApplication = application;
      this.selectedIndex = ind;
    },
    deleteApplication() {
      this.applications.splice(this.selectedIndex, 1);

      this.selectedApplication = null;
      this.selectedIndex = null;

      this.$notify({ type: 'success', title: 'Заявка', text: 'Данная заявка успешно отклонена!' })
    }
  }
}
</script>

<style scoped>

</style>