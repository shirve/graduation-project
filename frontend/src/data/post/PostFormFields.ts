import SelectField from '../../components/common/SelectField'

export const PostFormFields = [
  {
    name: 'title',
    type: 'input',
    component: 'input',
    label: 'Tytuł',
  },
  { name: 'story', type: 'input', component: 'textarea', label: 'Fabuła' },
  {
    name: 'gameplay',
    type: 'input',
    component: 'textarea',
    label: 'Rozgrywka',
  },
  {
    name: 'mechanics',
    type: 'input',
    component: 'textarea',
    label: 'Mechanika',
  },
  {
    name: 'characters',
    type: 'input',
    component: 'textarea',
    label: 'Bohaterowie',
  },
  { name: 'levels', type: 'input', component: 'textarea', label: 'Poziomy' },
  { name: 'graphics', type: 'input', component: 'textarea', label: 'Grafika' },
  { name: 'music', type: 'input', component: 'textarea', label: 'Muzyka' },
  {
    name: 'tags',
    type: 'select',
    component: SelectField,
    label: 'Gatunek/Gatunki',
    options: [
      { value: 'strzelanki', label: 'Strzelanki' },
      { value: 'zręcznościowe', label: 'Zręcznościowe' },
      { value: 'przygodowe', label: 'Przygodowe' },
      { value: 'łamigłówki', label: 'Łamigłówki' },
      { value: 'rpg', label: 'RPG' },
      { value: 'symulacje', label: 'Symulacje' },
      { value: 'strategiczne', label: 'Strategiczne' },
      { value: 'wyścigowe', label: 'Wyścigowe' },
      { value: 'sportowe', label: 'Sportowe' },
    ],
    multipleChoice: true,
  },
]
