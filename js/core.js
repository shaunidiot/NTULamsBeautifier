$(document).ready(function () {
    var videoIFrame = $('.panel-body').find('iframe');

    if (videoIFrame.length < 0) {
        return console.log('Video iFrame not found.');
    }

    var iFrameParent = videoIFrame.parent();
    var iFrameVideoSrc = videoIFrame.attr('src');
    var vals = url('?', iFrameVideoSrc);
    console.log('Values: ' + JSON.stringify(vals, null, 2));
    if (!vals.hasOwnProperty('modulename') && vals.hasOwnProperty('author')) {
        return 'Video source has no correct paramters.';
    }

    var module = vals.modulename;
    var author = vals.author;

    // var title = $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(4) > strong > span > span').text().trim();

    // Add download button
    $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(4)').append('<br><a download href="https://ntucee.ntu.edu.sg/content/' + author + '/' + module + '/media/1.mp4"><button id="bDownload" type="button">Download Video</button></a>');

    // Add custom video player
    $(iFrameParent).append('<div class="vcontainer"><video poster="https://ntueee.ntu.edu.sg/content/' + author + '/' + module + '/index/0.jpg" controls><source src="https://ntucee.ntu.edu.sg/content/' + author + '/' + module + '/media/1.mp4" type="video/mp4"></video></div><div class="actions"><button type="button" class="btn js-rewind">Rewind</button><button type="button" class="btn js-forward">Forward</button></div>');

    // Remove iframe video
    videoIFrame.remove();
    var player = plyr.setup({
        debug: false
    });

    $('.js-rewind').on('click', function () {
        player[0].rewind();
    });

    $('.js-forward').on('click', function () {
        player[0].forward();
    });
});