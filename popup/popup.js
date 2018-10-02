window.onload=main;

function main()
{
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
