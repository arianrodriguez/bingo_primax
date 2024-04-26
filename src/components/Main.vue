<template>
    <div class="main">
        <Popup 
        v-if="popup"
        :title="title_popup" 
        :detail="detail_popup"
        @closePopup="closePopup"
        @responseWinner="obtainWinner"/>
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
                :noNumbers="popup"
                @emitNumber="changeNumber"
                @noNumbers="anyNumber"/>
            </div>

            <div class="wrapper flex">
                <p class="new-winner" @click="newWinner">¿Nuevo ganador?</p>
                <div class="card flex">
                    <h2 class="numbers-title">Números cantados</h2>
                    <div class="list-balls">
                        <p v-html="html_numbers"></p>
                    </div>
                </div>
                <Button title="restablecer"
                @resetNumbers="clearNumbers"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from "@/components/Button.vue";
    import Popup from "@/components/Popup.vue";
    import { range_letters, clear_numbers_registered } from '../services/animation-balls.js'

    export default {
        name: 'Main',
        components: {
            Button,
            Popup
        },

        data() {
            return {
                number: "?",
                letter: "B",
                popup: false,
                html_numbers: "",
                title_popup: "",
                detail_popup: ""
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

            anyNumber() {
                //this.clearNumbers();
                this.popup = true;
                this.number = "-";
                this.title_popup = "No hay más números";
                this.detail_popup = "No hay más números disponibles para girar, por favor restablezca los números para continuar.";
            },

            newWinner() {
                this.popup = true;
                this.title_popup = "¡BINGO!";
                this.detail_popup = "¿Desea ingresar un nuevo ganador?";
            },

            insertNumber() {
                this.html_numbers += `<p>${this.letter} - ${this.number}</p>`;
            },

            clearNumbers(){
                this.popup = false;
                this.html_numbers = "";
                clear_numbers_registered();
            },

            closePopup() {
                this.popup = false;
            },

            obtainWinner(data) {
              if(data.status === "error") {
                this.title_popup = "Ups!";
                this.detail_popup = "No se ha podido registrar el ganador, posiblemente se trate de un trabajo no activo";
              }
              else {
                this.title_popup = "¡Felicidades!";
                this.detail_popup = `${data.detail.Nombres} de la estación
                ${data.detail.Estacion} con posición
                ${data.detail.Puesto}`;
              }
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
        user-select: none;
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
        flex-grow:1 ;
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
        opacity: .5;
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