<script setup>
    defineProps({
        title: {
            type: String,
            required: true
        }
    });
</script>

<script>
    export default {
        name: 'Button'
    }
</script>

<template>
    <div class="button">
        <div class="button__content">{{ title }}</div>
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