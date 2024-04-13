<script setup>
    import Button from './Button.vue'
</script>

<template>
    <div class="main">
        <div class="main__content flex">
            <img src="/src/assets/img/maxito.png" alt="Maxito" class="maxito">
            
            <div class="wrapper flex">
                <div class="card flex">
                    <h2 class="letter">N</h2>
                    <div class="circle">
                        <div class="outer-circle flex"></div>
                        <div class="inner-circle">
                            <span>43</span>
                        </div>
                    </div>
                </div>

                <Button title="girar"/>
            </div>

            <div class="wrapper flex">
                <p class="new-winner">¿Nuevo ganador?</p>
                <div class="card flex">
                    <h2 class="numbers-title">Números cantados</h2>
                    <div class="list-balls">
                        <p>B - 15</p>
                        <p>I - 45</p>
                        <p>N - 25</p>
                        <p>G - 65</p>
                        <p>O - 85</p>
                        <p>O - 85</p>
                        <p>O - 85</p>
                        <p>O - 85</p>
                        <p>O - 85</p>
                    </div>
                </div>
                <Button title="restablecer"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Main'
    }
</script>

<style scoped>
    .main {
        width: 960px;
        margin: 0 auto;
    }

    .main__content {
        justify-content: space-between;
    }

    .card {
        min-width: 240px;
        min-height: 350px;
        max-width: 240px;
        max-height: 350px;
        flex-direction: column;
        background-color: #fff;
        border-radius: 25px;
        box-shadow: -10px 5px 10px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        padding: 1rem;
        justify-content: space-around;
    }

    .ball {
        widows: 80%;
        height: 200px;
    }

    .wrapper {
        flex-direction: column;
        gap: 2rem;
        position: relative;
    }

    .maxito {
        width: 205px;
    }

    .letter, .ball {
        font-size: 5rem;
        font-weight: bold;
    }

    .circle {
        width: 170px;
        height: 170px;
        position: relative;
    }

    .outer-circle, .inner-circle {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .outer-circle {
        background-color: #FFBD59;
    }

    .inner-circle {
        width: 80%;
        height: 80%;
        background-color: #FF9100;
        margin: 10%;
    }

    .inner-circle span {
        font-size: 5rem;
        font-weight: bold;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .numbers-title {
        font-size: 1.2rem;
    }

    .list-balls {
        font-size: 2rem;
        text-align: center;
        overflow-y: scroll;

    }

    .new-winner {
        position: absolute;
        top: -10%;
        font-size: 1.2rem;
        color: #fff;
        font-style: italic;
        transition: all .3s ease-in-out;
        cursor: pointer;
    }

    .new-winner:hover {
        opacity: .7;
    }


    @media screen and (max-width: 1020px) {
        .main {
            width:auto;
        }
        
        .main__content {
            flex-direction: column;
        }

        .maxito {
            order: 3;
        }
    }
</style>