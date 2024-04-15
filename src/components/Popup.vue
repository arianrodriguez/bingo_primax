<script setup>
import Button from './Button.vue';
</script>

<template>
    <div class="popup flex">
        <div class="card flex">
            <div class="card__content flex">
                <h2>{{ title }}</h2>
                <div class="card__content-detail">
                    {{ detail }}
                </div>
                <Button
                    title="Aceptar"
                    @click="$emit('closePopup')"
                    class="button-accept"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Popup",
        components: {
            Button
        },
        props: {
            title: {
                type: String
            },
            detail: {
                type: String
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