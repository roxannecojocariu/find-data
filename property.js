function unitNumberInput() {
  let unit_id = document.getElementById("unitNumber").value;
  unitOfResidents.innerHTML = getResidentNames(property_data.people, unit_id);
}

let firstName;
let lastName;
function nameInput() {
  firstName = document.getElementById("firstName").value;
  debugger
  lastName = document.getElementById("lastName").value;
  allResidentInfo.innerHTML = displayAllInfo(property_data.devices)
}

let resident_names = [];
function getResidentNames(people_list, unit_id) {
  for (let person of people_list) {
    if (person["unit"] === unit_id) {
      resident_names.push(`${person["first_name"]} ${person["last_name"]}`)
    }
  }
  return resident_names
}

let unit = "";
function getUnitNumber(people_list, firstName, lastName) {
  for (let person of people_list) {
    if (person["last_name"] == lastName && person["first_name"] == firstName){
      unit = person["unit"];
    }
  }
  return unit
}

function getPerson(people_list, firstName, lastName) {
  for (let person of people_list) {
    if (person["last_name"] == lastName && person["first_name"] == firstName) {
      return person
    }
  }
}

function isAdmin(person) {
  if (person["roles"].includes("Admin")) {
    return true
  }
}

let deviceResidentList = [];
function displayAllInfo(device_list) {
  const person = getPerson(property_data.people, firstName, lastName)
  for (let device of Object.entries(device_list)) {
    device[1].forEach((deviceInfo) => {
      if (unit == deviceInfo["unit"] || isAdmin(person) && deviceInfo["admin_accessible"]) {
        deviceResidentList.push([device[0], deviceInfo["unit"], deviceInfo["model"]])
      } else if (unit == deviceInfo["unit"] && !isAdmin(person)) {
        deviceResidentList.push([device[0], deviceInfo["unit"], deviceInfo["model"]])
      }
    })
  }
  return outputDevices(deviceResidentList)
}

function outputDevices(deviceList){
  const person = getPerson(property_data.people, firstName, lastName)
  let controlledDevices = [];
  deviceList.forEach((device) => {
    if (!device.includes(unit) && !controlledDevices.includes(device[2])) {
      controlledDevices.push(device[2])
    }
  })

  if(isAdmin(person)){
    return `${firstName} ${lastName} can control any device that has a unit value of ${getUnitNumber(property_data.people, firstName, lastName)}, plus any ${controlledDevices.join(', ')}.`
  } else {
    return `${firstName} ${lastName} can control the thermostat, lights, and lock that have a unit value that matches her residence, ${getUnitNumber(property_data.people, firstName, lastName)}.`
  }
}


//if I had additional time,  I would do the following:
// account for uppercase/downcase in input
// account for if first or last names are omitted in input
// account for if record doesn't exist )(i.e. no unit number or person by that name)
//I would refactor to make less "ugly"
//I would change the way so many variables are global because it's not good practice.
