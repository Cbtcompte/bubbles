<script setup>
    import NavigationView from '@/views/partials/NavigationView.vue';
    // import FooterView from '@/views/partials/FooterView.vue'
</script>
    
<template>
  <!-- Navigation Partial -->
    <navigation-view></navigation-view>

    <!-- Main content -->
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      
      <!-- Entete breadcrumb -->
      <!-- <entete-view></entete-view> -->

      <!-- Body content -->
      <div class="container-fluid py-4">
        <router-view></router-view>
      </div>

      <!-- Footer page -->
      <!-- <footer-view></footer-view> -->
    </main>
</template>
    