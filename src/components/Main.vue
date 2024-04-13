<script setup>
    import Button from './Button.vue'
    import { range_letters } from '../services/animation-balls.js'
</script>

<template>
    <div class="main">
        <div class="main__content flex">
            <img src="/src/assets/img/maxito.png" alt="Maxito" class="maxito">
            
            <div class="wrapper flex">
                <div class="card flex">
                    <h2 class="letter">{{ letter }}</h2>
                    <div class="circle">
                        <div class="outer-circle flex"></div>
                        <div class="inner-circle">
                            <span>{{number}}</span>
                        </div>
                    </div>
                </div>

                <Button title="girar" 
                @emitNumber="changeNumber"
                @noNumbers="showPopUp"/>
            </div>

            <div class="wrapper flex">
                <p class="new-winner">¿Nuevo ganador?</p>
                <div class="card flex">
                    <h2 class="numbers-title">Números cantados</h2>
                    <div class="list-balls">
                        <p v-html="html_numbers"></p>
                    </div>
                </div>
                <Button title="restablecer"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Main',
        components: {
            Button
        },

        data() {
            return {
                number: "?",
                letter: "B",
                popup: false,
                html_numbers: ""
            }
        },
        methods: {
            changeNumber(data) {
                let letters = ['B', 'I', 'N', 'G', 'O'];
                let index = 0;
                let indexLetter = 0;
                if (this.popup) return;

                const interval = setInterval(() => {
                    this.number = data[index];
                    this.letter = letters[indexLetter];
                    index++;
                    indexLetter++;
                    if(indexLetter > 4) indexLetter = 0;

                    if (index >= data.length) {
                        console.log('ojo')
                        this.number = data[0];
                        for(let i=0; i<letters.length; ++i) {
                            if(this.number >= range_letters[letters[i]][0] && this.number <= range_letters[letters[i]][1]) {
                                this.letter = letters[i];
                                break;
                            }
                            
                        }
                        clearInterval(interval);
                        this.insertNumber();
                    }
                }, 10);

                
            },

            showPopUp() {
                alert('No hay más números disponibles');
                this.popup = true;
                this.number = "-"
            },

            insertNumber() {
                this.html_numbers += `<p>${this.letter} - ${this.number}</p>`;
            }
        }
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
        width: 100%;

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