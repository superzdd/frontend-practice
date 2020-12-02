<template>
    <BasePage class="bg">
        <div class="abs bg">
            <img class="abs bg" src="../../public/imgs/3.jpg" alt />
        </div>
        <div class="upload-container">
            <input
                type="file"
                id="add-upload-input"
                @change="uploadFuns($event)"
                accept="image/*"
                class="page2-btn-upload button"
            />
            上传图片
        </div>
        <div class="image-container">
            <img :src="uploadSrc" alt />
        </div>
        <div class="page-hint" @click="nextPageHandler">Page Upload, click go to next page</div>
    </BasePage>
</template>

<script>
import BasePage from './BasePage.vue';
import EXIF from 'exif-js';

export default {
    name: 'uploadPage',
    components: {
        BasePage,
    },
    data() {
        return {
            sharedState: window.store.state,
            loadPercent: 0,
            publicPath: process.env.BASE_URL,
            imageBgSrc: 'imgs/bg-loading.jpg',
            uploadSrc: null,
        };
    },
    computed: {},
    created() {},
    methods: {
        uploadFuns: function(e) {
            let file = e.target.files[0];
            // 确认选择的文件是图片
            if (file.type.indexOf('image') == 0) {
                if (file.size / 1024 / 1024 > 4) {
                    console.log(
                        'error, the size of image is too big. try another image which size is less than 4mb'
                    );
                } else {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = e => {
                        // 图片base64化
                        // let newUrl = this.result;
                        const resultSrc = e.target.result;

                        let image = new Image();
                        image.src = resultSrc;
                        this.uploadSrc = resultSrc;

                        image.onload = () => {
                            console.log('image load');

                            EXIF.getData(image, () => {
                                var make = EXIF.getTag(this, 'Make');
                                var model = EXIF.getTag(this, 'Model');
                                var makeAndModel = document.getElementById(
                                    'makeAndModel'
                                );
                                makeAndModel.innerHTML = `${make} ${model}`;
                            });
                        };
                    };
                }
            }
        },
        nextPageHandler: function(event) {
            this.$emit('nextPage', event);
        },
    },
};
</script>

<style lang="scss" scoped>
.bg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
}

.upload-container {
    width: 35vw;
    height: 10vw;
    line-height: 10vw;
    font-size: 15px;
    background-color: #1b5c99;
    color: #fff;
    text-align: center;
    position: relative;
    input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 5;
    }
}

.image-container {
    position: relative;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
    }
}

.page-hint {
    position: relative;
    background-color: #ffffff;
    color: #000000;
    width: 75vw;
    height: 10vw;
    font-size: 15px;
    line-height: 10vw;
    text-align: center;
    margin: 2vw;
}
</style>
