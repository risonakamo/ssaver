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

    this.controlsTop=React.createRef();
    this.controlsTopHoverClasses=["save","done"];
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

  //special hover effect. add the addclass to the controlsTop, remove if remove is true
  specialHover(addClass,remove)
  {
    if (remove)
    {
      this.controlsTop.current.classList.remove(addClass);
      return;
    }

    for (var x=0;x<this.controlsTopHoverClasses.length;x++)
    {
      this.controlsTop.current.classList.remove(this.controlsTopHoverClasses[x]);
    }

    this.controlsTop.current.classList.add(addClass);
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
            <p className="last-save" title={this.state.lastSaveTitle}>{this.state.lastSave}</p>
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

      <div className={`controls ${hideDoneClass}`} ref={this.controlsTop}>
        <a href="" className="save-button" onMouseEnter={()=>{this.specialHover("save")}}
          onMouseLeave={()=>{this.specialHover("save",1)}}
        >
          save
        </a>

        <a href="" className="done-button" onMouseEnter={()=>{this.specialHover("done")}}
          onMouseLeave={()=>{this.specialHover("done",1)}}
        >
          done
        </a>
      </div>
    </>);
  }
}