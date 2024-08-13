<script>
import Main from "@/components/Main.vue";

export default {
  name: "BingoView",
  components: {Main}
}
</script>

<template>
  <section class="main-section flex">
    <img src="/src/assets/img/maxito.png" alt="Maxito" class="maxito">
    <div class="bingo-header flex">
      <img src="/src/assets/img/bingo-logo.png" alt="Bingo">
    </div>
    <Main />
  </section>
</template>

<style scoped>
.bingo-header img {
  width: 60%;
  user-select: none;
}

.main-section {
  height: 85vh;
  flex-direction: column;
  position: relative;
}

.maxito {
  position: absolute;
  width: 250px;
  left: 3%;
  bottom: 0;
}

@media screen and (max-width: 1050px) {
  .main-section {
    height: auto;
  }
}
</style>