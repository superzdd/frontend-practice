/**
 * 使用soundjs实现的背景音乐加载和播放
 */
class BGMusicSoundJs {
    constructor() {
        this.id = 'bg';
        this.sound = window.createjs.Sound;
        this.bgInstanceLoaded = false;
        this.bgInstance = null;
        this.autoPlay = true;
    }

    /**
     * 加载背景音乐，如果设置了背景音乐自动播放，那背景音乐在加载完成后会进行自动播放
     * 注意,如果在微信浏览器环境中，这个load方法必须写在WeixinJSBridgeReady回调函数内才行,否则下方window.createjs.Sound.play就会无效
     */
    load() {
        if (this.bgInstanceLoaded) {
            console.log(`BGMusic: background music has already been loaded`);
            return;
        }
        this.sound.alternateExtensions = ['mp3'];
        this.sound.on('fileload', this.loadComplete, this);

        this.sound.registerSound(
            process.env.BASE_URL + 'imgs/bgmusic.mp3',
            this.id
        );
    }

    loadComplete(event) {
        console.log(
            `BGMusic: background music load complete! src: ${event.src}`
        );
        this.bgInstanceLoaded = true;
        if (this.autoPlay) {
            this.play();
        }
    }

    play() {
        if (!this.bgInstanceLoaded) {
            console.log(
                `BGMusic: background music has not been loaded yet, play quit!`
            );
        }
        this.bgInstance = this.sound.play(this.id, { loop: -1 }); // 发挥使用ID。也可以使用完整的源路径或event.src。
    }

    pause() {
        if (!this.bgInstance) {
            console.log(`BGMusic: background music do not exist, pause quit!`);
        }
        this.bgInstance.paused = true;
    }

    resume() {
        if (!this.bgInstance) {
            console.log(`BGMusic: background music do not exist, resume quit!`);
        }
        this.bgInstance.paused = false;
    }

    stop() {
        if (!this.bgInstance) {
            console.log(`BGMusic: background music do not exist, stop quit!`);
        }
        this.bgInstance.stop();
    }
}

export default BGMusicSoundJs;
