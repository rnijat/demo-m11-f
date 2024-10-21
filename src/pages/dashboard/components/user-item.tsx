import { Button } from "@/components/custom/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { UserDrawer } from "@/pages/dashboard/components/user-drawer"
import { useTransferMutation } from "@/services/userService"
import { titleAvatarHelper } from "@/utils/title-avatar"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

export const UserItem = ({user}) => {
  const [sent, setSent] = useState(false)
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(1)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transfer, { isLoading, isSuccess, isError, error }] = useTransferMutation<any>()

  const handleTransfer = async () => {
    transfer({ userId: user?._id, amount: amount })
  }

  useEffect(() => {
    if (isSuccess) {
      setSent(true)
      setTimeout(() => {setSent(false); setOpen(false)}, 3000)
      toast({
        title: 'Successfully send money',
      })
    }

    if (isError) {
      toast({
        title: 'Failed to send money',
        description: error?.data?.message,
        variant: 'destructive',
      })
    }
  }, [isSuccess, isError, error])
  return (
    <>
    <UserDrawer open={open} setOpen={setOpen} amount={amount} setAmount={setAmount} submitHandler={handleTransfer} sent={sent} isLoading={isLoading}/>
    
    <div key={user?._id} className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>{titleAvatarHelper(user?.firstName, user?.lastName)}</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>{`${user?.firstName} ${user?.lastName}`}</p>
          <p className='text-sm text-muted-foreground'>
            {user?.gsmNumber}
          </p>
        </div>
        <div className='ml-auto font-medium'>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={isLoading || sent} 
            className={`${
              sent
                ? 'border border-green-300 bg-green-50 hover:bg-green-100 dark:border-green-700 dark:bg-green-950 dark:hover:bg-green-900'
                : ''
            }`}
          >
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {sent ? 'Sent' : `Send money`}
          </Button>
        </div>
      </div>
    </>
  )
}