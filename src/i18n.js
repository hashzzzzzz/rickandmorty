import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      sortBy: "Sort By",
      None: "None",
      Origin : "Origin",
      status: 'Status',
      species: 'Species',
      name : 'Name',
      gender: 'Gender',
      origin: 'Origin',
      Alive: 'Alive', 
      Dead: 'Dead',
      Unknown: 'Unknown',
      Human: 'Human',
      Alien: 'Alien',
      All: 'All',
      loadMore: 'Load More',
      Male : "Male",
      Female : "Female"
    },
  },
  de: {
    translation: {
      sortBy: "Sortieren",
      Origin: "Herkunft",
      None: "Keine",
      status: 'Status',
      species: 'Spezies',
      name : 'Name',
      gender: 'Geschlecht',
      origin: 'Herkunft',
      Alive: 'Lebendig', 
      Dead: 'Tot',
      Unknown: 'Unbekannt',
      Human: 'Mensch',
      Alien: 'Außerirdisch',
      All: 'Alle',
      loadMore: 'Mehr laden',
      Male: "Männlich",
      Female: "Weiblich"
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
