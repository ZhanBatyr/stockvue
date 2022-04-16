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
        <a href="#" @click="logout" class="nav-link"><span class="fas fa-sign-out"></span> Выйти</a>
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
          <nav-item :to="{ name: 'Companies' }" icon="fas fa-arrow-trend-up">Бағалы қағаздар</nav-item>
          <li class="nav-header" v-if="user.role === 'company'">Компания</li>
          <nav-item :to="{ name: 'CompanyProfile', params: { id: user.companyId } }" v-if="user.role === 'company'" icon="fas fa-building">Менің компаниям</nav-item>
        </ul>
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" v-if="logged && user.role === 'guest'">
          <nav-item to="Start" icon="fas fa-flag">Ойынды бастау</nav-item>
          <nav-item to="Index" icon="fas fa-dashboard">Басты бет</nav-item>
          <nav-item to="Companies" icon="fas fa-building">Компаниялар</nav-item>
        </ul>
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" v-if="!logged">
          <nav-item to="Login" icon="fas fa-sign-in">Кіру</nav-item>
          <nav-item to="Register" icon="fas fa-sign-in">Тіркелу</nav-item>
        </ul>
      </nav>
    </div>
  </aside>
  <div class="content-wrapper">
    <notifications />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
  <footer class="main-footer">
    <strong>StockApp &copy; 2022</strong>
  </footer>
</template>

<script>
import NavItem from "./components/NavItem";
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
  }
};
</script>