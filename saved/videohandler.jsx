//VideoHander()
class VideoHandler extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state={
      vids:[],
      doneVids:[]
    };
  }

  componentDidMount()
  {
    chrome.storage.local.get(null,(data)=>{
      for (var x in data)
      {
        if (data[x].done)
        {
          this.state.doneVids.push(data[x]);
        }

        else
        {
          this.state.vids.push(data[x]);
        }
      }

      var aDate;
      var bDate;

      var dateSort=(a,b)=>{
        aDate=new Date(a.saveDate);
        bDate=new Date(b.saveDate);

        if (aDate<bDate)
        {
          return 1;
        }

        else
        {
          return -1;
        }
      };

      this.state.vids.sort(dateSort);
      this.state.doneVids.sort(dateSort);

      this.setState({vids:this.state.vids});
    });
  }

  render()
  {
    return (<>
      {this.state.vids.map((x,i)=>{
        return <VideoEntry data={x} key={i}/>;
      })}

      {this.state.doneVids.map((x,i)=>{
        return <VideoEntry data={x} key={i}/>;
      })}
    </>);
  }
}