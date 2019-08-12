function makeRequest(url)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = receiveResponse;
    xhr.send();
}

function receiveResponse(e)
{
    if (this.readyState == 4)
    {
        // xhr.readyState == 4
        if (this.status == 200)
        {
            // xhr.status == 200, so the response is good
            globalList = JSON.parse(this.responseText);
        }
    }
}

function onWebNav(details) {
    var parser = document.createElement('a');
    parser.href = details.url;
    if (details.frameId === 0) {
        if (globalList == undefined){
          // pass
        } else if (parser.hostname in globalList) {
              alert(globalList[parser.hostname]);
        }
    }
}
//var filter = {
//    url: [{
//        hostEquals: 'example.com'
//    }]
//};
var globalList;
var url = 'https://pastebin.com/raw/qGJFF42z';
makeRequest(url);
chrome.webNavigation.onCommitted.addListener(onWebNav);
//chrome.webNavigation.onCommitted.addListener(onWebNav, filter);
chrome.webNavigation.onHistoryStateUpdated.addListener(onWebNav);
//chrome.webNavigation.onHistoryStateUpdated.addListener(onWebNav, filter);
