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

    <!-- Button trigger modal -->
    <button v-if="isLoggedIn()" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Add this Plant
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">When Did You Aquire this {{ plant.common_name }} ?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="date" v-model="newDateAquired" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button v-on:click="createUserPlant()" type="button" class="btn btn-primary">Track</button>
          </div>
        </div>
      </div>
    </div>

    <section>
      <div class="container text-center">
        <a class="btn btn-primary btn-xl" href="/">Back to all plants</a>
      </div>
    </section>
    <router-link to="/">Back to all plants</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      plant: {},
      newPlantId: "",
      newDateAquired: Date(),
    };
  },
  created: function() {
    axios.get("/api/plants/" + this.$route.params.id).then(response => {
      console.log("plants show", response);
      this.plant = response.data;
      this.newPlantId = this.plant.id;
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
    isLoggedIn: function() {
      return !!localStorage.getItem("jwt");
    },

    // destroyplant: function(plant) {
    //   axios.delete("/api/plants/" + plant.id).then(response => {
    //     console.log("plants destroy", response);
    //     this.$router.push("/plants");
    //   });
    // },
  },
};
</script>
