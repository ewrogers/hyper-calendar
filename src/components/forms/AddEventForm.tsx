import { FC } from 'hono/jsx'

const AddEventForm: FC<{}> = () => {
  return (
    <form
      class="form"
      hx-post="/events"
      hx-target="this"
      _="on htmx:afterSwap send closeModal to #modal"
    >
      <section>
        <label>Event Name</label>
        <input
          id="event-name"
          name="name"
          type="text"
          placeholder="Event Name"
          required
        />
      </section>

      <section>
        <label>Starts At</label>
        <input id="start-date" name="startsAt" type="datetime-local" required />
      </section>

      <section>
        <label>Duration</label>
        <select id="duration" name="duration" required>
          <option value="15">15 minutes</option>
          <option value="30" selected>
            30 minutes
          </option>
          <option value="45">45 minutes</option>
          <option value="60">1 hour</option>
          <option value="90">1 hour 30 minutes</option>
          <option value="120">2 hours</option>
        </select>
      </section>

      <section>
        <label>All Day Event</label>
        <input
          id="all-day"
          name="allDay"
          type="checkbox"
          _="on change
            if me.checked
              remove @required from #duration
              add @disabled to #duration
            else
              add @required to #duration
              remove @disabled from #duration"
        />
      </section>

      <button
        id="create-btn"
        type="submit"
        hx-post="/events"
        _="on click toggle @disabled until htmx:afterOnLoad"
      >
        <span>Add to Calendar</span>
      </button>
    </form>
  )
}

export default AddEventForm
