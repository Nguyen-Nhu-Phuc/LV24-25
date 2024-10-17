<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="heading">Vietnamese Folk Games</h2>
        </v-col>
      </v-row>

      <v-row v-if="jsonData">
        <v-col cols="3" v-for="item in jsonData" :key="item.id">
          <v-card @click="goToDetail(item)" class="game-card">
            <v-img :src="item.imgPath" alt="img folk game" height="100%"></v-img>
            <v-card-title class="text-h6" style="text-align: center;">{{ item.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jsonData: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('/data.json');
        if (response.ok) {
          const data = await response.json();
          this.jsonData = data;
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    goToDetail(item) {
      console.log(item);  // Kiểm tra xem 'item' có 'id' hay không
      if (item && item.id) {
        this.$router.push({ name: 'gameDetail', params: { id: item.id } });
      } else {
        console.error('Invalid item or missing id');
      }
    }

    ,
  },
};
</script>

<style scoped>
.heading {
  /* border: 2px solid #007cc2; */
  /* border-radius: 5px; */
  text-align: center;
}

.game-card {
  /* border: 1px solid #007cc2; */
  /* border-radius: 5px; */
  cursor: pointer;
}

.text-h6 {
  /* border: 1px solid #007cc2; */
  /* border-radius: 5px; */
}
</style>