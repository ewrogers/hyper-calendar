import { FC } from 'hono/jsx'

const AddEventForm: FC<{}> = (props) => {
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
          required={true}
        />
      </section>

      <section>
        <label>Starts At</label>
        <input
          id="start-date"
          name="startsAt"
          type="datetime-local"
          required={true}
        />
      </section>

      <section>
        <label>Ends At</label>
        <input
          id="end-date"
          name="endsAt"
          type="datetime-local"
          required={true}
        />
      </section>

      <section>
        <label>All Day Event</label>
        <input
          id="all-day"
          name="allDay"
          type="checkbox"
          _="on change set @required of #end-date to not @checked
              then set @disabled of #end-date to @checked"
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
