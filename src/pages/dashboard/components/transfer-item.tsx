import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { titleAvatarHelper } from "@/utils/title-avatar";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons"

export const TransferItem = ({transfer}: {transfer: {
  amount: number | string;
  direction: 'in' | 'out';
  status: string;
  otherUserId: {firstName: string, lastName: string, gsmNumber: string}
};}) => {
  return (
    <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>{titleAvatarHelper(transfer?.otherUserId?.firstName, transfer?.otherUserId?.lastName)}</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>{`${transfer?.otherUserId?.firstName} ${transfer?.otherUserId?.lastName}`}</p>
          <p className='text-sm text-muted-foreground'>
            {transfer?.otherUserId?.gsmNumber}
          </p>
        </div>
        <div className='ml-auto font-medium'>${transfer?.amount}</div>
        <div className='ml-auto font-medium'>{transfer?.direction === 'in' ? <ThickArrowDownIcon /> : <ThickArrowUpIcon />}</div>
        <div className='ml-auto font-medium'>{transfer?.status}</div>
      </div>
  )
}