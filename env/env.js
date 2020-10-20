function getUa() {
	var ua = "";

	var navigator = window ? window.navigator : null;
	ua = navigator.userAgent || "";

	return ua;
}

var ua = getUa();

function uaIncludes(str) {
	return ua.indexOf(str) > -1;
}

function uaMatch(re) {
	return ua.match(re);
}

function getIOSVersion() {
	var version = ua.toLowerCase().match(/cpu iphone os (.*?) like mac os/);

	if (version && Array.isArray(version) && version.length > 0 && version[1]) {
		return version[1].replace(/_/gi, ".");
	}

	return "";
}

function getAndroidVersion() {
	var version = ua.toLowerCase().match(/android [\d._]+/gi);

	if (ua.toLowerCase().indexOf("android") > 0) {
		return (version + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, ".");
	}

	return "";
}

var isMobile = !!uaMatch(/AppleWebKit.*Mobile.*/);
var isIOS = !!uaMatch(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || uaIncludes("iPhone");
var isAndroid = uaIncludes("Android") || uaIncludes("Adr");
var osName = isIOS ? 'ios' : 'android';
var isIPhone = uaIncludes('iPhone');
var isIPad = uaIncludes('iPad');
var osVersion = isIOS ? getIOSVersion() : getAndroidVersion();

var _default = {
	isMobile,
	isIOS,
	isAndroid,
	osName,
	isIPhone,
	isIPad,
	osVersion,
};

console.log('env');
console.log(_default);

exports.default = _default;