import { Button } from './ui/button';
import BookCover from './BookCover';
import Image from 'next/image';

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
}: Book) => {
  return (
    <section className="book-overview flex-1 ">
      <div className="flex flex-col gap-5 flex-1">
        <h1>{title}</h1>
        
        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category <span className="font-semibold text-light-200">{genre}</span>
          </p>
        </div>
        <div className="flex flex-row gap-1">
          <Image src="/icons/star.svg" alt="star" width={20} height={20} />
          <p>{rating}</p>
        </div>
        <div className="book-copies">
          <p>Total Books : {total_copies}</p>
          <p>Available Books : {available_copies}</p>
        </div>
        <div className="book-description">
          <p>{description}</p>
          <Button className="w-full book-overview_btn ">
            <Image src="/icons/book.svg" alt="book" width={20} height={20} />
            <p className="font-bebas-neue text-xl text-dark-100">Borrow</p>
          </Button>
        </div>
      </div>
      <div className="relative flex flex-1 justify-center flex-wrap ">
          <div className="relative">
            <BookCover variant="wide" className="z-10 " coverColor={color} coverImage={cover} />
            <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
              <BookCover variant="wide" coverColor={color} coverImage={cover} />
            </div>
          </div>
        </div>
    </section>
  );
};

export default BookOverview;
