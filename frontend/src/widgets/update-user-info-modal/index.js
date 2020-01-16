import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box } from '@xstyled/styled-components'
import { useForm } from 'react-hook-form'
import notifier from 'zeit-toast-clone'
import updateUserMutation from '~/graphql/mutations/update-user'
import FieldInput from '~/components/field-input'
import Button from '~/components/button'

function setUnknownError(fielName, setError) {
  setError(fielName, 'unknown', 'Ooop! something was wrong')
}

export default function UpdateUserInfoModal({ user, controller }) {
  const [updateUser] = useMutation(updateUserMutation)

  const { handleSubmit, register, errors, setError, formState } = useForm({
    defaultValues: user
  })

  async function onSubmit(values) {
    function setErrors({ message }) {
      if (message.includes('unique constraint')) {
        setError('nickname', 'unique', 'The nickname is already taken')
      } else {
        setUnknownError('nickname', setError)
      }
    }

    try {
      await updateUser({ variables: values })
      controller.close()
      notifier.success('Update successful 🎉')
    } catch (error) {
      if (error.graphQLErrors?.length) {
        error.graphQLErrors.forEach(setErrors)
      } else {
        setUnknownError('nickname', setError)
      }
    }
  }

  return (
    <Box
      as="form"
      minWidth={{ xs: 'full', md: 'md', lg: 'lg' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box fontSize="3">
        <h2>Update Information</h2>
      </Box>
      <Box mt="3">
        <FieldInput
          autoFocus
          name="nickname"
          label="Nickname"
          defaultValue={user.nickname}
          error={errors.nickname?.message}
          inputRef={register({
            required: { value: true, message: 'Enter your favorite nickname' },
            validate: value => {
              return value !== user.nickname || 'Enter a new nickname'
            }
          })}
        />
      </Box>
      <Box mt="3" display="flex" justifyContent="flex-end">
        <Button type="submit" loading={formState.isSubmitting}>
          Update
        </Button>
      </Box>
    </Box>
  )
}
