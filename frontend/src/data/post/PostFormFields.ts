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
    label: 'Tagi',
    options: [
      { value: 'mmo', label: 'MMO' },
      { value: 'rpg', label: 'RPG' },
      { value: 'fps', label: 'FPS' },
    ],
    multipleChoice: true,
  },
]
