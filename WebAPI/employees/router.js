
var employees_bl = require('./employeesbl');
var router = require('express').Router();

// fetch employees from the database(Also support full text search on Name and Role fields)
router.get('/:text?',employees_bl.fetchEmp);

//saves a new employee to database.
router.post('/',employees_bl.createEmp);

//updates an existing employee record in the collection
router.put('/',employees_bl.updateEmp);

//deletes an existing employee from the collection
router.delete('/:id',employees_bl.deleteEmp);


module.exports = router
