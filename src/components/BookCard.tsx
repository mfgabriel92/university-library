import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookCover } from "@/components/BookCover";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <li className={cn({ "xs:w-52 flex w-full": book.isLoaned })}>
      <Link
        href={`/books/${book.id}`}
        className={cn("flex flex-col items-center", {
          "flex w-full flex-col": book.isLoaned,
        })}
      >
        <BookCover
          coverUrl={book.coverUrl}
          coverColor={book.coverColor}
          variant="regular"
        />

        <div
          className={cn("mt-4 mb-4", {
            "xs:max-w-40 max-w-28": !book.isLoaned,
          })}
        >
          <p className="book-title">{book.title}</p>
          <p className="book-genre">{book.genre}</p>
        </div>

        {book.isLoaned && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days to return</p>
            </div>
            <Button className="book-btn">Download Receipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export { BookCard };
