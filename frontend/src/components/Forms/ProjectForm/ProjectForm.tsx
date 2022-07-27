import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { postsClient } from '../../../api/AxiosClients'
import {
  useCreateProject,
  useUpdateProject,
} from '../../../features/projects/mutations'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Button from '../../common/Buttons/Button/Button'
import InputField from '../../common/FormFields/InputField/InputField'
import TextareaField from '../../common/FormFields/TextareaField/TextareaField'
import SelectField from '../../common/FormFields/SelectField/SelectField'
import FileUploadField from '../../common/FormFields/FileUploadField/FileUploadField'
import { ProjectViewModel } from '../../../models/Projects/ProjectViewModel'
import { ProjectFormFields } from '../../../constants/Projects/ProjectFormFields'
import { ProjectFormDataViewModel } from '../../../models/Projects/ProjectFormDataViewModel'
import { SelectFieldOptionViewModel } from '../../../models/Forms/SelectFieldOptionViewModel'
import { PostViewModel } from '../../../models/Posts/PostViewModel'
import styles from './ProjectForm.module.scss'

interface Props {
  project?: ProjectViewModel
  handleShowModal?: () => void
  onRefetch?: () => void
}

const ProjectForm = ({ project, handleShowModal, onRefetch }: Props) => {
  const [GDDOptions, setGDDOptions] = useState<SelectFieldOptionViewModel[]>([])
  const { user } = useSelector((state: RootState) => state.user)

  const { mutate: createProject } = useCreateProject()
  const { mutate: updateProject } = useUpdateProject({
    onSuccess: () => onRefetch?.(),
  })

  const projectSchema = Yup.object().shape({
    title: Yup.string().required('To pole jest wymagane'),
    description: Yup.string().required('To pole jest wymagane'),
    github: Yup.string()
      .matches(
        /^https:\/\/github.com\/.+\/.+/,
        'Link musi być w formacie https://github.com/[nazwa-użytkownika]/[repozytorium-projektu]'
      )
      .required('To pole jest wymagane'),
    genres: Yup.array().of(Yup.string()),
    gdd: Yup.string(),
  })

  useEffect(() => {
    const getGDDOptions = async () => {
      await postsClient
        .get('/approved', {
          params: { user: user?._id },
        })
        .then((res) => {
          setGDDOptions(
            res.data.posts.map((post: PostViewModel) => {
              return { value: post._id, label: post.data.title }
            })
          )
        })
    }
    getGDDOptions()
  }, [])

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormDataViewModel>({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      title: project?.data.title,
      description: project?.data.description,
      github: project?.data.github,
      genres: project?.data.genres,
      gdd: project?.gdd?.toString(),
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

    const genres = data.genres ?? []
    genres.forEach((genre) => {
      formData.append('genres', genre)
    })

    if (data.gdd) {
      formData.append('gdd', data.gdd)
    }

    if (project) updateProject({ projectId: project._id, data: formData })
    if (!project) createProject(formData)
    if (handleShowModal) handleShowModal()
  }

  return (
    <form className={styles.form}>
      {ProjectFormFields.map(
        ({ name, component, label, options, isMulti, accept, multiple }) => (
          <React.Fragment key={name}>
            {component === 'input' && (
              <InputField
                register={register}
                errors={errors}
                name={name}
                label={label}
              />
            )}
            {component === 'textarea' && (
              <TextareaField
                register={register}
                errors={errors}
                name={name}
                label={label}
              />
            )}
            {component === 'select' && (
              <>
                <SelectField
                  control={control}
                  errors={errors}
                  name={name}
                  label={label}
                  options={options ?? GDDOptions}
                  isMulti={isMulti}
                />
                {name === 'gdd' && (
                  <small>
                    *Załącz dokument projektowy gry wybierając jedną z dodanych
                    przez siebie propozycji gier
                  </small>
                )}
              </>
            )}
            {component === 'file' && (
              <>
                <FileUploadField
                  register={register}
                  errors={errors}
                  name={name}
                  label={label}
                  files={watch('images')}
                  accept={accept}
                  multiple={multiple}
                />
                <small>*Maksymalnie 5 zdjęć o rozmiarze 2 MB</small>
              </>
            )}
          </React.Fragment>
        )
      )}
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
