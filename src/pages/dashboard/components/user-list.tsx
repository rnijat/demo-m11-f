import { UserItem } from '@/pages/dashboard/components/user-item'

export function UserList({data}: {
  data: {
    docs: {
      _id: string;
      firstName: string;
      lastName: string;
      gsmNumber: string;
    }[]
  }
}) {
  
  
  return (
    <div className='space-y-8'>
      {(data?.docs || []).map((user) => (
        <UserItem key={user?._id} user={user} />
      ))}
    </div>
  )
}
