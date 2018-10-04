//VideoEntry(object data)
//data: videoData object from storage
class VideoEntry extends React.Component {
  render() {
    var completePercent = this.props.data.currentTime / this.props.data.duration * 100;
    return React.createElement("div", {
      className: "video-entry"
    }, React.createElement("img", {
      src: `https://img.youtube.com/vi/${this.props.data.videoId}/maxresdefault.jpg`
    }), React.createElement("div", {
      className: "info"
    }, React.createElement("a", {
      className: "names",
      href: this.props.data.url
    }, React.createElement("h1", null, this.props.data.title), React.createElement("h2", null, this.props.data.channel)), React.createElement("div", {
      className: "bar"
    }, React.createElement("div", {
      className: "now-time",
      style: {
        paddingLeft: `${completePercent}%`
      }
    }, React.createElement("span", null, secondsToTime(this.props.data.currentTime))), React.createElement("div", {
      className: "the-bar"
    }, React.createElement("div", {
      className: "inside",
      style: {
        width: `${completePercent}%`
      }
    })), React.createElement("div", {
      className: "full-time"
    }, React.createElement("span", null, timeago().format(new Date(this.props.data.saveDate)), " ", React.createElement("span", {
      className: "red"
    }, "#2"), " ", React.createElement("a", {
      href: "",
      className: "green"
    }, "mark done")), React.createElement("span", {
      className: "the-time"
    }, secondsToTime(this.props.data.duration))))));
  }

}