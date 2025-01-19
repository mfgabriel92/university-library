import { BookList, BookOverview } from "@/components";
import { sampleBooks } from "@/constants";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl">
      <BookOverview book={sampleBooks[0]} />
      <BookList books={sampleBooks} />
    </main>
  );
}
