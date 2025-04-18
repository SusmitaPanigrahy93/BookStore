export const fetchBooksFromAPI = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockBooks = [
                { id: '1', title: 'The Alchemist', author: 'Paulo Coelho' },
                { id: '2', title: 'Atomic Habits', author: 'James Clear' },
                { id: '3', title: '1984', author: 'George Orwell' },
            ];
            resolve(mockBooks);
        }, 1000);
    });
};