
function findAuthorById(authors, id) {
  //use strict equality to find matching author
  let result = authors.find((author) => author.id === id);
  return result;
}

function findBookById(books, id) {
  //use strict equality to find matching book
  let result = books.find((book) => book.id === id);
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  //use rest operator to embbed array inside array and filter method to see if book is currently checked out
  let fun = [
    [...books.filter((book)=> !book.borrows[0].returned)
  ],
      [...books.filter((book)=> book.borrows[0].returned)

      ],
    
  ]
  // console.log(fun);
  return fun;
}

function getBorrowersForBook(book, accounts) {
  //borrows is an array so need to loop through it to find the id and returned
  //create an array within
//use reduce to create new array with borrower and return info
  let borrower = book.borrows.reduce((acc, borrow)=>{
    //find account with matching ids
    let matching = accounts.find((account)=>account.id === borrow.id); 
    //matching accounts are pushed to accumulator
    acc.push(matching);
    //for each account in accumulator returned key and value is added
    acc.forEach((account)=>account['returned'] = borrow.returned);
    // console.log('------------------------------')
    // console.log(acc);
    // console.log('------------------------------')
    return acc;
  }, []);
  // console.log('=====================================')
  // console.log(borrower);
  // console.log('=====================================')
  //final array returns with .slide to limit number of results
  return borrower.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
