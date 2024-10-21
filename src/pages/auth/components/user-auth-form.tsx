import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useLoginMutation } from '@/services/authService'
import { useMeQuery } from '@/services/userService'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLAttributes, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  gsmNumber: z.string().min(1, { message: 'Please enter your gsm number' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAuth } = useSelector((state: any) => state.auth);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation<any>()
  // eslint-disable-next-line no-empty-pattern
  const { } = useMeQuery(undefined, {skip: !isAuth})

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gsmNumber: '',
      password: '',
    },
  })
  function onSubmit(data: z.infer<typeof formSchema>) {
    login(data)
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      toast({
        title: 'Logged in successfully',
        variant: 'default'
      })
      navigate('/')
    }

    if (isError) {
      toast({
        title: `Error ${error?.status}`,
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{error?.data?.message}</code>
          </pre>
        ),
        variant: 'destructive',
      })
    }
  }, [form, isSuccess, isError, error, navigate])

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='gsmNumber'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>GSM number</FormLabel>
                  <FormControl>
                    <Input placeholder='+994555555555' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading}>
              Login
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or seed more users
                </span>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
