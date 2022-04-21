<template>
  <div class="content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Тапсырыстар</p>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <tr>
            <th>ID</th>
            <th>Типі</th>
            <th>Акция</th>
            <th>Саны</th>
            <th>Әрекет</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Сатып алу</td>
            <td>TSLA</td>
            <td>150</td>
            <th>
              <button class="btn btn-success">Қабылдау</button>
            </th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index"
}
</script>

<style scoped>

</style>