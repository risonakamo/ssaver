//VideoEntry(object data,function markDone)
//data: videoData object from storage
//markDone: function from videohandler parent
class VideoEntry extends React.Component {
  constructor(props) {
    super(props);
    this.doubleHover = this.doubleHover.bind(this);
    this.entryTop = React.createRef();
  }

  doubleHover(e) {
    this.entryTop.current.classList.toggle("link-hover");
  }

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
      className: `video-entry${doneClass}`,
      ref: this.entryTop
    }, React.createElement("a", {
      className: "double-hover",
      href: this.props.data.url,
      onMouseEnter: this.doubleHover,
      onMouseLeave: this.doubleHover
    }, React.createElement("img", {
      src: `https://img.youtube.com/vi/${this.props.data.videoId}/mqdefault.jpg`
    })), React.createElement("div", {
      className: "info"
    }, React.createElement("a", {
      className: "names double-hover",
      href: this.props.data.url,
      onMouseEnter: this.doubleHover,
      onMouseLeave: this.doubleHover
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
      className: "green",
      onClick: e => {
        e.preventDefault();
        this.props.markDone(this.props.data.videoId);
      }
    }, "mark done")), React.createElement("span", {
      className: "the-time"
    }, secondsToTime(this.props.data.duration))))));
  }

}