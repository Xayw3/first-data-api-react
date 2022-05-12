import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { EpisodeResult } from '../../Model/EpisodeModel';
import './episodes.scss';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState<EpisodeResult[]>();
  const [inputValue, setInputValue] = useState('');
  const [findEpisode, setFindEpisode] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getEpisodes = async () => {
    setLoading(true);
    try {
      const allEpisodes = await axios.get(`https://rickandmortyapi.com/api/episode${findEpisode}`);
      setEpisodes([...allEpisodes.data.results]);
    } catch (error) {
      navigate('/episodes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEpisodes();
  }, [findEpisode]);

  return (
    <section className="episodes">
      <div className="container">
        <form className="episodes__form" onSubmit={(el) => el.preventDefault()}>
          <input
            type="text"
            className="episodes__input"
            placeholder="Write episode"
            value={inputValue}
            onChange={(el) => setInputValue(el.target.value)}
          />
          <NavLink
            className="episodes__find"
            onClick={() => setFindEpisode(`?name=${inputValue}`)}
            to={`?name=${inputValue}`}
          >
            Find
          </NavLink>
          <NavLink
            className="episodes__find"
            onClick={() => setFindEpisode('')}
            to=""
          >
            Clear
          </NavLink>
        </form>
        <ul className="episodes__list">
          {
            episodes && episodes.map((el) => (
              <li className="episodes__item" key={Math.random()}>
                <div className="episodes__item-content">
                  <h2 className="episodes__title">
                    Rick and Morty
                  </h2>
                  <p className="episodes__text">
                    {el.episode}
                  </p>
                </div>
                <div className="episodes__item-name">
                  <p className="episodes__name">
                    {el.name}
                  </p>
                  <button
                    className="episodes__btn"
                    onClick={() => navigate(`/episodes/${el.id}`)}
                  >
                    Check
                  </button>
                </div>
              </li>
            ))
          }
          {
            loading && <Loader />
          }
        </ul>
      </div>
    </section>
  );
};

export default EpisodesPage;
