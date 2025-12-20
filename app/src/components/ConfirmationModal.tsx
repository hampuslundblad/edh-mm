import { useState } from "react"
import type { ButtonVariant } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

/** *
 *  This is an uncontrolled component, meaning that the parent has no controll of it's open or not.
 * Rather it's controlled by the component itself.
 *
 *
 */

export type ConfirmationModalProps = {
  onConfirm: () => void
  description: string
  modalTriggerText: string
  triggerVariant: ButtonVariant
}

export const ConfirmationModal = ({
  onConfirm,
  description,
  modalTriggerText,
  triggerVariant,
}: ConfirmationModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={triggerVariant}>{modalTriggerText}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Player</DialogTitle>
          </DialogHeader>
          <DialogDescription>{description}</DialogDescription>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant={"destructive"} onClick={onConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
