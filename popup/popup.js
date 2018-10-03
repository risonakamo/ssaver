window.onload=main;

var lastSaveDateElement;
var lastSaveTimeElement;

function main()
{
    checkSite();
}

function main2(url)
{
    lastSaveDateElement=document.querySelector(".last-save");
    lastSaveTimeElement=document.querySelector(".vid-time");
    initialiseStuff(url);
    specialHover();

    document.querySelector(".save-button").addEventListener("click",(e)=>{
        e.preventDefault();

        chrome.tabs.executeScript({file:"popup/yt-hook-pre.js"},()=>{
            setTimeout(()=>{
                chrome.tabs.executeScript({file:"popup/yt-hook-final.js"},(res)=>{
                    handleResult(res[0]);
                    console.log(res[0]);
                });
            },50);
        });
    });
}

//special hover effects
//add a class to the parent container "controls" each time a child A is hovered over
function specialHover()
{
    var controlsTop=document.querySelector(".controls");
    var buttons=controlsTop.querySelectorAll(".controls>a");
    var buttonAddClasses=["save","done"]; //make sure the number of strings in here match the number of A elements

    buttons.forEach((x,i)=>{
        x.addEventListener("mouseenter",(e)=>{
            for (var y=0;y<buttonAddClasses.length;y++)
            {
                controlsTop.classList.remove(buttonAddClasses[y]);
            }

            controlsTop.classList.add(buttonAddClasses[i]);
        });

        x.addEventListener("mouseleave",(e)=>{
            for (var y=0;y<buttonAddClasses.length;y++)
            {
                controlsTop.classList.remove(buttonAddClasses[y]);
            }
        });
    });
}

//perform actions given data from yt hook
function handleResult(res)
{
    chrome.storage.local.set({[res.videoId]:res});

    setLastTimes(res);
}

//initial site check.
function checkSite()
{
    chrome.tabs.query({active:true,currentWindow:true},(tab)=>{
        if (tab[0].url.slice(0,29)=="https://www.youtube.com/watch")
        {
            document.querySelector(".good-site").classList.add("show");
            main2(tab[0].url);
        }

        else
        {
            document.querySelector(".bad-site").classList.add("show");
        }
    });
}

//given url, do initialisation stuff including checking local
//storage for if it already exists and getting that data
function initialiseStuff(url)
{
    var vidId=url.match(/v=(.*?)(&|$)/)[1];

    document.querySelector(".thumbnail").src=`https://img.youtube.com/vi/${vidId}/0.jpg`;

    chrome.storage.local.get(vidId,(data)=>{
        data=data[vidId];

        if (!data)
        {
            return;
        }

        setLastTimes(data);
    });
}

//given video data object, set the visual stuff for last
//date saved and last time saved
function setLastTimes(data)
{
    var thedate=new Date(data.saveDate);
    lastSaveDateElement.innerText=`${thedate.toDateString().slice(4)} ${thedate.toTimeString().slice(0,5)}`;

    if (data.done)
    {
        lastSaveTimeElement.innerText="completed";
    }

    else
    {
        lastSaveTimeElement.innerText=secondsToTime(data.currentTime);
    }
}

function secondsToTime(secs)
{
    var mins=Math.floor(secs/60);
    var secs=Math.floor(secs-(mins*60));

    var hours=Math.floor(mins/60);
    mins=Math.floor(mins-(hours*60));

    if (secs<10)
    {
        secs="0"+secs;
    }

    if (mins<10 && hours>0)
    {
        mins="0"+mins;
    }

    if (hours>0)
    {
        hours=hours+":";
    }

    else
    {
        hours="";
    }

    return hours+`${mins}:${secs}`;
}