<template>
  <div class="UserPlants">
    <h1>Your Plants</h1>
    <!-- Search by name:
    <input v-model="nameFilter" type="text" list="plant-names" />
    <datalist id="plant-names">
      <option v-for="user_plant in user_plants" v-bind:key="user_plant.id">{{ user_plant.plant.common_name }}</option>
    </datalist> -->

    <div v-for="user_plant in user_plants" v-bind:key="user_plant.id">
      <h2>{{ user_plant.plant.common_name }}</h2>
      <img v-bind:src="user_plant.primary_image_url" v-bind:alt="user_plant.user_images" />
      <p>Owend Since: {{ user_plant.date_aquired }}</p>
      <router-link v-bind:to="`/userplants/${user_plant.id}`">More details</router-link>

      <!-- <p>Last Watered: {{ user_plant.waterings }}</p> -->
      <!-- <p v-if="user_plant.user_images">Your Pics:</p>
      <img v-if="user_plant.user_images" v-bind:src="user_plant.user_images" v-bind:alt="user_plant.id" /> -->
    </div>
    <h2>Track a New plant</h2>
  </div>
</template>
<style scoped>
img {
  width: 300px;
}
.cta-100 {
  margin-top: 100px;
  padding-left: 8%;
  padding-top: 7%;
}
.col-md-4 {
  padding-bottom: 20px;
}

.white {
  color: #fff !important;
}
.mt {
  float: left;
  margin-top: -20px;
  padding-top: 20px;
}
.bg-blue-ui {
  background-color: #708198 !important;
}
figure img {
  width: 300px;
}

#blogCarousel {
  padding-bottom: 100px;
}

.blog .carousel-indicators {
  left: 0;
  top: -50px;
  height: 50%;
}

/* The colour of the indicators */

.blog .carousel-indicators li {
  background: #708198;
  border-radius: 50%;
  width: 8px;
  height: 8px;
}

.blog .carousel-indicators .active {
  background: #0fc9af;
}

.item-carousel-blog-block {
  outline: medium none;
  padding: 15px;
}

.item-box-blog {
  border: 1px solid #dadada;
  text-align: center;
  z-index: 4;
  padding: 20px;
}

.item-box-blog-image {
  position: relative;
}

.item-box-blog-image figure img {
  width: 100%;
  height: auto;
}

.item-box-blog-date {
  position: absolute;
  z-index: 5;
  padding: 4px 20px;
  top: -20px;
  right: 8px;
  background-color: #41cb52;
}

.item-box-blog-date span {
  color: #fff;
  display: block;
  text-align: center;
  line-height: 1.2;
}

.item-box-blog-date span.mon {
  font-size: 18px;
}

.item-box-blog-date span.day {
  font-size: 16px;
}

.item-box-blog-body {
  padding: 10px;
}

.item-heading-blog a h5 {
  margin: 0;
  line-height: 1;
  text-decoration: none;
  transition: color 0.3s;
}

.item-box-blog-heading a {
  text-decoration: none;
}

.item-box-blog-data p {
  font-size: 13px;
}

.item-box-blog-data p i {
  font-size: 12px;
}

.item-box-blog-text {
  max-height: 100px;
  overflow: hidden;
}

.mt-10 {
  float: left;
  margin-top: -10px;
  padding-top: 10px;
}

.btn.bg-blue-ui.white.read {
  cursor: pointer;
  padding: 4px 20px;
  float: left;
  margin-top: 10px;
}

.btn.bg-blue-ui.white.read:hover {
  box-shadow: 0px 5px 15px inset #4d5f77;
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
      newDateAquired: "",
      status: "",
      errors: [],
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
      axios
        .post("/api/user_plants", params)
        .then(response => {
          console.log("user plants create", response);
          this.$router.push("/user_plants");
        })
        .catch(error => {
          console.log("user plants create error", error.response);
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
  },
};
</script>
