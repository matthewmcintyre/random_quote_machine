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
      error: null
    };
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/matthewmcintyre/cbcf178400711246051631e9e84955ec/raw/483a15ebf0c26165d77dffa5427b07cf743097c1/quotes.json"
    )
      .then(res => res.json())
      .then(
        result => {
          let initialArrPosition = this.randomQuotePosition(result.quotes);

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

  randomQuotePosition = arr => {
    return Math.floor(Math.random() * arr.length);
  };

  newQuote = () => {
    let rollQuote = Math.floor(Math.random() * this.state.quotesArr.length);

    while (
      this.randomQuotePosition(this.state.quotesArrPosition) === rollQuote
    ) {
      rollQuote = Math.floor(Math.random() * this.state.quotesArr.length);
    }

    this.setState({
      currentQuote: this.state.quotesArr[rollQuote].quote,
      currentAuthor: this.state.quotesArr[rollQuote].author
    });
  };

  newTweet = () => {
    let url =
      "https://twitter.com/intent/tweet?text=" +
      this.state.currentQuote +
      "- " +
      this.state.currentAuthor;

    window.open(url);
  };

  render() {
    return (
      <div id="quote-box">
        <p id="quote">"{this.state.currentQuote}"</p>
        <p id="author">- {this.state.currentAuthor}</p>
        <div className="buttonDiv">
          <button className="myButton" onClick={this.newQuote}>
            New Quote
          </button>
          <div id="socialButtons">
            <button className="socialButton" onClick={this.newTweet}>
              <FontAwesomeIcon icon={faTwitter} />
            </button>
            <button className="socialButton" onClick={this.newTweet}>
              <FontAwesomeIcon icon={faGithub} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteBox;
