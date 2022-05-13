import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { EpisodeResult } from '../../Model/EpisodeModel';
import './episodes.scss';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState<EpisodeResult[]>();
  const [inputValue, setInputValue] = useState('');
  const [findEpisode, setFindEpisode] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const episodeQuery = searchParams.get('name') || '';

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;

    const getQuery = form.search.value;

    setSearchParams({ name: getQuery });
  };

  const getEpisodes = async () => {
    setLoading(true);
    try {
      const allEpisodes = await axios.get('https://rickandmortyapi.com/api/episode');
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
        <form className="episodes__form" onSubmit={handleSubmit}>
          <input
            type="search"
            name="search"
            className="episodes__input"
            placeholder="Write episode"
            value={inputValue}
            onChange={(el) => setInputValue(el.target.value)}
          />
          <NavLink
            className="episodes__find"
            onClick={() => { setSearchParams(inputValue); setInputValue(''); }}
            to={`?name=${inputValue}`}
          >
            Find
          </NavLink>
          <NavLink
            className="episodes__find"
            onClick={() => { setFindEpisode(''); setInputValue(''); }}
            to=""
          >
            Clear
          </NavLink>
        </form>
        <ul className="episodes__list">
          {
            episodes?.filter((el) => el.name.toLowerCase().includes(episodeQuery)).map((el) => (
              <li className="episodes__item" key={el.id}>
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
