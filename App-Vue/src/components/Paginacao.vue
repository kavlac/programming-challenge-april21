<template>
  <div>
    <!-- Paginação -->
    <nav>
      <ul class="pagination justify-content-center">
        <li :class="disabled">
          <a
            class="page-link"
            @click="anterior"
            tabindex="-1"
            aria-disabled="true"
          >Anterior</a>
        </li>
        <li class="page-item active" aria-current="page">
          <a class="page-link" href="#">
            {{paginaAtual}}
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li :class="disabledNext">
          <a class="page-link" @click="proxima" href="#">Proxima</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Paginacao",
  props: {
    paginaAtual: Number,
    ultimaPagina:Number
  },
  data() {
    return{
         disabled: "page-item disabled",
         disabledNext:"page-item"
    }
   
  },
  
  methods: {
    proxima() {
      this.disabled = "page-item";
      if (this.ultimaPagina != 0) {
        this.$emit("evento", true);
      }
      else this.disabledNext ="page-item disabled";
    },
    anterior() {
      if (this.paginaAtual == 1 || this.ultimaPagina == 0) 
        this.disabled = "page-item disabled";
      else
        this.$emit("evento", false);
      
    }
  }
};
</script>