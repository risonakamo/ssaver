//PopupRoot(string url)
//url: page url
class PopupRoot extends React.Component {
  constructor(props) {
    super(props);
    this.saveOperation = this.saveOperation.bind(this);
    this.doneOperation = this.doneOperation.bind(this);
    this.state = {
      hideDone: 0,
      //whether DONE button is hidden or not

      /*-- string info appearing in the popup --*/
      lastSave: "never",
      //what to set in the last save date spot
      lastSaveTitle: "",
      //hover title for last save date spot
      saveTime: "none" //what to set in the last save time spot

    }; //the video id extracted from the url

    this.vidId = this.props.url.match(/v=(.*?)(&|$)/)[1];
    this.controlsTop = React.createRef();
    this.controlsTopHoverClasses = ["save", "done", "to-saved"]; // this.lastData;* //last most updated vidEntry object obtained
    //either from the first load or the first save action
  }

  componentDidMount() {
    chrome.storage.local.get(this.vidId, data => {
      data = data[this.vidId];

      if (data) {
        this.lastData = data;
      } else {
        this.lastData = {};
      }

      this.updateInfo(data);
    });
  } //give it vidEntry to update info on the popup


  updateInfo(data) {
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
      lastSaveTitle: formatDateNice(thedate)
    };

    if (data.done) {
      initialise.saveTime = "done";
    } else {
      initialise.saveTime = secondsToTime(data.currentTime);
    }

    this.setState(initialise);
  } //special hover effect. add the addclass to the controlsTop, remove if remove is true


  specialHover(addClass, remove) {
    if (remove) {
      this.controlsTop.current.classList.remove(addClass);
      return;
    }

    for (var x = 0; x < this.controlsTopHoverClasses.length; x++) {
      this.controlsTop.current.classList.remove(this.controlsTopHoverClasses[x]);
    }

    this.controlsTop.current.classList.add(addClass);
  } //perform a save operation. saves the current video on the page to storage and
  //updates the popup information


  saveOperation(e) {
    e.preventDefault();
    this.setState({
      hideDone: 0
    });
    chrome.tabs.executeScript({
      file: "popup/yt-hook-pre.js"
    }, () => {
      setTimeout(() => {
        chrome.tabs.executeScript({
          file: "popup/yt-hook-final.js"
        }, res => {
          this.updateInfo(res[0]);

          if (this.lastData && this.lastData.saveCount) {
            this.lastData.saveCount++;
          } else {
            this.lastData.saveCount = 1;
          }

          res[0].saveCount = this.lastData.saveCount;
          chrome.storage.local.set({
            [this.vidId]: res[0]
          });
          this.lastData = res[0];
          console.log(res[0]);
        });
      }, 50);
    });
  } //perform done operation, pushing to database the vid entry except with done checked off.


  doneOperation(e) {
    e.preventDefault();
    this.setState({
      hideDone: 1
    });

    if (this.lastData.saveCount) {
      this.lastData.saveCount++;
    } else {
      this.lastData.saveCount = 1;
    }

    this.lastData.saveDate = new Date().toString();
    this.lastData.done = 1;
    chrome.storage.local.set({
      [this.vidId]: this.lastData
    });
    this.updateInfo(this.lastData);
  }

  render() {
    var hideDoneClass = this.state.hideDone ? "no-save" : "";
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "info"
    }, React.createElement("img", {
      className: "thumbnail",
      src: `https://img.youtube.com/vi/${this.vidId}/mqdefault.jpg`
    }), React.createElement("div", {
      className: "info-block-holder"
    }, React.createElement("div", {
      className: "info-block date"
    }, React.createElement("h1", null, "last saved"), React.createElement("p", {
      className: "last-save",
      title: this.state.lastSaveTitle
    }, this.state.lastSave)), React.createElement("div", {
      className: "info-block time"
    }, React.createElement("h1", null, "at time"), React.createElement("p", {
      className: "vid-time"
    }, this.state.saveTime)))), React.createElement("div", {
      className: `controls ${hideDoneClass}`,
      ref: this.controlsTop
    }, React.createElement("a", {
      href: "",
      className: "save-button",
      onMouseEnter: () => {
        this.specialHover("save");
      },
      onMouseLeave: () => {
        this.specialHover("save", 1);
      },
      onClick: this.saveOperation
    }, "save"), React.createElement("a", {
      href: "",
      className: "done-button",
      onMouseEnter: () => {
        this.specialHover("done");
      },
      onMouseLeave: () => {
        this.specialHover("done", 1);
      },
      onClick: this.doneOperation
    }, "done"), React.createElement("a", {
      href: "",
      className: "to-saved",
      onMouseEnter: () => {
        this.specialHover("to-saved");
      },
      onMouseLeave: () => {
        this.specialHover("to-saved", 1);
      },
      onClick: () => {
        chrome.tabs.create({
          url: "saved/saved.html"
        });
      }
    }, "saved videos")));
  }

}