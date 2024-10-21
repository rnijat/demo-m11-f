import { Button } from '@/components/custom/button'
import { CustomDialog } from '@/components/custom/dialog'
import { CardsPaymentMethod } from '@/components/custom/payment-method'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLogoutMutation } from '@/services/authService'
import { useMeQuery } from '@/services/userService'
import { titleAvatarHelper } from '@/utils/title-avatar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function UserNav() {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const {data} = useMeQuery(undefined)
  const [logout] = useLogoutMutation()
  return (
    <>
    <CustomDialog open={open} setOpen={setOpen} title="Balance topup" subtitle="You can topup your balance">
      <CardsPaymentMethod setOpen={setOpen} />
    </CustomDialog>
   
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt='default' />
            <AvatarFallback>{titleAvatarHelper(data?.firstName, data?.lastName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{`${data?.firstName} ${data?.lastName}`}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {data?.gsmNumber}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='flex justify-between' onClick={() => setOpen(true)}>
            ${data?.balance}
            <p>+ Balance topup</p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
            navigate('/settings')
          }}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {logout(undefined); navigate('/sign-in')}}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}
