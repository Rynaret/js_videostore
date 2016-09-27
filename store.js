"use strict";
class Customer{
  constructor(data, movies){
    this._data = data;
    this._movies = movies;
  }

  get name(){return this._data.name;}
  get rentals(){return this._data.rentals.map(r => new Rental(r, this._movies));}
}

class Rental{
  constructor(data, movies){
    this._data = data;
    this._movies = movies;
  }

  get movieID(){return this._data.movieID;}
  get days(){return this._data.days;}

  get movie(){return this._movies[this.movieID]}
  get amount(){
    let thisAmount = 0;
    // determine amount for each movie
    switch (this.movie.code) {
      case "regular":
        thisAmount = 2;
        if (this.days > 2) {
          thisAmount += (this.days - 2) * 1.5;
        }
        break;
      case "new":
        thisAmount = this.days * 3;
        break;
      case "childrens":
        thisAmount = 1.5;
        if (this.days > 3) {
          thisAmount += (this.days - 3) * 1.5;
        }
        break;
    }
    return thisAmount;
  }
}

function statement(customerArg, movies) {
  let customer = new Customer(customerArg, movies);
  let result = `Rental Record for ${customer.name}\n`;

  for (let rental of customer.rentals) {
    result += `\t${rental.movie.title}\t${rental.amount}\n`;
  }

  // add footer lines
  result += `Amount owed is ${getTotalAmount(customer)}\n`;
  result += `You earned ${getTotalFrequentRenterPoints(customer)} frequent renter points\n`;

  return result;
}

function getFrequentRenterPoints(rental) {
  return (rental.movie.code === "new" && rental.days > 2) ? 2 : 1;
}

function getTotalFrequentRenterPoints(customer) {
  let totalFrequentRenterPoints = 0;
  for (let rental of customer.rentals) {
    totalFrequentRenterPoints += getFrequentRenterPoints(rental);
  }
  return totalFrequentRenterPoints;
}

function getTotalAmount(customer) {
  let totalAmount = 0;
  for (let rental of customer.rentals) {
    totalAmount += rental.amount;
  }
  return totalAmount;
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