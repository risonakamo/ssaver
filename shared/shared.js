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