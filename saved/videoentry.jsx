//VideoEntry(object data)
//data: videoData object from storage
class VideoEntry extends React.Component
{
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
      <div className={`video-entry${doneClass}`}>
        <img src={`https://img.youtube.com/vi/${this.props.data.videoId}/mqdefault.jpg`}/>
        <div className="info">
          <a className="names" href={this.props.data.url}>
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
                &nbsp;<a href="" className="green">mark done</a>
              </span>

              <span className="the-time">{secondsToTime(this.props.data.duration)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}