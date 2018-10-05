//VideoHander()
class VideoHandler extends React.Component {
  constructor(props) {
    super(props);
    this.markDone = this.markDone.bind(this);
    this.state = {
      vids: [],
      doneVids: []
    };
    this.vidsObj; //the vids object with ids as key saved
  }

  componentDidMount() {
    chrome.storage.local.get(null, data => {
      this.vidObj = data;

      for (var x in data) {
        if (data[x].done) {
          this.state.doneVids.push(data[x]);
        } else {
          this.state.vids.push(data[x]);
        }
      }

      this.sortAndRender();
    });
  } //given a vid id, mark it done, push to database,
  //move it out of vids and into done vids, and re render


  markDone(vidId) {
    this.vidObj[vidId].done = 1;
    chrome.storage.local.set({
      [vidId]: this.vidObj[vidId]
    });
    this.state.vids.splice(this.state.vids.find(x => {
      if (x.videoId == vidId) {
        return 1;
      }

      return 0;
    }), 1);
    this.state.doneVids.push(this.vidObj[vidId]);
    this.sortAndRender();
  } //given that state vids and donevids are initialised,
  //sort and render them


  sortAndRender() {
    var aDate;
    var bDate;

    var dateSort = (a, b) => {
      aDate = new Date(a.saveDate);
      bDate = new Date(b.saveDate);

      if (aDate < bDate) {
        return 1;
      } else {
        return -1;
      }
    };

    this.state.vids.sort(dateSort);
    this.state.doneVids.sort(dateSort);
    console.log(this.state.vids);
    console.log(this.state.doneVids);
    this.setState({
      vids: this.state.vids,
      doneVids: this.state.doneVids
    });
  }

  render() {
    console.log("a");
    return React.createElement(React.Fragment, null, this.state.vids.map((x, i) => {
      return React.createElement(VideoEntry, {
        data: x,
        key: i,
        markDone: this.markDone
      });
    }), this.state.doneVids.map((x, i) => {
      return React.createElement(VideoEntry, {
        data: x,
        key: i,
        markDone: this.markDone
      });
    }));
  }

}