import React, { useState, useEffect } from 'react';
import './DrawCard.css';
import axios from 'axios';

const DrawCard = () => {
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [deckId, setDeckId] = useState([]);
  const [cardImage, setCardImage] = useState([]);

  useEffect(() => {
    console.log(`React's [useEffect()] Hook is working.`);
    async function getNewDeck() {
      const res = await axios.get(
        `http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
      );
      console.log(`New Deck ID:${res.data.deck_id}`);
      setDeckId(res.data.deck_id);
    }

    getNewDeck();
  }, []);

  useEffect(function getCard() {
    async function drawCard() {
      const res = await axios.get(
        `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      console.log(res.data.success);
      setCardImage(res.data.cards[0].image);
    }

    drawCard();
  }, []);

  return (
    <div className='DrawCard'>
      <h1>Draw a Card</h1>
      <img src={cardImage} />
      <button onClick={getCard}>Draw a Card</button>
    </div>
  );
};

export default DrawCard;
