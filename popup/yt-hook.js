var player=document.querySelector("#movie_player");

window.localStorage.ssaverHookData=JSON.stringify({
    url:player.getVideoUrl(),
    time:Math.floor(player.getCurrentTime()),
    duration:player.getDuration()
});