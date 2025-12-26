import './Calendar.css';
import Container from '../../components/ui/Container';
import HeadTitle from '../../components/headTitle/HeadTitle';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";


const CalendarPage = () => {
    const events = [
        { title: "Task 1", date: "2025-10-01" },
        { title: "Meeting", date: "2025-10-02" },
        { title: "task 2", date: "2025-10-20" },
    ]
    return (
        <section className='calendar-page'>
            <Container>
                <HeadTitle title='التقويم' />
                <div className="calendar-box w-full">
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        editable={true}
                    />
                </div>
            </Container>
        </section>
    );
};

export default CalendarPage;