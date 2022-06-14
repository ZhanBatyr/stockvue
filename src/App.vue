<template>
  <nav style="background: #d73925" class="main-header navbar navbar-expand navbar-dark">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item" v-if="logged">
        <div class="nav-link">{{ user.username }} ({{ user.role }})</div>
      </li>
      <li class="nav-item" v-if="logged">
        <a href="#" @click="logout" class="nav-link"><span class="fas fa-sign-out"></span> Шығу</a>
      </li>
    </ul>
  </nav>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <router-link :to="{ name: 'Index' }" style="background: #d73925" class="brand-link logo-switch">
      <img src="/dist/img/AdminLTELogo.png" alt="Idex logo" class="brand-image-xs logo-xl" style="opacity: 0.8"/>
    </router-link>
    <div class="sidebar">
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" v-if="logged && user.role !== 'guest'">
          <nav-item :to="{ name: 'Index' }" icon="fas fa-dashboard">Басты бет</nav-item>
          <nav-item :to="{ name: 'Companies' }" icon="fas fa-building">Компаниялар</nav-item>
          <nav-item :to="{ name: 'Quotes' }" icon="fas fa-arrow-trend-up">Бағалы қағаздар</nav-item>
          <nav-item :to="{ name: 'Sectors' }" icon="fas fa-chart-pie">Секторлар</nav-item>
          <li class="nav-header" v-if="user.role === 'company'">Компания</li>
          <nav-item :to="{ name: 'CompanyProfile', params: { id: user.companyId } }" v-if="user.role === 'company'" icon="fas fa-building">Менің компаниям</nav-item>
          
          <li class="nav-header" v-if="user.role === 'broker'">Брокер</li>
          <nav-item :to="{ name: 'Orders' }" v-if="user.role === 'broker'" icon="fas fa-briefcase">Менің тапсырыстарым</nav-item>
          <nav-item :to="{ name: 'Brokers' }" v-if="user.role === 'broker'" icon="fas fa-briefcase">Брокерлер</nav-item>

          <li class="nav-header" v-if="user.role === 'dealer'">Дилер</li>
          <nav-item :to="{ name: 'Orders' }" v-if="user.role === 'dealer'" icon="fas fa-briefcase">Менің тапсырыстарым</nav-item>
          <nav-item :to="{ name: 'Dealer' }" v-if="user.role === 'dealer'" icon="fas fa-faq">Сұрақ-жауап</nav-item>

          <li class="nav-header">Инвест. банк</li>
          <nav-item :to="{ name: 'Transactions' }" icon="fas fa-dollar">Транзакциялар</nav-item>
          <nav-item :to="{ name: 'Credits' }" icon="fas fa-dollar">Кредиттер</nav-item>

          <li class="nav-header" v-if="user.role === 'registrar'">Регистратор</li>
          <nav-item :to="{ name: 'Movements' }" icon="fas fa-arrow-right" v-if="user.role === 'registrar'">Акциялар қозғалысы</nav-item>
          <nav-item :to="{ name: 'PanelForRegistrar' }" icon="fas fa-briefcase" v-if="user.role === 'registrar'">IPO қабылдау</nav-item>
          <nav-item :to="{ name: 'Registries' }" icon="fas fa-dashboard" v-if="user.role === 'registrar'">Реестр</nav-item>
          <nav-item :to="{ name: 'InformationCenter' }" icon="far fa-bookmark" v-if="user.role === 'registrar'">Информационный центр</nav-item>

          <li class="nav-header" v-if="user.role === 'clearing'">Клиринг</li>
          <nav-item v-if="user.role === 'clearing'" :to="{ name: 'ClearingDeals' }" icon="fas fa-arrow-right">Мәмілелер</nav-item>
          <nav-item v-if="user.role === 'clearing'" :to="{ name: 'ClearingUsers' }" icon="fas fa-arrow-right">Қатысушылар</nav-item>
          <nav-item v-if="user.role === 'clearing'" :to="{ name: 'ClearingTransactions' }" icon="fas fa-arrow-right">Транзакциялар</nav-item>
          <nav-item v-if="user.role === 'clearing'"  :to="{ name: 'ClearingDocuments' }" icon="fas fa-arrow-right">Құжаттар</nav-item>


        </ul>
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" v-if="logged && user.role === 'guest'">
          <nav-item :to="{ name: 'Start' }" icon="fas fa-flag">Ойынды бастау</nav-item>
          <nav-item :to="{ name: 'Companies' }" icon="fas fa-building">Компаниялар</nav-item>
          <nav-item :to="{ name: 'Sectors' }" icon="fas fa-chart-pie">Секторлар</nav-item>
          <nav-item :to="{ name: 'Quotes' }" icon="fas fa-arrow-trend-up">Бағалы қағаздар</nav-item>
        </ul>
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" v-if="!logged">
          <nav-item :to="{ name: 'Login' }" icon="fas fa-sign-in">Кіру</nav-item>
          <nav-item :to="{ name: 'Register' }" icon="fas fa-sign-in">Тіркелу</nav-item>
        </ul>
      </nav>
    </div>
  </aside>
  <div class="content-wrapper">
    <notifications />
    <router-view></router-view>
  </div>
  <footer class="main-footer">
    <strong>StockApp &copy; 2022</strong>
  </footer>
</template>

<script>
import NavItem from "./components/NavItem";
import { useSignalR } from '@dreamonkey/vue-signalr';
export default {
  name: "App",
  components: {NavItem},
  computed: {
    logged() { return this.$store.state.logged },
    user() { return this.$store.state.user }
  },
  methods: {
    logout() {
      if (this.$store.state.logged) {
        this.$store.commit('logout')
        this.$router.push({ name: 'Login' })
      }
    }
  },
  updated() {
    const signalR = useSignalR()

    signalR.on('NewQuote', ({message}) => {
      this.$notify({
        type: 'info',
        title: 'Жаңа акция жарияланды!'
      })
    })
  }
};
</script>