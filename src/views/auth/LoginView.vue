
<template>
<img class="logo" src="@/assets/images/logo-ct.png"/>
 <h2 class="titre"> Login Page</h2>
 <form @submit.prevent="login">
 <div class="login">
    <input type="text" placeholder="enter email" />
    <input type="password" placeholder="enter password" />
    <button v-on:click="Login">Login</button>
    <p class="link">
        <RouterLink to="/RegisterView">Register</RouterLink>
    </p>

 </div>
 </form>
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
    position: absolute;
    left: 300px;
}
.login input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;
}
.login button {
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