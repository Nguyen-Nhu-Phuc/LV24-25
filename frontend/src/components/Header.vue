<template>
    <header class="header">
        <v-container class="header__container">
            <v-row class="align-center justify-center">
                <v-col class="category" cols="2">
                    <div class="">
                        <router-link :to="{ name: 'home' }" class="categories-item__link"
                            :class="{ 'active-link': isActive === 'home' }" @click="isActive = 'home'">
                            <p class="frame__name"> Csuhpi<span>cojc</span></p>
                        </router-link>
                    </div>
                </v-col>
                <v-col class="category" cols="2">
                    <div class="category__text">
                        <router-link :to="{ name: 'home' }" class="caterogy__link"
                            :class="{ 'active-link': isActive === 'home' }" @click="isActive = 'home'">
                            Home
                        </router-link>
                    </div>
                </v-col>
                <v-col class="category" cols="2">
                    <div class="category__text">
                        <router-link :to="{ name: 'recognition' }" class="caterogy__link"
                            :class="{ 'active-link': isActive === 'recognition' }" @click="isActive = 'recognition'">
                            Recognition
                        </router-link>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isActive: '' // Biến để lưu trạng thái link nào đang được nhấn
        }
    }
}
</script>

<style scoped>
* {
    font-family: 'Poppins', sans-serif;
}

.header {
    height: 60px;
    background-color: #121212;
}

.header__container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 100%;
    max-width: 1224px;
    margin: 0 auto;
}


.category__text,
.categories-item__link {
    text-align: center;
}

.categories-item__link {
    color: #fff;
    text-decoration: none;
    font-weight: 600;

    &:hover {
        color: #007cc2;
    }
}

.frame__name {
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
}

span {
    color: #007cc2;

    &:hover {
        color: #121212;
    }
}

.category {
    cursor: pointer;
}

.category__text {
    font-weight: 600;
    font-size: 1.2rem;
    color: #fff;
    text-align: center;
}

.caterogy__link {
    color: inherit;
    text-decoration: none;
}

/* CSS cho trạng thái active khi bấm vào router-link */
.active-link {
    padding: 5px;
    border: 2px solid #00abfd;
    border-radius: 5px;
}

.categories-item__link.active-link:hover,
.caterogy__link.active-link:hover {
    border-color: #fff;
    /* Màu viền khi hover nếu cần */
}
</style>
