/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { CharacterInfo, CharacterResult } from '../../Model/CharactersModel';
import './characters.scss';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<CharacterResult[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [filtredCharacters, setFiltredCharacters] = useState<string>('?');
  const [currentPage, setCurrentPage] = useState<string>('page=1');
  const [loading, setLoading] = useState<boolean>(false);
  const [pagesInfo, setPagesInfo] = useState<CharacterInfo>();

  const navigate = useNavigate();

  const getPageNumbers = pagesInfo === undefined ? 0 : pagesInfo.pages;
  const pagesCount = [];

  for (let i = 1; i <= getPageNumbers; i += 1) {
    pagesCount.push(i);
  }

  const filterButtons = [
    {
      name: 'All',
      buttonClick: () => { setFiltredCharacters('?'); setCurrentPage('page=1'); },
      link: '/characters',
    },
    {
      name: 'Alive',
      buttonClick: () => { setFiltredCharacters('?status=alive&?'); setCurrentPage('page=1'); },
      link: '/characters?status=alive&?page=1',
    },
    {
      name: 'Dead',
      buttonClick: () => { setFiltredCharacters('?status=dead&?'); setCurrentPage('page=1'); },
      link: '/characters?status=dead&?page=1',
    },
    {
      name: 'Unknown',
      buttonClick: () => { setFiltredCharacters('?status=unknown&?'); setCurrentPage('page=1'); },
      link: '/characters?status=unknown&?page=1',
    },
  ];

  const getCharacters = async () => {
    setLoading(true);
    try {
      const allCharacters = await axios.get(
        `https://rickandmortyapi.com/api/character${filtredCharacters}&${currentPage}`,
      );
      setCharacters([...allCharacters.data.results]);
      setPagesInfo({ ...allCharacters.data.info });
      // console.log({ ...response.data.info });
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

  useEffect(() => {
    getCharacters();
  }, [filtredCharacters, currentPage]);

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
        <div className="pages-wrapper">
          {
            pagesCount.map((el) => (
              <NavLink
                className="page-btn"
                key={el}
                to={`/characters${filtredCharacters}page=${el}`}
                onClick={() => setCurrentPage(`page=${el}`)}
              >
                {el}
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
