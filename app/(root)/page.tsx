import BookOverview from '@/components/BookOverview';
import Booklist from '@/components/BookList';
import { sampleBooks } from '@/constants';
const Home = () =>(
    <>
      <BookOverview {...sampleBooks[0]}/>
      <Booklist 
      title='Latest books'
      books={sampleBooks}
      containerClassName='mx-auto justify-between my-12'
      />
    </>
  );

export default Home;