const data = {
  employees: require("../model/employees_data.json"),
  setEmployees: function(data){this.employees = data}
};


const getAllEmployees = (req, res)=>{
  res.json(data.employees);
}

const getEmployee = (req, res)=>{
  const employeeID =  parseInt(req.params.id);
  const employee =  data.employees.find(emp => emp.id === employeeID);

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
    id: data.employees[data.employees.length -1].id +1 || 1,
    firstname: firstname,
    lastname: lastname
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
}

const updateEmployee = (req, res)=>{
  const employeeID =  parseInt(req.body.id);
  const employee =  data.employees.find(emp => emp.id=== employeeID);

  if(!employee){
    return res.status(400).json({"message": `Employee with ${employeeID} was not found`});
  }
  
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  if (firstname) employee.firstname = firstname
  if (lastname) employee.lastname = lastname

  const filteredEmployees = data.employees.filter(emp => emp.id!==employeeID); // filter out employee
  const allEmployees = [...filteredEmployees, employee]; // add back employee

  const sortedEmployees = allEmployees.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1: 0);
  data.setEmployees(sortedEmployees);
  res.status(200).json(data.employees);

}


const deleteEmployee = (req, res)=>{
  const employeeID =  parseInt(req.body.id);
  const employee =  data.employees.find(emp => emp.id=== employeeID);

  if(!employee){
    return res.status(400).json({"message": `Employee with ${employeeID} was not found`});
  }

  const filteredEmployees = data.employees.filter(emp => emp.id!==employeeID); // filter out employee
  data.setEmployees(filteredEmployees);
  res.status(200).json(data.employees);
}


module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
}