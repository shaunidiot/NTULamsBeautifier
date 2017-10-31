jQuery(document).ready(function($) {
    if ($('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(8)').find('> iframe').length > 0) {
        console.log("Found iframe");
        var iFrameSource = $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(8) > iframe').attr('src');
        console.log('iframe: ' + iFrameSource);
        var match = /https:\/\/presentur\.ntu\.edu\.sg\/aculearn-idm\/v8\/studio\/embed\.asp\?modulename=(.*?)&author=(.*?)&/g.exec(iFrameSource);
        if (match !== null) {
            console.log(match[1] + "|" + match[2]);
            // var title = $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(4) > strong > span > span').text().trim();

            // Add download button
            $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(4)').append('<br><a download href="https://ntucee.ntu.edu.sg/content/' + match[2] + '/' + match[1] + '/media/1.mp4"><button id="bDownload" type="button">Download Video</button></a>');

            // Add custom video player
            $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(9)').append('<div class="vcontainer"><video poster="https://ntueee.ntu.edu.sg/content/' + match[2] + '/' + match[1] + '/index/0.jpg" controls><source src="https://ntucee.ntu.edu.sg/content/' + match[2] + '/' + match[1] + '/media/1.mp4" type="video/mp4"></video></div><div class="actions"><button type="button" class="btn js-rewind">Rewind</button><button type="button" class="btn js-forward">Forward</button></div>');

            // Remove iframe video
            $('#navcontent > div > div > div > div.panel.panel-default.panel-learner-page > div > div > div:nth-child(8)').remove();
            var instances = plyr.setup({
                debug: false
            });

            instances.forEach(function(instance) {
                on('.js-rewind', 'click', function() {
                    instance.rewind();
                });

                on('.js-forward', 'click', function() {
                    instance.forward();
                });
            });
        }
    }
});

var newCSS = GM_getResourceText ("customCSS");
GM_addStyle (newCSS);
GM_addStyle ( multilineStr (function (){/*!
.vcontainer {
  max-width: 800px;
  margin: 0 auto;
}
.plyr {
  border-radius: 4px;
  margin-bottom: 15px;
}
*/} ) );

// Get an element
function get(selector) {
    return document.querySelector(selector);
}

// Custom event handler (just for demo)
function on(element, type, callback) {
    if (!(element instanceof HTMLElement)) {
        element = get(element);
    }
    element.addEventListener(type, callback, false);
}

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
        .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
        .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
    ;
    return str;
}