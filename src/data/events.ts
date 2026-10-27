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
const programs = [
    ['Atardecer de Feria', 0, 'Feria', 'Cultura', 'Todo público', '18:00', 'Emprendedores locales, diseño y propuestas gastronómicas en el patio del centro cultural.'],
    ['Rock del Bicentenario', 1, 'Música', 'Cultura', 'Jóvenes y adultos', '20:00', 'Bandas locales en vivo en el escenario del Bicentenario.'],
    ['Safari nocturno', 2, 'Visita guiada', 'Ambiente', 'Familias', '20:30', 'Recorrido guiado para conocer los sonidos y hábitos de la fauna al caer el sol.'],
    ['Tardecitas de Museo', 3, 'Taller', 'Museos', 'Familias', '17:00', 'Exploración, relatos y creación a partir del patrimonio del museo.'],
    ['Yoga en el parque', 4, 'Bienestar', 'Deportes', 'Jóvenes y adultos', '09:00', 'Práctica de yoga al aire libre. Traer una manta o colchoneta y agua.'],
    ['Música en las Alturas', 5, 'Música', 'Cultura', 'Todo público', '19:00', 'Encuentro musical al atardecer con artistas locales y vista a las sierras.'],
    ['Caminata guiada', 6, 'Recreación', 'Turismo', 'Todo público', '08:30', 'Recorrido acompañado para descubrir el paisaje y la historia de la localidad. Llevar calzado cómodo.'],
    ['Plaza Creativa', 7, 'Taller', 'Cultura', 'Infancias', '17:30', 'Estaciones de juego, dibujo y creación para compartir una tarde en la plaza.'],
    ['Cine bajo las estrellas', 8, 'Cine', 'Cultura', 'Familias', '21:00', 'Proyección de cine al aire libre para toda la familia. Podés traer reposera y mate.'],
    ['Taller de cerámica', 0, 'Taller', 'Cultura', 'Jóvenes y adultos', '16:00', 'Introducción al modelado manual en arcilla. Materiales incluidos.'],
    ['Noche de Museos', 3, 'Visita guiada', 'Museos', 'Todo público', '20:00', 'Recorrido especial por las colecciones del museo y encuentro con su historia.'],
    ['Verano Flúor', 1, 'Recreación', 'Juventudes', 'Jóvenes y adultos', '19:30', 'Juegos, música y una jornada de encuentro para jóvenes.'],
    ['Observación astronómica', 5, 'Ciencia', 'Turismo', 'Todo público', '21:30', 'Observación del cielo con telescopios y guías. Sujeto a condiciones meteorológicas.'],
    ['Taller de fotografía', 6, 'Taller', 'Cultura', 'Jóvenes y adultos', '18:00', 'Práctica de composición y fotografía del paisaje. Podés participar con tu celular.'],
    ['La Máxima nocturna', 2, 'Visita guiada', 'Ambiente', 'Familias', '20:00', 'Visita al bioparque junto al equipo de educación ambiental.'],
    ['Arte infantil', 3, 'Taller', 'Museos', 'Infancias', '16:30', 'Laboratorio de colores y texturas para crear con distintos materiales.'],
] as const;
const schedule = [[2, 0], [3, 4], [3, 8], [4, 9], [5, 3], [6, 6], [7, 7], [8, 0], [8, 1], [9, 4], [9, 2], [9, 5], [9, 8], [10, 10], [10, 13], [11, 9], [12, 15], [13, 14], [14, 11], [15, 0], [15, 12], [16, 4], [16, 1], [16, 6], [17, 3], [17, 8], [18, 9], [19, 7], [20, 2], [21, 13], [22, 0], [22, 5], [23, 4], [23, 10], [23, 11], [24, 8], [24, 6], [25, 9], [26, 15], [27, 14], [28, 12], [29, 0], [29, 1], [30, 4], [30, 5], [31, 3], [31, 8]];
const events: Event[] = schedule.map(([day, index], i) => {
    const [actividad, v, tipo, areaResponsable, publicoPrincipal, hora, descripcion] = programs[index];
    const inscripcion = tipo === 'Taller' || tipo === 'Visita guiada';
    return { id: `ene27-${i + 1}`, actividad, inscripcion, cupo: inscripcion ? 25 : null, tipo, lugar: venues[v].name, fecha: `2027-01-${String(day).padStart(2, '0')}`, hora, edadSugerida: publicoPrincipal === 'Infancias' ? '6 a 12 años' : publicoPrincipal === 'Jóvenes y adultos' ? '16 años en adelante' : 'Todas las edades', descripcion, publicoPrincipal, areaResponsable, localidad: v === 6 ? 'Sierras Bayas' : v === 7 ? 'Hinojo' : v === 8 ? 'Loma Negra' : v === 5 ? 'Sierra Chica' : 'Olavarría', linkInscripcion: '' };
}).sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora));
// Adaptador de datos: mantener este contrato al reemplazar los mocks por Sheets.
export function getEvents(): Event[] { return events; }
