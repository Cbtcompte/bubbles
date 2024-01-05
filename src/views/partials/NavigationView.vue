<script setup>
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
 <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-color" id="sidenav-main">
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a class="navbar-brand m-0" href="/" target="_blank">
        <img src="@/assets/images/logo-ct.png" class="navbar-brand-img h-100 rounded-circle" alt="main_logo">
        <span class="ms-3 fs-5 font-weight-bold text-white">Bubbles App</span>
      </a>
    </div>
    <hr class="horizontal light mt-0 mb-2">
    <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link text-white" :class="{'active bg-gradient-primary' : router.currentRoute.value.name == 'home'}"  :to="{name : 'home'}">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">dashboard</i>
            </div>
            <span class="nav-link-text ms-1">Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" :class="{'active bg-gradient-primary' : router.currentRoute.value.name == 'graph'}" :to="{name : 'graph'}">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="fas fa-bullseye opacity-10"></i>
            </div>
            <span class="nav-link-text ms-1">Visualisation des données</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" :class="{'active bg-gradient-primary' : router.currentRoute.value.name == 'json'}" :to="{name : 'json'}">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="fas fa-code opacity-10"></i>
            </div>
            <span class="nav-link-text ms-1">Créer mon fichier Json</span>
          </router-link>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link text-white " href="../pages/billing.html">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">receipt_long</i>
            </div>
            <span class="nav-link-text ms-1">Billing</span>
          </a>
        </li> -->
        <!-- <li class="nav-item">
          <a class="nav-link text-white " href="../pages/virtual-reality.html">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">view_in_ar</i>
            </div>
            <span class="nav-link-text ms-1">Virtual Reality</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="../pages/rtl.html">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">format_textdirection_r_to_l</i>
            </div>
            <span class="nav-link-text ms-1">RTL</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="../pages/notifications.html">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">notifications</i>
            </div>
            <span class="nav-link-text ms-1">Notifications</span>
          </a>
        </li> -->
        <li class="nav-item mt-3">
          <h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Mon compte</h6>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="../pages/profile.html">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">person</i>
            </div>
            <span class="nav-link-text ms-1">Profil</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white " href="../pages/sign-in.html">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">logout</i>
            </div>
            <span class="nav-link-text ms-1">Déconnexion</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="sidenav-footer position-absolute w-100 bottom-0 ">
      <div class="mx-3">
        <router-link :to="{name : 'LoginView'}">
          <button class="btn bg-gradient-white bg-white w-100 text-color">
              Connectez-vous
          </button>
        </router-link>
      </div>
    </div>
  </aside>
</template>