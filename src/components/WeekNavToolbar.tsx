import format from 'date-fns/format'

export interface WeekNavToolbarProps {
  prevWeek: Date
  nextWeek: Date
}

const WeekNavToolbar = (props: WeekNavToolbarProps) => {
  return (
    <div class="toolbar">
      <button
        id="prev-week-btn"
        class="toolbar-button"
        hx-get={`/events?date=${format(props.prevWeek, 'yyyy-MM-dd')}`}
        hx-target="#calendar"
        hx-push-url="true"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            d={`M 15.41 7.41 L 14 6 L 8 12 L 14 18 L 15.41 16.59 L 10.83 12 Z`}
          />
        </svg>
      </button>
      <button
        id="today-btn"
        class="toolbar-button"
        hx-get="/events"
        hx-target="#calendar"
        hx-push-url="true"
      >
        <span class="toolbar-button-label">Today</span>
      </button>
      <button
        id="next-week-btn"
        class="toolbar-button"
        hx-get={`/events?date=${format(props.nextWeek, 'yyyy-MM-dd')}`}
        hx-target="#calendar"
        hx-push-url="true"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            d={`M 8.59 16.59 L 10 18 L 16 12 L 10 6 L 8.59 7.41 L 13.17 12 Z`}
          />
        </svg>
      </button>
    </div>
  )
}

export default WeekNavToolbar
