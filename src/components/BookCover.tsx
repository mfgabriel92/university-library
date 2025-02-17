import Image from "next/image";
import { BookCoverVariants } from "@/types";
import { cn } from "@/lib/utils";
import { BookCoverSvg } from "@/components/BookCoverSvg";

interface BookCoverProps {
  variant: BookCoverVariants;
  coverColor: string;
  coverUrl: string;
  className?: string;
}

const variants: Record<BookCoverVariants, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

const BookCover = ({
  variant = "regular",
  coverColor = "#012b48",
  coverUrl = "https://placehold.co/400x600.png",
  className,
}: BookCoverProps) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variants[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div className="absolute z-10" style={{ left: "12%", width: "88%" }}>
        <Image
          src={coverUrl}
          alt="Book cover"
          width={253}
          height={356.56}
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};

export { BookCover };
