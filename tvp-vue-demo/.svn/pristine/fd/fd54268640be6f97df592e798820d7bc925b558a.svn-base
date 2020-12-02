<template>
    <BasePage>
        <div class="abs page shakePage">
            <h1>摇一摇示意页面</h1>
            <h2>注意IOS环境下，重力感应有两个限制条件</h2>
            <h3>1. 如果在微信浏览其中，那需要符合网页url是https协议的</h3>
            <h3>2. 如果在原生浏览器中，那不但要符合1，还必须通过按钮点击调用ios的api调用</h3>
            <h3>ps: 安卓不会有上面的限制</h3>
            <div class="shake-container">
                <h2>摇一摇手机，如果成功的话，下方图片会晃动</h2>
                <div
                    class="ios-permission"
                    v-show="deviceIsInIOSSafari"
                    @click="askPermission"
                >IOS Safari专用shake按钮</div>
                <img src="../../public/imgs/logo.png" :class="{shaking:deviceIsShaking}" alt="logo" />
            </div>
            <div class="page-hint" @click="pageHintClickHandler">Page Shake, click go to next page</div>
        </div>
    </BasePage>
</template>

<script>
// 摇一摇示意页面
import BasePage from './BasePage.vue';
import navi from '../util/nav-controller.js';
export default {
    name: 'shakePage',
    components: {
        BasePage,
    },
    data() {
        return {
            deviceIsInIOSSafari: false,
            deviceMotionSpeedThreshold: 3000, // 设备晃动阈值，如果超过这个值就代表设备晃动了
            deviceIsShaking: false, // 标记设备正在晃动
            resetShakingTimeoutHandler: null,
            lastDeviceMotionX: 0, // 记录上次设备晃动时的表示x轴（西到东）上的加速度
            lastDeviceMotionY: 0, // 记录上次设备晃动时的表示y轴（南到北）上的加速度
            lastDeviceMotionZ: 0, // 记录上次设备晃动时的表示z轴（下到上）上的加速度
            lastDeviceMotionUpdateTime: 0, // 记录上次设备晃动时的时间
        };
    },
    computed: {},
    created() {},
    mounted() {
        console.log(`shake page: devicemotion init`);
        navi.output();

        this.deviceIsInIOSSafari = navi.isIos && !navi.isWX;

        if (this.deviceIsInIOSSafari) {
            return;
        }

        if (window.DeviceMotionEvent) {
            window.addEventListener(
                'devicemotion',
                this.deviceMotionHandler,
                false
            );
            console.log(`shake page: devicemotion init success`);
        } else {
            console.log(`shake page: devicemotion init failure`);
        }
    },
    methods: {
        askPermission() {
            console.log('shake page: ios device motion permission');
            try {
                window.DeviceMotionEvent.requestPermission()
                    .then(response => {
                        if (response == 'granted') {
                            window.addEventListener(
                                'devicemotion',
                                this.deviceMotionHandler,
                                false
                            );
                        }
                    })
                    .catch(e => {
                        console.log(
                            'shake page: ios device motion permission failure!'
                        );
                        console.error(e);
                    });
            } catch (ex) {
                console.log(
                    'shake page: ios device motion permission failure! no such permissoion'
                );
                console.error(ex);
                return;
            }
        },
        deviceMotionHandler(e) {
            // console.log('shake page: deviceMotionHandler triggered');
            let acc = e.accelerationIncludingGravity;
            // let speed = this.deviceMotionSpeedThreshold;
            let curTime = Date.now();
            if (this.lastDeviceMotionUpdateTime === 0) {
                this.lastDeviceMotionUpdateTime = curTime;
            }

            let diffTime = curTime - this.lastDeviceMotionUpdateTime;

            //获取devicemotion的xyz变化
            let x = acc.x;
            let y = acc.y;
            let z = acc.z;
            // console.log(
            //     `shake page: deviceMotionHandler triggered, ${JSON.stringify({
            //         x,
            //         y,
            //         z,
            //     })}`
            // );

            let speed =
                (Math.abs(
                    x +
                        y +
                        z -
                        this.lastDeviceMotionX -
                        this.lastDeviceMotionY -
                        this.lastDeviceMotionZ
                ) /
                    diffTime) *
                10000;

            // if (
            //     Math.abs(x - this.lastDeviceMotionX) >= speed ||
            //     Math.abs(y - this.lastDeviceMotionY) >= speed ||
            //     Math.abs(z - this.lastDeviceMotionZ) >= speed
            // ) {

            if (speed > this.deviceMotionSpeedThreshold) {
                console.log(`shake page: shaking!!!`);
                this.setShaking();
            }

            this.lastDeviceMotionX = x;
            this.lastDeviceMotionY = y;
            this.lastDeviceMotionZ = z;
            this.lastDeviceMotionUpdateTime = curTime;
        },
        setShaking() {
            this.deviceIsShaking = true;
            this.resetShaking();
        },
        resetShaking() {
            if (this.resetShakingTimeoutHandler) {
                window.clearTimeout(this.resetShakingTimeoutHandler);
            }

            this.resetShakingTimeoutHandler = setTimeout(() => {
                this.deviceIsShaking = false;
            }, 1000);
        },
        pageHintClickHandler() {
            this.$emit('nextPage');
        },
    },
};
</script>

<style lang="scss" scoped>
.shakePage {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 0.2rem;

    h3 {
        width: 60vw;
        text-align: left;
    }
}

.shake-container {
    width: 300px;
    height: 300px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

.ios-permission {
    width: 50vw;
    height: 12vw;
    text-align: center;
    line-height: 12vw;
    font-size: 0.3rem;
    border: solid 1px #000000;
    border-radius: 20px;
}

.shaking {
    animation: shake 0.5s infinite 0.5s;
}

@keyframes shake {
    0% {
        transform: rotate(0deg);
    }
    12% {
        transform: rotate(20deg);
    }
    36% {
        transform: rotate(-20deg);
    }
    50% {
        transform: rotate(0deg);
    }
    62% {
        transform: rotate(20deg);
    }
    86% {
        transform: rotate(-20deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
</style>
