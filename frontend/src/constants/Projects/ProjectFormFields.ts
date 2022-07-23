import { GameGenres } from '../SelectFieldOptions/GameGenres'

export const ProjectFormFields = [
  { name: 'title', component: 'input', label: 'Tytuł' },
  { name: 'description', component: 'textarea', label: 'Opis' },
  { name: 'github', component: 'input', label: 'GitHub' },
  { name: 'gdd', component: 'select', label: 'Dokument projektowy gry' },
  {
    name: 'genres',
    component: 'select',
    label: 'Gatunek/Gatunki',
    options: GameGenres,
    isMulti: true,
  },
  {
    name: 'images',
    component: 'file',
    label: 'Dodaj zdjęcia',
    accept: 'image/png, image/jpg, image/jpeg',
    multiple: true,
  },
]
