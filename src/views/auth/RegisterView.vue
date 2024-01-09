
<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

import { useUserStore } from '@/stores/userStore'

const user = useUserStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmpassword = ref('')
const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmpasswordError = ref('')

const sendInscription = () => {
    if(email.value.length == 0 || password.value.length == 0 || email.value == '' || password.value == '' || name.value == '' || name.value.length == 0){
        Swal.fire({
            title: "Error",
            text: 'Les champs sont obligatoires',
            icon: "error",
        }).then((result) => {
            if(result.isConfirmed){
                nameError.value = "Saisir le nom d'utilisateur"
                emailError.value = "Saisir l'adresse email"
                passwordError.value = "Saisir  le mot de passe"
            }
        })
    }else if(password.value != confirmpassword.value){
        confirmpasswordError.value = "Mot de passe incorrect"
    }else {
        register();
    }
}

const register = async () => {
    let data = {
        name : name.value,
        email : email.value,
        password : password.value
    }

    await user.register(data)

}
</script>

<template>
    <div class="page-header align-items-start min-vh-100">
        <span class="mask bg-gradient-dark opacity-1"></span>
        <div class="container my-auto">
            <div class="row">
                <div class="col-lg-4 col-md-8 col-12 mx-auto">
                    <div class="card z-index-0 fadeIn3 fadeInBottom">
                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div class="bg-gradient-color shadow-color border-radius-lg py-3 pe-1">
                                <div class="mb-3" style="text-align: center">
                                    <img class="h-100 rounded-circle" src="@/assets/images/logo-ct.png" alt="" style="width: 20%;">
                                </div>
                                <h6 class="text-white font-weight-bolder text-center mt-2 mb-0">Inscription</h6>
                                <div class="row mt-3">
                                    <div style="text-align: center">
                                        <router-link :to="{name : 'home'}">
                                            <button class="btn btn-primary">
                                                <i class="fa fa-home"></i>
                                                Accueil
                                            </button>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form role="form" class="text-start">
                                <div class="my-3">
                                    <div class="input-group input-group-outline ">
                                        <label class="form-label">Nom d'utilisateur</label>
                                        <input type="text" class="form-control" :class="{'border-danger' : nameError != ''}" v-model="name">
                                    </div>
                                    <div class="text-danger name">{{ nameError }}</div>
                                </div>
                                <div class="my-3">
                                    <div class="input-group input-group-outline ">
                                        <label class="form-label">Email</label>
                                        <input type="email" class="form-control" :class="{'border-danger' : emailError != ''}" v-model="email">
                                    </div>
                                    <div class="text-danger email">{{ emailError }}</div>
                                </div>
                                <div class="my-3">
                                    <div class="input-group input-group-outline ">
                                        <label class="form-label">Mot de passe</label>
                                        <input type="password" class="form-control" :class="{'border-danger' : passwordError != ''}" v-model="password">
                                    </div>
                                    <div class="text-danger password">{{ passwordError }}</div>
                                </div>
                                <div class=" mb-3">
                                    <div class="input-group input-group-outline">
                                        <label class="form-label">Confirmer votre mot de passe</label>
                                        <input type="password" class="form-control" :class="{'border-danger' : confirmpasswordError != ''}" v-model="confirmpassword">
                                    </div>
                                    <div class="text-danger confirmpassword">{{ confirmpasswordError }}</div>
                                </div>
                                <div class="text-center">
                                    <button @click.prevent="sendInscription" type="button" class="text-white btn bg-gradient-color w-100 my-4 mb-2">S'inscrire</button>
                                </div>
                                <p class="mt-4 text-sm text-center">
                                    Vous avez déjà un compte ?
                                    <router-link :to="{name : 'LoginView'}" class="text-color  font-weight-bold">Se connecter</router-link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>