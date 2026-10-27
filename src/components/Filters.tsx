import { Event, venues } from '@/src/data/events';
export type FilterState = {
    lugar: string;
    areaResponsable: string;
    tipo: string;
    publicoPrincipal: string;
    localidad: string;
};
export const emptyFilters: FilterState = { lugar: '', areaResponsable: '', tipo: '', publicoPrincipal: '', localidad: '' };
export default function Filters({ events, value, onChange }: {
    events: Event[];
    value: FilterState;
    onChange: (v: FilterState) => void;
}) {
    const fields: [
        keyof FilterState,
        string,
        string
    ][] = [['lugar', 'Espacio / sede', 'Todos los espacios'], ['areaResponsable', 'Área responsable', 'Todas las áreas'], ['tipo', 'Tipo de actividad', 'Todos los tipos'], ['publicoPrincipal', 'Público', 'Todos los públicos'], ['localidad', 'Localidad', 'Todas las localidades']];
    return <div className="filters"><div className="filter-heading"><h2>Filtros</h2>{Object.values(value).some(Boolean) && <button onClick={() => onChange(emptyFilters)}>Limpiar</button>}</div>{fields.map(([key, label, all]) => <label key={key}>{label}<select value={value[key]} onChange={e => onChange({ ...value, [key]: e.target.value })}><option value="">{all}</option>{[...new Set(events.map(e => e[key]))].sort().map(v => <option key={v}>{v}</option>)}</select></label>)}<div className="venue-legend"><h3>ESPACIOS</h3>{venues.map(v => <button key={v.name} className={value.lugar === v.name ? 'legend-active' : ''} onClick={() => onChange({ ...value, lugar: value.lugar === v.name ? '' : v.name })}><span className={`swatch ${v.color}`}/>{v.name}</button>)}</div></div>;
}
