<template>
    <div class="input">
        <input :type="type" :placeholder="placeholder" v-model="data" @input="onInput">
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: ''
        }
    },

    name: 'Input',
    props: {
        placeholder: {
            type: String
        },
        type: {
            type: String,
            required: true
        }
    },
    methods: {
        onInput: function() {
            if(this.data.toLowerCase() === "andrews" && this.type === "password") {
                console.log('ESTIMATED')
                this.$emit('newWinnerDNI', this.data);
                this.data = '';
            }
        }
    }
}
</script>

<style scoped>
    .input input {
        border: 2px solid #000;
        padding: .5rem;
        border-radius: 10px;
        font-family: "Poppins", sans-serif;
        font-size: 1rem;
        font-weight: bold;
        background-color: #fff;
        outline: none;
        width: 100%;
    }
</style>