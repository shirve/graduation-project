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
import { ProjectDataViewModel } from '../../models/Projects/ProjectDataViewModel'
import { ProjectFormFields } from '../../constants/Projects/ProjectFormFields'
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
    // TODO - image files validation
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectDataViewModel>({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      ...project?.data,
    },
  })

  const onSubmit = (data: ProjectDataViewModel) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('github', data.github)
    Array.from(data.images).forEach((image) => {
      formData.append('images', image)
    })

    if (project) dispatch(updateProject({ projectId: project._id, data })) // TODO formData
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
            <FileUploadField
              register={register}
              errors={errors}
              name={field.name}
              label={field.label}
              accept={field.accept}
              multiple={field.multiple}
            />
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
