function findAccountById(accounts, id) {
  //use array method .find to match both id from the accounts and inputted id
  let result = accounts.find((account) => account.id === id);
  return result;
}

function sortAccountsByLastName(accounts) {
  //using .sort to sort by last name
  return accounts.sort((accountA, accountB) => (accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase()) ? 1:-1);
  
}

function getTotalNumberOfBorrows(account, books) {
  //obj deconstruction
  const {id} = account;
  //this varible will hold the total number of borrows by the account
  let borrowNum = 0;
 //loops through the books array
  books.forEach((book)=>
  //if both ids match borrowNum increments
  book.borrows.forEach((borrow)=> id === borrow.id && ++borrowNum));
 //total returned outside of loop
  return borrowNum;
}

function getBooksPossessedByAccount(account, books, authors) {
  //add the matching book into an array
  //obj deconstruction
  const {id} = account;
  //holds the final array
  let results = []
  //array method filter is used to find books that match account id and if borrowed is false then the book obj is pushed into result
  books.filter((book)=>book.borrows
  .forEach((borrow)=>id===borrow.id && !borrow.returned && results.push(book)));
  console.log(results);
 //.forEach method is used to loop through result array and uses .find in author array to see if author id and book author id matches.
  results.forEach((book)=>{
    let bookAuthor = authors.find((author)=>author.id === book.authorId);
    //if it matches then new key, value paid is pushed into the array results
    book['author'] = bookAuthor;
  })
  return results;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
