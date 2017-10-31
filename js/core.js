$(document).ready(function () {
    var videoIFrame = $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(8) > iframe');
    if (videoIFrame.length < 0) {
        return console.log('Video iFrame not found.');
    }

    var iFrameVideoSrc = videoIFrame.attr('src');
    var match = /https:\/\/presentur\.ntu\.edu\.sg\/aculearn-idm\/v8\/studio\/embed\.asp\?modulename=(.*?)&author=(.*?)&/g.exec(iFrameVideoSrc);
    if (match === null) {
        return console.log('Unable to find video src.');
    }

    // var title = $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(4) > strong > span > span').text().trim();

    // Add download button
    $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(4)').append('<br><a download href="https://ntucee.ntu.edu.sg/content/' + match[2] + '/' + match[1] + '/media/1.mp4"><button id="bDownload" type="button">Download Video</button></a>');

    // Add custom video player
    $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(9)').append('<div class="vcontainer"><video poster="https://ntueee.ntu.edu.sg/content/' + match[2] + '/' + match[1] + '/index/0.jpg" controls><source src="https://ntucee.ntu.edu.sg/content/' + match[2] + '/' + match[1] + '/media/1.mp4" type="video/mp4"></video></div><div class="actions"><button type="button" class="btn js-rewind">Rewind</button><button type="button" class="btn js-forward">Forward</button></div>');

    // Remove iframe video
    $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(8)').remove();
    var player = plyr.setup({
        debug: true
    });

    $('.js-rewind').on('click', function () {
        player[0].rewind();
    });

    $('.js-forward').on('click', function () {
        player[0].forward();
    });
});