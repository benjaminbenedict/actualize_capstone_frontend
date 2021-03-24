<template>
  <div class="home">
    <header class="masthead d-flex">
      <div class="container text-center my-auto">
        <h1 class="mb-1">Welcome To</h1>
        <h1 class="mb-1">Plant Track!</h1>

        <div class="overlay">
          <em>
            <h3 class="mb-2">Try Searching by name:</h3>
            <input v-model="nameFilter" type="text" list="plant-names" />
            <datalist id="plant-names">
              <option v-for="plant in plants" v-bind:key="plant.id">{{ plant.common_name }}</option>
            </datalist>
          </em>
        </div>
      </div>
    </header>

    <section class="content-section" id="portfolio">
      <div class="container">
        <div class="content-section-heading text-center">
          <h3 class="text-secondary mb-0">All Plants</h3>
          <h2 class="mb-5">Our Plant Database</h2>
          <h3 class="text-secondary mb-0">Search</h3>
          <input v-model="nameFilter" type="text" list="plant-names" />
          <datalist id="plant-names">
            <option v-for="plant in plants" v-bind:key="plant.id">{{ plant.common_name }}</option>
          </datalist>
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
          Don't Know the scientific name? Try searching the USDA
          <input type="text" v-model="usdaSearch" />
          <button class="btn btn-primary btn-xl" v-on:click="searchUSDA()">Search</button>
        </p>
        <div v-if="loading">
          <b-spinner variant="success" label="Text Centered"></b-spinner>
          loading...
        </div>
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
            <!-- :multiple="true" find out how to turn array into concatonated string-->
            <multiselect :multiple="true" v-model="newSoilType" :options="soils"></multiselect>
          </div>
          <div class="form-group">
            <label for="formGroupDifficultyLevel">Difficulty Level:</label>
            <multiselect v-model="newDifficultyLevel" :options="diffculty"></multiselect>
          </div>
          <!-- <div class="form-group">
            <label for="formGroupImage">Upload and image:</label>
            <b-form-file
              accept="image/jpeg, image/png, image/gif"
              v-on:change="setFile($event)"
              ref="fileInput"
            ></b-form-file>
          </div> -->
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
import { BSpinner } from "bootstrap-vue";

export default {
  components: { Multiselect, BSpinner },
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
      // newPlantID: "",
      usdaSearch: "",
      usdaData: "",
      // image: "",
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
    // setFile: function(event) {
    //   if (event.target.files.length > 0) {
    //     this.image = event.target.files[0];
    //   }
    // },

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
        soil_type: this.newSoilType.join(", "),
        difficulty_level: this.newDifficultyLevel,
      };
      var formData = new FormData();

      formData.append("image", this.image);

      axios
        .post("/api/plants", params, formData)
        .then(response => {
          // this.$refs.fileInput.value = "";
          console.log("plants create", response);

          // this.$router.push("/plants");
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
