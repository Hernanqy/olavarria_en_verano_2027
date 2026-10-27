import { Event } from '@/src/data/events';
import { dateKey, parseDate } from './Calendar';
import DayDetail from './DayDetail';
export default function MobileAgenda({ selected, events, onSelect, onEvent }: {
    selected: string;
    events: Event[];
    onSelect: (s: string) => void;
    onEvent: (e: Event) => void;
}) {
    const start = parseDate(selected);
    start.setDate(start.getDate() - (start.getDay() + 6) % 7);
    function moveWeek(offset: number) {
        const next = parseDate(selected);
        next.setDate(next.getDate() + offset * 7);
        onSelect(dateKey(next));
    }
    return <div className="mobile-agenda"><div className="week-navigation"><button onClick={() => moveWeek(-1)} aria-label="Semana anterior">Semana anterior</button><button onClick={() => moveWeek(1)} aria-label="Semana siguiente">Semana siguiente</button></div><div className="date-strip">{Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(d.getDate() + i); const key = dateKey(d); return <button key={key} className={key === selected ? 'active' : ''} onClick={() => onSelect(key)}><span>{d.toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', '')}</span><strong>{d.getDate()}</strong><small>{events.filter(e => e.fecha === key).length || '–'}</small></button>; })}</div><DayDetail date={selected} events={events.filter(e => e.fecha === selected)} onEvent={onEvent}/></div>;
}
