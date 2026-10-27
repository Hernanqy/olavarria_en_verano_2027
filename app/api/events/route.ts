import { normalizeEvents } from '@/src/data/normalize-events';

const headers = { 'Cache-Control': 'no-store' };

export async function GET() {
    const url = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!url) {
        return Response.json({ ok: false, error: 'La fuente de actividades no está configurada.' }, { status: 503, headers });
    }
    try {
        const response = await fetch(url, {
            cache: 'no-store',
            signal: AbortSignal.timeout(20000),
        });
        if (!response.ok) throw new Error('Error de la fuente de actividades');
        const data: unknown = await response.json();
        if (!data || typeof data !== 'object' || !('eventos' in data) || ('ok' in data && data.ok === false)) {
            throw new Error('Respuesta inválida');
        }
        const eventos = normalizeEvents(data.eventos);
        return Response.json({ ok: true, total: eventos.length, eventos }, { headers });
    } catch {
        return Response.json({ ok: false, error: 'No se pudieron cargar las actividades.' }, { status: 502, headers });
    }
}
