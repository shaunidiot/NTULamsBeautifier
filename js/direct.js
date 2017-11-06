/*
Feature:
Direct download of files (esp pdf)
*/
$(document).ready(function () {
    chrome.storage.sync.get({
        showdownloadfilesbutton: false,
    }, function (items) {
        if (!items.showdownloadfilesbutton) {
            return;
        }

        $('body').find('a').each(function () {
            var url = $(this).attr('href');
            if (url === null || typeof url == 'undefined') {
                return;
            }

            if (!url.startsWith('https://ntulearn.ntu.edu.sg/bbcswebdav/pid-') && url.indexOf('-dt-content-rid-') < 0 && url.indexOf('xid-') < 0) {
                return;
            }

            $(this).parent().append('<a download href="' + url + '"><img src="' + chrome.extension.getURL('img/download.svg') + '" style="height:20px"/></a>');
        });
    });
});