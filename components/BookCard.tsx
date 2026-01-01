import Link from 'next/link';
import BookCover from './BookCover';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from './ui/button';
const BookCard = ({
  id,
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
  video,
  summary,
  isLoanedBook = false,
}: Book) => (
  <li className={cn( 'mx-auto max-lg:mx-8 hover:scale-105 transition-all duration-500' , isLoanedBook && 'xs:w-48 w-full')}>
    <Link href={`/books/${id}`} className={cn(isLoanedBook && 'w-full flex flex-col items-center')}>
      <BookCover coverColor={color} coverImage={cover} />
      <div className={cn('mt-4', !isLoanedBook && 'xs:max-w-40 max-w-28')}>
        <p className="book-title">{title}</p>
        <p className="book-genre">{genre}</p>
      </div>
      {
        isLoanedBook && (
            <div className='mt-1 w-full '>
                <div className='book-loaned mb-3 '>
                    <Image src = "/icons/calendar.svg" alt="calendar" width={18} height={18} className="object-contain"/>
                    <p className='text-light-100 '>11 days left to return </p>
                </div>
                <Button className="w-full">Download reciept</Button>
            </div>
        )
      }
    </Link>
  </li>
);

export default BookCard;
