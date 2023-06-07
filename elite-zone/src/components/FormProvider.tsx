import { yupResolver } from '@hookform/resolvers/yup'
import React, { useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface Errors {
  [key: string]: string
}

export interface FormProps {
  className?: string
  children?: React.ReactNode
  onSubmit?: (values: any, defaultValues?: any) => any
  validationSchema: yup.AnyObjectSchema
  defaultValues?: { [x: string]: string | number | any }
  mode?: 'onBlur' | 'onSubmit' | 'onChange' | undefined
  style?: any
  id?: string
  reset?: boolean
}

export class SubmitError extends Error {
  errors: Errors

  constructor(errors: Errors) {
    super('SubmitError')
    this.name = 'SubmitError'
    this.errors = errors
  }
}

export const Form = ({ mode = 'onSubmit', defaultValues, validationSchema, reset = false, ...props }: FormProps) => {
  const formHandlers = useForm<any>({
    defaultValues: React.useMemo(() => defaultValues, [defaultValues]),
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
  })
  // Call use effect to keep track of defaultValues if any of the defaultValues's value changed.
  // Because by default, defaultValues from react-hook-form updates ONLY ONCE at the initial render, even if defaultValues props changed, defaultValues wont update.
  React.useEffect(() => {
    if (defaultValues) {
      formHandlers.reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(defaultValues)])

  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit = formHandlers.handleSubmit(async (values) => {
    const formValues = formHandlers.getValues()
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      props.onSubmit && (await props.onSubmit(values, defaultValues))
      if (reset) formHandlers.reset(defaultValues)
      else formHandlers.reset(formValues)
    } catch (e: any) {
      formHandlers.reset(formValues)
      if (e instanceof SubmitError && e.errors) {
        Object.keys(e.errors).map((name) => formHandlers.setError(name, { type: 'error' }, e.errors[name]))
      }
    }
  })

  return (
    <FormProvider {...formHandlers}>
      <form {...props} onSubmit={onSubmit} ref={formRef}>
        {props.children}
      </form>
    </FormProvider>
  )
}
