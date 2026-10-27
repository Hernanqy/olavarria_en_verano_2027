'use client';

import { useEffect, useState } from 'react';
import type { Event } from '@/src/data/events';
import AgendaApp from './AgendaApp';

export default function EventsLoader() {
    const [events, setEvents] = useState<Event[]>([]);
    const [status, setStatus] = useState('Cargando actividades…');

    useEffect(() => {
        const controller = new AbortController();
        async function loadEvents() {
            try {
                const response = await fetch('/api/events', { cache: 'no-store', signal: controller.signal });
                if (!response.ok) throw new Error('Error al cargar actividades');
                const data = await response.json();
                if (data.ok !== true || !Array.isArray(data.eventos)) throw new Error('Respuesta inválida');
                setEvents(data.eventos);
                setStatus('');
            } catch {
                if (!controller.signal.aborted) setStatus('No se pudieron cargar las actividades. Intentá nuevamente más tarde.');
            }
        }
        void loadEvents();
        return () => controller.abort();
    }, []);

    return <>{status && <div className="empty" role="status">{status}</div>}<AgendaApp events={events} /></>;
}
