/*
global $, Plyr, chrome
Feature:
Beautify LAMS
*/

$(document).ready(function () {
    chrome.storage.sync.get({
        showdownloadvideobutton: false,
    }, function (items) {
        if (!items.showdownloadvideobutton) {
            return;
        }

        var videoIFrame = $('.panel-body').find('iframe');
        if (videoIFrame.length < 0) {
            return console.log('Video iFrame not found.');
        }

        var iFrameParent = videoIFrame.parent();
        var iFrameVideoSrc = videoIFrame.attr('src');
        var vals = $.url('?', iFrameVideoSrc);
        var hostname = $.url('hostname', iFrameVideoSrc);
        if (!vals.hasOwnProperty('modulename') || !vals.hasOwnProperty('author') || typeof hostname == 'undefined') {
            console.log(vals.modulename, vals.author, hostname);
            return console.log('Video source has no correct paramters.');
        }

        var module = vals.modulename;
        var author = vals.author;

        // var title = $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(4) > strong > span > span').text().trim();

        // Add download button
        $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(4)').append('<br><a download href="https://' + hostname + '/content/' + author + '/' + module + '/media/1.mp4"><button id="bDownload" type="button">Download Video</button></a>');

        // Add custom video player
        $(iFrameParent).append('<div class="vcontainer"><video poster="https://' + hostname + '/content/' + author + '/' + module + '/index/0.jpg" id="player" playsinline controls><source src="https://' + hostname + '/content/' + author + '/' + module + '/media/1.mp4" type="video/mp4"></video></div><div class="actions"><button type="button" class="btn js-rewind">Rewind</button><button type="button" class="btn js-forward">Forward</button></div>');
        // Remove iframe video
        videoIFrame.remove();
        var player = new Plyr('#player', {
            debug: true
        });

        $('.js-rewind').on('click', function () {
            player.rewind();
        });

        $('.js-forward').on('click', function () {
            player.forward();
        });
    });
});