import Image from "next/image";
import { Book } from "@/types";
import { Button } from "@/components/ui/button";
import { BookCover } from "@/components/BookCover";

const BookOverview = ({ book }: { book: Book }) => {
  const {
    title,
    author,
    genre,
    rating,
    totalCopies,
    availableCopies,
    description,
    coverColor,
    coverUrl,
  } = book;

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="text-light-200 font-semibold">{author}</span>
          </p>

          <p>
            Category{" "}
            <span className="text-light-200 font-semibold">{genre}</span>
          </p>

          <div className="flex gap-1">
            <Image src="/icons/star.svg" alt="start" width={22} height={22} />
            <p>{rating}</p>
          </div>

          <div className="book-copies">
            <p>
              Total Books: <span>{totalCopies}</span>
            </p>

            <p>
              Available Books: <span>{availableCopies}</span>
            </p>
          </div>

          <div className="book-description">{description}</div>

          <Button className="book-overview_btn">
            <Image src="/icons/book.svg" alt="book" width={20} height={20} />
            <p className="font-bebas-neue text-dark-100 text-xl">Borrow</p>
          </Button>
        </div>
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant={"wide"}
            className="z-10 -ml-12 sm:ml-0"
            coverColor={coverColor}
            coverUrl={coverUrl}
          />

          <div className="absolute top-3 left-0 rotate-12 opacity-40 sm:top-10 sm:left-16">
            <BookCover
              variant={"wide"}
              coverColor={coverColor}
              coverUrl={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { BookOverview };
