<script>
import Input from "@/components/Input.vue";
import AuthenticateService from "@/services/authenticate.service.js";
import Swal from "sweetalert2";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import store from "@/store/index.js";
import router from "@/router/index.js";

export default {
  name: "LoginComponent",
  data() {
    return {
      showSpinner: false,
      user: {
        username: "",
        password: ""
      },
      authenticateService: new AuthenticateService()
    }
  },
  components: {
    SpinnerComponent,
    Input
  },
  methods: {
    onClick: async function() {
      if (!this.user.username || !this.user.password) {
        await Swal.fire({
          title: '¡Alerta!',
          text: 'Los campos son obligatorios',
          icon: 'warning'
        });
        return;
      }

      this.showSpinner = !this.showSpinner;

      try {
        const response = await this.authenticateService.signIn(this.user);
        const token = response.data.access_token;
        store.commit('setToken',token);
        await router.push("/inicio")
      }catch(e) {
        if(e.response.status === 401) {
          await Swal.fire({
            title: '¡Alerta!',
            text: 'Las credenciales no son válidas',
            icon: 'warning'
          })
        }else {
          await Swal.fire({
            title: 'Ha ocurrido un error',
            text: 'No es posible iniciar sesión',
            icon: 'error'
          })
        }

        store.commit('removeToken');
      }

      this.showSpinner = !this.showSpinner;
    },
    obtainUser: function(text) {
      text = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/g, '');
      this.user.username = text;
    },
    obtainPassword: function(text) {
      text = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s$]/g, '');
      this.user.password = text;
    }
  }
}
</script>

<template>
  <div class="container flex">
    <div class="bingo-header flex">
      <img src="/src/assets/img/bingo-logo.png" alt="Bingo">
    </div>

    <div class="login__content flex">
      <Input type="text" placeholder="Usuario" :login="true" @valueText="obtainUser"/>
      <Input type="password" placeholder="Contraseña" :login="true" @valueText="obtainPassword"/>

      <div class="button" v-if="!showSpinner">
        <div class="button__content" @click="onClick">Ingresar</div>
      </div>

      <div class="container-spinner" v-if = "showSpinner">
        <SpinnerComponent/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bingo-header img {
  width: 70%;
  user-select: none;
  margin-top: 5rem;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  height: 70vh;
  flex-direction: column;
}

.login__content {
  flex-direction: column;
  gap: 1rem;
}

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