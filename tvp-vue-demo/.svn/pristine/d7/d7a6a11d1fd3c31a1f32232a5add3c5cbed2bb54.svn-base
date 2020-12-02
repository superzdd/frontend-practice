// 将alert 去除域名
console.log('alert js: loading...');
(function() {
    window.alert = function(name) {
        var iframe = document.createElement('IFRAME');
        iframe.style.display = 'none';
        iframe.setAttribute('src', 'data:text/plain');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    };
})();
console.log('alert js: no title alert loaded');
// (function() {
//     window.confirm = function(name) {
//         var iframe = document.createElement('IFRAME');
//         iframe.style.display = 'none';
//         iframe.setAttribute('src', 'data:text/plain');
//         document.documentElement.appendChild(iframe);
//         var ret = window.frames[0].window.confirm(name);
//         iframe.parentNode.removeChild(iframe);
//         return ret;
//     };
// })();
console.log('alert js: load complete.');
