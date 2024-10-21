import { CustomCounter } from '@/components/custom/counter'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useCreateOrderMutation } from '@/services/orderService'
import { ReloadIcon } from '@radix-ui/react-icons'
import Decimal from 'decimal.js'
import { useEffect, useState } from 'react'

export function BuySection({ itemId,itemPrice }) {
  const [count, setCount] = useState(1)  // Track the count for the CustomCounter
  const [bought, setBought] = useState(false)  // Track if the item is bought or not

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [buy, { isLoading, isSuccess, isError, error }] = useCreateOrderMutation<any>()

  // Handle buy button click
  const handleBuy = async () => {
    buy({ productId: itemId, quantity: count })
  }

  useEffect(() => {
    if (isSuccess) {
      setBought(true)
      setTimeout(() => setBought(false), 3000)
      toast({
        title: 'Successfully bought item',
      })
    }

    if (isError) {
      toast({
        title: 'Failed to buy item',
        description: error?.data?.message,
        variant: 'destructive',
      })
    }
  }, [isSuccess, isError, error])

  return (
    <div className="mt-4 flex items-center justify-between w-full">
      <CustomCounter count={count} setCount={setCount} />

      <Button
        variant="outline"
        size="sm"
        onClick={handleBuy}
        disabled={isLoading || bought}  // Disable the button while loading
        className={`${
          bought
            ? 'border border-green-300 bg-green-50 hover:bg-green-100 dark:border-green-700 dark:bg-green-950 dark:hover:bg-green-900'
            : ''
        }`}
      >
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        {bought ? 'Bought' : `Buy for $${new Decimal(itemPrice).mul(count).toFixed(2)}`}
      </Button>
    </div>
  )
}
