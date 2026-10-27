import { Event } from '@/src/data/events';
import EventCard from './EventCard';
export default function CalendarDay({ date, events, active, outside, today, onSelect, onEvent }: {
    date: string;
    events: Event[];
    active: boolean;
    outside: boolean;
    today: boolean;
    onSelect: (date: string) => void;
    onEvent: (event: Event) => void;
}) {
    return <div className={`calendar-day ${active ? 'selected' : ''} ${outside ? 'outside' : ''}`}><button className={`day-number ${today ? 'today' : ''}`} onClick={() => onSelect(date)} aria-label={`Seleccionar ${date}`} aria-pressed={active}>{Number(date.slice(-2))}{today && <span>HOY</span>}</button><div className="day-events">{events.slice(0, 3).map(e => <EventCard key={e.id} event={e} compact onSelect={onEvent}/>)}</div>{events.length > 3 && <button className="more-events" onClick={() => onSelect(date)}>+{events.length - 3} más</button>}</div>;
}
