//VideoHander()
class VideoHandler extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state={
      vids:[]
    };
  }

  componentDidMount()
  {
    chrome.storage.local.get(null,(data)=>{
      for (var x in data)
      {
        this.state.vids.push(data[x]);
      }

      this.setState({vids:this.state.vids});
    });
  }

  render()
  {
    return this.state.vids.map((x,i)=>{
      return <VideoEntry data={x} key={i}/>;
    });
  }
}