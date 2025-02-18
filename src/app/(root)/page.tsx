import { BookList, BookOverview } from "@/components";
import { sampleBooks } from "@/constants";

const HomePage = () => {
  return (
    <main className="mx-auto max-w-7xl">
      <BookOverview book={sampleBooks[0]} />
      <BookList books={sampleBooks} title="Popular Books" />
    </main>
  );
};

export default HomePage;
