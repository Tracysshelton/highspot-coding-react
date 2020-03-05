import React from 'react';
import CardSearch from './components/CardSearch';
import CardsContainer from './components/CardsContainer'
import Card from './components/Card';
import Loader from './assets/loader.gif';
import searchIcon from './assets/search-icon-small.png';

//Rendering individual card and information
const CardsContainer =() => {
	return (
		<div className="container">
        {/* Heading */}
        <h1 className="heading">Elder Scrolls Legends</h1>
        {/* Search */}
        <label className="search" htmlFor="search-input">
          <input type="text" vaule={query} placeholder="Search for Card by Name..." onChange={handleSearch} />
          <img src={searchIcon} className={`search-icon`} alt="search" />
        </label>
        <div className="cards-container">
          {cards.map((card, index) => {
            if (cards.length === index + 1){
              return <div ref={lastCardElementRef} key={card.id}>
                  <Card
                    image={card.imageUrl}
                    name={card.name}
                    text={card.text}
                    setName={card.set.name}
                    type={card.type}
                  />
                </div>
            } else {
              return <div key={card.id}>
                  <Card key={card.id}
                    image={card.imageUrl}
                    name={card.name}
                    text={card.text ? card.text : 'none'}
                    setName={card.set.name ? card.set.name : 'none'}
                    type={card.type ? card.type : 'none'}
                  />
                </div>
            }
          })} 
        </div>
        <img src={Loader} className={`search-loading ${loading ? 'show' : 'hide' }`} alt="page loading" />
        <div>{error && 'error...'}</div>
      </div>
	);
};

export default CardsContainer;