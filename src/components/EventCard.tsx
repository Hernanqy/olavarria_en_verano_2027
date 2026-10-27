import { Event, venues } from '@/src/data/events';
import Icon from './Icon';
export default function EventCard({ event, compact = false, onSelect }: {
    event: Event;
    compact?: boolean;
    onSelect: (event: Event) => void;
}) {
    const venue = venues.find(v => v.name === event.lugar)!;
    return <button className={`event-card ${venue.color} ${compact ? 'compact' : ''}`} onClick={() => onSelect(event)}><span className="event-time">{event.hora}{!compact && <span className="event-type">{event.tipo}</span>}</span><strong>{event.actividad}</strong><span className="event-place">{!compact && <Icon name="pin" size={13}/>}{compact ? venue.short : event.lugar}</span>{!compact && <span className="event-area">{event.areaResponsable}<Icon name="arrow" size={14}/></span>}</button>;
}
