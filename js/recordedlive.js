/*
global $, Plyr, chrome
Feature:
Change recorded live lecture videos to custom player
*/

$(document).ready(function () {
    chrome.storage.sync.get({
        recordedlecturesusecustomplayer: false,
    }, function (items) {
        if (!items.recordedlecturesusecustomplayer) {
            return;
        }

        var vals = $.url('?', window.location.href);
        var hostname = $.url('hostname', window.location.href);
        if (!vals.hasOwnProperty('modulename') || !vals.hasOwnProperty('author') || typeof hostname == 'undefined') {
            console.log(vals.modulename, vals.author, hostname);
            return console.log('Video source has no correct paramters.');
        }
        
        var module = vals.modulename;
        var author = vals.author;
        console.log(module, author, hostname);
        $('head, #div_video').remove();
        var url = 'https://' + hostname + '/content/' + author + '/' + module + '/media/1.mp4';
        var image = 'https://' + hostname + '/content/' + author + '/' + module + '/index/1.jpg';
        $('body').html('<div class=""><video poster="' + image + '" id="player" playsinline controls><source src="' + url + '" type="video/mp4"></video></div>');
        var player = new Plyr('#player', {
            debug: true
        });
    });
});