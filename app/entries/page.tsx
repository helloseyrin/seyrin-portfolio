import { getAllEntries } from "@/lib/entries";
import EntriesList from "@/components/EntriesList";

export const metadata = {
  title: "Entries | Smyrna V.",
  description: "Personal essays on learning, systems, and life.",
};

export default function EntriesPage() {
  const entries = getAllEntries();
  return <EntriesList entries={entries} />;
}
