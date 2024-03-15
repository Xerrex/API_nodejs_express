const path = require("path");
const fspromises = require("fs").promises;

const employeesDB = {
  employees: require("../model/employees_data.json"),
  setEmployees: function(data){this.employees = data},

  storageFile: path.join(__dirname, "..", "model", "employees_data.json"),
  saveToFile: function(){ fspromises.writeFile(this.storageFile, JSON.stringify(this.employees));}
};


const getAllEmployees = (req, res)=>{
  res.json(employeesDB.employees);
}

const getEmployee = (req, res)=>{
  const employeeID =  parseInt(req.params.id);
  const employee =  employeesDB.employees.find(emp => emp.id === employeeID);

  if(!employee){
    return res.status(400).json({"message": `Employee with ${employeeID} was not found`});
  }

  res.status(200).json(employee);
}

const createEmployee = (req, res)=>{

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  if (!firstname || !lastname){
    return res.status(400).json({"message": "firstname and lastname are required"})
  }

  const newEmployee = {
    id: employeesDB.employees[employeesDB.employees.length -1]?.id +1 || 1,
    firstname: firstname,
    lastname: lastname
  }

  employeesDB.setEmployees([...employeesDB.employees, newEmployee]);
  employeesDB.saveToFile()
  res.status(201).json(employeesDB.employees);
}

const updateEmployee = (req, res)=>{
  const employeeID =  parseInt(req.body.id);
  const employee =  employeesDB.employees.find(emp => emp.id=== employeeID);

  if(!employee){
    return res.status(400).json({"message": `Employee with ${employeeID} was not found`});
  }
  
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  if (firstname) employee.firstname = firstname
  if (lastname) employee.lastname = lastname

  const filteredEmployees = employeesDB.employees.filter(emp => emp.id!==employeeID); // filter out employee
  const allEmployees = [...filteredEmployees, employee]; // add back employee

  const sortedEmployees = allEmployees.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1: 0);
  employeesDB.setEmployees(sortedEmployees);
  employeesDB.saveToFile()

  res.status(200).json(employeesDB.employees);

}


const deleteEmployee = (req, res)=>{
  const employeeID =  parseInt(req.body.id);
  const employee =  employeesDB.employees.find(emp => emp.id=== employeeID);

  if(!employee){
    return res.status(400).json({"message": `Employee with ${employeeID} was not found`});
  }

  const filteredEmployees = data.employees.filter(emp => emp.id!==employeeID); // filter out employee
  employeesDB.setEmployees(filteredEmployees);
  employeesDB.saveToFile()
  res.status(200).json(data.employees);
}


module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
}