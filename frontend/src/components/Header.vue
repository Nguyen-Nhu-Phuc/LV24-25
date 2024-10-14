<template>
    <header class="header">
        <v-container>
            <v-row>
                <v-col class="category" cols="1">
                    <div class="category__text">
                        <router-link :to="{ name: 'home' }" class="caterogy__link">Home</router-link>
                    </div>
                </v-col>
                <v-col class="category" cols="2">
                    <div class="category__text">
                        <router-link :to="{ name: 'recognition' }" class="caterogy__link">Recognition</router-link>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </header>
</template>

<script>
export default {

}
</script>

<style>
.header {
    height: 60px;
    background-color: rgb(20, 20, 20);
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5; */
}

.category {
    cursor: pointer;
}

.category:hover {
    background-color: rgb(42, 42, 42);
    font-weight: bold;
}

.category__text {
    color: #fff;
    text-align: center;
}

.caterogy__link {
    color: inherit;
    text-decoration: none;
}
</style>