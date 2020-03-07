import { useEffect, useState } from 'react';
import axios from 'axios';
import './Card.css';

const CardSearch = (query, pageNumber) => {

	//Setting states
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [cards, setCards] = useState([])
	const [hasMore, setHasMore] = useState(false)

	//Reset card array
	useEffect(() => {
		setCards([])
	}, [query])
	
	useEffect(() => {
		setLoading(true)
		setError(false)
		let cancel
		//Retrieving data calling to api
		axios({
			method: 'GET',
			url: `https://api.elderscrollslegends.io/v1/cards?pageSize=20`,
			params: { name: query, page: pageNumber },
			//Setting cancellation
			cancelToken: new axios.CancelToken(c => cancel = c)
		}).then(res => {
			console.log(res.data);
			setCards(prevCards => {
				return ([...prevCards, ...res.data.cards])
			})
			setHasMore(res.data.cards.length > 0)
			setLoading(false)
		}).catch(e => {
			if (axios.isCancel(e)) return
			setError(true)
		})
		return () => cancel()
	}, [query, pageNumber])
	return { loading, error, cards, hasMore}
}

export default CardSearch;
