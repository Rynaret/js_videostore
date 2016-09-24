"use strict";

function statement(customer, movies) {
  let totalAmount = 0;
  let totalFrequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;

  function movieFor(rental) {
    return movies[rental.movieID];
  }

  function getTotalAmount(rental) {
    let thisAmount = 0;
    // determine amount for each movie
    switch (movie.code) {
      case "regular":
        thisAmount = 2;
        if (rental.days > 2) {
          thisAmount += (rental.days - 2) * 1.5;
        }
        break;
      case "new":
        thisAmount = rental.days * 3;
        break;
      case "childrens":
        thisAmount = 1.5;
        if (rental.days > 3) {
          thisAmount += (rental.days - 3) * 1.5;
        }
        break;
    }
    return thisAmount;
  }

  function getFrequentRenterPoints(rental) {
    return (movie.code === "new" && rental.days > 2) ? 2 : 1;
  }

  for (let rental of customer.rentals) {
    var movie = movieFor(rental);
    var thisAmount = getTotalAmount(rental);

    totalFrequentRenterPoints += getFrequentRenterPoints(rental);

    //print figures for this rental
    result += `\t${movie.title}\t${thisAmount}\n`;
    totalAmount += thisAmount;
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${totalFrequentRenterPoints} frequent renter points\n`;

  return result;
}

let customer = {
  name: "martin",
  rentals: [{
    "movieID": "F001",
    "days": 3
  }, {
    "movieID": "F002",
    "days": 1
  }, ]
};

let movies = {
  "F001": {
    "title": "Ran",
    "code": "regular"
  },
  "F002": {
    "title": "Trois Couleurs: Bleu",
    "code": "regular"
  },
  // etc
};

console.log(statement(customer, movies));