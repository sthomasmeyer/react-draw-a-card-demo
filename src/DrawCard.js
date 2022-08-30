import React, { useState, useEffect } from 'react';
import './DrawCard.css';
import axios from 'axios';
import Card from './Card';

const DrawCard = () => {
  const [deckId, setDeckId] = useState([]);
  const [card, setCard] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const [exhaustedDeck, setExhaustedDeck] = useState(false);

  useEffect(() => {
    console.log(`React's [useEffect()] Hook is working.`);
    console.log(card);
    async function getNewDeck() {
      const res = await axios.get(
        `http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
      );
      console.log(`New Deck ID: ${res.data.deck_id}`);
      setDeckId(res.data.deck_id);
    }

    getNewDeck();
  }, []);

  async function drawCardOnClick() {
    console.log(`The [drawCardOnClick()] function has been executed.`);
    const res = await axios.get(
      `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );

    if (res.data.success) {
      setCard(res.data.cards[0]);
    } else {
      setExhaustedDeck(true);
      setCard([]);
    }
  }

  const activateAutoDraw = () => setAutoDraw(true);
  const deactivateAutoDraw = () => setAutoDraw(false);

  useEffect(() => {
    if (autoDraw === true && !exhaustedDeck) {
      const intervalId = setInterval(() => drawCardOnClick(), 1000);
      return () => clearInterval(intervalId);
    }
  }, [autoDraw]);

  async function reShuffleDeck() {
    const res = await axios.get(
      `http://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
    );
    console.log(
      `The deck has been re-shuffled successfully: ${res.data.success}`
    );
    res.data.success
      ? setExhaustedDeck(false)
      : console.error(
          `Failed 'GET' request. The deck has *not* been re-shuffled.`
        );
  }

  return (
    <div className='DrawCard'>
      <h1>Draw a Card</h1>
      <div>
        <Card key={card.code} id={card.code} image={card.image} />
      </div>

      {!exhaustedDeck ? (
        <button onClick={drawCardOnClick} id='DrawCardBtn'>
          Draw a Card
        </button>
      ) : null}

      {!exhaustedDeck && autoDraw ? (
        <button onClick={deactivateAutoDraw} className='AutoDrawBtn'>
          Pause Auto Draw
        </button>
      ) : null}

      {!exhaustedDeck && !autoDraw ? (
        <button onClick={activateAutoDraw} className='AutoDrawBtn'>
          Auto Draw Cards
        </button>
      ) : null}

      {exhaustedDeck ? (
        <button onClick={reShuffleDeck} id='ReShuffleBtn'>
          Re-shuffle the Deck
        </button>
      ) : null}
    </div>
  );
};

export default DrawCard;
