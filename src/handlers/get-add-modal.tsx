import { HandlerContext } from '@/types'
import DialogModal from '@/components/DialogModal'

export default async function getAddModal(c: HandlerContext) {
  return c.html(
    <DialogModal>
      <div>
        <h1>Placeholder for the add event form</h1>
      </div>
    </DialogModal>
  )
}
