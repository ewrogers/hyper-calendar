import { HandlerContext } from '@/types'
import DialogModal from '@/components/modals/DialogModal'
import AddEventForm from '@/components/forms/AddEventForm'

export default async function getAddModal(c: HandlerContext) {
  return c.html(
    <DialogModal>
      <label class="modal-title">New Event</label>
      <div class="divider" />
      <AddEventForm />
    </DialogModal>
  )
}
