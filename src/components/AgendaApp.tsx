'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Event, venues, getVenue } from '@/src/data/events';
import Calendar, { dateKey, parseDate } from './Calendar';
import Filters, { emptyFilters, FilterState } from './Filters';
import DayDetail from './DayDetail';
import EventCard from './EventCard';
import MobileAgenda from './MobileAgenda';
import Icon from './Icon';
const subscribeToday = (notify: () => void) => { const timer = setInterval(notify, 60000); return () => clearInterval(timer); };
const todaySnapshot = () => dateKey(new Date());
const serverToday = () => '';
type View = 'Mes' | 'Semana' | 'Día' | 'Listado' | 'Mapa';
function EventDialog({ event, onClose }: {
    event: Event;
    onClose: () => void;
}) {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => { ref.current?.showModal(); }, []);
    const venue = getVenue(event.lugar);
    return <dialog ref={ref} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget)
        onClose(); }} aria-labelledby="event-title"><div className={`modal-banner ${venue.color}`}><span>{event.tipo} · {event.areaResponsable}</span><button className="icon-button" onClick={onClose} aria-label="Cerrar detalle"><Icon name="close"/></button><h2 id="event-title">{event.actividad}</h2><span>Entrada gratuita</span></div><div className="modal-body"><p className="modal-date"><Icon name="calendar"/>{parseDate(event.fecha).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p><p className="modal-date"><Icon name="clock"/>{event.hora} h</p><p className="modal-date"><Icon name="pin"/>{event.lugar} · {event.localidad}</p><p className="description">{event.descripcion}</p><dl><div><dt>Público</dt><dd>{event.publicoPrincipal}</dd></div><div><dt>Edad sugerida</dt><dd>{event.edadSugerida}</dd></div><div><dt>Inscripción</dt><dd>{event.inscripcion ? 'Requiere inscripción' : 'Sin inscripción previa'}</dd></div><div><dt>Cupo</dt><dd>{event.cupo ? `${event.cupo} personas` : 'Sin cupo limitado'}</dd></div></dl>{event.inscripcion && <p className="registration">{event.linkInscripcion ? <a href={event.linkInscripcion} target="_blank" rel="noopener noreferrer">Inscribirme ↗</a> : 'Inscripción: enlace aún no disponible.'}</p>}</div></dialog>;
}
export default function AgendaApp({ events }: {
    events: Event[];
}) {
    const [selected, setSelected] = useState('2027-01-09');
    const [month, setMonth] = useState(new Date(2027, 0, 1));
    const [view, setView] = useState<View>('Mes');
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState<FilterState>(emptyFilters);
    const [showFilters, setShowFilters] = useState(false);
    const [detail, setDetail] = useState<Event | null>(null);
    const today = useSyncExternalStore(subscribeToday, todaySnapshot, serverToday);
    const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const filtered = events.filter(e => Object.entries(filters).every(([k, v]) => !v || e[k as keyof FilterState] === v) && normalize(`${e.actividad} ${e.lugar} ${e.tipo} ${e.localidad}`).includes(normalize(query)));
    const monthKey = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
    const monthEvents = filtered.filter(e => e.fecha.startsWith(monthKey));
    const dayEvents = filtered.filter(e => e.fecha === selected);
    const activeFilters = Object.values(filters).filter(Boolean).length;
    function selectDate(date: string) { setSelected(date); const d = parseDate(date); setMonth(new Date(d.getFullYear(), d.getMonth(), 1)); }
    function selectEvent(e: Event) { selectDate(e.fecha); setDetail(e); }
    function move(direction: number) {
        if (view === 'Semana' || view === 'Día') {
            const d = parseDate(selected);
            d.setDate(d.getDate() + direction * (view === 'Semana' ? 7 : 1));
            selectDate(dateKey(d));
        }
        else {
            const d = new Date(month.getFullYear(), month.getMonth() + direction, 1);
            setMonth(d);
            setSelected(dateKey(d));
        }
    }
    const nav = [['Mes', 'calendar', 'Calendario'], ['Listado', 'list', 'Listado'], ['Mapa', 'map', 'Mapa']] as const;
    return <div className="app-shell"><aside className="sidebar"><Link className="brand" href="/" aria-label="Olavarría en Verano 2027"><div className="brand-symbol"><Icon name="sun" size={32}/></div><div>Olavarría<span>en Verano <b>2027</b></span></div></Link><div className="season-label">AGENDA DE ACTIVIDADES</div><nav className="side-nav" aria-label="Navegación principal">{nav.map(([v, icon, label]) => <button key={v} className={(view === v || (v === 'Mes' && ['Semana', 'Día'].includes(view))) ? 'active' : ''} onClick={() => setView(v)}><Icon name={icon}/>{label}{v === 'Mes' && <span className="nav-badge">{events.length}</span>}</button>)}</nav><Filters events={events} value={filters} onChange={setFilters}/><div className="sidebar-footer"><span className="municipal-mark">O</span><div>Municipio de Olavarría<small>Verano 2027</small></div></div></aside><main className="main"><header className="topbar"><div className="breadcrumb">Agenda <span>/</span> <strong>Verano 2027</strong></div><div className="topbar-end"><Icon name="sun" size={16}/><span>ENERO — MARZO</span><span className="edition">2027</span></div><div className="mobile-brand">Olavarría <span>en Verano</span><b>2027</b></div></header><div className="workspace"><div className="page-heading"><div><h1>Agenda de actividades<span className="heading-dot">.</span></h1></div><span className="total-badge">{monthEvents.length} actividades <span>este mes</span></span></div><section className="agenda-surface" aria-label="Agenda de actividades"><div className="toolbar"><div className="month-controls"><h2>{month.toLocaleDateString('es-AR', { month: 'long' })} <span>{month.getFullYear()}</span></h2><div className="arrows"><button className="icon-button previous" onClick={() => move(-1)} aria-label="Período anterior"><Icon name="arrow" size={16}/></button><button className="icon-button" onClick={() => move(1)} aria-label="Período siguiente"><Icon name="arrow" size={16}/></button></div><button className="today-button" onClick={() => selectDate(dateKey(new Date()))}>Hoy</button></div><div className="view-switch" aria-label="Vista">{(['Mes', 'Semana', 'Día', 'Listado'] as const).map(v => <button key={v} className={view === v ? 'active' : ''} onClick={() => setView(v)} aria-pressed={view === v}>{v}</button>)}</div></div><div className="search-row"><label className="search"><Icon name="search" size={17}/><input aria-label="Buscar actividad" placeholder="Buscar actividad, espacio o localidad…" value={query} onChange={e => setQuery(e.target.value)}/>{query && <button onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><Icon name="close" size={15}/></button>}</label><span className="results-label">{monthEvents.length} actividades</span><button className={`filter-toggle ${activeFilters ? 'has-filters' : ''}`} onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters}><Icon name="filter" size={17}/>Filtros{activeFilters ? ` (${activeFilters})` : ''}</button></div>{showFilters && <div className="mobile-filters"><Filters events={events} value={filters} onChange={setFilters}/></div>}<div className="agenda-layout">{view === 'Mes' || view === 'Semana' ? <><div className="desktop-calendar"><Calendar month={month} selected={selected} events={filtered} onSelect={selectDate} onEvent={selectEvent} today={today} week={view === 'Semana'}/><div className="calendar-footer"><span>Actividades gratuitas · Sujetas a modificaciones</span><span>Verano 2027 ↗</span></div></div><div className="desktop-detail"><DayDetail date={selected} events={dayEvents} onEvent={selectEvent}/></div><MobileAgenda selected={selected} events={filtered} onSelect={selectDate} onEvent={selectEvent}/></> : view === 'Día' ? <div className="single-day"><MobileAgenda selected={selected} events={filtered} onSelect={selectDate} onEvent={selectEvent}/></div> : view === 'Listado' ? <div className="event-list">{[...new Set(monthEvents.map(e => e.fecha))].map(date => <section key={date}><h3>{parseDate(date).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</h3><div className="list-cards">{monthEvents.filter(e => e.fecha === date).map(e => <EventCard key={e.id} event={e} onSelect={selectEvent}/>)}</div></section>)}{!monthEvents.length && <div className="empty">{events.length ? 'No hay actividades que coincidan con tu búsqueda en este mes.' : 'No hay actividades cargadas.'}</div>}</div> : <div className="venues-view"><div className="venues-title"><h2>Espacios y sedes</h2><span>Ubicaciones de referencia · Olavarría y localidades</span></div>{!events.length && <div className="empty">No hay actividades cargadas.</div>}<div className="venue-grid">{venues.map(v => { const items = monthEvents.filter(e => e.lugar === v.name); return <section className={`venue-tile ${v.color}`} key={v.name}><Icon name="pin" size={24}/><h3>{v.name}</h3><span>{items.length} actividades este mes</span><div className="venue-actions"><button onClick={() => { setFilters({ ...filters, lugar: v.name }); setView('Listado'); }}>Ver actividades <Icon name="arrow" size={14}/></button><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.name + ' Olavarría Buenos Aires')}`} target="_blank" rel="noopener noreferrer">Ver en mapa ↗</a></div></section>; })}</div></div>}</div></section><footer className="page-footer"><span>Municipio de Olavarría</span><span>Cultura · Turismo · Deportes · Ambiente</span></footer></div></main><nav className="bottom-nav" aria-label="Navegación móvil">{nav.map(([v, icon, label]) => <button key={v} onClick={() => setView(v)} className={view === v || (v === 'Mes' && ['Semana', 'Día'].includes(view)) ? 'active' : ''}><Icon name={icon}/><span>{label}</span></button>)}</nav>{detail && <EventDialog key={detail.id} event={detail} onClose={() => setDetail(null)}/>}</div>;
}
