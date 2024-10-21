import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { UserList } from "@/pages/dashboard/components/user-list"
import { useGetOthersQuery } from "@/services/userService"
import { useState } from "react"

export const UserCard = () => {
  const [filter, setFilter ] = useState({
    page: 1,
    limit: 5
  })

  const { data } = useGetOthersQuery(filter)

  const nextPageHandler = () => {
    if (data?.hasNextPage) {
      setFilter({ ...filter, page: filter.page + 1 })
    }
  }

  const prevPageHandler = () => {
    if (data?.hasPrevPage) {
      setFilter({ ...filter, page: filter.page - 1})
    }
  }

  const changePageHandler = (page: number) => {
    setFilter({ ...filter, page: page})
  }
  return (
    <>
    <CardHeader>
      <CardTitle>Users</CardTitle>
      <CardDescription>
        Total users.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <UserList data={data}/>
    </CardContent>
    <CardFooter>
    <Pagination className=''>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={prevPageHandler} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive={data?.page === 1} onClick={() => changePageHandler(1)}>1</PaginationLink>
            </PaginationItem>
            {data?.page > 2 && <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>}
            {data?.page > 2 && <PaginationItem>
              <PaginationLink href="#" onClick={() => changePageHandler(data?.page - 1)}>{data?.page - 1}</PaginationLink>
            </PaginationItem>}
            {data?.page !== 1 && <PaginationItem>
              <PaginationLink href="#" isActive={data?.page !== 1}>{data?.page}</PaginationLink>
            </PaginationItem>}
            {data?.hasNextPage && <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>}
            <PaginationItem>
              <PaginationNext href="#" onClick={nextPageHandler}/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
    </CardFooter>
  </>
  )
}