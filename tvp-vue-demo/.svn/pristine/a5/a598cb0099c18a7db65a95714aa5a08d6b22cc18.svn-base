// 序列帧播放组件
// 这里的序列帧采用以下方式播放：将序列帧所用到的图片添加到一个div中，然后通过依次改变图片的透明度的办法，来达到播放动画的目的
<template>
    <div class="movie-clip-container" :style="containerStyle">
        <img
            v-for="item in movieClip"
            :key="item.id"
            :src="item.src"
            class="frame"
            :style="{opacity: isFrameShow(item.id)}"
        />
    </div>
</template>

<script>
export default {
    name: 'MovieClip',
    data: function() {
        return {
            containerStyle: 'opacity:0',
            lastAnimationTime: 0,
            frameIndex: 1,
        };
    },
    props: {
        /**
         * 图片数组，注意，数组的每一项不是单个src，而是一个object，需要手动指定每一张图片的id
         */
        imageArray: {
            type: Array,
            default: function() {
                return [''];
            },
        },
        /**
         * 帧率
         */
        fps: {
            type: Number,
            default: 24,
        },
        /**
         * 开始播放时机
         */
        startPlay: {
            type: Boolean,
            default: false,
        },
        pause: {
            type: Boolean,
            default: false,
        },
        /**
         * 是否循环播放
         */
        loop: {
            type: Boolean,
            default: false,
        },
        /**
         * 是否倒放
         */
        reversePlay: {
            type: Boolean,
            default: false,
        },
        /**
         * 播放指定帧数
         */
        specFrame: {
            type: Object,
            default: function() {
                return {
                    startIndex: -1,
                    endIndex: -1,
                };
            },
        },
    },
    watch: {
        startPlay: function(val) {
            if (val) {
                this.reset();
                this.play();
            } else {
                this.reset();
            }
        },
    },
    computed: {
        /**
         * 序列帧播放间隔 ms
         */
        animationInterval: function() {
            return 1000 / this.fps;
        },
        movieClip: function() {
            let ret = [];
            this.imageArray.reduce((prev, cur) => {
                ret.push({
                    id: ret.length,
                    src: cur,
                });
            }, ret);
            return ret;
        },
    },
    created: function() {},
    methods: {
        isFrameShow: function(index) {
            return index == this.frameIndex ? 1 : 0;
        },
        /**
         * 播放序列帧
         */
        playEnterFrame: function() {
            if (!this.startPlay) {
                return;
            }

            if (this.pause) {
                requestAnimationFrame(this.playEnterFrame);
                return;
            }

            let animationEnd = false; // 动画标志位，判断动画是否需要再次需要requestAnimationFrame
            let nowTime = Date.now();

            if (nowTime - this.lastAnimationTime <= this.animationInterval) {
                requestAnimationFrame(this.playEnterFrame);
                return;
            }

            this.lastAnimationTime = nowTime;

            if (this.reversePlay) {
                this.frameIndex--;
            } else {
                this.frameIndex++;
            }

            // 判断是否播放完成，要进行循环
            // 播放指定帧的情况
            if (
                this.specFrame.startIndex >= 0 &&
                this.specFrame.endIndex >= 0
            ) {
                if (this.reversePlay) {
                    if (this.frameIndex < this.specFrame.startIndex) {
                        this.$emit('frameEnd');
                        if (this.loop) {
                            this.frameIndex = this.specFrame.endIndex;
                        } else {
                            animationEnd = true;
                        }
                    }
                } else {
                    if (this.frameIndex > this.specFrame.endIndex) {
                        this.$emit('frameEnd');
                        if (this.loop) {
                            this.frameIndex = this.specFrame.startIndex;
                        } else {
                            animationEnd = true;
                        }
                    }
                }
            }

            // 播放全部帧的情况
            if (
                this.frameIndex >= this.imageArray.length &&
                !this.reversePlay
            ) {
                this.$emit('frameEnd');
                if (this.loop) {
                    this.frameIndex = 0;
                } else {
                    animationEnd = true;
                }
            }

            if (this.frameIndex < 0 && this.reversePlay) {
                this.$emit('frameEnd');
                if (this.loop) {
                    this.frameIndex = this.imageArray.length - 1;
                } else {
                    animationEnd = true;
                }
            }
            if (!animationEnd) {
                requestAnimationFrame(this.playEnterFrame);
            }
        },
        play: function() {
            this.containerStyle = 'opacity:1';
            this.playEnterFrame();
        },
        reset: function() {
            if (
                this.specFrame.startIndex >= 0 &&
                this.specFrame.endIndex >= 0
            ) {
                this.frameIndex = this.specFrame.startIndex;
            } else {
                if (this.reversePlay) {
                    this.frameIndex = this.imageArray.length - 1;
                } else {
                    this.frameIndex = 0;
                }
            }
        },
    },
};
</script>
<style scoped>
.movie-clip-container {
    position: relative;
}
.frame {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
}
</style>


