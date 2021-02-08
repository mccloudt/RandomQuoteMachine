import React, {Component} from 'react';
import rp from 'request-promise';

const quoteStyle = {
    fontSize: "28px",
    color: "black",
    margin:"2%",
}

const authorStyle = {
    fontSize: "16px",
    color: "gray",
    margin:"2%",
}
const buttonStyle = {
    width:"20%",
    float:"left",
    margin:"2%",
    padding:"2%",
    borderRadius: "5px",
    border:"1px transparent",
    color: "white",
}
const quoteBox = {
    width: "100%",
    height:"100vh",
    position:"relative",
}
const quoteCard = {
    minWidth:"35%",
    position: "absolute",
    top:"50%",
    left:"50%",
    transform: "translate(-50%, -50%)",
    backgroundColor:"white",
    padding:"2%",
    borderRadius: "5px",
    boxShadow: "1px 0px 3px 2px #AAAADD",
}
const tweetQuote = {
    float:"right",
    margin:"2%",
}


class QuoteCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            quote: '',
            author: '',
            backgroundColor: ''
        }
        this.getNewQuote = this.getNewQuote.bind(this);
    }
    componentDidMount(){
        this.getNewQuote();
    }
    getNewQuote () {
        rp({uri: 'https://type.fit/api/quotes', json:true})
        .then((data) => {
            let rQuote = data[Math.floor(Math.random() * 1000)];
            this.setState({
                quote: rQuote.text,
                author: rQuote.author,
                backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        return (
            <div id="quote-box" style={Object.assign({}, quoteBox, {backgroundColor: this.state.backgroundColor})}>
                    <div id='quote-card' style={quoteCard}>
                        <p style={quoteStyle} id="text">{this.state.quote}</p>
                        <p style={authorStyle} id="author">{this.state.author}</p>
                        <button onClick={this.getNewQuote} id='new-quote' style={Object.assign({}, buttonStyle, {backgroundColor: this.state.backgroundColor})}>New Quote</button>
                        <a 
                            id="tweet-quote" 
                            style={Object.assign({}, tweetQuote, {color: this.state.backgroundColor})} 
                            href={`https://twitter.com/intent/tweet?text=${this.state.quote} - ${this.state.author}`} 
                            target="_blank">
                                <i className="fab fa-twitter-square fa-4x"></i>
                        </a>
                    </div>
            </div>
        )
    }
}

export default QuoteCard;