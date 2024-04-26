<script setup>
import Button from './Button.vue';
import Input from './Input.vue';
</script>

<template>
    <div class="popup flex">
        <div class="card flex">
            <i class="fa-solid fa-xmark close" @click="$emit('closePopup')"></i>
            <div class="card__content flex">
                <h2>{{ title }}</h2>
                <div class="card__content-detail">
                    {{ detail }}
                </div>

                <div 
                v-if="title === '¡BINGO!'"
                class="form_winner flex"
                style="flex-direction: column; gap:1rem;">
                    <Input 
                        v-if="!input_dni"
                        type="password" 
                        placeholder="Contraseña"
                        @newWinnerDNI="showInputDNI" 
                    />
    
                    <Input 
                        v-if="input_dni"
                        type="text" 
                        placeholder="Ingresa DNI del colaborador"
                        @newWinnerDNI="obtainDNI"
                    />

                    <Button
                        v-if="input_dni"
                        title="confirmar"
                        @click="insertWinner()"
                        class="button-accept"
                    />
                </div>
                
                <Button
                    v-if="title !== '¡BINGO!'"
                    title="aceptar"
                    @click="$emit('closePopup')"
                    class="button-accept"
                />

                
            </div>
        </div>
    </div>
</template>

<script>
    import WinnerService from "@/services/winner.service.js";

    export default {
        data() {
            return {
                input_dni: false,
                dni: '',
                winnerService: new WinnerService()
            }
        },
        name: "Popup",
        components: {
            Button,
            Input
        },
        props: {
            title: {
                type: String
            },
            detail: {
                type: String
            }
        },
        methods: {
            showInputDNI: function() {
                this.input_dni = true;
                console.log('showInputDNI')
            },
            insertWinner: async function() {
                console.log('insertWinner')
                await this.winnerService.insertWinner(this.dni);
            },
            obtainDNI: function(dni) {
              this.dni = dni
            }
        }
    }
</script>

<style scoped>
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;        
    }

    .card {
        background-color: #fff;
        border-radius: 10px;
        margin: 2rem;
        flex-direction: column;
        position: relative;
    }

    .close {
        position: absolute;
        top: 0;
        right: 0;
        padding: .5rem 1rem 0 0;
        font-size: 2rem;
        cursor: pointer;
        transition: all .2s ease-in-out;
    }

    .close:hover {
        opacity: .7;
    }

    .card__content {
        padding: 1.5rem;
        flex-direction: column;
        gap: 2rem;
        text-align: center;
        max-width: 520px; 
    }

    .card__content h2 {
        font-weight: bold;
    }

    .button-accept {
        margin: 0
    }
</style>