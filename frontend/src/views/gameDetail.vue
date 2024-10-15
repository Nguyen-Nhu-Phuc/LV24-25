<template>
  <div class="game-detail" v-if="game">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="heading">{{ game.name }}</h2>
        </v-col>
        <v-col cols="12">
          <v-img :src="getImagePath(game.imgPath)" alt="Game Image" height="400px"></v-img>
        </v-col>
        <v-col cols="12">
          <!-- Preparation Section -->
          <h3 class="sub-heading">Preparation</h3>
          <ul>
            <li v-for="(prep, index) in game.gameplay.Preparation" :key="index">{{ prep }}</li>
          </ul>

          <!-- How to Play Section -->
          <h3 class="sub-heading">How to Play</h3>
          <ul>
            <li v-for="(playStep, index) in game.gameplay['How to Play']" :key="index">{{ playStep }}</li>
          </ul>

          <!-- Rules Section -->
          <h3 class="sub-heading">Rules</h3>
          <ul>
            <li v-for="(rule, index) in game.gameplay.Rules" :key="index">{{ rule }}</li>
          </ul>

          <!-- Significance Section -->
          <h3 class="sub-heading">Significance</h3>
          <ul>
            <li v-for="(significance, index) in game.gameplay.Significance" :key="index">{{ significance }}</li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['id'], // Nhận id từ router
  data() {
    return {
      game: null, // Lưu trữ thông tin trò chơi
    };
  },
  mounted() {
    this.fetchGameDetail();
  },
  methods: {
    async fetchGameDetail() {
      try {
        const response = await fetch('/data.json');
        if (response.ok) {
          const data = await response.json();
          // Tìm trò chơi dựa trên id
          this.game = data.find((game) => game.id === parseInt(this.id));
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    getImagePath(imgPath) {
      // Sử dụng require để đảm bảo ảnh được load đúng cách
      return new URL(`../${imgPath}`, import.meta.url).href;
    }
  },
};
</script>

<style scoped>
.heading {
  text-align: center;
  margin-bottom: 20px;
}

.sub-heading {
  font-size: 18px;
  margin-top: 20px;
}

ul {
  margin-left: 20px;
  list-style-type: disc;
}
</style>
