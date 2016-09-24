"use strict";

function statement(customer, movies) {
  let result = `Rental Record for ${customer.name}\n`;

  for (let rental of customer.rentals) {
    result += `\t${movieFor(rental, movies).title}\t${getAmount(rental, movies)}\n`;
  }

  // add footer lines
  result += `Amount owed is ${getTotalAmount(customer)}\n`;
  result += `You earned ${getTotalFrequentRenterPoints(customer, movies)} frequent renter points\n`;

  return result;

  function getTotalAmount(customer) {
    let totalAmount = 0;
    for (let rental of customer.rentals) {
      totalAmount += getAmount(rental, movies);
    }
    return totalAmount;
  }
}

function movieFor(rental, movies) {
    return movies[rental.movieID];
}

function getAmount(rental, movies) {
  let thisAmount = 0;
  // determine amount for each movie
  switch (movieFor(rental, movies).code) {
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

function getFrequentRenterPoints(rental, movies) {
  return (movieFor(rental, movies).code === "new" && rental.days > 2) ? 2 : 1;
}

function getTotalFrequentRenterPoints(customer, movies) {
  let totalFrequentRenterPoints = 0;
  for (let rental of customer.rentals) {
    totalFrequentRenterPoints += getFrequentRenterPoints(rental, movies);
  }
  return totalFrequentRenterPoints;
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