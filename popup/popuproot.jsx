//PopupRoot(string url)
//url: page url
class PopupRoot extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state={
      //hideDone:0,* whether DONE button is hidden or not

      /*-- string info appearing in the popup --*/
      lastSave:"never", //what to set in the last save date spot
      lastSaveTitle:"", //hover title for last save date spot
      saveTime:"none" //what to set in the last save time spot
    };

    //the video id extracted from the url
    this.vidId=this.props.url.match(/v=(.*?)(&|$)/)[1];
  }

  componentDidMount()
  {
    chrome.storage.local.get(this.vidId,(data)=>{
      data=data[this.vidId];

      this.updateInfo(data);
    });
  }

  //give it vidEntry to update info on the popup
  updateInfo(data)
  {
    var thedate=new Date(data.saveDate);

    if (!data || data.done)
    {
      this.setState({hideDone:1});

      if (!data)
      {
        return;
      }
    }

    var thedate=new Date(data.saveDate);

    var initialise={
      lastSave:timeago().format(thedate),
      lastSaveTitle:`${thedate.toDateString().slice(4)}, ${thedate.toTimeString().slice(0,5)}`
    };

    if (data.done)
    {
      initialise.saveTime="done";
    }

    else
    {
      initialise.saveTime=secondsToTime(data.currentTime);
    }

    this.setState(initialise);
  }

  render()
  {
    var hideDoneClass=this.state.hideDone?"no-save":"";

    return (<>
      <div className="info">
        <img className="thumbnail" src={`https://img.youtube.com/vi/${this.vidId}/maxresdefault.jpg`}/>

        <div className="info-block-holder">
          <div className="info-block date">
            <h1>last saved</h1>
            <p className="last-save">{this.state.lastSave}</p>
          </div>

          <div className="info-block time">
            <h1>at time</h1>
            <p className="vid-time">{this.state.saveTime}</p>
          </div>
        </div>

        <a className="to-saved" href="">
          to saved
        </a>
      </div>

      <div className={`controls ${hideDoneClass}`}>
        <a href="" className="save-button">save</a>
        <a href="" className="done-button">done</a>
      </div>
    </>);
  }
}