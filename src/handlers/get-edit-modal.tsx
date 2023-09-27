import { HandlerContext } from '@/types'
import DialogModal from '@/components/modals/DialogModal'
import EditEventForm from '@/components/forms/EditEventForm'

export default async function getEditModal(c: HandlerContext) {
  const eventId = Number(c.req.param('id'))
  if (isNaN(eventId)) {
    return c.text('Event ID is required', 400)
  }

  const event = await c.var.eventService.findById(eventId)
  if (!event) {
    return c.text('Event not found', 404)
  }

  return c.html(
    <DialogModal>
      <div class="modal-title-bar">
        <label class="modal-title">Edit Event</label>
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
      <EditEventForm event={event} />
    </DialogModal>
  )
}
