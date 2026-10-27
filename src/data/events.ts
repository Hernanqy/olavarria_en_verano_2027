export type Event = {
    id: string;
    actividad: string;
    inscripcion: boolean;
    cupo: number | null;
    tipo: string;
    lugar: string;
    fecha: string;
    hora: string;
    edadSugerida: string;
    descripcion: string;
    publicoPrincipal: string;
    areaResponsable: string;
    localidad: string;
    linkInscripcion: string;
    listadoInscriptos: string | string[];
};
export const venues = [
    { name: 'Centro Cultural San José', color: 'peach', short: 'San José' },
    { name: 'Casa del Bicentenario', color: 'yellow', short: 'Bicentenario' },
    { name: 'La Máxima', color: 'green', short: 'La Máxima' },
    { name: 'Museo Dámaso Arce', color: 'violet', short: 'Museo Dámaso Arce' },
    { name: 'Parque Mitre', color: 'pink', short: 'Parque Mitre' },
    { name: 'Cerro Fortabat', color: 'sky', short: 'Cerro Fortabat' },
    { name: 'Sierras Bayas', color: 'lavender', short: 'Sierras Bayas' },
    { name: 'Hinojo', color: 'sand', short: 'Hinojo' },
    { name: 'Loma Negra', color: 'mint', short: 'Loma Negra' },
];
export function getVenue(lugar: string) {
    return venues.find(v => v.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === lugar.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())
        ?? { name: lugar, short: lugar, color: '' };
}
