/*
Feature:
Check if LAMS are completed without opening the page
*/

$(document).ready(function () {
    $('#content').find('a').each(function () {
        if (!$(this).attr('href').startsWith('https://ntulearn.ntu.edu.sg:443/webapps/lams-lamscontent-BBLEARN/modules/learnermonitor.jsp?lsid=')) {
            return;
        }

        var self = this;
        var url = $(this).attr('href');
        console.log('Found: ' + url + ". " + $(this).text());

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var result = xhr.responseText.toString();
                if (result.indexOf('You have completed this lesson.') > -1) {
                    return $(self).html('<span style="color:#388E3C;">' + $(self).text() + ' [Done]</span>');
                }

                var match = /You have completed: (.*?) out of approximately (.*?) activities/g.exec(result)
                if (match !== null) {
                    return $(self).html('<span style="color:#B71C1C;">' + $(self).text() + ' [' + match[1] + '/' + match[2] + ']</span>');
                }

                return $(self).html('<span style="color:#000;">' + $(self).text() + ' [Not opened]</span>');
            }
        }
        xhr.send();
    });
});