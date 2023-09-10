import addDays from 'date-fns/addDays'
import formatDate from 'date-fns/format'
import startOfWeek from 'date-fns/startOfWeek'

import Layout from '@/layout'

interface EventTableProps {
    startDate: Date
}

const EventsTable = (props: EventTableProps) => {
    const toShortDate = (date: Date, offset: number): string =>
        formatDate(addDays(date, offset), 'M/dd')
    const toDayOfWeek = (date: Date, offset: number): string =>
        formatDate(addDays(date, offset), 'EEEE')

    return (
        <div class="container">
            <div class="calendar-header">
                <span>&lt; LAST WEEK</span>
                <div class="spacer" />
                <span>MONTH</span>
                <span>YEAR</span>
                <div class="spacer" />
                <span>NEXT WEEK &gt;</span>
            </div>
            <table class="events-table">
                <thead>
                    <tr class="week-header">
                        {
                            // Loop through each day of the week
                            // Somewhat a hack because you cannot use normal `for` loops in JSX
                            Array(7)
                                .fill(1)
                                .map((el, i) => (
                                    <th class="day-header">
                                        <span>
                                            {toShortDate(props.startDate, i)}
                                        </span>
                                        <span>
                                            {toDayOfWeek(props.startDate, i)}
                                        </span>
                                    </th>
                                ))
                        }
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <h1>The quick brown fox jumps over the lazy dog.</h1>
            <h2>This is the events table placeholder.</h2>
            <h3>{props.startDate.toString()}</h3>
        </div>
    )
}

export default function getEvents(c) {
    const startDate = startOfWeek(new Date())

    return c.html(
        <Layout>
            <EventsTable startDate={startDate} />
        </Layout>
    )
}
