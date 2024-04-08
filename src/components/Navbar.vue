<template>
    <nav class="navbar">
        <div class="navbar__content flex">
            <img src="/src/assets/img/primax_logo.png" alt="Primax">
        </div>
    </nav>
</template>

<style scoped>

    .navbar {
        padding: 10px 20px;
        position: relative;
    }

    .navbar::after {
        content: "";
        position: fixed;
        top: -120px;
        left: 50%;
        transform: translateX(-50%);
        width: 300px;
        height: 200px;
        border-radius: 50%;
        background-color: #fff;
    }

    .navbar__content img {
        z-index: 1;
        width: 10%;
    }

</style>