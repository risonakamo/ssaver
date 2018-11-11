var observer=new MutationObserver(checkVideo);

var watchElement; //the observe for navigation change element
var playerElement; //the player container

//the track badge
var trackIcons={
    white:chrome.runtime.getURL("img/icon-white.png"),
    green:chrome.runtime.getURL("img/icon-green.png")
}

var trackBadge=document.createElement("div");
trackBadge.innerHTML=`<img class="track-badge" style="position:absolute;z-index:10;top:9px;right:14px;height:36px" src="${trackIcons.white}">`;
trackBadge=trackBadge.firstChild;

//wait for watch and player elements to load before continuing
var tryAttach=setInterval(()=>{
    // watchElement=document.querySelector("#items.ytd-watch-next-secondary-results-renderer"); //side bar
    watchElement=document.querySelector(".title yt-formatted-string.ytd-video-primary-info-renderer"); //video title
    playerElement=document.querySelector("#container.ytd-player");

    if (!watchElement || !playerElement)
    {
        return;
    }

    observer.observe(watchElement,{
        childList:true,
        characterData:true
    });

    playerElement.appendChild(trackBadge);

    checkVideo();
    clearInterval(tryAttach);
},500);

var url;
var lastUrl;
var vidIdReg=/v=(.*?)(&|$)/;
var vidId;

//check the current video with the database and see if it's already
//in the database, and do something if it is
function checkVideo()
{
    console.log("a");
    url=window.location.href;

    //make sure it is a video page and hasnt already been
    //checked
    if (url.search("watch")<0 || url==lastUrl)
    {
        return;
    }

    lastUrl=url;
    vidId=url.match(vidIdReg)[1];

    //if the video is being tracked do the function
    chrome.storage.local.get(vidId,(data)=>{
        videoBeingTracked(data[vidId]);
    })
}

//actions to do if video is in the database
function videoBeingTracked(yes)
{
    if (!yes)
    {
        trackBadge.style.display="none";
    }

    else
    {
        trackBadge.style.display=null;

        if (yes.done)
        {
            trackBadge.src=trackIcons.green;
        }

        else
        {
            trackBadge.src=trackIcons.white;
        }
    }
}