export const ProjectFormFields = [
  { name: 'title', component: 'input', label: 'Tytuł' },
  { name: 'description', component: 'textarea', label: 'Opis' },
  { name: 'github', component: 'input', label: 'GitHub' },
  {
    name: 'images',
    component: 'file',
    label: 'Zdjęcia',
    accept: 'image/png, image/jpg, image/jpeg',
    multiple: true,
  },
]
