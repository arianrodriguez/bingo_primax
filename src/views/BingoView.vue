<script>
import Main from "@/components/Main.vue";

export default {
  name: "BingoView",
  components: {Main}
}
</script>

<template>
  <section class="main-section flex">
    <div class="bingo-header flex">
      <img src="/src/assets/img/bingo-logo.png" alt="Bingo">
    </div>
    <Main />
  </section>
</template>

<style scoped>
.bingo-header img {
  width: 70%;
  user-select: none;
  margin-top: 5rem;
}

.main-section {
  height: 85vh;
  flex-direction: column;
}

@media screen and (max-width: 1050px) {
  .main-section {
    height: auto;
  }
}
</style>