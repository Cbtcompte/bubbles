<template>
 <img class="logo" src="@/assets/images/logo-ct.png"/>
 <h2 class="titre"> Register Page</h2>
 <div class="register">
    <input type="text" v-model="name" placeholder="enter name">
    <input type="text" v-model="email" placeholder="enter email">
    <input type="password" v-model="password" placeholder="enter password">
    <button v-on:click="register">Register</button>
 </div>

 <p class="link">
        <RouterLink to="/LoginView">Login</RouterLink>
 </p>
</template>

<script setup> 

</script>

<style>
.titre {
    text-align: center;
    color: #154968;
}
.logo {
    width: 110px;
    position: relative;
    margin-left: 180px;
}
.register input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;
}
.register button {
    background-color: #154968;
    position: relative;
    margin-left: 390px;
    width: 320px;
    height: 40px;
    border: 1px solid skyblue;
    color: #fff;
    cursor: pointer;
}
.link {
    text-align: center;
}
</style>