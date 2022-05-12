import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Character, CharacterResult } from '../../Model/CharactersModel';
import './character.scss';

const CharacterPage = () => {
  const { id } = useParams();

  const [character, setCharacter] = useState<CharacterResult>();
  const [currentCharacter, setCurrentCharacter] = useState(Number(id));
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getCharacter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${Number(currentCharacter)}`);
      setCharacter({ ...response.data });
    } catch (error) {
      navigate('/characters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getCharacter().then();
    }
  }, [currentCharacter]);

  return (
    <section className="character">
      <div className="container">
        <div className="character-wrapper">
          {
            character && (
            <div className="character__content">
              <img className="character__img" src={character.image} alt={character.name} />
              <div className="character__info">
                <div className="character__texts">
                  <p className="character__text">
                    {`Name: ${character.name}`}
                  </p>
                  <p className="character__text">
                    {`Species: ${character.species}`}
                  </p>
                  <p className="character__text">
                    {`Gender: ${character.gender}`}
                  </p>
                  <p className="character__text">
                    {`Status: ${character.status}`}
                  </p>
                </div>
                <div className="character__btns">
                  <NavLink
                    to={`/characters/${Number(currentCharacter - 1)}`}
                    onClick={() => setCurrentCharacter(currentCharacter && currentCharacter - 1)}
                    className="character__btns-link"
                  >
                    Prev
                  </NavLink>
                  <NavLink
                    to={`/characters/${Number(currentCharacter + 1)}`}
                    onClick={() => setCurrentCharacter(currentCharacter && currentCharacter + 1)}
                    className="character__btns-link"
                  >
                    Next
                  </NavLink>
                </div>
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

export default CharacterPage;
