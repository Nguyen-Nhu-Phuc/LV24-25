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
            <v-img :src="item.imgPath" alt="img folk game" height="200px"></v-img>
            <v-card-title class="text-h6" style="text-align: center;">{{ item.name }}</v-card-title>
            <v-card-subtitle style="text-align: center;">{{ item.gameplay }}</v-card-subtitle>
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
      this.$router.push({ name: 'gameDetail', params: { id: item.id, game: item } });
    },
  },
};
</script>

<style scoped>
.heading {
  text-align: center;
}

.game-card {
  cursor: pointer;
}
</style>
