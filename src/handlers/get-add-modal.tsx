import { HandlerContext } from '@/types'
import DialogModal from '@/components/modals/DialogModal'
import AddEventForm from '@/components/forms/AddEventForm'

export default async function getAddModal(c: HandlerContext) {
  return c.html(
    <DialogModal>
      <div class="modal-title-bar">
        <label class="modal-title">New Event</label>
        <button
          class="toolbar-button modal-close-button"
          _="on click send closeModal to #modal"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d={`M 7 6 L 6 7 L 11 12 L 6 17 L 7 18 L 12 13 L 17 18 L 18 17 L 13 12 L 18 7 L 17 6 L 12 11 Z`}
            />
          </svg>
        </button>
      </div>
      <div class="divider" />
      <AddEventForm initialDate={new Date()} />
    </DialogModal>
  )
}
