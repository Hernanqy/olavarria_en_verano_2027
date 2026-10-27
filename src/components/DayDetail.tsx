import { Event } from '@/src/data/events';
import { parseDate } from './Calendar';
import EventCard from './EventCard';
export default function DayDetail({ date, events, onEvent }: {
    date: string;
    events: Event[];
    onEvent: (e: Event) => void;
}) {
    const d = parseDate(date);
    return <aside className="day-detail"><div className="detail-eyebrow">AGENDA DEL DÍA</div><h2>{d.toLocaleDateString('es-AR', { weekday: 'long' })} <span>{d.getDate()}</span></h2><p className="detail-month">{d.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}</p><div className="day-count"><span>{events.length} {events.length === 1 ? 'actividad' : 'actividades'}</span><span>↘</span></div><div className="detail-cards">{events.map(e => <EventCard key={e.id} event={e} onSelect={onEvent}/>)}{!events.length && <div className="empty">No hay actividades cargadas.</div>}</div><div className="detail-footer">OLAVARRÍA EN VERANO <span>2027</span></div></aside>;
}
