//VideoEntry(object data)
//data: videoData object from storage
class VideoEntry extends React.Component {
  render() {
    var saveCount = this.props.data.saveCount;

    if (!saveCount) {
      saveCount = 1;
    }

    var completePercent;
    var doneClass = "";

    if (this.props.data.done) {
      doneClass = " done";
      completePercent = 100;
    } else {
      completePercent = this.props.data.currentTime / this.props.data.duration * 100;
    }

    var thedate = new Date(this.props.data.saveDate);
    return React.createElement("div", {
      className: `video-entry${doneClass}`
    }, React.createElement("img", {
      src: `https://img.youtube.com/vi/${this.props.data.videoId}/mqdefault.jpg`
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
    }, React.createElement("span", {
      title: formatDateNice(thedate)
    }, timeago().format(thedate), "\xA0", React.createElement("span", {
      className: "red"
    }, "#", saveCount), "\xA0", React.createElement("a", {
      href: "",
      className: "green"
    }, "mark done")), React.createElement("span", {
      className: "the-time"
    }, secondsToTime(this.props.data.duration))))));
  }

}