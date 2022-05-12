/* eslint-disable no-nested-ternary */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Character, CharacterResult } from '../../Model/CharactersModel';
import './characters.scss';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<CharacterResult[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [filtredCharacters, setFiltredCharacters] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const filterButtons = [
    {
      name: 'All',
      buttonClick: () => setFiltredCharacters(''),
      link: '/characters',
    },
    {
      name: 'Alive',
      buttonClick: () => (setFiltredCharacters('?status=alive')),
      link: '/characters/?status=alive',
    },
    {
      name: 'Dead',
      buttonClick: () => setFiltredCharacters('?status=dead'),
      link: '/characters/?status=dead',
    },
    {
      name: 'Unknown',
      buttonClick: () => setFiltredCharacters('?status=unknown'),
      link: '/characters/?status=unknown',
    },
  ];

  const getCharacters = async () => {
    setLoading(true);
    try {
      const allCharacters = await axios.get(`https://rickandmortyapi.com/api/character/${filtredCharacters}`);
      setCharacters([...allCharacters.data.results]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axios Error');
      }
    } finally {
      setLoading(false);
    }
  };

  // const isAlive = () => {
  //   characters?.map((el) => {
  //     if (el.status === '')
  //   })
  // };

  useEffect(() => {
    getCharacters();
  }, [filtredCharacters]);

  return (
    <section className="characters">
      <div className="container">
        <div className="buttons-wrapper">
          {
            filterButtons.map((el) => (
              <NavLink
                className="filter-btn"
                to={el.link}
                key={Math.random()}
                onClick={el.buttonClick}
              >
                {el.name}
              </NavLink>
            ))
          }
        </div>
        <ul className="characters__list">
          {
              characters && characters.map(({
                id, name, image, status,
              }) => (
                <li
                  className={status === 'Alive'
                    ? 'characters__item characters__item--alive' : status === 'Dead'
                      ? 'characters__item characters__item--dead' : 'characters__item characters__item--unknown'}
                  key={id}
                >
                  <img className="characters__img" src={image} alt={name} />
                  <button className="characters__btn" onClick={() => navigate(`/characters/${id}`)}>
                    View More
                  </button>
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

export default CharactersPage;
