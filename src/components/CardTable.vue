<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-green-900 text-white']"
  >
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]"
            >
              Plant
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]"
            >
              Last Watered
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]"
            >
              Status
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]"
            >
              Users
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]"
            >
              Percent Dry
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                  : 'bg-green-800 text-green-300 border-green-700',
              ]"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user_plant in user_plants" v-bind:key="user_plant.id">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center"
            >
              <img :src="user_plant.primary_image_url" class="h-12 w-12 bg-white rounded-full border" alt="..." />
              <span class="ml-3 font-bold" :class="[color === 'light' ? 'text-gray-700' : 'text-white']">
                {{ user_plant.plant.common_name }}
              </span>
            </th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
              {{ user_plant.most_recent_watering }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
              <i v-if="user_plant.needs_water" class="fas fa-circle text-orange-500 mr-2">needs water</i>
              <i v-else class="fas fa-circle text-green-500 mr-2">watered</i>
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
              <div class="flex">
                <img
                  v-for="user_profile in user_plant.plant.user_profiles"
                  v-bind:key="user_profile"
                  :src="user_profile"
                  alt="..."
                  class="w-10 h-10 rounded-full border-2 border-gray-100 shadow"
                />

                <!-- <img
                  src="https://res.cloudinary.com/benlovesplants89/image/upload/v1616458245/Plant_Track/ben_zmpxmk.jpg"
                  alt="..."
                  class="w-10 h-10 rounded-full border-2 border-gray-100 shadow -ml-4"
                />
                <img
                  src="https://res.cloudinary.com/benlovesplants89/image/upload/v1616442942/Plant_Track/kevin_eqrmm5.jpg"
                  alt="..."
                  class="w-10 h-10 rounded-full border-2 border-gray-100 shadow -ml-4"
                />
                <img
                  src="https://res.cloudinary.com/benlovesplants89/image/upload/v1616442942/Plant_Track/peter_kor89f.jpg"
                  alt="..."
                  class="w-10 h-10 rounded-full border-2 border-gray-100 shadow -ml-4"
                /> -->
              </div>
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
              <div class="flex items-center">
                <span class="mr-2">{{ user_plant.water_level }}%</span>
                <div class="relative w-full">
                  <div class="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                    <div
                      :style="`width: ${user_plant.water_level}%;`"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                    ></div>
                  </div>
                </div>
              </div>
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
              <table-dropdown v-bind:userplant="user_plant" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";
import TableDropdown from "@/components/TableDropdown.vue";

export default {
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
  data() {
    return {
      plants: [],
      user_plants: [],
    };
  },
  components: {
    TableDropdown,
  },
  props: {
    color: {
      default: "light",
      validator: function(value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
};
</script>
