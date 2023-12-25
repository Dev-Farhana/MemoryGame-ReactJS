import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  // {src : "/img/download.jpg "},
  {src : "/img/img-2download.png", matched: false},  
  {src: "/img/img-bluerose-.jpg", matched: false },  
  {src : "/img/img-rose.avif", matched: false},
  {src: "/img/img-water-lily-.jpg", matched: false }
];
  
function App() {
  const [cards , setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne , setChoiceOne] = useState(null);
  const [choiceTwo , setChoiceTwo] = useState(null);
  const [disabled, setDisabled ] = useState(false);

  //shuffle cards 
  const shuffleCards = () => {
    const shuffled_Cards = [...cardImages , ...cardImages]
    .sort(()=> { Math.random() - 0.5    })
    .map((card)=> ({...card,id: Math.random()} ))
    setCards(shuffled_Cards)
    setTurns(0)
  }
  // console.log(cards, turns);
  //hndle choice 
  const handleChoice = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  
  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1 )
    setDisabled(false)
  }

  //compare 2 selected cards 
  useEffect(()=> {
    if( choiceOne && choiceTwo ) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src ){
        console.log('cards match!');
        setCards(prevCards => {
          return prevCards.map((card) => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            } else{
              return card
            }
          })
        })
        resetTurn()
      } else{
        console.log(`not match`);
        setTimeout(() => resetTurn(), 1000)
      }
    }

  }, [choiceOne, choiceTwo])

  return(
    <>
    <div className="App">
      <h1> MAgic MAtch </h1>
      <button onClick={shuffleCards}> New Game!! </button>
      <div className="card-grid">
        {cards.map((card) => ( 
        <SingleCard 
        key={card.id} card={card} 
        handleChoice={handleChoice} 
        flipped= { card === choiceOne  || card === choiceTwo || card.matched }
        disabled={disabled}
        /> )
        )}

      </div>
    </div>
    </>
  )
}

export default App
