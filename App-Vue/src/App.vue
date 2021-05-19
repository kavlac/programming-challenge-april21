<template>
  <div id="app">
    <!-- Componentes -->
    <Navbar></Navbar>
    <Lista :title="title"></Lista>
    
  </div>
</template>
 
<script>
import Lista from "./components/Lista.vue";
import Navbar from "./components/Navbar";


export default {
  name: "app",
  components: {
    Lista,
    Navbar
  },
  data() {
    return {
      title: {
        teste: "teste 34"
      }
    };
  }
};

</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
