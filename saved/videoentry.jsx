//VideoEntry(object data,function markDone)
//data: videoData object from storage
//markDone: function from videohandler parent
class VideoEntry extends React.Component
{
  constructor(props)
  {
    super(props);
    this.doubleHover=this.doubleHover.bind(this);

    this.entryTop=React.createRef();
  }

  doubleHover(e)
  {
    this.entryTop.current.classList.toggle("link-hover");
  }

  render()
  {
    var saveCount=this.props.data.saveCount;
    if (!saveCount)
    {
      saveCount=1;
    }

    var completePercent;
    var doneClass="";
    if (this.props.data.done)
    {
      doneClass=" done";
      completePercent=100;
    }

    else
    {
      completePercent=(this.props.data.currentTime/this.props.data.duration)*100;
    }

    var thedate=new Date(this.props.data.saveDate);

    return (
      <div className={`video-entry${doneClass}`} ref={this.entryTop}>
        <a className="double-hover" href={this.props.data.url}
          onMouseEnter={this.doubleHover} onMouseLeave={this.doubleHover}
        >
          <img src={`https://img.youtube.com/vi/${this.props.data.videoId}/mqdefault.jpg`}/>
        </a>
        <div className="info">
          <a className="names double-hover" href={this.props.data.url}
            onMouseEnter={this.doubleHover} onMouseLeave={this.doubleHover}
          >
            <h1>{this.props.data.title}</h1>
            <h2>{this.props.data.channel}</h2>
          </a>

          <div className="bar">
            <div className="now-time" style={{paddingLeft:`${completePercent}%`}}>
              <span>{secondsToTime(this.props.data.currentTime)}</span>
            </div>

            <div className="the-bar">
              <div className="inside" style={{width:`${completePercent}%`}}></div>
            </div>

            <div className="full-time">
              <span title={formatDateNice(thedate)}>
                {timeago().format(thedate)}
                &nbsp;<span className="red">#{saveCount}</span>
                &nbsp;<a href="" className="green" onClick={(e)=>{
                  e.preventDefault();
                  this.props.markDone(this.props.data.videoId);
                }}>
                  mark done
                </a>
              </span>

              <span className="the-time">{secondsToTime(this.props.data.duration)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}