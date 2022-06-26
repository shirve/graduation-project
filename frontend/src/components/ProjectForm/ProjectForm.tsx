import React from 'react'
import { useAppDispatch } from '../../app/store'
import {
  createProject,
  updateProject,
} from '../../features/projects/projectSlice'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Button from '../common/Buttons/Button/Button'
import InputField from '../common/Forms/InputField/InputField'
import TextareaField from '../common/Forms/TextareaField/TextareaField'
import FileUploadField from '../common/Forms/FileUploadField/FileUploadField'
import { ProjectViewModel } from '../../models/Projects/ProjectViewModel'
import { ProjectFormFields } from '../../constants/Projects/ProjectFormFields'
import { ProjectFormDataViewModel } from '../../models/Projects/ProjectFormDataViewModel'
import styles from './ProjectForm.module.scss'

interface Props {
  project?: ProjectViewModel
}

const ProjectForm = ({ project }: Props) => {
  const dispatch = useAppDispatch()

  const projectSchema = Yup.object().shape({
    title: Yup.string().required('To pole jest wymagane'),
    description: Yup.string().required('To pole jest wymagane'),
    github: Yup.string()
      .matches(
        /^https:\/\/github.com\/.+\/.+/,
        'Link musi być w formacie https://github.com/[nazwa-użytkownika]/[repozytorium-projektu]'
      )
      .required('To pole jest wymagane'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormDataViewModel>({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      title: project?.data.title,
      description: project?.data.description,
      github: project?.data.github,
    },
  })

  const onSubmit = (data: ProjectFormDataViewModel) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('github', data.github)
    Array.from(data.images).forEach((image) => {
      formData.append('images', image)
    })

    if (project)
      dispatch(updateProject({ projectId: project._id, data: formData }))
    if (!project) dispatch(createProject(formData))
  }

  return (
    <form className={styles.form}>
      {ProjectFormFields.map((field) => (
        <React.Fragment key={field.name}>
          {field.component === 'input' && (
            <InputField
              register={register}
              errors={errors}
              name={field.name}
              label={field.label}
            />
          )}
          {field.component === 'textarea' && (
            <TextareaField
              register={register}
              errors={errors}
              name={field.name}
              label={field.label}
            />
          )}
          {field.component === 'file' && (
            <>
              <FileUploadField
                register={register}
                errors={errors}
                name={field.name}
                label={field.label}
                accept={field.accept}
                multiple={field.multiple}
              />
              <small>*Maksymalnie 5 zdjęć o rozmiarze 2 MB</small>
            </>
          )}
        </React.Fragment>
      ))}
      <Button
        type={'submit'}
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        width={'100%'}
        marginTop={'1rem'}
      >
        {project ? 'Edytuj projekt gry' : 'Dodaj nowy projekt gry'}
      </Button>
      {project && (
        <small>
          *Po edycji projekt zostanie ponownie przesłany do zatwierdzenia przez
          administratora
        </small>
      )}
    </form>
  )
}

export default ProjectForm
