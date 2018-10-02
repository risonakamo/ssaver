window.onload=main;

function main()
{
    specialHover();

    chrome.tabs.query({active:true,currentWindow:true},(tab)=>{
        if (tab[0].url.slice(0,29)=="https://www.youtube.com/watch")
        {
            console.log("correct");
        }
    });

    document.querySelector(".save-button").addEventListener("click",(e)=>{
        e.preventDefault();

        chrome.tabs.executeScript({file:"popup/yt-hook-pre.js"},()=>{
            setTimeout(()=>{
                chrome.tabs.executeScript({file:"popup/yt-hook-final.js"},(res)=>{
                    console.log(res);
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