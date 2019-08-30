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

//return string version of a date object
//in the way i want
function formatDateNice(thedate)
{
    return `${thedate.toDateString().slice(4)}, ${thedate.toTimeString().slice(0,5)}`;
}

//show the whole extension storage
function showStorage()
{
    chrome.storage.local.get(null,(data)=>{
        console.log(data);
    });
}

//given an array of vid entries, sorts them by date, in place
function sortVidEntryDate(entries)
{
    entries.sort((a,b)=>{
        var aDate=new Date(a.saveDate);
        var bDate=new Date(b.saveDate);

        if (aDate<bDate)
        {
            return 1;
        }

        else
        {
            return -1;
        }
    });
}

//debug function. set everything to not done
function setAllNotDone()
{
    chrome.storage.local.get(null,(data)=>{
        for (var x in data)
        {
            delete data[x].done;
        }

        chrome.storage.local.set(data);
    });
}

//check all entries and see if theres a vid entry that doesnt match its key,
//for some reason
function checkVidIdErrors()
{
    chrome.storage.local.get(null,(data)=>{
        for (var x in data)
        {
            if (data[x].videoId!=x)
            {
                console.log(x,data[x]);
            }
        }
    });
}

//find all storage entries who's key doesnt match the video id and
//remove them, then put back the videos with the wrong keys with the
//keys matching the video id
function fixVidIdErrors()
{
    var badIds=[];
    var correctIds={};
    chrome.storage.local.get(null,(data)=>{
        for (var x in data)
        {
            if (data[x].videoId!=x)
            {
                correctIds[data[x].videoId]=data[x];
                badIds.push(x);
            }
        }

        chrome.storage.local.remove(badIds);
        chrome.storage.local.set(correctIds);
    });
}