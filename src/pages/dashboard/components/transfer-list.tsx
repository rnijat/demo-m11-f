import { TransferItem } from '@/pages/dashboard/components/transfer-item'

export function TransferList({data}: {
  data: {
    docs: {
      _id: string;
      amount: number | string;
      direction: 'in' | 'out';
      status: string;
      otherUserId: {firstName: string, lastName: string, gsmNumber: string}
    }[]
  }
}) {
  return (
    <div className='space-y-8'>
      {(data?.docs || []).map((transfer) => (
        <TransferItem key={transfer?._id} transfer={transfer} />
      ))}
    </div>
  )
}
