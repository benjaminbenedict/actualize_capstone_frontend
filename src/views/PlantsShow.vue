<template>
  <div class="plants-show">
    <h2>{{ plant.common_name }}</h2>
    <img v-bind:src="plant.primary_image_url" v-bind:alt="plant.id" />
    <p>Scientific Name: {{ plant.scientific_name }}</p>
    <p>Plant Family: {{ plant.plant_family }}</p>
    <p>Light: {{ plant.light }}</p>
    <p>Temperature Range: {{ plant.temperature }} deegrees F</p>
    <p>Humidity Level: {{ plant.humidity }}</p>
    <p>Watering Frequency: {{ plant.water_freq }}</p>
    <p>Soil Type: {{ plant.soil_type }}</p>
    <p>description: {{ plant.description }}</p>
    <!-- <router-link v-if="plant.is_admin" v-bind:to="`/plants/${plant.id}/edit`">Edit plant</router-link>
    <button v-if="plant.is_admin" v-on:click="destroyplant(plant)">Destroy plant</button> -->
    <router-link to="/">Back to all plants</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      plant: {},
    };
  },
  created: function() {
    axios.get("/api/plants/" + this.$route.params.id).then(response => {
      console.log("plants show", response);
      this.plant = response.data;
    });
  },
  methods: {
    // destroyplant: function(plant) {
    //   axios.delete("/api/plants/" + plant.id).then(response => {
    //     console.log("plants destroy", response);
    //     this.$router.push("/plants");
    //   });
    // },
  },
};
</script>
