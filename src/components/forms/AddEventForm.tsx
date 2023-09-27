import format from 'date-fns/format'
import { FC } from 'hono/jsx'

export interface AddEventProps {
  initialDate?: Date
}

const AddEventForm: FC<AddEventProps> = (props) => {
  const initialDate = props.initialDate ?? new Date()

  const initialDayString = format(props.initialDate ?? new Date(), 'yyyy-MM-dd')
  const initialHour = initialDate.getHours() % 12
  const isAfterNoon = initialDate.getHours() >= 12

  return (
    <form
      class="form"
      hx-post="/events"
      hx-swap="none"
      _="on htmx:afterRequest send closeModal to #modal"
    >
      <section>
        <label for="name">Event Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Event Name"
          required
          autofocus
        />
      </section>

      <section>
        <label for="start-day">Starts At</label>
        <input
          id="start-day"
          name="startDay"
          type="date"
          required
          _={`on load set me.value to '${initialDayString}'`}
        />
        <select
          id="start-hour"
          name="startHour"
          required
          _={`on load set me.selectedIndex to ${initialHour}`}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <select id="start-minute" name="startMinute" required>
          <option value="0" selected>
            00
          </option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>
        <select
          id="am-pm"
          name="amPm"
          required
          _={`on load set me.selectedIndex to ${isAfterNoon ? 1 : 0}`}
        >
          <option value="am">AM</option>
          <option value="pm">PM</option>
        </select>
      </section>

      <section>
        <label for="duration">Duration</label>
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
        <label for="all-day">All Day Event</label>
        <input
          id="all-day"
          name="allDay"
          type="checkbox"
          _="on change
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
        <label>Color</label>
        <div class="form-color-picker">
          <input
            name="color"
            type="radio"
            value="gray"
            class="form-color-choice form-color-gray"
            checked
          />
          <input
            name="color"
            type="radio"
            value="red"
            class="form-color-choice form-color-red"
          />
          <input
            name="color"
            type="radio"
            value="amber"
            class="form-color-choice form-color-amber"
          />
          <input
            name="color"
            type="radio"
            value="green"
            class="form-color-choice form-color-green"
          />
          <input
            name="color"
            type="radio"
            value="blue"
            class="form-color-choice form-color-blue"
          />
          <input
            name="color"
            type="radio"
            value="violet"
            class="form-color-choice form-color-violet"
          />
          <input
            name="color"
            type="radio"
            value="fuchsia"
            class="form-color-choice form-color-fuchsia"
          />
        </div>
      </section>

      <div style="margin-top: 8px" />

      <button
        id="create-btn"
        type="submit"
        hx-post="/events"
        _="on click toggle @disabled until htmx:afterRequest"
      >
        <span>Add to Calendar</span>
      </button>
    </form>
  )
}

export default AddEventForm
