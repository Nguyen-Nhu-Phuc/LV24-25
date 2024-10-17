<template>
    <div class="recognition ">
        <v-container>
            <div v-if="isLoading" class="loader__container">
                <svg height="108px" width="108px" viewBox="0 0 128 128" class="loader">
                    <defs>
                        <clipPath id="loader-eyes">
                            <circle transform="rotate(-40,64,64) translate(0,-56)" r="8" cy="64" cx="64"
                                class="loader__eye1"></circle>
                            <circle transform="rotate(40,64,64) translate(0,-56)" r="8" cy="64" cx="64"
                                class="loader__eye2"></circle>
                        </clipPath>
                        <linearGradient y2="1" x2="0" y1="0" x1="0" id="loader-grad">
                            <stop stop-color="#000" offset="0%"></stop>
                            <stop stop-color="#fff" offset="100%"></stop>
                        </linearGradient>
                        <mask id="loader-mask">
                            <rect fill="url(#loader-grad)" height="128" width="128" y="0" x="0"></rect>
                        </mask>
                    </defs>
                    <g stroke-dasharray="175.93 351.86" stroke-width="12" stroke-linecap="round">
                        <g>
                            <rect clip-path="url(#loader-eyes)" height="64" width="128" fill="hsl(193,90%,50%)"></rect>
                            <g stroke="hsl(193,90%,50%)" fill="none">
                                <circle transform="rotate(180,64,64)" r="56" cy="64" cx="64" class="loader__mouth1">
                                </circle>
                                <circle transform="rotate(0,64,64)" r="56" cy="64" cx="64" class="loader__mouth2">
                                </circle>
                            </g>
                        </g>
                        <g mask="url(#loader-mask)">
                            <rect clip-path="url(#loader-eyes)" height="64" width="128" fill="hsl(223,90%,50%)"></rect>
                            <g stroke="hsl(223,90%,50%)" fill="none">
                                <circle transform="rotate(180,64,64)" r="56" cy="64" cx="64" class="loader__mouth1">
                                </circle>
                                <circle transform="rotate(0,64,64)" r="56" cy="64" cx="64" class="loader__mouth2">
                                </circle>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>

            <!-- Form và kết quả nhận diện -->
            <div v-else>
                <v-row>
                    <!-- Upload và Predict -->
                    <v-col cols="6">
                        <v-btn variant="flat" class="btn--upload" @click="clickInput()">Upload an image</v-btn>
                        <input type="file" id="upload" accept="image/png, image/jpeg, image/jpg" hidden
                            @change="displayUploadImg()">
                        <v-btn class="btn--recognize" variant="flat" @click="recognizeImg()">Predict</v-btn>
                        <div class="img__wrapper">
                            <img class="img" src="../assets/logo_ctu.png" alt="ảnh upload">
                        </div>
                    </v-col>

                    <!-- Kết quả -->
                    <v-col cols="6" class="">
                        <div class="card">
                            <div class="card__image">
                                <!-- Có thể đặt hình ảnh đại diện cho trò chơi ở đây nếu muốn -->
                            </div>
                            <div class="card__content">
                                <p class="card__title">Folk game is <strong>{{ predictedLabel }}</strong></p>
                                <p class="card__text">Detected features include: {{ detectResults }}</p>
                                <router-link :to="{ name: 'gameDetail', params: { id: idPredicted } }"
                                    v-if="predictedLabel.length > 0">
                                    <a class="card__button">View detail</a>
                                </router-link>
                            </div>
                        </div>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="3" v-for="(img, i) in detectedImages" :key="i">
                        <div class="img__container">
                            <img class="img--cropped" :src="'data:image/jpeg;base64,' + img" alt="ảnh được phát hiện">
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            isLoading: false, // Thêm biến isLoading
            idPredicted: 1,
            detectedCls: [],
            detectResults: '',
            predictedLabel: '',
            detectedImages: []
        };
    },
    methods: {
        async displayUploadImg() {
            const inputElement = document.getElementById("upload");
            const file = inputElement.files[0];
            const imgElement = document.getElementsByClassName("img")[0];
            imgElement.src = URL.createObjectURL(file);
        },

        async clickInput() {
            const inputElement = document.getElementById("upload");
            inputElement.click();
        },

        async recognizeImg() {
            const inputElement = document.getElementById("upload");
            const file = inputElement.files[0];

            if (!file) {
                alert("Please upload an image first!");
                return;
            }

            this.isLoading = true; // Bật trạng thái loading

            try {
                const form = new FormData();
                form.append('file', file);
                const res = await axios.post('http://127.0.0.1:9999/api/predict', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                this.predictedLabel = res.data.predicted_label;
                this.detectedImages = res.data.detected_images;
                this.idPredicted = res.data.min_index_jaccard + 1;
                this.detectedCls = res.data.detected_cls.map(item => item.replace('-', ' '));
                this.detectResults = this.detectedCls.join(', ');

            } catch (error) {
                console.error("Error in recognition:", error);
                alert("Error during recognition. Please try again.");
            } finally {
                this.isLoading = false; // Tắt trạng thái loading
            }
        }
    }
};
</script>

<style scoped>
.btn--upload,
.btn--recognize {
    border: 2px solid #00abfd;
}

.heading {
    text-align: center;
    color: #00abfd;
}

.btn--recognize {
    margin-left: 20px;
}

.btn--recognize span {
    color: aliceblue;
}

.img__wrapper {
    margin-top: 2rem;
    width: 65%;
}

.img,
.img--cropped {
    width: 100%;
}

.result-detect__wrapper {
    background-color: rgb(243, 242, 236);
}

/* Căn giữa loader */
.loader__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {
    animation: rotate 2s linear infinite;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

/* ================ */
/* From Uiverse.io by fanishah */
.loader {
    width: 8em;
    height: 8em;
}

.loader__eye1,
.loader__eye2,
.loader__mouth1,
.loader__mouth2 {
    animation: eye1 3s ease-in-out infinite;
}

.loader__eye1,
.loader__eye2 {
    transform-origin: 64px 64px;
}

.loader__eye2 {
    animation-name: eye2;
}

.loader__mouth1 {
    animation-name: mouth1;
}

.loader__mouth2 {
    animation-name: mouth2;
    visibility: hidden;
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg: hsl(var(--hue), 90%, 10%);
        --fg: hsl(var(--hue), 90%, 90%);
    }
}

@keyframes eye1 {
    from {
        transform: rotate(-260deg) translate(0, -56px);
    }

    50%,
    60% {
        animation-timing-function: cubic-bezier(0.17, 0, 0.58, 1);
        transform: rotate(-40deg) translate(0, -56px) scale(1);
    }

    to {
        transform: rotate(225deg) translate(0, -56px) scale(0.35);
    }
}

@keyframes eye2 {
    from {
        transform: rotate(-260deg) translate(0, -56px);
    }

    50% {
        transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1);
    }

    52.5% {
        transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1, 0);
    }

    55%,
    70% {
        animation-timing-function: cubic-bezier(0, 0, 0.28, 1);
        transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1);
    }

    to {
        transform: rotate(150deg) translate(0, -56px) scale(0.4);
    }
}

@keyframes eyeBlink {

    from,
    25%,
    75%,
    to {
        transform: scaleY(1);
    }

    50% {
        transform: scaleY(0);
    }
}

@keyframes mouth1 {
    from {
        animation-timing-function: ease-in;
        stroke-dasharray: 0 351.86;
        stroke-dashoffset: 0;
    }

    25% {
        animation-timing-function: ease-out;
        stroke-dasharray: 175.93 351.86;
        stroke-dashoffset: 0;
    }

    50% {
        animation-timing-function: steps(1, start);
        stroke-dasharray: 175.93 351.86;
        stroke-dashoffset: -175.93;
        visibility: visible;
    }

    75%,
    to {
        visibility: hidden;
    }
}

@keyframes mouth2 {
    from {
        animation-timing-function: steps(1, end);
        visibility: hidden;
    }

    50% {
        animation-timing-function: ease-in-out;
        visibility: visible;
        stroke-dashoffset: 0;
    }

    to {
        stroke-dashoffset: -351.86;
    }
}

/* ================ */

/* From Uiverse.io by Satwinder04 */
.card {
    position: relative;
    width: 500px;
    height: 500px;
    margin: 20px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.card__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
}

.card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.card__content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.card__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.card__text {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
}

.card__button {
    display: inline-block;
    padding: 10px 20px;
    /* background-color: #000; */
    /* color: #007cc2; */
    text-decoration: none;
    border-radius: 5px;
}

.card:hover {
    transform: translateY(-10px);
}

.card:hover .card__image img {
    transform: scale(1.2);
}

.card:hover .card__content {
    transform: translateY(-100%);
}

.card__image {
    height: 400px;
    width: 300px;
    /* background-color: #000; */
    /* you can put img url here  */
    /* background-image: url('../assets/logo_ctu.png'); */
}
</style>