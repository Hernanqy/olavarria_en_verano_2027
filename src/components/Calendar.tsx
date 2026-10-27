import { Event } from '@/src/data/events';
import CalendarDay from './CalendarDay';
export function dateKey(d: Date) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
export function parseDate(s: string) { return new Date(`${s}T12:00:00`); }
export default function Calendar({ month, selected, events, onSelect, onEvent, week = false, today }: {
    month: Date;
    selected: string;
    events: Event[];
    onSelect: (s: string) => void;
    onEvent: (e: Event) => void;
    week?: boolean;
    today: string;
}) {
    const first = week ? parseDate(selected) : new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const count = week ? 7 : Math.ceil((offset + new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()) / 7) * 7;
    const days = Array.from({ length: count }, (_, i) => { const d = new Date(first); d.setDate(first.getDate() - offset + i); return dateKey(d); });
    return <div className={`calendar ${week ? 'week-view' : ''}`}><div className="weekdays">{['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => <span key={d}>{d}</span>)}</div><div className="calendar-grid">{days.map(date => <CalendarDay key={date} date={date} events={events.filter(e => e.fecha === date)} active={selected === date} outside={parseDate(date).getMonth() !== month.getMonth()} today={date === today} onSelect={onSelect} onEvent={onEvent}/>)}</div></div>;
}
