import { StylesConfig } from 'react-select'

export const CustomSelectFieldStyles: StylesConfig<any, boolean> = {
  control: (provided) => ({
    ...provided,
    borderColor: '#ccc',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#ccc',
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: '99',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
}
