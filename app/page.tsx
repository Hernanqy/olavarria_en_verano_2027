import AgendaApp from "@/src/components/AgendaApp";
import { getEvents } from "@/src/data/events";
export default function Home() { return <AgendaApp events={getEvents()}/>; }
