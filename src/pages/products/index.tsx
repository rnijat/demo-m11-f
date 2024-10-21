import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import { BuySection } from '@/pages/products/components/buy-section'
import { useGetProductsQuery } from '@/services/productService'
import {
    IconAdjustmentsHorizontal,
    IconSortAscendingLetters,
    IconSortDescendingLetters,
} from '@tabler/icons-react'
import { useState } from 'react'

export default function Apps() {
  const [sort, setSort] = useState('ascending')
  const [searchTerm, setSearchTerm] = useState('')

  const [filter, setFilter] = useState({
    page: 1,
    limit: 9
  }); 

  const {data } = useGetProductsQuery(filter)

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

  const changePageHandler = (page) => {
    setFilter({ ...filter, page: page})
  }

  return (
    <Layout fixed>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='flex w-full items-center justify-between'>
          <Search />
          <div className='flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </Layout.Header>

      {/* ===== Content ===== */}
      <Layout.Body className='flex flex-col'>

        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Products
          </h1>
          <p className='text-muted-foreground'>
            Buy some products!
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter apps...'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className='w-16'>
              <SelectValue>
                <IconAdjustmentsHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectItem value='ascending'>
                <div className='flex items-center gap-4'>
                  <IconSortAscendingLetters size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value='descending'>
                <div className='flex items-center gap-4'>
                  <IconSortDescendingLetters size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className='shadow' />
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3'>
          {(data?.docs || []).map((app) => (
            <li
              key={app._id}
              className='rounded-lg border p-4 hover:shadow-md flex flex-col justify-between items-between'
            >
              
              <div>
                <div className='flex items-center justify-between'>
                
                <h2 className='mb-1 font-semibold'>{app.title}</h2>
                <Badge variant="outline">${app.price}</Badge>
                </div>
                
                <p className='line-clamp-2 text-gray-500'>{app.description}</p>
              </div>
              <BuySection itemId={app._id}itemPrice={app.price} />
            </li>
          ))}
                  
        </ul>
        <Pagination className='mb-16'>
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



      </Layout.Body>
    </Layout>
  )
}
