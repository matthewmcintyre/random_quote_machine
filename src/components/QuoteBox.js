import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

class QuoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      quotesArr: [],
      currentQuote: "",
      currentAuthor: "",
      quotesArrPosition: 0,
      currentColor: "#FE938C",
      error: null,
      colorArr: ["#B91372", "#41EAD4", "#FF0022", "#F39237", "#39A9DB"]
    };
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/matthewmcintyre/cbcf178400711246051631e9e84955ec/raw/483a15ebf0c26165d77dffa5427b07cf743097c1/quotes.json"
    )
      .then(res => res.json())
      .then(
        result => {
          let initialArrPosition = this.randomArrPosition(result.quotes);

          this.setState({
            isLoaded: true,
            quotesArr: result.quotes,
            quotesArrPosition: initialArrPosition,
            currentQuote: result.quotes[initialArrPosition].quote,
            currentAuthor: result.quotes[initialArrPosition].author
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  randomArrPosition = arr => {
    return Math.floor(Math.random() * arr.length);
  };

  newQuote = () => {
    let rollQuote = this.randomArrPosition(this.state.quotesArr);

    while (this.randomArrPosition(this.state.quotesArrPosition) === rollQuote) {
      rollQuote = Math.floor(Math.random() * this.state.quotesArr.length);
    }

    this.setState({
      currentQuote: this.state.quotesArr[rollQuote].quote,
      currentAuthor: this.state.quotesArr[rollQuote].author
    });

    this.setColor();
  };

  newTweet = () => {
    let url =
      "https://twitter.com/intent/tweet?text=" +
      this.state.currentQuote +
      "  - " +
      this.state.currentAuthor;

    window.open(url);
  };

  githubPage = () => {
    window.open("http://matthewmcintyre.me");
  };

  setBackground = color => {
    document.documentElement.style =
      "background: " + this.state.colorArr[this.state.colorArrPosition] + ";";
  };

  setColor = () => {
    let rollResult = this.randomArrPosition(this.state.colorArr);

    while (rollResult === this.state.colorArrPosition) {
      rollResult = this.randomArrPosition(this.state.colorArr);
    }

    this.setState({
      currentColor: this.state.colorArr[rollResult],
      colorArrPosition: rollResult
    });
    document.documentElement.style =
      "background: " + this.state.colorArr[rollResult] + ";";
  };

  render() {
    return (
      <div id="quote-box">
        <p id="quote">"{this.state.currentQuote}"</p>
        <p id="author">- {this.state.currentAuthor}</p>
        <div className="buttonDiv">
          <button
            className="myButton hvr-grow-shadow"
            onClick={this.newQuote}
            style={{
              backgroundColor: this.state.currentColor
            }}
          >
            New Quote
          </button>
          <div id="socialButtons">
            <button
              className="socialButton hvr-grow-shadow"
              onClick={this.newTweet}
              style={{
                backgroundColor: this.state.currentColor
              }}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </button>
            <button
              className="socialButton hvr-grow-shadow"
              onClick={this.githubPage}
              style={{
                backgroundColor: this.state.currentColor
              }}
            >
              <FontAwesomeIcon icon={faGithub} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteBox;
