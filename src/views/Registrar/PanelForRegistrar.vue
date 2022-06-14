<template>
  <div class="companies content p-3">
    <h3 class="m-2">
      Эмитенттерден келген акциялар сұранысы
    </h3>
    <div class="card p-3">
      <div style="display:flex; justify-content: space-around" class="mt-2">

        <div class="card card-secondary mt-5" style="width: 500px; height: 300px;">
          <div class="card-header" v-if="selectedQuotes">
            <h3 class="card-title">{{selectedQuotes?.company.name }}</h3>
            <div class="card-tools">
              <!-- Buttons, labels, and many other things can be placed here! -->
              <!-- Here is a label for example -->
              <span class="badge badge-success">{{selectedQuotes?.createdAt.split('T')[0]}}</span>
            </div>
            <!-- /.card-tools -->
          </div>
          <!-- /.card-header -->
          <div class="card-body" v-if="selectedQuotes">
            <h4>Ticker: {{ selectedQuotes?.symbol }}</h4>
            <div>Нарықтағы акциялар саны: {{selectedQuotes?.numberOfShares}}</div>
            <div>Ішкі акциялар саны: {{selectedQuotes?.inTradeNumberOfShares}}</div>
            <div>Компания секторы: {{selectedSector?.name}}</div>

            <div>
              Коэффициент роста: <span class="badge badge-danger">{{selectedSector?.bonus}} %</span>
            </div>

          </div>
          <div class="card-footer" style="display: flex; justify-content: space-between" v-if="selectedQuotes">
            <button type="button" class="btn btn-secondary btn-sm"
                    data-bs-toggle="modal" data-bs-target="#exampleModal">Сұранысты қайтару</button>
            <button type="button" class="btn btn-primary btn-sm" @click="accept(selectedQuotes.id)">Сұранысты нарық ұйымдастырушысына жіберу</button>
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
                <li><a class="dropdown-item" href="#" @click="newQuotes">Жаңа</a></li>
                <li><a class="dropdown-item" href="#" @click="oldQuotes">Ескі</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">По умолчанию</a></li>
              </ul>
            </div>
          </div>

          <div class="info-box" v-for="(a, ind) in quotes" :key="a.id" @click="chooseQuotes(a, ind)" style="cursor: pointer">
            <span class="info-box-icon bg-info" style="width: 70px; height: 50px"><i class="far fa-envelope"></i></span>
            <div class="info-box-content">
              <span class="badge badge-primary">{{ a.createdAt.split('T')[0] }}</span>
              <span class="info-box-text">Ticker: {{ a.symbol }}</span>
              <span class="info-box-text">Эмитент аты: {{ a.company.name }}</span>
              <span class="info-box-number">Акциялар саны: {{ a.numberOfShares }}</span>
            </div>
          </div>
        </div>

      </div>


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Өтінішті қабылдамау</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Қолданбадан бас тартқыңыз келетініне сенімдісіз бе?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Жоқ</button>
              <button type="button" class="btn btn-primary" @click="deleteQuotes" data-bs-dismiss="modal">Иә</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {PREFIX} from "@/api";

export default {
  name: "PanelForRegistrar",
  data() {
    return {
      selectedQuotes: null,
      selectedSector: null,
      selectedIndex: null,
      quotes: null
    }
  },
  async created() {
    await this.getQuotes();
    this.selectedQuotes = this.quotes[0];
  },
  methods: {
    async getQuotes() {
      await this.axios.get(PREFIX + "/quotes/registrar").then(response => {
        if (response.status === 200) {
          this.quotes = response.data.quotes
        }
      })
    },
    async accept(quoteId) {
      await this.axios.post(PREFIX + "/quotes/" + quoteId + "/accept").then(response => {
        if (response.status === 200) {
          this.$notify({
            type: "success",
            title: "Сәтті қабылданды"
          })
          this.$router.go(0)
        }
      })
    },
    async getInfoAboutSector() {
      await this.axios.get(PREFIX + "/sectors/" + this.selectedQuotes?.company.sectorId).then(response => {
        if (response.status === 200) {
          this.selectedSector =  response.data
        }
      })
    },
    newQuotes() {
      this.quotes = this.quotes.sort((a, b) =>
          new Date(b.createdAt.split('T')[0]) - new Date(a.createdAt.split('T')[0]));
    },
    oldQuotes() {
      const sortedQuotes = this.quotes.sort((a, b) =>
          new Date(b.createdAt.split('T')[0]) - new Date(a.createdAt.split('T')[0]));
      this.quotes = sortedQuotes.reverse();
    },
    defaultQuotes() {
      // get request
    },
    async chooseQuotes(quotes, ind) {
      this.selectedQuotes = quotes;
      this.selectedIndex = ind;
    },
    deleteQuotes() {
      this.quotes.splice(this.selectedIndex, 1);

      this.selectedQuotes = null;
      this.selectedIndex = null;

      this.$notify({ type: 'success', title: 'Заявка', text: 'Данная заявка успешно отклонена!' })
    }
  },
  watch: {
    async 'selectedQuotes'() {
      await this.getInfoAboutSector();
    }
  }
}
</script>

<style scoped>

</style>