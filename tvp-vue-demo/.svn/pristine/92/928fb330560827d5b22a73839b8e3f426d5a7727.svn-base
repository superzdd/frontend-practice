<template>
    <div v-if="showBgMusicHint" class="hint-bg-music-box">
        <div class="all-black"></div>

        <div class="dialog-container">
            <p>是否播放背景音乐</p>
            <div class="border-split"></div>
            <div class="button-container">
                <div class="confirm" @click="bgMusicConfirmHandler">是</div>
                <div class="cancel" @click="bgMusicCancelHandler">否</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pagecommon',
    data: function() {
        return {};
    },
    props: {
        showBgMusicHint: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        bgMusicConfirmHandler() {
            this.$emit('confirm');
        },
        bgMusicCancelHandler() {
            this.$emit('cancel');
        },
    },
};
</script>

<style lang="scss" scoped>
.hint-bg-music-box {
    position: fixed;
    width: 50vw;
    height: 40vw;
    left: 25vw;
    top: calc(0.3 * var(--px-total-height));
    z-index: 99;

    .all-black {
        background-color: #000000;
        opacity: 0.5;
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: -25vw;
        top: calc(-0.3 * var(--px-total-height));
        z-index: 0;
    }

    .dialog-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-size: 0.3rem;
        background-color: #ffffff;
        border-radius: 10px;
        z-index: 5;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);

        p {
            height: 70%;
            line-height: 70%;
            width: 100%;
            font-weight: bold;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .border-split {
            width: 90%;
            height: 0;
            border-bottom: solid 1px #cccccc;
            transform: translateY(1px);
        }

        .button-container {
            width: 100%;
            height: 30%;
            display: flex;

            div {
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .cancel {
                background-color: #cccccc;
                color: #ffffff;
                border-bottom-right-radius: 10px;
            }
        }
    }
}
</style>
