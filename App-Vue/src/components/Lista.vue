<template>
  <!-- Tabela -->
  <div class="container">
    <div class="row justify-content-center pt-4">
      <i class="fas fa-film fa-5x"></i>
    </div>
    <div>
      <b-form-group
        label="Selecione o tipo de pesquisa"
        v-slot="{ ariaDescribedby }"
      >
        <b-form-radio-group
          id="radio-slots"
          v-model="find"
          :aria-describedby="ariaDescribedby"
          name="radio-options-slots"
        >
          <!-- Radios in the default slot will appear after any option generated radios -->
          <b-form-radio :value="true">Buscar por Genero e Ano</b-form-radio>
          <b-form-radio :value="false">Buscar por Classificação</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </div>
    <!-- Campo Pesquisa Genero e Ano -->
    <div v-if="find == true" class="row mt-3 mb-3 justify-content-center">
      <div class="col-md-3 pr-0">
        <b-form-group
          label="Genero:"
          label-for="genres"
          label-cols-sm="4"
          label-align-sm="right"
        >
          <b-form-select
            v-model="selectedGenre"
            id="genres"
            :options="genres"
            class="mb-1"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>

        </b-form-group>
      </div>
      <div class="col-md-3 pl-0 pr-0">
        <b-form-group
          label="Ano:"
          label-for="years"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-form-select
            v-model="selectedYear"
            :options="years"
            id="years"
            class="mb-1"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>

        </b-form-group>
      </div>
      <div class="col-md-2 pl-0">
        <button @click="pesquisar(find)" type="button" class="btn btn-primary">
          Buscar
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
    <!-- Campo Pesquisa Classificacao -->
    <div v-else class="row mt-3 mb-3 justify-content-center">
      <div class="col-md-6 pr-0">
        <b-form-group
          label="Classificação:"
          label-for="ratings"
          label-cols-sm="4"
          label-align-sm="right"
        >
          <b-form-select
            v-model="selectedRatings"
            id="ratings"
            :options="ratings"
            class="mb-1"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>
        </b-form-group>
      </div>

      <div class="col-md-2 pl-0">
        <button @click="pesquisar(find)" type="button" class="btn btn-primary">
          Buscar
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
    <div v-if="resp == false">
    <div class="col justify-content-between">
      <b-spinner
        :variant="{light}"
        :key="{light}"
      ></b-spinner>
    </div>
    <div class="col justify-content-between">
      <b-spinner
        :variant="{light}"
        :key="{light}"
        type="grow"
      ></b-spinner>
    </div>
    </div>
      <div v-else>
    <!-- Texto Cabeçalho -->
    <div class="row">
      <div class="col-12 mb-2 text-center">
        <h3 class="text-muted">Lista de Filmes</h3>
      </div>
    </div>
    <!-- Tabela Genero e Ano -->
    <div v-if="find == true" id="myTable" class="row justify-content-center">
      <div class="col-12">
        <table class="table">
          <!-- Cabeçalho -->
          <thead>
            <tr>
              <th>Id Filme</th>
              <th>Titulo</th>
              <th>Ano</th>
            </tr>
          </thead>
          <!-- Registros -->
          <tbody>
            <tr v-for="result in results" :key="result" class="movies-genres">
              <td>{{ result.moviesId }}</td>
              <td>{{ result.title }}</td>
              <td>{{ result.year }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
     <!-- Tabela Classificacao -->
    <div v-else id="myTable" class="row justify-content-center">
      <div class="col-12">
        <table class="table">
          <!-- Cabeçalho -->
          <thead>
            <tr>
              <th>Id Filme</th>
              <th>Titulo</th>
              <th>Classificacao</th>
            </tr>
          </thead>
          <!-- Registros -->
          <tbody>
            <tr v-for="resultRatings in results" :key="resultRatings" class="movies-raings">
              <td>{{ resultRatings.moviesId }}</td>
              <td>{{ resultRatings.title }}</td>
              <td>{{ resultRatings.rating }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   
    <!-- Paginação -->
    <Paginacao :paginaAtual="paginaAtual" :ultimaPagina="ultimaPagina" @evento="estado"></Paginacao>
  </div>
   </div>
</template>



<script>
// importações dos componentes
import axios from "axios";
import Paginacao from "./Paginacao";
export default {
  name: "Lista",
  components: {
    Paginacao,
  },
  props: {
    title: Object,
  },
  data() {
    return {
      ultimaPagina: 1,
      paginaAtual: 1,
      find: true,
      resp: false,
      selectedGenre: "Animation",
      genres: [
        "Action",
        "Adventure",
        "Animation",
        "Children",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Fantasy",
        "FilmNoir",
        "Horror",
        "Musical",
        "Mystery",
        "Romance",
        "SciFi",
        "Thriller",
        "War",
        "Western",
      ],
      selectedYear: 1995,
      years: [],
      selectedRatings: 3,
      ratings: [],
      results: null,
    };
  },

  created: function () {
    this.listar();
    this.insertYearAndRatings();
  },

  watch: {
    find(novo, antigo) {
      this.resp = false;
      this.paginaAtual = 1;
       this.results = null;
        this.listar();
      
    },
  },
  computed: {},
  methods: {
    insertYearAndRatings() {
      for (let i = 2019; i > 1889; i--) this.years.push(i);
      for (let i = 0.5; i < 5.5; i += 0.5) this.ratings.push(i);
    },

    async pesquisar(value) {
      let url = "";
      let output;
      this.find = value;
      console.log("valor: ", value);
      if (value){
        url =
          "http://localhost:7070/" +
          "findmovies?year=" +
          this.selectedYear +
          "&genre=" +
          this.selectedGenre;

      }else{
        url =
          "http://localhost:7070/" +
          "findbyratings?ratings=" +
          this.selectedRatings;
      }
        

      let config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      };
      await axios
        .get(url, config)
        .then((r) => {
          this.results = r.data.data;
          output = true;
          console.log("sucesso");
          this.resp = true;
        })
        .catch((error) => {
          output = false;
          console.log("fracasso", error);
        });

      console.log("saida", output);
      if (output) {
        console.log("Resultado:", this.results);
      } else {
        alert("Dados não encontrados");
      }
    },

    estado(value) {
      if (value) this.paginaAtual++;
      else this.paginaAtual--;

      this.paginacao();
    },

    async paginacao() {
      let url = "";
        let output;
       if (this.find){
        url =
          "http://localhost:7070/" +
          "findmovies?year=" +
          this.selectedYear +
          "&genre=" +
          this.selectedGenre +
          "&page="+this.paginaAtual;

      }else{
        url =
          "http://localhost:7070/" +
          "findbyratings?ratings=" +
          this.selectedRatings +
          "&page="+this.paginaAtual;
      }

        let config = {
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        };
        await axios
          .get(url, config)
          .then((r) => {
            this.results = r.data.data;
            output = true;
            console.log("sucesso");
            this.resp = true;
          })
          .catch((error) => {
            output = false;
            console.log("fracasso", error);
          });

        console.log("saida", output);
        if (output) {
          console.log("Resultado:", this.results);
        } else {
          alert("Dados não encontrados");
        }
    },

    async listar() {
      let url = "";
      let output;
      if (this.find){
        url =
          "http://localhost:7070/" +
          "findmovies?year=" +
          this.selectedYear +
          "&genre=" +
          this.selectedGenre;

      }else{
        url =
          "http://localhost:7070/" +
          "findbyratings?ratings=" +
          this.selectedRatings;
      }
      let config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      };
      await axios
        .get(url, config)
        .then((r) => {
          this.results = r.data.data;
          output = true;
          console.log("sucesso");
          this.resp = true;
        })
        .catch((error) => {
          output = false;
          console.log("fracasso", error);
        });

      console.log("saida", output);
      if (output) {
        console.log("Resultado:", this.results);
      } else {
        alert("Dados não encontrados");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 440px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.container {
  /* background-image: url("../assets/logo.png"); */
  
  position: relative;
  height: 100%;
  /* opacity: 0.5; */
  background-repeat: no-repeat;
  background-size: 30rem;
  background-position: center;
  background-attachment: fixed;
  background-position-y: 40vh;
}

#myTable {
  height: 28em;
  overflow: auto;
}

/* Small devices (landscape phones, 576px and up) */
@media (max-width: 576px) {
  .container {
    background-size: 20rem;
  }
  #bt-excluir {
    margin-top: 3px;
  }

  #myTable {
    height: auto;
    overflow: visible;
  }
}
</style>
