<template>
    <div class="main">
      <PopupBallWinner v-if="this.showPopUpBallWinner" @closePopupBallWinner="closePopupBallWinner" :letter="this.letter" :number="this.number"/>

        <Popup 
        v-if="popup"
        :title="title_popup" 
        :detail="detail_popup"
        @closePopup="closePopup"
        />

        <div class="main__content flex">
            <!--<img src="/src/assets/img/maxito.png" alt="Maxito" class="maxito">-->
            
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
                        v-if="!this.showSpinner"
                :noNumbers="popup"
                @emitNumber="changeNumber"
                @noNumbers="anyNumber"/>
                <SpinnerComponent v-if="this.showSpinner"/>
            </div>

            <div class="wrapper flex">
                <p class="new-winner" @click="newWinner">¿Nuevo ganador?</p>

              <div class="megacard">
                <div class="card__content">
                  <p class="bingo__header-item">B</p>
                  <p class="bingo__header-item">I</p>
                  <p class="bingo__header-item">N</p>
                  <p class="bingo__header-item">G</p>
                  <p class="bingo__header-item">O</p>

                  <div class="grid-item" v-for="item in items" :key="item.id" :style="getGridStyle(item)">
                    {{ item.content }}
                  </div>
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
    import PopupBallWinner from "@/components/PopupBallWinner.vue";
    import SpinnerComponent from "@/components/SpinnerComponent.vue";

    export default {
        name: 'Main',
        components: {
          SpinnerComponent,
          PopupBallWinner,
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
              detail_popup: "",
              showPopUpBallWinner: false,
              items: [],
              countRows: {
                1: 2,
                2: 2,
                3: 2,
                4: 2,
                5: 2,
                6: 2,
                7: 2,
                8: 2,
                9: 2,
                10: 2
              },
              showSpinner: false,
              columns: {
                "B1": 1, "B2": 2,
                "I1": 3, "I2": 4,
                "N1": 5, "N2": 6,
                "G1": 7, "G2": 8,
                "O1": 9, "O2": 10
              },
              lastLetter: ""
            }
        },
        methods: {
            changeNumber(data) {
                this.showSpinner = true;
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
                        this.number = data[0];
                        this.lastLetter = this.number;
                        for(let i=0; i<letters.length; ++i) {
                            if(this.number >= range_letters[letters[i]][0] && this.number <= range_letters[letters[i]][1]) {
                                this.letter = letters[i];
                                break;
                            }

                        }
                        clearInterval(interval);
                        this.addItem();
                        this.showSpinner = false;
                        this.showPopUpBallWinner = !this.showPopUpBallWinner;
                    }
                }, 10);
            },
            getGridStyle(item) {
              return {
                gridColumn: `${item.column} / span 1`,
                gridRow: `${item.row} / span 1`,
                color: `${this.lastLetter === item.content ? '#fff' : '#000'}`,
                fontWeight: `${this.lastLetter === item.content ? 'bold' : 'normal'}`,
                backgroundColor: `${this.lastLetter === item.content ? '#1E22AA' : '#fff'}`,
                padding: `${this.lastLetter === item.content ? '0 .5rem' : '0'}`
              };
            },
            addItem() {
              let row = this.columns[`${this.letter}1`];

              if (this.countRows[this.columns[`${this.letter}1`]] >= 10) {
                row = this.columns[`${this.letter}2`];
              }

              this.items.push({
                id: parseInt(this.number),
                row: this.countRows[row],
                column: row,
                content: this.number,
                className: row % 2 === 1 ? 'sub1' : 'sub2'
              });

              this.countRows[row]++;
            },
            anyNumber() {
                //this.clearNumbers();
                this.popup = true;
                this.number = "-";
                this.title_popup = "No hay más números";
                this.detail_popup = "No hay más números disponibles para girar, por favor restablezca los números para continuar.";
                this.showSpinner = false;
            },
            newWinner() {
                this.popup = true;
                this.title_popup = "¡BINGO!";
                this.detail_popup = "¿Desea ingresar un nuevo ganador?";
            },
            clearNumbers(){
                this.popup = false;
                this.items = [];
                this.html_numbers = "";
                this.number = "?";
                this.countRows = {
                  1: 2,
                  2: 2,
                  3: 2,
                  4: 2,
                  5: 2,
                  6: 2,
                  7: 2,
                  8: 2,
                  9: 2,
                  10: 2
                };
                clear_numbers_registered();
                this.showSpinner = false;
            },

            closePopup() {
                this.popup = false;
            },

            closePopupBallWinner() {
                this.showPopUpBallWinner = !this.showPopUpBallWinner
            }

        }
    }

</script>

<style scoped>
  .bingo__header-item {
    background-color: #1E22AA;
    width: 75px;
    color: #fff;
    font-weight: bold;
    border-radius: 20px;
    font-size: 2rem;
    line-height: 20px;
    text-align: center;
    padding: .6rem 0;
  }

    .main {
        margin: 0 auto;
    }

    .main__content {
      gap: 2rem;
      padding: 1rem;
    }

    .card, .megacard {
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

    .megacard {
      min-width: 650px;
      font-size: 2.5rem;
      font-weight: bold;
      padding-top: 2rem;
    }

    .card__content {
      display: grid;
      grid-template-columns: repeat(10, 1fr); /* 2 subcolumnas por cada letra */
      grid-template-rows: repeat(8, 20px);   /* 8 filas para las subcolumnas */
      justify-items: center;
      align-items: center;
      text-align: center;
      row-gap: 1rem;
      position: relative;

    }

  .card__content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 20%;
    right: 0;
    bottom: 0;
    background-image:
        linear-gradient(to right, black 1px, transparent 1px); /* Lineas verticales */
    background-size: calc(100% / 4) 100%; /* 10 columnas para distribuir las lineas */
    pointer-events: none; /* Permite hacer clic en los elementos debajo */
  }


  .card__content p {
      grid-column: span 2;
      grid-row: 1;
    }

    .grid-item {
      font-size: 1.2rem;
      font-weight: lighter;
    }




  .grid-item.sub1 {
      grid-row: span 8;
    }

    .grid-item.sub2 {
      grid-row: span 7;
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

    @media screen and (max-width: 1050px) {
        .main {
            width:auto;
        }
        
        .main__content {
          flex-direction: column;
          gap: 4rem;
        }

        .maxito {
            order: 3;
        }
    }
</style>