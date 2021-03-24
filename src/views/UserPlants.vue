<template>
  <div class="UserPlants">
    <h1>Let's track some plants</h1>
    <section class="content-section" id="plantgalary">
      <div class="container">
        <div class="content-section-heading text-center">
          <h2 class="mb-5">All Your Plants</h2>
        </div>
        <div class="row no-gutters">
          <div v-for="user_plant in user_plants" v-bind:key="user_plant.id" class="col-lg-3">
            <a class="portfolio-item" :href="`/userplants/${user_plant.id}`">
              <div class="caption">
                <div class="caption-content">
                  <div class="h4">{{ user_plant.plant.common_name }}</div>
                  <h6>Owend Since:</h6>
                  <p class="mb-0">{{ user_plant.date_aquired }}</p>
                  <h6>Last Watered:</h6>
                  <p class="mb-0">{{ user_plant.most_recent_watering }}</p>
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
    <section class="content-section   text-center" id="Dashboard">
      <div class="content-section-heading">
        <h2>Dashboard</h2>
      </div>
      <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 px-4">
          <card-table />
        </div>
      </div>
    </section>
    <!-- Search by name:
    <input v-model="nameFilter" type="text" list="plant-names" />
    <datalist id="plant-names">
      <option v-for="user_plant in user_plants" v-bind:key="user_plant.id">{{ user_plant.plant.common_name }}</option>
    </datalist> -->

    <!-- <p>Last Watered: {{ user_plant.waterings }}</p> -->
    <!-- <p v-if="user_plant.user_images">Your Pics:</p>
      <img v-if="user_plant.user_images" v-bind:src="user_plant.user_images" v-bind:alt="user_plant.id" /> -->
    <section class="content-section">
      <div class="container">
        <div class="content-section-heading text-center">
          <h2 class="mb-5" id="TrackNew">Track a New plant</h2>
        </div>
        <select v-model="newPlantId">
          <option v-for="plant in plants" :value="plant.id" v-bind:key="plant.id">{{ plant.common_name }}</option>
        </select>
        Date Aquired:
        <input type="date" v-model="newDateAquired" />
        <button class="btn btn-primary" v-on:click="createUserPlant">submit</button>
      </div>
    </section>
  </div>
</template>
<style scoped>
.img-fixed {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
select {
  border: 1px solid gray;
}
</style>
<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";
import CardTable from "@/components/CardTable.vue";

export default {
  mixins: [Vue2Filters.mixin],
  components: {
    CardTable,
  },
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
          this.$router.push("/userplants#plantgalary");
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
