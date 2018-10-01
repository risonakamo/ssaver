window.onload=main;

function main()
{
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
