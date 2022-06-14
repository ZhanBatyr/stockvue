<template>
  <div class="content p-3">
    <div class="card">
      <div class="card-header">
        <p class="card-title">Мәміле қосу</p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Қолданушы 1</label>
<!--          <select name="" id="" class="form-control">-->
<!--            <option v-model="user1" value=""></option>-->
<!--          </select>-->
        </div>
        <div class="form-group">
          <label>Қолданушы 2</label>
<!--          <select name="" id="" class="form-control">-->
<!--            <option v-model="user2" value=""></option>-->
<!--          </select>-->
        </div>
        <div class="form-group">
          <label>Мәміле сипаттамасы</label>
          <textarea class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label>Мерзімі</label>
          <input v-model="date" type="date" class="form-control">
        </div>
        <button class="btn btn-success">Сақтау</button>
      </div>
    </div>
    <div class="card" v-show="false">
      <div class="card-header">
        <p class="card-title">Мәмілелер</p>
        <div class="card-tools">
          <button class="btn btn-success">Қосу</button>
        </div>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Қолданушы 1</th>
            <th>Қолданушы 2</th>
            <th>Мерзімі</th>
            <th>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="deal in deals">
            <td>{{ deal.user1.username }}</td>
            <td>{{ deal.user2.username }}</td>
            <td>{{ deal.date }}</td>
            <td>
              <button class="btn btn-warning">Түзеу</button>
              <button class="btn btn-danger">Жою</button>
            </td>
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