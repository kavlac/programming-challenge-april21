<template>
  <div id="barra-nav"> 
    <!--Inicio Barra Menu -->
    <header>
      <nav class="navbar navbar-expand-sm navbar-dark bg-primary fixed-top">
        <div class="container-fluid">
          <!-- Logo -->
          <h3 class="text-light pl-2">CHALLENGE SIDIA</h3>

          <!-- Menu de Navegação -->
          <div class="collapse navbar-collapse" id="nav-principal">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <!--botão de Chamada do Modal Cadastro -->
                <!-- <button
                  type="button"
                  class="btn btn-primary"
                  @click="$root.$emit('open-modal')"
                >Cadastrar</button> -->
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <!-- Fim Barra Menu -->
  </div>
</template>

<script>
export default {
    name: "Navbar",
};
</script>

<style lang="scss" scoped>
</style>