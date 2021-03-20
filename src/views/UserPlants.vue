<template>
  <div class="UserPlants">
    <h1>Your Plants</h1>
    <!-- Search by name:
    <input v-model="nameFilter" type="text" list="plant-names" />
    <datalist id="plant-names">
      <option v-for="user_plant in user_plants" v-bind:key="user_plant.id">{{ user_plant.plant.common_name }}</option>
    </datalist> -->
    <section class="content-section" id="portfolio">
      <div class="container">
        <div class="content-section-heading text-center">
          <h3 class="text-secondary mb-0"></h3>
          <h2 class="mb-5">All Your Plants</h2>
        </div>
        <div class="row no-gutters">
          <div v-for="user_plant in user_plants" v-bind:key="user_plant.id" class="col-lg-6">
            <a class="portfolio-item" :href="`/userplants/${user_plant.id}`">
              <div class="caption">
                <div class="caption-content">
                  <div class="h2">{{ user_plant.plant.common_name }}</div>
                  <p class="mb-0">Owend Since: {{ user_plant.date_aquired }}</p>
                  <p class="mb-0">Last Watered: {{ user_plant.most_recent_watering }}</p>
                </div>
              </div>
              <img
                class="img-fluid img-fixed"
                v-bind:src="user_plant.primary_image_url"
                v-bind:alt="user_plant.user_images"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- <p>Last Watered: {{ user_plant.waterings }}</p> -->
    <!-- <p v-if="user_plant.user_images">Your Pics:</p>
      <img v-if="user_plant.user_images" v-bind:src="user_plant.user_images" v-bind:alt="user_plant.id" /> -->

    <h2>Track a New plant</h2>
    <select v-model="newPlantId">
      <option v-for="plant in plants" :value="plant.id" v-bind:key="plant.id">{{ plant.common_name }}</option>
    </select>
    Date Aquired:
    <input type="date" v-model="newDateAquired" />
    <button v-on:click="createUserPlant">submit</button>
  </div>
</template>
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

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      plants: [],
      user_plants: [],
      nameFilter: "",
      newPlantId: "",
      newDateAquired: Date(),
      status: "",
      errors: [],
      // user_plant: {},
    };
  },
  created: function() {
    axios.get("/api/user_plants").then(response => {
      console.log("user_plants index", response);
      this.user_plants = response.data;
    });
    axios.get("/api/plants").then(response => {
      console.log("plants index", response);
      this.plants = response.data;
    });
  },
  methods: {
    createUserPlant: function() {
      var params = {
        plant_id: this.newPlantId,
        date_aquired: this.newDateAquired,
      };
      console.log(params);
      axios
        .post("/api/user_plants", params)
        .then(response => {
          console.log("user plants create", response);
          this.$router.push("/user_plants");
        })
        .catch(error => {
          console.log("user_plants create error", error.response);
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    // destroyUserPlant: function(user_plant) {
    //   axios.delete("/api/user_plants/" + user_plant.id).then(response => {
    //     console.log("user plant destroy", response);
    //     this.$router.push("/userplants");
    //   });
    // },
  },
};
</script>
