import { NavLink } from 'react-router-dom';
import './header.scss';

const headerMenu = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Characters',
    link: '/characters',
  },
  {
    name: 'Episodes',
    link: '/episodes',
  },
  {
    name: 'Locations',
    link: '/locations',
  },
];

const Header = () => {
  console.log(1);

  return (
    <header className="header">
      <div className="container">
        <nav className="menu">
          <ul className="menu__list">
            {
                headerMenu.map((el) => (
                  <li className="menu__item" key={Math.random()}>
                    <NavLink
                      className={({ isActive }) => (isActive ? 'menu__link menu__link--active' : 'menu__link')}
                      to={el.link}
                    >
                      {el.name}
                    </NavLink>
                  </li>
                ))
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
