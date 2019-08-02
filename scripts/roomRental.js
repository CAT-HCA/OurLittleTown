// Description: This script will calculate the cost of a car rental
//based on selected options on UI
//Author: Corinne Trudeau
"use strict";

/*
*This is the window.onload event handler
*/
window.onload = function ()
{
    let exampleField = document.getElementById("inputExample");

    let calcBtn = document.getElementById("calcBtn");

    /*
    *This is the button click event handler
    */
    calcBtn.onclick = function ()
    {
        //Get Data from UI
        let pickupDate = pickupDateField.value;
        let numDays = Number(numDaysField.value);


        //Process Data and call other functions
        let carCost = getCarCost(numDays, carTypeField);
        let optionsCost = getOptionsCost(numDays, tollTagField.checked, gpsField.checked, roadsideField.checked);
        let ageCost = getAgeCost(carCost, over25Field.checked);
        let returnDate = getReturnDate(pickupDate, numDays);
        let totalCost = carCost + optionsCost + ageCost;
        

        //Display results
        carCost = "Car Rental: $" + carCost.toFixed(2);
        document.getElementById("carRentalCostOutput").innerHTML = carCost;

        optionsCost = "Options: $" + optionsCost.toFixed(2);
        document.getElementById("optionCostOutput").innerHTML = optionsCost;

        ageCost = "Under 25 Surcharge: $" + ageCost.toFixed(2);
        document.getElementById("under25CostOutput").innerHTML = ageCost;

        returnDate = "Return Date: " + returnDate;
        document.getElementById("returnDateOutput").innerHTML = returnDate;

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
function getCarCost(numDays, carTypeField)
{
    var carType

    return carCost;
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
function getOptionsCost(numDays, tollTag, gps, roadside)
{
    let optionsCost = 0;

    return optionsCost;
}

/*
* This function will determine if there is an additional
* surcharge for age under 25 and applies the surcharge of
* 30% to the carCost (NOT total cost)
* @param carCost (number) - subtotal of cost of car
* @param over25 (boolean) - value of age from radio buttons (under or over 25)
* @return ageCost (number) - returns the surcharge amount if any
*/
function getAgeCost(carCost, over25)
{
    let ageCost;

    return ageCost;
}

/*
* This function will determine the date the vehicle needs to be returned by 
* @param pickupDate (date) - selected pickup date from UI
* @param numDays (number) - number of days of rental
* @return returnDate (date) - date vehicle needs to be returned
*/
function getReturnDate(pickupDate, numDays)
{
    let returnDate;

    return returnDate;
}