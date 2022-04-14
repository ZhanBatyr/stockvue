<template>
    <div class="companies content p-3">
        <div class="card">
          <div class="card-header">
            <p class="card-title">Пользователи</p>
          </div>
          <div class="card-body p-0">
            <table class="table table-striped">
              <thead>
              <tr>
                <th>ID</th>
                <th>Имя пользователя</th>
                <th>Почта</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
</template>

<script>
//import {PREFIX} from "@/api";
export default {
  name: "Index",
  data() {
    return {
     
    }
  },
  mounted() {
   
  },
  methods: {
    
  }
}
</script>

<style>

</style>