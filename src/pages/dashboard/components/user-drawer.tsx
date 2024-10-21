import { MinusIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"

export function UserDrawer({open, setOpen, amount, setAmount, submitHandler, sent, isLoading}: {
  open: boolean
  setOpen: (open: boolean) => void
  amount: number
  setAmount: (amount: number) => void
  submitHandler: () => void
  sent: boolean
  isLoading: boolean
}) {

  function onClick(adjustment: number) {
    setAmount(Math.max(1, Math.min(100, amount + adjustment)))
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Amount of Money</DrawerTitle>
            <DrawerDescription>Set money you want to send.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-1)}
                disabled={amount <= 1}
              >
                <MinusIcon className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 flex text-center items-center justify-center">
                <Input value={amount} type="number" placeholder="1" className=" text-2xl font-bold tracking-tighter" style={{ maxWidth: '70px' }} onChange={(e) => setAmount(Math.max(1, Math.min(100, parseInt(e.target.value))))} />
                <div className="text-[1.30rem] uppercase text-muted-foreground">
                  $
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(1)}
                disabled={amount >= 100}
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={submitHandler} 
            disabled={isLoading || sent}        
            className={`${
              sent
                ? 'border border-green-300 text-white-300 bg-green-50 hover:bg-green-100 dark:border-green-700 dark:bg-green-950 dark:hover:bg-green-900'
                : ''
            }`}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {sent ? 'Sent' : `Send`}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
