var observer=new MutationObserver(checkVideo);

var watchElement;
var tryAttach=setInterval(()=>{
    // watchElement=document.querySelector("#items.ytd-watch-next-secondary-results-renderer"); //side bar
    watchElement=document.querySelector(".title yt-formatted-string.ytd-video-primary-info-renderer"); //video title

    if (!watchElement)
    {
        return;
    }

    observer.observe(watchElement,{
        childList:true,
        characterData:true
    });

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
        if (!data[vidId])
        {
            return;
        }

        videoBeingTracked();
    })
}

function videoBeingTracked()
{

}