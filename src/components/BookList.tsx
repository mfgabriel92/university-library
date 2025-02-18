import { Book } from "@/types";
import { cn } from "@/lib/utils";
import { BookCard } from "@/components/BookCard";

interface BookListProps {
  books: Book[];
  title?: string;
  containerClassName?: string;
}

const BookList = ({ books, title, containerClassName }: BookListProps) => {
  return (
    <section className={cn("mt-40", containerClassName)}>
      <h2 className="font-bebas-neue text-light-100 text-4xl">{title}</h2>
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ul>
    </section>
  );
};

export { BookList };
