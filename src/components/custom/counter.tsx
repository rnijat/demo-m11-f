import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CustomCounter({count, setCount}: {count: number, setCount: (prevCount: number) => void}) {
  return (
    <div className="flex">
      <Button variant="outline" size="icon" onClick={() => setCount(count > 1 ? count - 1 : count)}>
        <MinusIcon className="h-4 w-4" />
      </Button>
      <Input value={count} type="number" placeholder="1"  className="!mx-2" style={{ maxWidth: '70px' }} onChange={
        (e) => setCount(Math.min(10, parseInt(e.target.value)))
      } />
      <Button variant="outline" size="icon" onClick={() => setCount(count < 10 ? count + 1 : count)}>
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
