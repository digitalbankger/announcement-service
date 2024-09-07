<template>
  <div id="app">
    <HeaderComponent :currentUser="currentUser"/>

    <router-view />

    <FooterApp />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderApp.vue';
import FooterApp from '@/components/FooterApp.vue';

export default {
  components: {
    HeaderComponent,
    FooterApp,
  },
};
</script>

<style>
#app {
  font-family: Montserrat;
  font-size: 22px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #27262f;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 100%;
  background-color: #fff;
}
</style>
