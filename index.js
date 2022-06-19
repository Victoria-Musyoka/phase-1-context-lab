/* Your Code Here */
function createEmployeeRecord(worker) {
    let employeeRec = {
        firstName: worker[0],
        familyName: worker[1],
        title: worker[2],
        payPerHour: worker[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord;
}

function createEmployeeRecords(employees) {
    let arrEmployees = [];
    for (let employee of employees) {
        arrEmployees.push(createEmployeeRecord(employee));
    }
    return arrEmployees;
}

function createTimeInEvent(date) {
    let duration = {
        type: "TimeIn",
        hour: parseInt(date.substring(11)),
        date: date.substring(0, 10),
    }
    this.timeInEvents.push(duration);
    return this;
}

function createTimeOutEvent(date) {
    let durationOne = {
        type: "TimeOut",
        hour: parseInt(date.substring(11)),
        date: date.substring(0, 10),
    }
    this.timeOutEvents.push(durationOne);
    return this;
}

let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateSought){
    let newPay = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(newPay.toString())
}


let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

