const Employee = require("../model/Employee");


const getAllEmployees = async (req, res)=>{
  const employees = await Employee.find();
  if(!employees) return res.status(204).json({"message": "No employees were found."});

  res.json(employees);
}


const getEmployee = async (req, res)=>{
  if(!req?.params?.id) return res.status(400).json({"message": "Employee ID is required."});

  const employeeID =  req.params.id;
  const employee =  await Employee.findOne({_id: employeeID}).exec();

  if(!employee){
    return res.status(400).json({"message": `Employee with ${employeeID} was not found.`});
  }

  res.status(200).json(employee);
}


const createEmployee = async (req, res)=>{

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  if (!firstname || !lastname){
    return res.status(400).json({"message": "firstname and lastname are required."})
  }

  try{
    const newEmployee = await Employee.create({firstname, lastname});
    res.status(201).json(newEmployee);

  } catch(error){
    console.log(error);
  }
}


const updateEmployee = async (req, res)=>{
  if(!req?.body?.id) return res.status(400).json({"message": "ID is required."});

  const employeeID =  req.body.id
  const employee =  await Employee.findOne({_id: employeeID}).exec();

  if(!employee){
    return res.status(204).json({"message": `No employee with ${employeeID} found.`});
  }
  
  const firstname = req.body?.firstname;
  const lastname = req.body?.lastname;

  if (firstname) employee.firstname = firstname
  if (lastname) employee.lastname = lastname

  const updatedEmployee = await employee.save()

  res.status(200).json(updatedEmployee);
}


const deleteEmployee = async (req, res)=>{
  if(!req?.body?.id) return res.status(400).json({"message": "Employee ID is required."});

  const employeeID = req?.body?.id;
  console.log(`Employee ID is ${employeeID}.`) //TODO: remove

  const employee =  await Employee.findOne({_id: employeeID}).exec();

  if(!employee){
    return res.status(204).json({"message": `No employee with ${employeeID} found.`});
  }

  const result = await employee.deleteOne({_id: employeeID});
  res.json(result);
}


module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
}