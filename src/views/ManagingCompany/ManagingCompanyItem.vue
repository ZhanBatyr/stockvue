<template>
  <div>
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="/dist/img/managingCompany/upr-company.jfif" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title"><strong>ИИС Точки роста</strong></h5>
        <p class="card-text">ООО Управляющая компания "Альфа-Капитал"</p>
        <div class="d-flex justify-content-around mt-4">
          <a href="#" class="btn btn-primary">Инвестициялау</a>
          <router-link :to="'about-managing-company?id=' + to">Толығырақ</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManagingCompanyItem",
  props: ['to']
}
</script>

<style scoped>

</style>