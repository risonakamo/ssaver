var player=document.querySelector("#movie_player");
var url=player.getVideoUrl();

//return object to popup. described in data formats as videoData
window.localStorage.ssaverHookData=JSON.stringify({
    title:document.querySelector("h1.title").innerText,
    channel:document.querySelector("#channel-name").innerText,
    url:url,
    videoId:url.match(/v=(.*)/)[1],
    currentTime:player.getCurrentTime(),
    duration:player.getDuration(),
    saveDate:new Date().toString()
});

document.querySelector(".track-badge").style.display="";