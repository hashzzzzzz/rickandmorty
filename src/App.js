import React, { useState, useEffect, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import StyledTable from './styledTable';
import i18n from './i18n';
import './App.css';

const GET_CHARACTERS = gql`
  query getCharacters($page: Int, $status: String, $species: String) {
    characters(page: $page, filter: { status: $status, species: $species }) {
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
      }
      info {
        next
      }
    }
  }
`;

function App() {
  const { t } = useTranslation();
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [page, setPage] = useState(1);
  const [sortby, setsortby] = useState('');
  const sentinelRef = useRef(null);

  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page, status, species },
    notifyOnNetworkStatusChange: true,
  });

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
    setPage(1);
  };

  const loadMore = () => {
    if (data && data.characters.info.next) {
      fetchMore({
        variables: { page: data.characters.info.next },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            characters: {
              ...fetchMoreResult.characters,
              results: [
                ...prev.characters.results,
                ...fetchMoreResult.characters.results,
              ],
            },
          };
        },
      });
    }
  };

  useEffect(() => {
    if (loading || !data || !data.characters.info.next) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMore();
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading, data, fetchMore]);

  if (loading && !data) return <p>{t('loading')}</p>;
  if (error) return <p>{t('error')}: {error.message}</p>;


  const sortedResults = [...data.characters.results].sort((a, b) => {
    if (!sortby) return 0;

    const valA = sortby === 'name' ? a.name : a.origin?.name || '';
    const valB = sortby === 'name' ? b.name : b.origin?.name || '';

    return valA.localeCompare(valB); 
  });
  const sortedData = {
    ...data,
    characters: {
      ...data.characters,
      results: sortedResults,
    },
  };

  return (
    <div className="App">
      <div className='inputs-container'>
        <div className="select">
          <div className="selected">
            <label>{t('status')}</label>
            <select value={status} onChange={handleStatusChange}>
              <option value="">{t('All')}</option>
              <option value="Alive">{t('Alive')}</option>
              <option value="Dead">{t('Dead')}</option>
              <option value="Unknown">{t('Unknown')}</option>
            </select>
          </div>

          <div className="selected">
            <label>{t('species')}</label>
            <select value={species} onChange={handleSpeciesChange}>
              <option value="">{t('All')}</option>
              <option value="Human">{t('Human')}</option>
              <option value="Alien">{t('Alien')}</option>
            </select>
          </div>

          <div className="selected">
            <label>{t('sortBy')}</label>
            <select value={sortby} onChange={(e) => setsortby(e.target.value)}>
              <option value="">{t('None')}</option>
              <option value="name">{t('Name')}</option>
              <option value="origin">{t('Origin')}</option>
            </select>
          </div>

        </div>
      </div>

      <StyledTable data={sortedData} />

      <div ref={sentinelRef} style={{ height: '1px' }}></div>

      <footer className="footer">
        <div className="buttongroup">
          <button className="fancy-btn language-btn" onClick={() => handleLanguageChange('en')}>
            {t('English')}
            <span></span>
          </button>
          <button className="fancy-btn language-btn" onClick={() => handleLanguageChange('de')}>
            {t('German')}
            <span></span>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
