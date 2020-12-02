<template>
    <div :class="borderClicked?'btn-borders border-wave':'btn-borders'"  @click="borderWaveIn">
        <slot></slot>
        <div :style="borderColor" class="border-top"></div>
        <div :style="borderColor" class="border-right"></div>
        <div :style="borderColor" class="border-bottom"></div>
        <div :style="borderColor" class="border-left"></div>
    </div>
</template>
<script>
export default {
    name: 'herdsric-button-frame', //herdric button
    data() {
        return {
            borderClicked:false,
            borderWaveTimer:null,
        }
    },
    props:{
        color:{type:String,default:"hsl(var(--hue), 100%, 41%)"}
    },
    computed:{
        borderColor(){
            return `background:${this.color}`;
        }
    },
    methods: {
        borderWaveIn(){
            this.borderClicked = true;
            const _this = this;
            if(this.borderWaveTimer!=null){
                clearTimeout(this.borderWaveTimer);
            }
            this.borderWaveTimer = setTimeout(()=>{
                _this.borderClicked = false;
            },1000)
        },
        
    },
    beforeDestroy() {
        if (this.borderWaveTimer) {
            clearTimeout(this.borderWaveTimer);
        }
    },
}
</script>
<style lang="scss">

.btn-borders{
    --hue: 190;
    --ease-in-duration: 0.25s;
    --ease-in-exponential: cubic-bezier(0.95, 0.05, 0.795, 0.035);
    --ease-out-duration: 0.65s;
    --ease-out-delay: var(--ease-in-duration);
    --ease-out-exponential: cubic-bezier(0.19, 1, 0.22, 1);
    width:100px;
    height:40px;
    background-color: #f8f8f8;
    position: relative;
    box-sizing: border-box;
    &:hover {
        -webkit-tap-highlight-color: rgba(0,0,0,0); 
    }
    .border-top {
        position: absolute;
        top: 0;
        width: 100%;
        height: 1px;
        background: hsl(var(--hue), 100%, 41%);
        transform: scaleX(0);
        transform-origin: left;
    }

    .border-right {
        position: absolute;
        right: 0;
        width: 1px;
        height: 100%;
        background: hsl(var(--hue), 100%, 41%);
        transform: scaleY(0);
        transform-origin: bottom;
    }

    .border-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: hsl(var(--hue), 100%, 41%);
        transform: scaleX(0);
        transform-origin: left;
    }

    .border-left {
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background: hsl(var(--hue), 100%, 41%);
        transform: scaleY(0);
        transform-origin: bottom;
    }

    // when unhover, ease-out left, bottom; ease-in right, top

    .border-left {
        transition: var(--ease-out-duration) var(--ease-out-delay)
        var(--ease-out-exponential);
    }
    .border-bottom {
        transition: var(--ease-out-duration) var(--ease-out-delay)
        var(--ease-out-exponential);
    }

    .border-right {
        transition: var(--ease-in-duration) var(--ease-in-exponential);
    }
    .border-top {
        transition: var(--ease-in-duration) var(--ease-in-exponential);
    }
    
}
.border-wave {
    .border-top,
    .border-bottom {
        transform: scaleX(1);
    }
    .border-left,
    .border-right {
        transform: scaleY(1);
    }

    // when hover, ease-in left, bottom; ease-out right, top

    .border-left {
        transition: var(--ease-in-duration) var(--ease-in-exponential);
    }
    .border-bottom {
        transition: var(--ease-in-duration) var(--ease-in-exponential);
    }

    .border-right {
        transition: var(--ease-out-duration) var(--ease-out-delay)
        var(--ease-out-exponential);
    }
    .border-top {
        transition: var(--ease-out-duration) var(--ease-out-delay)
        var(--ease-out-exponential);
    }
}
</style>