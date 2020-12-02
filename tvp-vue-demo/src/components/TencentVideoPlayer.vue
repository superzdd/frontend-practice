<template>
    <div
        :id="vid"
        :class="showPlayer ? 'show' : 'hide'"
        :style="{ width: vWidth + 'px', height: vHeight + 'px' }"
    ></div>
</template>

<script>
var tvp = window.tvp;
export default {
    name: 'tencentVideoPlayer',
    props: {
        vid: {
            type: String,
            default: 'tvp',
        },
        tvId: {
            type: String,
            default: '',
        },
        vWidth: {
            type: Number,
            default: 100,
        },
        vHeight: {
            type: Number,
            default: 100,
        },
        vMuted: {
            type: Boolean,
            default: false,
        },
    },
    data: function() {
        return {
            debug: true,
            windowPlayerInstance: '',
            showPlayer: false,
            videoIndex: 0,
            currentVideo: null,
            player: null,
            playEndHandler: null,
            lastEndedTime: 0,
        };
    },
    computed: {},
    watch: {
        tvId: function(val) {
            if (!val) {
                return;
            }
            this.setVideo(val);
        },
    },
    created: function() {
        this.windowPlayerInstance = 'player' + this.newId();
        this.initVideo();
        console.log(
            `===tvp created,windowPlayerInstance: ${this.windowPlayerInstance}`
        );
    },
    methods: {
        newId: function() {
            return Math.random()
                .toString(16)
                .slice(-6);
        },
        initVideo: function() {
            this.setVideo(this.tvId);
        },
        setVideo: function(tvId) {
            if (!tvId) {
                throw new Error('===tvp setVideo,the tvId must has a value');
            }

            let video = new tvp.VideoInfo(this.vWidth, this.vHeight);
            video.setVid(tvId);
            this.tvId = tvId;

            let player = new tvp.Player();
            window[this.windowPlayerInstance] = player;

            player.create({
                // width: window.innerWidth,
                // height: window.innerWidth,
                video: video,
                modId: this.vid,
                autoplay: false,
                onallended: () => {
                    // onallended事件在手机上会连续触发两次，所以把第二次事件禁止
                    let curtime = new Date();
                    let lasttime = this.lastEndedTime || 0;
                    if (curtime - lasttime < 500) {
                        this.debug &&
                            console.log(
                                '===tvp, onallended event too quickley, quit!!!'
                            );
                        return;
                    }

                    console.log(`===tvp, onallended handler ${this.vid}`);
                    this.showPlayer = false;
                    if (this.playEndHandler) {
                        this.playEndHandler();
                    }

                    this.lastEndedTime = curtime;
                },
                oninited: () => {
                    this.debug && console.log(`===tvp inited,id: ${this.vid}`);
                    // 这行代码原本不用写，但是为了安全起见还是写一下
                    // tvp有一个bug，当两个视频同时结束时，只能触发一个视频的onallended事件
                    this.showPlayer = false;
                    var cele = document.getElementById(this.vid);
                    if (cele) {
                        var vele = cele.getElementsByTagName('video');
                        this.debug && console.log(`vele len: ${vele.length}`);
                        if (vele && vele.length > 0) {
                            vele[0].muted = this.vMuted;
                            // 给video标签设置attr貌似不生效
                            // vele.setAttribute('x5-video-player-video-type', 'h5-page');
                            // vele.setAttribute('playsinline', true);
                            // vele.setAttribute('webkit-playsinline', true);
                        }
                    }
                },
            });
        },
        play: function(cb = null) {
            if (window[this.windowPlayerInstance]) {
                if (cb) {
                    this.playEndHandler = cb;
                }

                this.showPlayer = true;
                window[this.windowPlayerInstance].play();
            } else {
                throw new Error('===tvp, player has not been inited');
            }
        },
        /**
         * 当前视频重置
         */
        reload: function() {
            this.initVideo();
        },
    },
};
</script>
<style lang="scss" scoped>
.show {
    // visibility: visible;
    display: block;
}

.hide {
    // visibility: hidden;
    display: none;
}
</style>
