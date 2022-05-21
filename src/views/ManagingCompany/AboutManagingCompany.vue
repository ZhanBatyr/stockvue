<template>
  <div class="p-3">
    <div class="d-flex justify-content-center">
      <h2>ИСС Точки роста</h2>
    </div>
    <div class="d-flex justify-content-around">
      <h5>Мин. инвестиция ₸</h5>
      <h5>Тәуелділік деңгейі</h5>
    </div>
    <div class="d-flex justify-content-around">
      <h5>10000</h5>
      <h5>Жоғары</h5>
    </div>
    <div class="d-flex justify-content-between p-3">
      <div class="m-3">
        <img src="/dist/img/managingCompany/upr-company.jfif" alt="photo">
      </div>
      <div>
        <p>Альфа Капитал ресейлік инвестициялық басқару нарығының ең көне қатысушыларының бірі болып табылады. Альфа
          Капитал Ресейдегі ең ірі және сенімді қаржылық
          және өндірістік құрылымдардың бірі болып табылатын Alfa Group консорциумының бөлігі. Құзыреттілік, активтерді
          қорғаудың жоғарғы деңгейі, сенімділіктің іргелі кепілдіктері Alfa Group-тың
          негізгі құндылықтары. Клиенттердің активтерін тиімді басқаруды жоғары білікті менеджерлер мен портфельді
          басқарушылар командасы қамиамасыз етеді.</p>
      </div>
    </div>
    <div class="callout callout-warning">
      <strong><i>Стратегиялық сипаттамасы</i></strong>
      <p><i>Стратегия ресейлік 100% акцияларынан тұрады. Инвестициялар үшін бағалы қағаздарды таңдаудағы қалыпты
        консервативті тәсіл ұзақ мерзімді перспективада әлеуетті жоғары табысты алуға мүмкіндік береді.
      </i></p>
    </div>
    <div class="d-flex justify-content-between">
      <div>
        <div>
          <div><strong>Шарттар мен комиссиялар</strong></div>
        </div>
        <div class="mt-2">
          <table class="table">
            <tbody>
            <tr>
              <td>Инвестициялық горизонт</td>
              <td>1 жыл</td>
            </tr>
            <tr>
              <td>Мин. инвестиция соммасы</td>
              <td>10 000 ₸</td>
            </tr>
            <tr>
              <td>Мин. толықтыру ақысы</td>
              <td>10 000 ₸</td>
            </tr>
            <tr>
              <td>Басқару ақысы</td>
              <td>2 %</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <router-link to="invest-managing-company" type="button" class="btn btn-primary">Инвестициялау</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutManagingCompany"
}
</script>

<style scoped>

</style>