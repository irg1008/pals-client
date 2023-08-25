'use client'

import { Button } from '@nextui-org/react'
import toast, {
  Toaster as DefaultToaster,
  ToastBar,
  ToastPosition,
  ToasterProps
} from 'react-hot-toast'
import { FiX } from 'react-icons/fi'

export const Toaster = (props: ToasterProps) => {
  const defaultPosition: ToastPosition = 'bottom-center'

  return (
    <DefaultToaster
      position={defaultPosition}
      {...props}
      gutter={15}
      toastOptions={{
        className:
          '!bg-background !text-foreground group/toast !p-2 !shadow-lg !shadow-foreground-200 border border-1 border-foreground-200',
        duration: 5000
      }}
      containerClassName="mx-4"
    >
      {(t) => (
        <ToastBar toast={t} position={props.position || defaultPosition}>
          {({ icon, message }) => (
            <>
              <div className="my-3 mx-4 flex gap-2">
                {icon}
                <span className="leading-normal">{message}</span>
              </div>
              {t.type !== 'loading' && (
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 group-hover/toast:opacity-100 opacity-0 transition-opacity duration-250 max-lg:opacity-100">
                  <Button
                    size="sm"
                    variant="flat"
                    radius="full"
                    isIconOnly
                    aria-label="Close toast"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <FiX size={15} />
                  </Button>
                </span>
              )}
            </>
          )}
        </ToastBar>
      )}
    </DefaultToaster>
  )
}
