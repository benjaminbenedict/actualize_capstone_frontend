<template>
  <div class="home">
    <h1>All Plants</h1>

    <h3>Search by name:</h3>
    <input v-model="nameFilter" type="text" list="plant-names" />
    <datalist id="plant-names">
      <option v-for="plant in plants" v-bind:key="plant.id">{{ plant.common_name }}</option>
    </datalist>

    <section class="content-section" id="portfolio">
      <div class="container">
        <div class="content-section-heading text-center">
          <h3 class="text-secondary mb-0"></h3>
          <h2 class="mb-5">All Plants</h2>
        </div>
        <div class="row no-gutters">
          <div v-for="plant in filterBy(plants, nameFilter, 'common_name')" v-bind:key="plant.id" class="col-lg-6">
            <a class="portfolio-item" :href="`/plants/${plant.id}`">
              <div class="caption">
                <div class="caption-content">
                  <div class="h2">{{ plant.common_name }}</div>
                  <p class="mb-0">{{ plant.description }}</p>
                </div>
              </div>
              <img class="img-fluid img-fixed" v-bind:src="plant.primary_image_url" v-bind:alt="plant.common_name" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- <div v-for="plant in filterBy(plants, nameFilter, 'common_name')" v-bind:key="plant.id">
      <h2>{{ plant.name }}</h2>
      <img v-bind:src="plant.primary_image_url" v-bind:alt="plant.common_name" />
      <p>price: {{ plant.common_name }}</p>
      <p>description {{ plant.description }}</p>
      <router-link v-bind:to="`/plants/${plant.id}`">More details</router-link>
    </div> -->
    <section class="content-section bg-light" id="AddPlant">
      <div class="container text-center">
        <h2 class="mx-auto mb-5">Add a Plant You don't see</h2>
        <p class="lead mb-5">
          Try searching the USDA
          <input type="text" v-model="usdaSearch" />
          <button class="btn btn-primary btn-xl" v-on:click="searchUSDA()">Search</button>
        </p>
        <div v-if="loading">loading...</div>
        <button
          class="btn btn-outline-primary btn-sm m-1"
          v-for="plant in usdaData"
          v-bind:key="plant.accepted.symbol"
          v-on:click="selectPlant(plant)"
        >
          {{ plant.accepted.scientific_name }}
        </button>
      </div>
      <div class="container text-center">
        <form v-on:submit.prevent="createPlant()">
          <div class="form-group">
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
              <img v-if="status" v-bind:src="`https://http.cat/${status}`" v-on:click="status = ''" alt="" />
            </ul>
          </div>
          <div class="form-group">
            <label for="formGroupScientificName">Scientific Name:</label>
            <input type="text" class="form-control" v-model="newScientificName" placeholder="Scientific Name" />
          </div>
          <div class="form-group">
            <label for="formGroupCommonName">Common Name:</label>
            <input type="text" class="form-control" v-model="newCommonName" />
          </div>
          <div class="form-group">
            <label for="formGroupnewPlantFamily">Plant Family:</label>
            <input type="text" class="form-control" v-model="newPlantFamily" />
          </div>
          <div class="form-group">
            <label for="formDescription">Description:</label>
            <input type="text" class="form-control" v-model="newDescription" />
          </div>
          <div class="form-group">
            <label for="formGroupLight">Light Requirment:</label>
            <multiselect v-model="newLight" :options="options"></multiselect>
          </div>
          <div class="form-group">
            <label for="formGroupTemperature">Temperature Requirment:</label>
            <multiselect v-model="newTemperature" :options="temperatures"></multiselect>
          </div>
          <div class="form-group">
            <label for="formGroupHumidity">Humidity Requirment:</label>
            <multiselect v-model="newHumidity" :options="options"></multiselect>
          </div>
          <div class="form-group">
            <label for="formGroupWatering">Watering Frequency:</label>
            <multiselect v-model="newWaterFreq" :options="options"></multiselect>
          </div>
          <div class="form-group">
            <label for="formGroupSoilType">Soil Type:</label>
            <multiselect v-model="newSoilType" :options="soils" :multiple="true"></multiselect>
          </div>
          <div class="form-group">
            <label for="formGroupDifficultyLevel">Difficulty Level:</label>
            <multiselect v-model="newDifficultyLevel" :options="diffculty"></multiselect>
          </div>
          <input class="btn btn-xl btn-light mr-4" type="submit" value="Create" />
        </form>
      </div>
    </section>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.img-fixed {
  width: 100%;
  height: 350px;
  object-fit: cover;
}
</style>
<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      plants: [],
      nameFilter: "",
      newScientificName: "",
      newCommonName: "",
      newPlantFamily: "",
      newDescription: "",
      newLight: "",
      newTemperature: "",
      newHumidity: "",
      newWaterFreq: "",
      newSoilType: "",
      soils: ["Aroid", "African-Violet", "Succulent", "Fast-Drainnng", "Standard Potting Mix"],
      options: ["High", "Medium", "Low"],
      temperatures: ["55-95", "65-85", "70-95"],
      diffculty: ["Easy", "Medium", "Hard"],
      newDifficultyLevel: "",
      usdaSearch: "",
      usdaData: "",
      status: "",
      errors: [],
      loading: false,
    };
  },
  created: function() {
    axios.get("/api/plants").then(response => {
      console.log("plants index", response);
      this.plants = response.data;
    });
  },

  methods: {
    selectPlant(plant) {
      console.log(plant);
      this.newCommonName = plant.accepted.common_name;
      this.newScientificName = plant.accepted.scientific_name;
      this.newPlantFamily = plant.accepted.classification.subclass;
    },
    searchUSDA: function() {
      this.usdaData = [];
      this.loading = true;
      axios.get("/api/usda?search=" + this.usdaSearch).then(response => {
        console.log("usda index", response.data);
        this.usdaData = response.data.message.species_list.results;
        this.loading = false;
      });
    },
    createPlant: function() {
      var params = {
        scientific_name: this.newScientificName,
        common_name: this.newCommonName,
        plant_family: this.newPlantFamily,
        description: this.newDescription,
        light: this.newLight,
        temperature: this.newTemperature,
        humidity: this.newHumidity,
        water_freq: this.newWaterFreq,
        soil_type: this.newSoilType,
        difficulty_level: this.newDifficultyLevel,
      };
      axios
        .post("/api/plants", params)
        .then(response => {
          console.log("plants create", response);
          this.$router.push("/plants");
        })
        .catch(error => {
          console.log("plants create error", error.response);
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
  },
};
</script>
