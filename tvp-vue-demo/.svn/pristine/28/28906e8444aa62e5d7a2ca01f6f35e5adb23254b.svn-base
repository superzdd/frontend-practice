<template>
    <div id="app" class="page">
        <PageLoading v-if="pageLoadingShow" @loadComplete="handleLoadComplete"></PageLoading>
        <BasePage id="page-1" :class="pageClass(1)" @commonclick="nextPageClick">
            <div class="page1-bg">
                <div class="page-hint">Page 1, click go to next page</div>
            </div>
        </BasePage>
        <BasePage :class="pageClass(2)">
            <div class="page2-bg">
                <herdsric-button
                    border-color="#ffffff"
                    class="herdsric-button"
                    :show-loading="buttonLoading"
                    @click="butClick"
                >test</herdsric-button>
                <herdsric-button @click="but2Click">Test2</herdsric-button>
                <herdsric-button :disabled="true" @click="but2Click">Test3</herdsric-button>
                <herdsric-button
                    :show-loading="buttonLoading"
                    type="image"
                    src="./imgs/music-off.png"
                    @click="but2Click"
                >Test4</herdsric-button>
                <MovieClip
                    class="movie-clip-demo"
                    :imageArray="movieClipInfo.imageArray"
                    :fps="movieClipInfo.fps"
                    :startPlay="movieClipInfo.startPlay"
                    :loop="movieClipInfo.loop"
                    :reversePlay="movieClipInfo.reversePlay"
                    :pause="movieClipInfo.pause"
                    @frameEnd="playToEnd"
                ></MovieClip>
                <herdsric-button
                    class="herdsric-button"
                    :show-loading="buttonLoading"
                    @click="movieClipPlayClickHandler"
                >
                    {{
                    movieClipInfo.startPlay
                    ? '点击暂停序列帧'
                    : '点击开始序列帧'
                    }}
                </herdsric-button>
                <div class="page-hint" @click="movieClipPlayClickHandler">
                    {{
                    movieClipInfo.startPlay
                    ? '点击暂停序列帧'
                    : '点击开始序列帧'
                    }}
                </div>
                <div class="page-hint" @click="movieClipLoopClickHandler">
                    {{
                    movieClipInfo.loop
                    ? '点击序列帧单次播放'
                    : '点击序列帧循环播放'
                    }}
                </div>
                <div class="page-hint" @click="movieClipReverseClickHandler">
                    {{
                    movieClipInfo.reversePlay
                    ? '切换到正序播放'
                    : '切换到倒序播放'
                    }}
                </div>
                <div
                    id="page-2"
                    class="page-hint"
                    @click="nextPageClick"
                >Page 2, click go to next page</div>
            </div>
        </BasePage>
        <!-- <BasePage :class="pageClass(3)" @commonclick="nextPageClick">
            <div class="page3-bg">
                <div class="page-hint">Page 3, click go to next page</div>
            </div>
        </BasePage>-->
        <UploadPage :class="pageClass(3)" @nextPage="uploadPageNextPageHandler"></UploadPage>
        <ShakePage :class="pageClass(4)" @nextPage="shakePageNextPageHandler"></ShakePage>
        <MusicButton
            @backgroundMusicPause="backgroundMusicPauseHandler"
            @backgroundMusicPlay="backgroundMusicPlayHandler"
        ></MusicButton>
        <BgMusicHint
            :showBgMusicHint="showBgMusicHint"
            @confirm="bgMusicConfirmHandler"
            @cancel="bgMusicCancelHandler"
        ></BgMusicHint>
    </div>
</template>

<script>
// import baiduStatistics from './util/baidu-statistics.js';
import navi from './util/nav-controller.js';
import { getWindowSize } from './util/rem.js';
import pageTurningManager from './util/page-turning-manager.js';
import BGMusicSoundJs from './util/bgMusicSoundJs.js';
// import {wxShare} from './util/wechat-share.js'

import BasePage from './components/BasePage.vue';
import MusicButton from './components/MusicButton.vue';
import PageLoading from './components/PageLoading.vue';
import MovieClip from './components/MovieClip.vue';
import UploadPage from './components/UploadPage.vue';
import BgMusicHint from './components/BgMusicHint.vue';
import ShakePage from './components/ShakePage.vue';
import herdsricButton from './components/HButton.vue';
import statisticAll from './util/herdsric-statistic.js';
export default {
    name: 'app',
    components: {
        BasePage,
        PageLoading,
        MusicButton,
        MovieClip,
        UploadPage,
        BgMusicHint,
        ShakePage,
        herdsricButton,
    },
    data: function() {
        return {
            buttonLoading: false,
            sharedState: window.store.state,
            backgroundMusicAutoPlay: true,
            bgMusic: null,
            userBgMusicConfirmed: false, // 背景音乐是否已经确认完毕？1：微信浏览器中，自动确认；2：其他浏览器中，由用户点击确认
            assetsLoaded: false, // h5素材有没有加载完毕
            pageTurningManager, // 页面跳转管理器
            publicPath: process.env.BASE_URL,
            movieClipInfo: {
                imageArray: [],
                fps: 30,
                startPlay: false,
                loop: true,
                reversePlay: false,
                pause: false,
            },
            showBgMusicHint: false, // 用于在非微信环境打开音乐提示按钮
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
    },
    created: function() {
        this.pageTurningManager.turnToPage(0);
        // this.initBadiduStatistics();
        if (this.backgroundMusicAutoPlay) {
            this.initBackgroundMusic();
        }
        this.initMovieClipImageArray();
    },
    mounted: function() {
        const { width, height } = getWindowSize();

        document.body.style.setProperty('--px-total-height', height + 'px');
        document.body.style.setProperty(
            '--circle-radius',
            Math.ceil(Math.sqrt(height * height + width * width) * 100) / 100 +
                'px'
        );

        // wxShare();
    },
    methods: {
        butClick() {
            this.buttonLoading = true;
            console.log('button clicked!');
            setTimeout(() => {
                this.buttonLoading = false;
                console.log('button click completed!');
            }, 2000);
        },
        but2Click() {
            console.log('button2 clicked!');
            this.buttonLoading = true;
            setTimeout(() => {
                this.buttonLoading = false;
                console.log('button2 click completed!');
            }, 2000);
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
        nextPageClick(event) {
            statisticAll('nextPageClick', event.target.id);
            this.pageTurningManager.turnToNextPageAutomatically();
        },
        isCurrentPage(i) {
            return this.pageTurningManager.isCurrentPage(i);
        },
        startPlayBackgroundMusic() {
            this.bgMusic.play();
        },
        initBackgroundMusic() {
            // 初始化背景音乐
            // 这里在业务上，主要要区分微信和非微信的浏览器环境的区别。
            // 因为在微信环境里，微信提供了接口可以实现自动播放音乐。
            // 在其他环境里，尤其是移动端手机浏览器环境里，是不能实现自动播放音乐的，这里最起码的做法是弹窗示意用户，是否播放背景音乐
            this.bgMusic = new BGMusicSoundJs();

            if (navi.isWX) {
                document.addEventListener(
                    'WeixinJSBridgeReady',
                    () => {
                        console.log('WeixinJSBridgeReady');
                        this.bgMusic.load();
                        window.store.setBackgroundMusicPlaying();
                    },
                    false
                );
                this.userBgMusicConfirmed = true; // 微信环境下，默认用户允许音乐自动播放
            } else {
                this.showBgMusicHint = true;
            }
        },
        initBadiduStatistics() {
            // baiduStatistics.init('abcdefg');
            // baiduStatistics.output();
            // baiduStatistics.push('h5-tmpl-vue', 'test');
        },
        backgroundMusicPauseHandler() {
            window.store.setBackgroundMusicPause();
            this.bgMusic.pause();
        },
        backgroundMusicPlayHandler() {
            window.store.setBackgroundMusicPlaying();
            this.bgMusic.resume();
        },
        /**
         * 初始化序列帧数组
         */
        initMovieClipImageArray() {
            let ret = [];
            let imageBaseUrl = this.publicPath + 'imgs/movieclip/mc_';
            for (let i = 1; i <= 10; i++) {
                ret.push(`${imageBaseUrl}${i}.jpg`);
            }

            this.movieClipInfo.imageArray = ret;
        },
        movieClipPlayClickHandler() {
            if (this.movieClipInfo.startPlay) {
                this.movieClipInfo.pause = !this.movieClipInfo.pause;
            } else {
                this.movieClipInfo.startPlay = true;
            }
        },
        movieClipLoopClickHandler() {
            this.movieClipInfo.loop = !this.movieClipInfo.loop;
        },
        movieClipReverseClickHandler() {
            this.movieClipInfo.reversePlay = !this.movieClipInfo.reversePlay;
        },
        playToEnd() {
            if (!this.movieClipInfo.loop) {
                this.movieClipInfo.startPlay = false;
                this.movieClipInfo.pause = false;
            }
        },
        bgMusicConfirmHandler() {
            this.bgMusicCancelHandler();
            this.bgMusic.load();
            window.store.setBackgroundMusicPlaying();
        },
        bgMusicCancelHandler() {
            this.showBgMusicHint = false;
            // 设置用户已经确认了音乐的播放状态
            this.userBgMusicConfirmed = true;
            this.checkAndGoFirstPage();
        },
        uploadPageNextPageHandler(event) {
            this.nextPageClick(event);
        },
        shakePageNextPageHandler() {
            this.pageTurningManager.turnToPage(1, 500);
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

.page1-bg {
    @extend .common-bg;
    background-image: url('../public/imgs/1.jpg');
}

.page2-bg {
    @extend .common-bg;
    flex-direction: column;
    background-image: url('../public/imgs/2.jpg');
}

.page3-bg {
    @extend .common-bg;
    background-image: url('../public/imgs/3.jpg');
}

.page4-bg {
    @extend .common-bg;
    background-image: url('../public/imgs/4.jpg');
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

.movie-clip-demo {
    width: 40vw;
    height: 25vw;
}
</style>
