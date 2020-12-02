<template>
    <div id="app" class="page">
        <PageLoading
            v-if="pageLoadingShow"
            @loadComplete="handleLoadComplete"
        ></PageLoading>
        <BasePage id="page-1" :class="pageClass(1)">
            <div class="page1-bg">
                <div class="btn-play" @click="playTest">
                    点击播放腾讯视频No.1静音
                </div>
                <tencentVideoPlayer
                    :vid="videoId"
                    :vWidth="videoWidth"
                    :vHeight="videoHeight"
                    :tvId="currentVideoId"
                    :vMuted="true"
                    ref="tvpTest"
                ></tencentVideoPlayer>

                <div class="btn-play clear" @click="playTest2">
                    点击播放腾讯视频No.2不静音
                </div>
                <tencentVideoPlayer
                    :vid="videoId2"
                    :vWidth="videoWidth"
                    :vHeight="videoHeight"
                    :tvId="currentVideoId2"
                    :vMuted="false"
                    ref="tvpTest2"
                ></tencentVideoPlayer>
            </div>
        </BasePage>
    </div>
</template>

<script>
import { getWindowSize } from './util/rem.js';
import pageTurningManager from './util/page-turning-manager.js';
import BasePage from './components/BasePage.vue';
import PageLoading from './components/PageLoading.vue';
import tencentVideoPlayer from './components/TencentVideoPlayer.vue';
export default {
    name: 'app',
    components: {
        BasePage,
        PageLoading,
        tencentVideoPlayer,
    },
    data: function() {
        return {
            buttonLoading: false,
            sharedState: window.store.state,
            backgroundMusicAutoPlay: false,
            bgMusic: null,
            userBgMusicConfirmed: true, // 背景音乐是否已经确认完毕？1：微信浏览器中，自动确认；2：其他浏览器中，由用户点击确认
            assetsLoaded: false, // h5素材有没有加载完毕
            pageTurningManager, // 页面跳转管理器
            publicPath: process.env.BASE_URL,
            showBgMusicHint: false, // 用于在非微信环境打开音乐提示按钮
            videoId: 'tvpVideo',
            videoId2: 'tvpVideo2',
            videoWidth: 0,
            videoHeight: 0,
            videoIndex: 0,
            videos: [
                'j3208lhfhy8',
                'c32084xmp5o',
                't30058ri097',
                'l3005y1i783',
            ],
        };
    },
    computed: {
        pageLoadingShow: function() {
            return this.pageTurningManager.isCurrentPage(0);
        },
        pageClass: function() {
            return function(index) {
                let ret = '';
                if (this.pageTurningManager.isCurrentPage(index)) {
                    ret = 'page-show';
                } else if (this.pageTurningManager.isNextPage(index)) {
                    ret = 'page-animate';
                } else {
                    ret = 'page-hide';
                }
                return ret;
            };
        },
        currentVideoId: function() {
            // return this.videos[this.videoIndex];
            return this.videos[0];
        },
        currentVideoId2: function() {
            return this.videos[1];
            // let i = this.videoIndex + 1;
            // if (i >= this.videos.length) {
            //     i = 0 + 1;
            // }
            // return this.videos[i];
        },
    },
    created: function() {
        this.pageTurningManager.turnToPage(0);
        // this.initBadiduStatistics();
        if (this.backgroundMusicAutoPlay) {
            this.initBackgroundMusic();
        }
    },
    mounted: function() {
        const { width, height } = getWindowSize();

        document.body.style.setProperty('--px-total-height', height + 'px');
        document.body.style.setProperty(
            '--circle-radius',
            Math.ceil(Math.sqrt(height * height + width * width) * 100) / 100 +
                'px'
        );

        this.initVideo();

        // tvp视频有小概率出现init未生效的情况，而且尺寸也没有，所以做一个保险机制，在页面初始化1秒后，重新再加载一次
        setTimeout(() => {
            this.initVideo();
            this.$refs.tvpTest.reload();
            this.$refs.tvpTest2.reload();
        }, 500);
    },
    methods: {
        playTest: function() {
            console.log('playTest');
            this.$refs.tvpTest.play(() => {
                console.log(`playTest ended`);
                this.$refs.tvpTest.reload();
            });
        },
        playTest2: function() {
            console.log('playTest2');
            this.$refs.tvpTest2.play(() => {
                console.log(`playTest2 ended`);
                this.$refs.tvpTest2.reload();
            });
        },
        initVideo: function() {
            this.videoWidth = window.innerWidth;
            this.videoHeight = window.innerHeight / 2.5;
        },
        newVideo: function() {
            this.videoIndex++;
            if (this.videoIndex >= this.videos.length) {
                this.videoIndex = 0;
            }
            return this.videos[this.videoIndex];
        },
        handleLoadComplete() {
            this.assetsLoaded = true;
            // 素材加载完毕后，要同时确认用户有没有确认背景音乐的情况，同时确认才能前往下一页
            this.checkAndGoFirstPage();
        },
        checkAndGoFirstPage() {
            if (this.userBgMusicConfirmed && this.assetsLoaded) {
                this.pageTurningManager.turnToPage(1, 500);
            }
        },
        isCurrentPage(i) {
            return this.pageTurningManager.isCurrentPage(i);
        },
    },
};
</script>

<style lang="scss">
body {
    --rem-total-height: 0rem;
    --px-total-height: 0px;
    --circle-radius: 0px;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.herdsric-button {
    background: #1a1e23;
    //border-color: hsl(190, 100%, 41%);
    color: hsl(190, 100%, 41%);
    width: 120px;
    margin: 10px;
}

.common-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
}

.btn-play {
    width: 60vw;
    height: 10vw;
    line-height: 10vw;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    color: #000;
}

.clear {
    margin-top: 10vw;
}

#music-icon {
    position: fixed;
    z-index: 99;
    left: 10px;
    top: 10px;
    width: 120px;
    height: 120px;
    background-color: red;
}

#music-icon img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
}

.page1-bg {
    @extend .common-bg;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('../public/imgs/1.jpg');
}

.page-hint {
    background-color: #ffffff;
    color: #000000;
    width: 75vw;
    height: 10vw;
    font-size: 15px;
    line-height: 10vw;
    text-align: center;
    margin: 2vw;
}

.page-show {
    z-index: 5;
    opacity: 1;
}

.page-animate {
    animation: clipCircleIn 0.5s linear forwards;
    z-index: 10;
    opacity: 1;
}

.page-hide {
    z-index: 0;
    opacity: 0;
}

@keyframes clipCircleIn {
    0% {
        clip-path: circle(0 at 0% 100%);
    }
    100% {
        clip-path: circle(var(--circle-radius) at 0% 100%);
    }
}
</style>
