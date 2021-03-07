<template>
  <v-app>
    <ozel-navbar></ozel-navbar>
    <uyarilar></uyarilar>
    <kelime-tablosu></kelime-tablosu>
  </v-app>
</template>

<script>
import KelimeTablosu from './components/KelimeTablosu.vue';
import OzelNavbar from './components/OzelNavbar.vue';
import Uyarilar from './components/Uyarilar.vue';

export default {
  components: { KelimeTablosu, OzelNavbar, Uyarilar },
  name: 'App',
};
</script>


<style>
#app{
  background-color: #fafafa;
}
#app .v-data-table{
  box-shadow: none !important;
}

#app .v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content{
    box-shadow: none !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
    margin: 0 !important;
}
</style>
