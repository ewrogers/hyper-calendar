import startOfWeek from 'date-fns/startOfWeek'

import Layout from '@/layout'

interface EventTableProps {
    startDate: Date
}

const EventsTable = (props: EventTableProps) => (
    <div>
        <h1>The quick brown fox jumps over the lazy dog.</h1>
        <h2>This is the events table placeholder.</h2>
        <h3>{props.startDate.toString()}</h3>
    </div>
)

export default function getEvents(c) {
    const startDate = startOfWeek(new Date())

    return c.html(
        <Layout>
            <EventsTable startDate={startDate} />
        </Layout>
    )
}
