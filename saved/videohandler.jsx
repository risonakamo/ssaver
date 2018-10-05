//VideoHander()
class VideoHandler extends React.Component
{
  constructor(props)
  {
    super(props);
    this.markDone=this.markDone.bind(this);

    this.state={
      //vidData:null* //the video entry data
    };
  }

  componentDidMount()
  {
    chrome.storage.local.get(null,(data)=>{
      this.setState({vidData:data});
    });
  }

  //given a vid id, mark it done, push to database,
  //move it out of vids and into done vids, and re renders
  markDone(vidId)
  {
    this.state.vidData[vidId].done=1;

    chrome.storage.local.set({[vidId]:this.state.vidData[vidId]});

    this.setState({vidData:this.state.vidData});
  }

  render()
  {
    var vids=[];
    var doneVids=[];

    for (var x in this.state.vidData)
    {
      if (this.state.vidData[x].done)
      {
        doneVids.push(this.state.vidData[x]);
      }

      else
      {
        vids.push(this.state.vidData[x]);
      }
    }

    sortVidEntryDate(vids);
    sortVidEntryDate(doneVids);

    return (<>
      {vids.map((x,i)=>{
        return <VideoEntry data={x} key={i} markDone={this.markDone}/>;
      })}

      {doneVids.map((x,i)=>{
        return <VideoEntry data={x} key={i} markDone={this.markDone}/>;
      })}
    </>);
  }
}