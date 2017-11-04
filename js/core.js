chrome.storage.sync.get({
    showdownloadvideobutton: false,
    showdownloadfilesbutton: false
}, function (items) {
    var actualCode = ['window.showdownloadvideobutton = ' + items.showdownloadvideobutton + ';',
        'window.showdownloadfilesbutton = ' + items.showdownloadfilesbutton + ';'
    ].join('\r\n');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = actualCode;
    (document.head || document.documentElement).appendChild(script);
});