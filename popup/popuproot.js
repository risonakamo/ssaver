//PopupRoot(string url)
//url: page url
class PopupRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //hideDone:0,* whether DONE button is hidden or not

      /*-- string info appearing in the popup --*/
      lastSave: "never",
      //what to set in the last save date spot
      lastSaveTitle: "",
      //hover title for last save date spot
      saveTime: "none" //what to set in the last save time spot

    }; //the video id extracted from the url

    this.vidId = this.props.url.match(/v=(.*?)(&|$)/)[1];
  }

  componentDidMount() {
    chrome.storage.local.get(this.vidId, data => {
      data = data[this.vidId];
      this.updateInfo(data);
    });
  } //give it vidEntry to update info on the popup


  updateInfo(data) {
    var thedate = new Date(data.saveDate);

    if (!data || data.done) {
      this.setState({
        hideDone: 1
      });

      if (!data) {
        return;
      }
    }

    var thedate = new Date(data.saveDate);
    var initialise = {
      lastSave: timeago().format(thedate),
      lastSaveTitle: `${thedate.toDateString().slice(4)}, ${thedate.toTimeString().slice(0, 5)}`
    };

    if (data.done) {
      initialise.saveTime = "done";
    } else {
      initialise.saveTime = secondsToTime(data.currentTime);
    }

    this.setState(initialise);
  }

  render() {
    var hideDoneClass = this.state.hideDone ? "no-save" : "";
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "info"
    }, React.createElement("img", {
      className: "thumbnail",
      src: `https://img.youtube.com/vi/${this.vidId}/maxresdefault.jpg`
    }), React.createElement("div", {
      className: "info-block-holder"
    }, React.createElement("div", {
      className: "info-block date"
    }, React.createElement("h1", null, "last saved"), React.createElement("p", {
      className: "last-save"
    }, this.state.lastSave)), React.createElement("div", {
      className: "info-block time"
    }, React.createElement("h1", null, "at time"), React.createElement("p", {
      className: "vid-time"
    }, this.state.saveTime))), React.createElement("a", {
      className: "to-saved",
      href: ""
    }, "to saved")), React.createElement("div", {
      className: `controls ${hideDoneClass}`
    }, React.createElement("a", {
      href: "",
      className: "save-button"
    }, "save"), React.createElement("a", {
      href: "",
      className: "done-button"
    }, "done")));
  }

}