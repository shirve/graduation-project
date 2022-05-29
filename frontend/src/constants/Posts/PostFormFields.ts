import { PostGenres } from './PostGenres'

export const PostFormFields = [
  {
    name: 'title',
    component: 'input',
    label: 'Tytuł',
  },
  { name: 'story', component: 'textarea', label: 'Fabuła' },
  {
    name: 'gameplay',
    component: 'textarea',
    label: 'Rozgrywka',
  },
  {
    name: 'mechanics',
    component: 'textarea',
    label: 'Mechanika',
  },
  {
    name: 'characters',
    component: 'textarea',
    label: 'Bohaterowie',
  },
  { name: 'levels', component: 'textarea', label: 'Poziomy' },
  { name: 'graphics', component: 'textarea', label: 'Grafika' },
  { name: 'music', component: 'textarea', label: 'Muzyka' },
  {
    name: 'genres',
    component: 'select',
    label: 'Gatunek/Gatunki',
    options: PostGenres,
    multiple: true,
  },
]
