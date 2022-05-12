import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { LocationsResult } from '../../Model/LocationsModel';
import './locations.scss';

const LocationsPage = () => {
  const [locations, setLocations] = useState<LocationsResult[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getLocations = async () => {
    setLoading(true);
    try {
      const allLocations = await axios.get('https://rickandmortyapi.com/api/location');
      setLocations([...allLocations.data.results]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <section className="locations">
      <div className="container">
        <ul className="locations__list">
          {
            locations?.map((el) => (
              <li key={el.id} className="locations__item">
                <p className="locations__text">
                  {`Location: ${el.name}`}
                </p>
                <p className="locations__text">
                  {`Type: ${el.type}`}
                </p>
                <p className="locations__text">
                  {el.dimension}
                </p>
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

export default LocationsPage;
