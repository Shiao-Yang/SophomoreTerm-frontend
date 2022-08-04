<template>
  <div class="home">
    <SideNavigation></SideNavigation>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import SideNavigation from "@/components/SideNavigation";

export default {
  name: 'HomeView',
  components: {
    SideNavigation,
  }
}
</script>
