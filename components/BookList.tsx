import BookCard from "./BookCard"
interface Props {
  title : string
  books : Book[]
  containerClassName? : string
}


const Booklist = ({title, books, containerClassName} : Props) => {
  return (
    <section className={containerClassName} >
        <h2 className='font-bebas-neue text-4xl text-light-100'>{title}</h2>
        <ul className="book-list">
          {books.map((e) => (
            <BookCard key = {e.title} {...e}/>
          ))}
        </ul>
    </section>
  )
}

export default Booklist