
<script setup>

import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useUserStore } from '@/stores/userStore';

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')

const userStore = useUserStore()

const sendInscription = () => {
    if(email.value.length == 0 || password.value.length == 0 || email.value == '' || password.value == ''){
            Swal.fire({
            title: "Error",
            text: 'Les champs sont obligatoires',
            icon: "error",
        }).then((result) => {
            if(result.isConfirmed){
                emailError.value = "Saisir l'adresse email"
                passwordError.value = "Saisir  le mot de passe"
            }
        })
    }else{
        let data = {
            email : email.value,
            password : password.value
        }

        userStore.login(data)
    }
}
</script>

<template>
    <div class="page-header align-items-start min-vh-100">
        <span class="mask bg-gradient-dark opacity-1"></span>
        <div class="container my-auto">
            <div class="row mb-5">
                <div class="col-lg-4 col-md-8 col-12 mx-auto">
                    <div class="text-center">
                        <div class="mb-3">
                            <img class="h-100 rounded-circle" src="@/assets/images/logo-ct.png" alt="" style="width: 50%;">
                        </div>
                        <div>
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
            <div class="row">
                <div class="col-lg-4 col-md-8 col-12 mx-auto">
                    <div class="card z-index-0 fadeIn3 fadeInBottom">
                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div class="bg-gradient-color shadow-color border-radius-lg py-3 pe-1">
                                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Connexion</h4>
                                <div class="row mt-3">
                                    <div class="col-2 text-center ms-auto">
                                        <a class="btn btn-link px-3" href="javascript:;">
                                            <i class="fa fa-facebook text-white text-lg"></i>
                                        </a>
                                    </div>
                                    <div class="col-2 text-center px-1">
                                        <a class="btn btn-link px-3" href="javascript:;">
                                            <i class="fa fa-github text-white text-lg"></i>
                                        </a>
                                    </div>
                                    <div class="col-2 text-center me-auto">
                                        <a class="btn btn-link px-3" href="javascript:;">
                                            <i class="fa fa-google text-white text-lg"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form role="form" class="text-start">
                                <div class="my-3">
                                    <div class="input-group input-group-outline">
                                        <input type="email" placeholder="Email" class="form-control" :class="{'border-danger' : emailError != ''}" v-model="email">
                                    </div>
                                    <div class="text-danger email">{{ emailError }}</div>
                                </div>
                                <div class="mb-3">
                                    <div class="input-group input-group-outline">
                                        <input type="password" placeholder="Mot de passe" :class="{'border-danger' : passwordError != ''}" class="form-control" v-model="password">
                                    </div>
                                    <div class="text-danger password">{{ passwordError }}</div>
                                </div>
                                <div class="text-center">
                                    <button @click.prevent="sendInscription" type="button" class="text-white btn bg-gradient-color w-100 my-4 mb-2">Se connecter</button>
                                </div>
                                <p class="mt-4 text-sm text-center">
                                    Vous n'avez pas de compte ?
                                    <router-link :to="{name : 'RegisterView'}" class="text-color  font-weight-bold">S'inscrire</router-link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>