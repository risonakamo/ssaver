window.onload=main;

var lastSaveDateElement;
var lastSaveTimeElement;
var controlsOuter;

function main()
{
    checkSite();
}

function main2(url)
{
    lastSaveDateElement=document.querySelector(".last-save");
    lastSaveTimeElement=document.querySelector(".vid-time");
    controlsOuter=document.querySelector(".controls");

    initialiseStuff(url);

    specialHover();
    buttonEvents();
}

function buttonEvents()
{
    document.querySelector(".save-button").addEventListener("click",(e)=>{
        e.preventDefault();

        controlsOuter.classList.remove("no-save");
        chrome.tabs.executeScript({file:"popup/yt-hook-pre.js"},()=>{
            setTimeout(()=>{
                chrome.tabs.executeScript({file:"popup/yt-hook-final.js"},(res)=>{
                    handleResult(res[0]);
                    console.log(res[0]);
                });
            },50);
        });
    });

    //done button is initialised in initialiseStuff because it needs vid data

    document.querySelector(".to-saved").addEventListener("click",(e)=>{
        e.preventDefault();

        chrome.tabs.create({url:"saved/saved.html"});
    });
}

//special hover effects
//add a class to the parent container "controls" each time a child A is hovered over
function specialHover()
{
    var buttons=controlsOuter.querySelectorAll(".controls>a");
    var buttonAddClasses=["save","done"]; //make sure the number of strings in here match the number of A elements

    buttons.forEach((x,i)=>{
        x.addEventListener("mouseenter",(e)=>{
            for (var y=0;y<buttonAddClasses.length;y++)
            {
                controlsOuter.classList.remove(buttonAddClasses[y]);
            }

            controlsOuter.classList.add(buttonAddClasses[i]);
        });

        x.addEventListener("mouseleave",(e)=>{
            for (var y=0;y<buttonAddClasses.length;y++)
            {
                controlsOuter.classList.remove(buttonAddClasses[y]);
            }
        });
    });
}

//perform actions given data from yt hook
function handleResult(res)
{
    chrome.storage.local.set({[res.videoId]:res});

    setLastTimes(res);
    document.querySelector(".save-button").innerText="saved";
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

        if (!data || data.done)
        {
            controlsOuter.classList.add("no-save");

            if (!data)
            {
                return;
            }
        }

        setLastTimes(data);

        document.querySelector(".done-button").addEventListener("click",(e)=>{
            e.preventDefault();

            data.done=1;
            chrome.storage.local.set({[vidId]:data});
            setLastTimes(data);
            controlsOuter.classList.add("no-save");
        });
    });
}

//given video data object, set the visual stuff for last
//date saved and last time saved
function setLastTimes(data)
{
    var thedate=new Date(data.saveDate);
    lastSaveDateElement.title=`${thedate.toDateString().slice(4)}, ${thedate.toTimeString().slice(0,5)}`;
    lastSaveDateElement.innerText=timeago().format(thedate);

    if (data.done)
    {
        lastSaveTimeElement.innerText="done";
    }

    else
    {
        lastSaveTimeElement.innerText=secondsToTime(data.currentTime);
    }
}

//given seconds, convert to a time stamp supporting hh:mm:ss
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

//show the whole extension storage
function showStorage()
{
    chrome.storage.local.get(null,(data)=>{
        console.log(data);
    });
}