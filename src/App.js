import React, {useEffect, useState} from 'react';
import './App.scss';
import images from './imageArray';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons'
function App() {
  const colorsArr = ['4FC1FF', "E8B9AB", 'CB769E', '69995D', 'D2D7DF', '3AA7A3', 'ECA400', '006992', 'AFECE7', '81F499', '890620', 'B6465F', '8ACDEA']
  const [quote, setQuote] = useState("In India, we celebrate the commonality of major differences; we are a land of belonging rather than of blood."); //initial state is the quote
  const [author, setAuthor] = useState("Shashi Tharoor"); //initial state is the quote
  const [accentColor, setAccentColor] = useState("#FF4D4D");
const [quotesArray, setQuotesArray] = useState(null)
const quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
  const [randomNumber, setRandomNumber] = useState(0);
  const fetchQuotes = async(url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    
  }
  const [randomImage, setRandomImage ] = useState("https://images.pexels.com/photos/57901/pexels-photo-57901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  },
  [quoteDBUrl])
    const getRandomQuote = () =>{
    const randomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomInteger);
    setQuote(quotesArray[randomInteger].quote)
    setAccentColor(COLORS_ARRAY[randomInteger])
    setAuthor(quotesArray[randomInteger].author)
    setRandomImage(images[randomInteger])
if (quotesArray[randomInteger].author === "Unknown")
setAuthor("No author");
  }
  const quoteColorStyle = {
 quoteBox:{
    boxShadow:   `10px 10px 20px -10px ${accentColor}`
  },
 button : {
// //   //boxShadow:   `10px 10px 20px -10px ${accentColor}`,
backgroundColor: `${accentColor}`,
// //   // backdropFilter: 'blur(20px)',
color: `red`
 }
};
  return (
    <div className="App">
    {/* <img src = {randomImage} /> */}
      <header className="App-header" style = {{backgroundImage: "url(" + randomImage + ")", color: accentColor }}>
      <div id = "quote-box" style = {quoteColorStyle.quoteBox}>
    <p id = "text"><FontAwesomeIcon icon="fa-solid fa-quote-left" />{quote}</p>
    <p id = "author">- {author}</p> 
<button id = "new-quote" className = "btn"  onClick = {getRandomQuote} style = {quoteColorStyle.button}>New Quote</button>
    <a id = "tweet-quote" target = "_blank" href = {encodeURI(`https://twitter.com/intent/tweet/?text=${quote} -${author}`)} ><FontAwesomeIcon icon = {faTwitter}  /></a>
    <a id = "tumblr-quote" target = "_blank" href = {encodeURI(`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=Abraham%20Lincoln&content=It%E2%80%99s%20not%20the%20years%20in%20your%20life%20that%20count.%20It%E2%80%99s%20the%20life%20in%20your%20years.&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`)}><FontAwesomeIcon icon = {faTumblr} /></a>
    
    </div>
    
    </header>
    </div>
    
  );
}

export default App;
