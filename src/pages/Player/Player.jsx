import React, { useEffect, useState } from 'react';
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGFmOGEzZGRkMWQ3MDAwNWJhMDBkNjU3ZTcyYjI1YiIsIm5iZiI6MTcyNjk4MjExOC42MDE1OTgsInN1YiI6IjY2ZWZhNmU5NGE3ZjBiMThiMDI2M2E4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nouY1ZDS8fjRfbXcKB3SzATK7dN8JLZ-CJomnbKukNo'
    }
  };
useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results[0]))
  .catch(err => console.error(err));
}, [])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {
        navigate("/")
      }}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='Trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player__info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;