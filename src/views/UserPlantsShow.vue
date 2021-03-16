<template>
  <div class="userplants-show">
    <img v-bind:src="userplant.primary_image_url" v-bind:alt="userplant.id" />
    <h2>{{ userplant.plant.common_name }}</h2>
    <p>Scientific Name: {{ userplant.plant.scientific_name }}</p>
    <p>Plant Family: {{ userplant.plant.plant_family }}</p>
    <p>Light: {{ userplant.plant.light }}</p>
    <p>Temperature Range: {{ userplant.plant.temperature }} deegrees F</p>
    <p>Humidity Level: {{ userplant.plant.humidity }}</p>
    <p>Watering Frequency: {{ userplant.plant.water_freq }}</p>
    <p>Soil Type: {{ userplant.plant.soil_type }}</p>
    <p>description: {{ userplant.plant.description }}</p>
    <h3>Watering Dates:</h3>
    <div v-for="watering in userplant.waterings" v-bind:key="watering.id">
      <p>{{ watering.date }}</p>
    </div>
    <h2>Water this plant</h2>
    <form v-on:submit.prevent="createWatering()">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
        <img v-if="status" v-bind:src="`https://http.cat/${status}`" v-on:click="status = ''" alt="" />
      </ul>
      date:
      <input type="date" v-model="newDate" />
      <input type="submit" value="Create" />
    </form>
    <router-link to="/userplants/">Back to all your plants</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      userplant: { plant: {}, waterings: {} },
      newDate: Date(),
      status: "",
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/user_plants/" + this.$route.params.id).then(response => {
      console.log("plants show", response);
      this.userplant = response.data;
    });
  },
  methods: {
    createWatering: function() {
      var params = {
        date: this.newDate,
        user_plant_id: this.userplant.id,
      };
      axios
        .post("/api/waterings", params)
        .then(response => {
          console.log("watering create", response);
        })
        .catch(error => {
          console.log("waterings create error", error.response);
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
  },
};
</script>
