window.onload=main;

function main()
{
    chrome.storage.local.get(null,(data)=>{
        for (var x in data)
        {
            ReactDOM.render(React.createElement(VideoEntry,{data:data[x]}),document.querySelector(".videos"));
            return;
        }
    });

}
