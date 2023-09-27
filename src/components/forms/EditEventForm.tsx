import format from 'date-fns/format'
import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'

export interface EditEventProps {
  event: CalendarEvent
}

const EditEventForm: FC<EditEventProps> = ({ event }) => {
  const { startDay, startHour, startMinute, duration, color } = event

  const dayString = format(startDay, 'yyyy-MM-dd')
  const hour12 = startHour % 12

  return (
    <form
      class="form"
      hx-swap="none"
      _="on htmx:afterRequest send closeModal to #modal"
    >
      <section>
        <label for="name" class="form-label">
          Event Name
        </label>
        <div class="form-input-with-validation">
          <input
            id="name"
            name="name"
            class="form-input"
            type="text"
            placeholder="Event Name"
            required
            autofocus
            value={event.name}
            _="on load call me.select()
            on load or keyup
               set #edit-btn.disabled to me.value.trim() is empty
               set #name-error.hidden to me.value.trim() is not empty
          "
          />
          <span id="name-error" class="form-error" hidden>
            Name is required
          </span>
        </div>
      </section>

      <section>
        <label for="start-day" class="form-label">
          Starts At
        </label>
        <input
          id="start-day"
          name="startDay"
          class="form-input"
          type="date"
          required
          _={`on load set me.value to '${dayString}'`}
        />
        <select id="start-hour" name="startHour" class="form-select" required>
          <option value="1" selected={hour12 === 1}>
            1
          </option>
          <option value="2" selected={hour12 === 2}>
            2
          </option>
          <option value="3" selected={hour12 === 3}>
            3
          </option>
          <option value="4" selected={hour12 === 4}>
            4
          </option>
          <option value="5" selected={hour12 === 5}>
            5
          </option>
          <option value="6" selected={hour12 === 6}>
            6
          </option>
          <option value="7" selected={hour12 === 7}>
            7
          </option>
          <option value="8" selected={hour12 === 8}>
            8
          </option>
          <option value="9" selected={hour12 === 9}>
            9
          </option>
          <option value="10" selected={hour12 === 10}>
            10
          </option>
          <option value="11" selected={hour12 === 11}>
            11
          </option>
          <option value="12" selected={hour12 === 0}>
            12
          </option>
        </select>
        <select
          id="start-minute"
          name="startMinute"
          class="form-select"
          required
        >
          <option value="0" selected={startMinute === 0}>
            00
          </option>
          <option value="15" selected={startMinute == 15}>
            15
          </option>
          <option value="30" selected={startMinute == 30}>
            30
          </option>
          <option value="45" selected={startMinute == 45}>
            45
          </option>
        </select>
        <select id="am-pm" name="amPm" class="form-select" required>
          <option value="am" selected={startHour < 12}>
            AM
          </option>
          <option value="pm" selected={startHour >= 12}>
            PM
          </option>
        </select>
      </section>

      <section>
        <label for="duration" class="form-label">
          Duration
        </label>
        <select id="duration" name="duration" class="form-select" required>
          <option value="15" selected={duration === 15}>
            15 minutes
          </option>
          <option value="30" selected={duration === 30}>
            30 minutes
          </option>
          <option value="45" selected={duration === 45}>
            45 minutes
          </option>
          <option value="60" selected={duration === 60}>
            1 hour
          </option>
          <option value="75" selected={duration === 75}>
            1 hour 15 minutes
          </option>
          <option value="90" selected={duration === 90}>
            1 hour 30 minutes
          </option>
          <option value="105" selected={duration === 105}>
            1 hour 45 minutes
          </option>
          <option value="120" selected={duration === 120}>
            2 hours
          </option>
        </select>
      </section>

      <section>
        <label for="all-day" class="form-label">
          All Day Event
        </label>
        <input
          id="all-day"
          name="allDay"
          class="form-input"
          type="checkbox"
          checked={event.allDay}
          _="on load or change
            if me.checked
              repeat in [#start-hour, #start-minute, #am-pm, #duration]
                remove @required from it
                add @disabled to it
              end
            else
              repeat in [#start-hour, #start-minute, #am-pm, #duration]
                add @required to it
                remove @disabled from it
              end
            end"
        />
      </section>

      <section>
        <label class="form-label">Color</label>
        <div class="form-color-picker">
          <input
            name="color"
            type="radio"
            value="gray"
            class="form-color-choice form-color-gray"
            checked={color === 'gray'}
          />
          <input
            name="color"
            type="radio"
            value="red"
            class="form-color-choice form-color-red"
            checked={color === 'red'}
          />
          <input
            name="color"
            type="radio"
            value="amber"
            class="form-color-choice form-color-amber"
            checked={color === 'amber'}
          />
          <input
            name="color"
            type="radio"
            value="green"
            class="form-color-choice form-color-green"
            checked={color === 'green'}
          />
          <input
            name="color"
            type="radio"
            value="blue"
            class="form-color-choice form-color-blue"
            checked={color === 'blue'}
          />
          <input
            name="color"
            type="radio"
            value="violet"
            class="form-color-choice form-color-violet"
            checked={color === 'violet'}
          />
          <input
            name="color"
            type="radio"
            value="fuchsia"
            class="form-color-choice form-color-fuchsia"
            checked={color === 'fuchsia'}
          />
        </div>
      </section>

      <div style="margin-top: 8px" />

      <div class="form-button-section">
        <button
          id="edit-btn"
          type="submit"
          hx-put={`/events/${event.id}`}
          _="on click toggle @disabled on <button/> until htmx:afterRequest"
        >
          <span>Save Changes</span>
        </button>

        <button
          id="delete-btn"
          class="form-delete-button"
          hx-delete={`/events/${event.id}`}
          _="on click toggle @disabled on <button/> until htmx:afterRequest"
        >
          <span>Delete Event</span>
        </button>
      </div>
    </form>
  )
}

export default EditEventForm
