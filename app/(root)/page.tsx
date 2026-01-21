import BookOverview from '@/components/BookOverview';
import Booklist from '@/components/BookList';
import { sampleBooks } from '@/constants';
import { db } from '@/Database/Drizzle';
import { users } from '@/Database/Schema';
const Home = async () => {

  const result = await db.select().from(users)
  // console.log(JSON.stringify(result , null , 2))
  // console.log(result , null , 2)
    return (
  <>  
    <BookOverview {...sampleBooks[0]} />
    <Booklist
      title='Latest books'
      books={sampleBooks}
      containerClassName='mx-auto justify-between my-12'
    />
  </>
)
}

export default Home;