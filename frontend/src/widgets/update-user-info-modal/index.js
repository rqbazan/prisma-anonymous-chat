import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box } from '@xstyled/styled-components'
import { useForm } from 'react-hook-form'
import updateUserMutation from '~/graphql/update-user'
import FieldInput from '~/components/field-input'
import Button from '~/components/button'

export default function UpdateUserInfoModal({ user, controller }) {
  const [updateUser] = useMutation(updateUserMutation)

  const { handleSubmit, register, errors, setError, formState } = useForm({
    defaultValues: user
  })

  const onSubmit = async values => {
    try {
      await updateUser({ variables: values })
      controller.close()
    } catch (error) {
      // eslint-disable-next-line
      error.graphQLErrors?.map(({ message }) => {
        if (message.includes('unique constraint')) {
          setError('nickname', 'unique', 'The nickname is already taken')
        }
      })
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
          name="nickname"
          label="Nickname"
          defaultValue={user.nickname}
          autoFocus
          error={errors.nickname?.message}
          inputRef={register({
            required: { value: true, message: 'Enter your favorite nickname' }
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
