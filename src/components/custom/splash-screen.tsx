import { IconLoader2 } from "@tabler/icons-react";

export default function SplashScreen() {
  return (
    <div className='absolute inset-0 flex h-full w-full items-center justify-center bg-background'>
      <IconLoader2 className='animate-spin' size={32} />
    </div>
  )
}