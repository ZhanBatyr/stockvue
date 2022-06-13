<template>
  <div class="content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Қолданушылар</p>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Аты-жөні</th>
            <th>Электронды пошта</th>
            <th>Рөлі</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>APPLE COMPANY</td>
            <td>apple@stock.net</td>
            <td>эмитент-компания</td>
            <td>
              <button class="btn btn-success">Құжаттар</button>
            </td>
          </tr>
          <tr>
            <td>TESLA COMPANY</td>
            <td>tesla@stock.net</td>
            <td>эмитент-компания</td>
            <td><button class="btn btn-success">Құжаттар</button></td>
          </tr>
          <tr>
            <td>Arailym</td>
            <td>arailym@mail.ru</td>
            <td>дилер</td>
            <td><button class="btn btn-success">Құжаттар</button></td>
          </tr>
          <tr>
            <td>Zhan's Company</td>
            <td>zhan.batyr01@gmail.com</td>
            <td>эмитент-компания</td>
            <td><button class="btn btn-success">Құжаттар</button></td>
          </tr>
          <tr>
            <td>Orynkul</td>
            <td>orynkulbekbergen@mail.ru</td>
            <td>брокер</td>
            <td><button class="btn btn-success">Құжаттар</button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Users"
}
</script>

<style scoped>

</style>