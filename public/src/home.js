
function getTotalBooksCount(books) {
  //check the length of the array
  return books.length; 
}

function getTotalAccountsCount(accounts) {
  console.log(accounts.length)
  //total accounts can be found by checking the length of the array this will return total entries in the array
  return accounts.length;

}

function getBooksBorrowedCount(books) {
 //use array method filter to see if the first item in the array is false and once this is done the length of the array filtered can be obtained using .length
 return books.filter((book)=>!book.borrows[0].returned).length;

/* 
//use this if we have to loop through the borrows array and return the result no matter what
  let fun = books.reduce((total, book)=>{
    //loops through borrows and see if returned is false and if that is the case add to the accumulator
    let borrowed = book.borrows.forEach((borrow)=>!borrow.returned && ++total)
    //returns with the total valuefor each case
    return total;
    
}, 0);
console.log(fun)
//return the total of all total
return fun;
*/
}

//helper function
function _sliceAndSort(obj){
  //use to sort in descending order and here specifically the count value
  //slide is used to limit entries to 5
  return obj.sort((ObjA, ObjB)=> ObjB.count - ObjA.count).slice(0, 5);
}


function getMostCommonGenres(books) {
  //use an array method to isolate all the genres
const genreNames = books.map(book=> book.genre)
//use to return the final array
let counts = []
// for/of is used to go through the array genreNames
for(const name of genreNames) {
    //this counts
    //The findIndex() method returns the index of the first element in the array that satisfies the provided testing function
    //sees if anything of the similar object name is present in counts
   let exsisting = counts.findIndex(obj=> obj.name === name);
    //if present
   if(exsisting >= 0){
     // add to the already existing obj with particular index number
     counts[exsisting].count++
   } else {
     //if not present new obj created inside counts array
     counts.push({
      name: name,
      count: 1
    })
    }
  }
  //helper is used to clice and sort
  return _sliceAndSort(counts);
}

function getMostPopularBooks(books) {
  let result = books
  //uses array function .map to return name of the book and length of the borrows array
  .map(book=>({name: book.title, count: book.borrows.length}));
  //helper used to sort and slice
  return _sliceAndSort(result)
 
  /*
  //work on this when possile (trying diff technique)
  let genre = books.map((book)=> book.genre);
    const result = books.reduce((acc, book) => {
        if(acc.name = book.genre)
        acc.push({
          'name': book.genre,
          'count': book.borrows.length + acc.count});
        else{
          acc.push({
            'name': book.genre,
            'count': book.borrows.length
          })
        }
      return acc;
    }, []);
    console.log(result);
    return result.sort((genreA, genreB) => genreB.count - genreA.count)
    .slice(0, 5);

}
*/
}

function getMostPopularAuthors(books, authors) {
  //final array
  let result = []
  //reduce is used to create new obj with authorId and borrows array length
  const count = books.reduce((acc, book)=>{
    //if this authorId is present in acc
    if(acc[book.authorId]) {
      //length of borrows array is pushed to the obj
      acc[book.authorId].push(book.borrows.length);
    } else {
      //if not authorId is present new array is created that stores borrows length
      acc[book.authorId] = [book.borrows.length];
    }
    return acc;
  }, {});
  //finding author using .find array method
  authors.find(({id, name: {first, last}})=>{
    //for/in loop of array
    for(const authorId in count){
      //check if authorId from count array matches id from author array
      if(Number(authorId) === id){
        //adding the borrows array using reduce
        let added = count[authorId].reduce((acc, checked)=>(acc+=checked)) 
        //name and count is added to result array
        result.push({'name': `${first} ${last}`, 'count': added});
        
      }
    }
  })
  console.log(result);
  //helper used to return sorted and sliced result array
  return _sliceAndSort(result);
  
  /*
  //this works too
  // match book to the author
  // use reduce
  let holding = []
    books.reduce((results, book)=>{
        let findAuthor = authors.find((author)=>{
            if(author.id === book.authorid){
                //push an object inside the results array that contains both author and borrowed
                //if author is already present then check for it and add likely 
               results.push({})
              }
          }, [])
        const mostBooks = books
          .map((book) => ({id: book.authorId, count: book.borrows.length}))
          .sort((bookOne, bookTwo) => bookOne.count > bookTwo.count ? -1 : 1);  
        
          const popAuthors = [];  
          for( const popBook of mostBooks) {
            const {name} = authors.find((author) => author.id === popBook.id);
            popAuthors.push({
                name: `${name.first} ${name.last}`,
                count: popBook.count
              })
            }  
            const returnValue = [];  
            for (const author of popAuthors) {
                const existing = returnValue.findIndex((value) => value.name === author.name);
                if (existing !== -1) {
                    returnValue[existing].count += author.count;
                  } else {
                      returnValue.push(author);
                    }
                  }  
                  return returnValue
                    .sort((authOne, authTwo) => authOne.count > authTwo.count ? -1 : 1)
                    .slice(0,5)
                    */ 
}
                
                
module.exports = {
getTotalBooksCount,
getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
