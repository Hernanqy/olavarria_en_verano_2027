import type { Event } from './events';

function text(value: unknown): string {
    return typeof value === 'string' ? value.trim() : typeof value === 'number' ? String(value) : '';
}

function date(value: unknown): string {
    const input = text(value);
    const iso = input.match(/^(\d{4})-(\d{2})-(\d{2})(?:$|T)/);
    const local = input.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
    const key = iso ? `${iso[1]}-${iso[2]}-${iso[3]}` : local ? `${local[3]}-${local[2].padStart(2, '0')}-${local[1].padStart(2, '0')}` : '';
    const parsed = new Date(`${key}T12:00:00Z`);
    return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === key ? key : '';
}

function time(value: unknown): string {
    const input = text(value);
    const match = input.match(/^(\d{1,2}):(\d{2})(?::\d{2})?(?:\s*h)?$/i) ?? input.match(/T(\d{2}):(\d{2})/);
    if (!match || Number(match[1]) > 23 || Number(match[2]) > 59) return '';
    return `${match[1].padStart(2, '0')}:${match[2]}`;
}

// No combina fuentes ni incorpora eventos de respaldo: solo adapta data.eventos.
export function normalizeEvents(value: unknown): Event[] {
    if (!Array.isArray(value)) throw new Error('Respuesta de eventos inválida');
    return value.map((row: unknown, index): Event => {
        if (!row || typeof row !== 'object' || Array.isArray(row)) throw new Error('Actividad inválida');
        const item = row as Record<string, unknown>;
        const actividad = text(item.actividad);
        const fecha = date(item.fecha);
        if (!actividad || !fecha) throw new Error('Actividad sin nombre o fecha válida');
        const hora = time(item.hora);
        const rawCapacity = text(item.cupo);
        const capacity = Number(rawCapacity);
        const inscription = text(item.inscripcion).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        return {
            id: text(item.id) || `${fecha}-${hora}-${actividad}-${index}`,
            actividad,
            fecha,
            hora,
            inscripcion: item.inscripcion === true || ['si', 'true', '1', 'requiere inscripción', 'requiere inscripcion'].includes(inscription),
            cupo: rawCapacity && Number.isFinite(capacity) && capacity >= 0 ? capacity : null,
            tipo: text(item.tipo),
            lugar: text(item.lugar),
            edadSugerida: text(item.edadSugerida),
            descripcion: text(item.descripcion),
            publicoPrincipal: text(item.publicoPrincipal),
            areaResponsable: text(item.areaResponsable),
            localidad: text(item.localidad),
            linkInscripcion: text(item.linkInscripcion),
            listadoInscriptos: Array.isArray(item.listadoInscriptos) ? item.listadoInscriptos.map(text) : text(item.listadoInscriptos),
        };
    }).sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora));
}
