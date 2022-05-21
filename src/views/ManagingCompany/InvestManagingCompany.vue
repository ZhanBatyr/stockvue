<template>
  <div class="p-3">
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a class="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab"
           aria-controls="nav-home" aria-selected="true">Қадам 1</a>
        <a class="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab"
           aria-controls="nav-profile" aria-selected="false">Қадам 2</a>
        <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab"
           aria-controls="nav-contact" aria-selected="false">Қадам 3</a>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
        <h1><strong>Жеке мәліметтер</strong></h1>
        <form>
          <div class="form-group">
            <label for="surname">Аты-жөніңіз</label>
            <input type="text" class="form-control" id="surname" placeholder="Аты-жөніңіз">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Эл. почта</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Почта">
            <small id="emailHelp" class="form-text text-muted">Біз сіздің электрондық поштаңызды ешкіммен ешқашан бөліспейміз.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPhone">Телефон номер</label>
            <input type="number" class="form-control" id="exampleInputPhone" placeholder="Телефон номер">
          </div>
          <button type="submit" class="btn btn-primary">Келесі</button>
        </form>

      </div>
      <div class="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
        <div>
          <h1><strong>Келісім-шартқа қол қою</strong></h1>
          <button class="btn-secondary m-0">
            Келісім-шартты жүктеп алу &#11015;
          </button>
          <div class="form-check mt-2">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Келісім-шарттағы шарттар мен қызметтерге келісемін</label>
          </div>
          <button type="submit" class="btn btn-primary mt-2">Келесі</button>
        </div>
      </div>
      <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">Төлем жасау</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvestManagingCompany"
}
</script>

<style scoped>

</style>