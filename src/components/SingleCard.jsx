import React from 'react';
import '../App.css';

function SingleCard({card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if(!disabled){
      handleChoice(card)
    }
  }

  return (
    <div  className='card'>
          <div className={flipped ? "flipped" : ""} >
            <img className='front' src={card.src} alt="Front-side" />
            <img className='back' 
            src="/img/download.jpg" alt="back-side"
            onClick={handleClick} />
          </div>
    </div> 

  )
}

export default SingleCard