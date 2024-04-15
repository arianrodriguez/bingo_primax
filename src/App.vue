<script setup>
    import Navbar from './components/Navbar.vue'
    import Main from './components/Main.vue'
</script>

<template>
    <Navbar />
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
    }

    .main-section {
        height: 85vh;
        flex-direction: column;
    }

    @media screen and (max-width: 1020px) {
        .main-section {
            height: auto;
        }
    }
</style>