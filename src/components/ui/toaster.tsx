'use client'

import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import toast, {
  Toaster as DefaultToaster,
  ToastBar,
  ToastPosition,
  ToasterProps
} from 'react-hot-toast'
import { FiX } from 'react-icons/fi'

export const Toaster = (props: ToasterProps) => {
  const t = useTranslations('UI.toast')
  const defaultPosition: ToastPosition = 'bottom-center'

  return (
    <DefaultToaster
      position={defaultPosition}
      {...props}
      gutter={15}
      toastOptions={{
        className:
          '!bg-background !text-foreground group/toast !p-2 !shadow-lg light:!shadow-foreground-200 border border-1 border-foreground-200 max-w-md',
        duration: 5000
      }}
    >
      {(tb) => (
        <ToastBar toast={tb} position={props.position || defaultPosition}>
          {({ icon, message }) => (
            <>
              <div className="my-1 mx-2 flex gap-2 text-sm">
                {icon}
                <span className="leading-normal [text-wrap:balance]">{message}</span>
              </div>
              {tb.type !== 'loading' && (
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 group-hover/toast:opacity-100 opacity-0 transition-opacity duration-250 max-lg:opacity-100">
                  <Button
                    size="sm"
                    variant="flat"
                    radius="full"
                    isIconOnly
                    aria-label={t('dismiss')}
                    onClick={() => toast.dismiss(tb.id)}
                  >
                    <FiX size={12} />
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
