import format from 'date-fns/format'
import { FC } from 'hono/jsx'

export interface AddEventProps {
  initialDate?: Date
}

const AddEventForm: FC<AddEventProps> = ({ initialDate }) => {
  initialDate ??= new Date()

  const initialDayString = format(initialDate, 'yyyy-MM-dd')
  const initialHour = initialDate.getHours() % 12
  const isAfterNoon = initialDate.getHours() >= 12

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
            autocomplete="off"
            _="on load or keyup
             set #create-btn.disabled to me.value.trim() is empty
             set #name-error.hidden to me.value.trim() is not empty"
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
        <div class="form-date-container">
          <input
            id="start-day"
            name="startDay"
            type="date"
            class="form-input form-date"
            required
            _={`on load set me.value to '${initialDayString}'`}
          />
        </div>
        <div class="form-select-container">
          <select
            id="start-hour"
            name="startHour"
            class="form-select"
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
        </div>

        <div class="form-select-container">
          <select
            id="start-minute"
            name="startMinute"
            class="form-select"
            required
          >
            <option value="0" selected>
              00
            </option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </select>
        </div>
        <div class="form-select-container">
          <select
            id="am-pm"
            name="amPm"
            class="form-select"
            required
            _={`on load set me.selectedIndex to ${isAfterNoon ? 1 : 0}`}
          >
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        </div>
      </section>

      <section>
        <label for="duration" class="form-label">
          Duration
        </label>
        <div class="form-select-container">
          <select id="duration" name="duration" class="form-select" required>
            <option value="15">15 minutes</option>
            <option value="30" selected>
              30 minutes
            </option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1 hour 30 minutes</option>
            <option value="120">2 hours</option>
          </select>
        </div>
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
        <label class="form-label">Color</label>
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

      <div class="form-button-section">
        <button
          id="create-btn"
          type="submit"
          hx-post="/events"
          _="on click toggle @disabled until htmx:afterRequest"
        >
          <span>Add to Calendar</span>
        </button>
      </div>
    </form>
  )
}

export default AddEventForm
