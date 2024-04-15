<script setup>
    import { generate_ball, animation_numbers_random } from '../services/animation-balls.js'
    defineProps({
        title: {
            type: String,
            required: true
        },
        noNumbers: {
            type: Boolean
        }
    });
</script>

<script>
    export default {
        name: 'Button',
        methods: {
            onClick() {
                if(this.title === "girar" && !this.noNumbers) {
                    let number = generate_ball()
                    if(!number) this.$emit('noNumbers')
                
                    let data = [number];
                    console.log('number: ', number)
    
                    for(let i=0; i<100; i++) {
                        let number = animation_numbers_random();
                        data.push(number);
                    }
                    this.$emit('emitNumber', data);   
                }else if(this.title === "restablecer") {
                    this.$emit('resetNumbers')
                }else if(this.title === "confirmar") {
                    // backend
                    console.log('nuevo ganador');
                }
            }
        }
    }
</script>

<template>
    <div class="button">
        <div class="button__content" @click="onClick">{{ title }}</div>
    </div>
</template>


<style scoped>
    .button {
        background-color: #1E22AA;
        color: #fff;
        border-radius: 20px;
        cursor: pointer;
        transition: all .3s ease-in-out;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1.3rem;
        text-align: center;
        width: 100%;
        user-select: none;
    }

    .button__content {        
        padding: .3rem 1rem;
    }

    .button:hover {
        background-color: #1E22FF;
    }

    @media screen and (max-width: 1020px) {
        .button {
            margin-bottom: 5rem;
        }
    }
</style>