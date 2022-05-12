import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { EpisodeResult } from '../../Model/EpisodeModel';
import './episode.scss';

const EpisodePage = () => {
  const { id } = useParams();

  const [episode, setEpisode] = useState<EpisodeResult>();
  const [currentEpisode, setCurrentEpisode] = useState(Number(id));
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getEpisode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${Number(currentEpisode)}`);
      setEpisode({ ...response.data });
    } catch (error) {
      navigate('/episodes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getEpisode().then();
    }
  }, [currentEpisode]);

  return (
    <section className="episode">
      <div className="container">
        <div className="episode-wrapper">
          {
            episode && (
              <div className="episode__content">
                <p className="episode__name">
                  {`Episode: ${episode.name}`}
                </p>
                <div className="character__btns">
                  <NavLink
                    to={`/episodes/${Number(currentEpisode - 1)}`}
                    onClick={() => setCurrentEpisode(currentEpisode && currentEpisode - 1)}
                    className="character__btns-link"
                  >
                    Prev
                  </NavLink>
                  <NavLink
                    to={`/episodes/${Number(currentEpisode + 1)}`}
                    onClick={() => setCurrentEpisode(currentEpisode && currentEpisode + 1)}
                    className="character__btns-link"
                  >
                    Next
                  </NavLink>
                </div>
              </div>
            )
          }
          {
            loading && <Loader />
          }
        </div>
      </div>
    </section>
  );
};

export default EpisodePage;
