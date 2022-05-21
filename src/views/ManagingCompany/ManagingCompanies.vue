<template>
  <div class="p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Компаниялар</p>
      </div>
      <div class="card-body p-0 d-flex justify-content-around flex-wrap">
        <managing-company-item to="com1"/>
        <managing-company-item to="com2"/>
        <managing-company-item to="com3"/>
        <managing-company-item to="com4"/>
        <managing-company-item to="com5"/>
        <managing-company-item to="com6"/>
        <managing-company-item to="com7"/>
        <managing-company-item to="com8"/>
      </div>
      <div class="footer">
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item">
              <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import ManagingCompanyItem from "./ManagingCompanyItem";

export default {
  name: "ManagingCompanies",
  components: {ManagingCompanyItem}
}
</script>

<style scoped>

</style>