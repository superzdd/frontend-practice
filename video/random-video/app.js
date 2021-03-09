let appModel = {
	videoSrc: ['../assets/video/vh.mp4', '../assets/video/vv.mp4', '../assets/video/video.mp4'],
	videoIndex: 0,
}

let appView = {
	$video: $('#video'),
	$btnEnter: $('.btn-enter'),
	$btnChange: $('.btn-change'),
	init: function() {
		appView.$btnChange.click(appView.newVideoSrc);
	},
	newVideoSrc() {
		appModel.videoIndex++;
		if (appModel.videoIndex > appModel.videoSrc.length - 1) {
			appModel.videoIndex = 0;
		}

		appView.$video.attr('src', appModel.videoSrc[appModel.videoIndex]);
		// appView.$video.play();
		// return appModel.videoIndex;
	}
}

$(document).ready(function() {
	appView.init();
})
