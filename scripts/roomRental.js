// Description: This script will calculate the cost of a car rental
//based on selected options on UI
//Author: Corinne Trudeau
"use strict";

/*
*This is the window.onload event handler
*/
let roomPrices = 
[
    {name:"queen", guests: 5, lowSeasonRate: 150, highSeasonRate: 250},
    {name:"king", guests: 2, lowSeasonRate: 150, highSeasonRate: 250},
    {name:"kingSuite", guests: 4, lowSeasonRate: 190, highSeasonRate: 310},
    {name:"twoBedSuite", guests: 6, lowSeasonRate: 210, highSeasonRate: 350}
]

window.onload = function ()
{
    let checkInDateField = document.getElementById("inputCheckinDate");
    let numNightsField = document.getElementById("inputNumNights");
    let adultCountField = document.getElementById("inputAdultCount");
    let childCountField = document.getElementById("inputChildCount");
    let roomTypeField = document.getElementById("inputRoomType");
    let breakfastField = document.getElementById("noBreakfast");
    let aaaDiscField = document.getElementById("aaaDisc");
    let seniorDiscField = document.getElementById("seniorDisc");
    let militaryDiscField = document.getElementById("militaryDisc");
    let calcBtn = document.getElementById("calcBtn");

    /*
    *This is the button click event handler
    */
   calcBtn.onclick = function ()
    {
        //Get Data from UI
        let checkInDate = new Date(checkInDateField.value);
        let numNights = Number(numNightsField.value);
        let numAdults = Number(adultCountField.value);
        let numChild = Number(childCountField.value);
        let totalGuests = numChild + numAdults;
        let taxPercent = .12;


        //Process Data and call other functions
        let customerCount = canRoomHoldCustomer(roomTypeField.options[roomTypeField.selectedIndex].value, totalGuests);
        if (customerCount == false)
        {
            alert("Your guest count is too big for your selected room.");
            return;
        }
        let checkInDateCalc = getCheckInDate(checkInDate);
        let checkOutDate = getCheckOutDate(checkInDate, numNights);
        let breakfastCost = getBreakfastCost(numNights, numAdults, numChild, breakfastField.checked, seniorDiscField.checked);
        let roomCost = getRoomCost(roomTypeField.options[roomTypeField.selectedIndex].value, checkInDate, numNights);
        let discountAmount = getDiscount(roomCost, aaaDiscField.checked, seniorDiscField.checked, militaryDiscField.checked);
        let roomSubtotal = roomCost + breakfastCost;
        let taxAmount = roomSubtotal * (taxPercent);
        let totalCost = roomSubtotal - discountAmount + taxAmount;
      

        //Display results
        
        checkInDateCalc = "Check-in Date: " + checkInDateCalc;
        document.getElementById("checkinDateOutput").innerHTML = checkInDateCalc;

        checkOutDate = "Check-out Date: " + checkOutDate;
        document.getElementById("checkoutDateOutput").innerHTML = checkOutDate;

        roomCost = "Room Cost: $" + roomCost.toFixed(2);
        document.getElementById("roomAndBfastCostOutput").innerHTML = roomCost;

        if (discountAmount > 0){
            discountAmount = "Discount Savings: $-" + discountAmount.toFixed(2);
            document.getElementById("discountSavingsOutput").innerHTML = discountAmount;
        }
        else
        {
            discountAmount = "";
            document.getElementById("discountSavingsOutput").innerHTML = discountAmount;
        }


        taxAmount = "Taxes: $" + taxAmount.toFixed(2);
        document.getElementById("taxOutput").innerHTML = taxAmount;

        totalCost = "Total Cost: $" + totalCost.toFixed(2);
        document.getElementById("totalCostOutput").innerHTML = totalCost;

    }
}


/*
* This function will determine the cost of just the car rental
* @param numDays (number) - number of days of rental
* @param carTypeField (string) - the option selected by the user on the drop down box
* @return carCost (number) - returns the car cost
*/
function canRoomHoldCustomer(roomType, numGuests)
{
    let result = false;
    for (let i = 0; i < roomPrices.length; i++)
    {
        if (roomPrices[i].name == roomType)
        {
            if (roomPrices[i].guests >= numGuests)
            {
                result = true;
                break;
            }
        }
    }
    return result;
}

/*
* This function will determine the cost of additional options
* by determining which options were selected and multiplying
* by number of days
* @param numDays (number) - number of days of rental
* @param tollTag (boolean) - value of tollTag checkbox
* @param gps (boolean) - value of gps checkbox
* @param roadside (boolean) - value of roadside checkbox
* @return optionsCost (number) - returns the options cost
*/
function getRoomCost(roomType, checkinDate, numNights)
{
    let roomCost;
    for (let i = 0; i < roomPrices.length; i++)
    {
        if (roomPrices[i].name == roomType)
        {
            var roomCharge = roomPrices[i].lowSeasonRate;
            break
        }
    }
    roomCost = roomCharge * numNights;
    return roomCost;
}

/*
* This function will determine if there is an additional
* surcharge for age under 25 and applies the surcharge of
* 30% to the carCost (NOT total cost)
* @param carCost (number) - subtotal of cost of car
* @param over25 (boolean) - value of age from radio buttons (under or over 25)
* @return ageCost (number) - returns the surcharge amount if any
*/
function getBreakfastCost(numNights, numAdults, numKids, breakfastTrue, seniorDiscTrue)
{
    let breakfastCost;
    let kidBfastPrice = 3.95;
    let adultBfastPrice = 6.96;

    if (seniorDiscTrue != false )
    {
        breakfastCost = 0;
    }
    else
    {
        if (breakfastTrue != false)
        {
            breakfastCost = 0;
        }
        else
        {
            let kidBfastCost = numNights * kidBfastPrice * numKids;
            let adultBfastCost = numNights * adultBfastPrice * numAdults;
            breakfastCost = kidBfastCost + adultBfastCost;
        }
    }
    return breakfastCost;
}

/*
* This function will determine the date the vehicle needs to be returned by 
* @param pickupDate (date) - selected pickup date from UI
* @param numDays (number) - number of days of rental
* @return returnDate (date) - date vehicle needs to be returned
*/
function getDiscount(roomCostBeforeDiscount, aaaDiscTrue, seniorDiscTrue, militaryDiscTrue)
{
    let discount = 0;
    const aaaOrSeniorDiscRate = .1;
    const miliDiscRate = .2;
    if (aaaDiscTrue || seniorDiscTrue)
    {
        discount = roomCostBeforeDiscount * aaaOrSeniorDiscRate;
    }
    else if (militaryDiscTrue)
    {
        discount = roomCostBeforeDiscount * miliDiscRate;
    }
    else
    {
        discount = 0;
    }
    return discount;
}

/*
* This function will determine the date the vehicle needs to be returned by 
* @param pickupDate (date) - selected pickup date from UI
* @param numDays (number) - number of days of rental
* @return returnDate (date) - date vehicle needs to be returned
*/
function getCheckOutDate(checkInDate, numNights)
{
    let checkOutDate;
    const mSecPerDay = 1000 * 60 * 60* 24;
    let checkInDateMSec = Date.parse(checkInDate);
    let mSecPassed = (numNights + 1) * mSecPerDay;
    checkOutDate = new Date(checkInDateMSec + mSecPassed);
    checkOutDate = checkOutDate.toDateString();
    return checkOutDate;
}

function getCheckInDate(checkInDate)
{
    const mSecPerDay = 1000 * 60 * 60* 24;
    let checkInDateMSec = Date.parse(checkInDate);
    let newCheckInDate = new Date(checkInDateMSec + (mSecPerDay * 1));
    newCheckInDate = newCheckInDate.toDateString();
    return newCheckInDate;
}