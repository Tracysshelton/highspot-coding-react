import React, { useState, useRef, useCallback } from 'react';
import CardSearch from './components/CardSearch';
import Card from './components/Card';
import Loader from './components/assets/loader.gif';
import SearchIcon from './components/assets/search-icon-small.png';

export default function App() {

  //Setting State
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  //Destructering the hook and getting the var
  const {
      cards,
      hasMore,
      loading,
      error
  } = CardSearch(query, pageNumber)

  //Seeting ref and intersection observer for pagination and scroll
  const observer = useRef()
  const lastCardElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore){
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  //onChange Event from search input
  function handleSearch(e) {
    e.preventDefault();
    setQuery(e.target.value)
    setPageNumber(1)
  }

    return (
      <div className="container">
        {/* Heading */}
        <h1 className="heading">Elder Scrolls Legends</h1>
        {/* Search */}
        <label className="search" htmlFor="search-input">
          <input type="text" vaule={query} placeholder="Search for Card by Name..." onChange={handleSearch} />
          <img src={SearchIcon} className={`search-icon`} alt="search" />
        </label>
        {/* Card Grid */}
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
    )
}
