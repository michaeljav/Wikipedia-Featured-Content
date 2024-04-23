import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const LinkVisited = ({ item }) => {
  const [visited, setVisited] = useState(false);
  console.log('item ', item);
  useEffect(() => {
    const isVisited = localStorage.getItem(`${item}`);
    if (isVisited) {
      setVisited(true);
    }
  }, [item]);

  const handleVisitedLink = () => {
    localStorage.setItem(`${item}`, 'true');
    setVisited(true);
  };

  return (
    <NavLink
      target='_blank'
      rel='noopener noreferrer'
      to={`${item}`}
      className={`my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500 ${
        visited ? 'visited' : ''
      }`}
      onClick={handleVisitedLink}
      // activeClassName='active'
    >
      {visited ? 'Visited' : 'Read more'}
    </NavLink>
  );
};
