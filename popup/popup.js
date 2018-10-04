window.onload=main;

function main()
{
    checkSite();
}

function main2(url)
{
    ReactDOM.render(React.createElement(PopupRoot,{url}),document.querySelector(".good-site"));
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