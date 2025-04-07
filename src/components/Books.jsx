import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, removeBook } from '../redux/books/bookSlice';
import { v4 as uuidv4 } from 'uuid';

const Books = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.list);

    const[title, setTitle] = useState('');
    const[author, setAuthor] = useState('');

    const handleAddBook = () => {
        if (!title || !author)
            return;
        dispatch(addBook({ id: uuidv4(), title, author }));
        setTitle('');
        setAuthor('');
    };
    const handleRemoveBook = (id) => {
        dispatch(removeBook(id));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>📚 Book List</h2>
            <ul>
                {books.map(book => {
                    <li key = {book.id}>
                        <strong>{book.title}</strong> by {book.author}
                        <button onClick={() => handleRemoveBook(book.id)} style={{marginLeft: '10px'}}></button>
                    </li>
                })}
            </ul>

            <h3>Add a Book</h3>
            <input 
                type="text"
                placeholder="title"
                value="title"
                onChange={e => setTitle(e.target.value)}
                style={{ marginRight: '10px' }}
            /> 
            <input 
                type="text"
                placeholder="author"
                value="author"
                onChange={e => setAuthor(e.target.value)}
                style={{ marginRight: '10px' }}
            /> 
            <button onClick={handleAddBook}>Add Book</button>
        </div>
    );
};

export default Books;