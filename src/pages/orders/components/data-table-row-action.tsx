/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReloadIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'

import { toast } from '@/components/ui/use-toast'
import { useRefundOrderMutation } from '@/services/orderService'
import { useEffect, useState } from 'react'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowAction<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const order: any = row.original
  const [refund, setRefund] = useState(false)  // Track if the item is bought or not

  const [refundOrder, { isLoading, isSuccess, isError, error }] = useRefundOrderMutation<any>()

  // Handle buy button click
  const handleRefund = async () => {
    refundOrder(order?._id)
  }

  useEffect(() => {
    if (isSuccess) {
      setRefund(true)
      setTimeout(() => setRefund(false), 3000)
      toast({
        title: 'Refund request sent',
      })
    }

    if (isError) {
      toast({
        title: 'Failed to refund request',
        description: error?.data?.message,
        variant: 'destructive',
      })
    }
  }, [isSuccess, isError, error, isLoading])

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefund}
      disabled={isLoading || refund || (order?.refundProcessed || order?.refundRequested)}  // Disable the button while loading
      className={`${
        refund
          ? 'border border-green-300 bg-green-50 hover:bg-green-100 dark:border-green-700 dark:bg-green-950 dark:hover:bg-green-900'
          : ''
      }`}
    >
      {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {order?.refundProcessed ? 'Refunded' : refund || order?.refundRequested ? 'Requested' : `Refund`}
    </Button>
  )
}
