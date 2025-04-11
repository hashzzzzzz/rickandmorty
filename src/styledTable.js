import React from 'react';
import { useTranslation } from 'react-i18next';  
import './table.css';

const StyledTable = ({ data }) => {
  const { t } = useTranslation(); 

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>{t('status')}</th>
            <th>{t('species')}</th>
            <th>{t('gender')}</th>
            <th>{t('origin')}</th>
          </tr>
        </thead>
        <tbody>
          {data.characters.results.map((character) => (
            <tr key={character.id}>
              <td>{character.name}</td>
              <td>{t(character.status)}</td>  
              <td>{t(character.species)}</td> 
              <td>{t(character.gender)}</td>  
              <td>{character.origin.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StyledTable;
