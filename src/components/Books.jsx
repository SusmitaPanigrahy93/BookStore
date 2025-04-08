import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooks, fetchBooks, removeBooks } from '../redux/books/bookSlice';
import { v4 as uuidv4 } from 'uuid';

const Books = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books.list);
    console.log('Books list from Redux:', books);

    const[title, setTitle] = useState('');
    const[author, setAuthor] = useState('');
    const[searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(fetchBooks());
    },[dispatch]);

    const handleAddBook = () => {
        if (!title || !author)
            return;
        const newBook = { id: uuidv4(), title, author };
        dispatch(addBooks(newBook));
        console.log('Book Added ', newBook);
        setTitle('');
        setAuthor('');
    };
    const handleRemoveBook = (id) => {
        dispatch(removeBooks(id));
    };

    return (
        <div className="container">
            <h2>📚 Book List</h2>
            <input 
                className="search-input"
                type="text"
                placeholder="search by title or author"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            /> 
            <ul>
                {books
                    .filter(book => 
                        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                        book.author.toLowerCase().includes(searchValue.toLocaleLowerCase())
                    )
                    .map(book => {
                    return(
                    <div className='book-item' key = {book.id}>
                        <strong>{book.title}</strong> by {book.author}
                        <button onClick={() => handleRemoveBook(book.id)} style={{marginLeft: '10px'}}>Remove Book</button>
                    </div>
                );
                })}
            </ul>
            <div className="form-container">
            <div className="input-row">   
            <h3 className="add-book-title">Add a Book</h3>
            <input 
                type="text"
                placeholder="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ marginRight: '10px' }}
            /> 
            <input 
                type="text"
                placeholder="author"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                style={{ marginRight: '10px' }}
            /> 
            </div>
            <div className="button-wrapper">
            <button onClick={handleAddBook}>Add Book</button>
            </div>
            </div>
        </div>
    );
};

export default Books;