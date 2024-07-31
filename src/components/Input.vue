<template>
    <div class="input">
        <input :type="type" :placeholder="placeholder" v-model="data" @input="onInput">
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: '',
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
        },
        login: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onInput: function() {
            if(this.data.toLowerCase() === import.meta.env.VITE_PASSWORD && this.type === "password") {
                this.$emit('newWinnerDNI', this.data);
            }
          if(!this.login) this.$emit('valueDNI', this.data)
          else {
            this.$emit('valueText', this.data)
          }
        }
    }
}
</script>

<style scoped>
    .input input {
        border: 1px solid #000;
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