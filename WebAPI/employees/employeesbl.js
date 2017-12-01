
var employees_db = require("./employeesdb");

// fetch employees
function fetchEmp(req, res) {
    const textToSearch = req.params.text || null;


    employees_db.fetchEmp(textToSearch, function (err,data) {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);

        }
    });
}

// create new employees
function createEmp(req, res) {
    var reqdata = {};
    reqdata.name = req.body.name == undefined ? null :req.body.name;
    reqdata.dateOfBirth = req.body.dob == undefined ? null :req.body.dob;
    reqdata.role = req.body.role == undefined ? null :req.body.role;

    employees_db.createEmp(reqdata, function (err,data) {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);

        }
    });
}

// update existing employee
function updateEmp(req, res) {
    var reqdata = {};
    reqdata.name = req.body.name == undefined ? null :req.body.name;
    reqdata.dateOfBirth = req.body.dob == undefined ? null :req.body.dob;
    reqdata.role = req.body.role == undefined ? null :req.body.role;
    reqdata.id = req.body.id == undefined ? null :req.body.id;

    if (!reqdata.id) {
        res.status(400).send({"Message":"missing Employee id"});
    }

    employees_db.updateEmp(reqdata, function (err,data) {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);

        }
    });
}

// delete existing employee
function deleteEmp(req, res,next) {
    const userId = req.params.id;
    if (!userId) {
        res.status(400).send({"Message":"missing Employee id"});
    }

    employees_db.deleteEmp(userId, function (err,data) {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);

        }
    });
}

module.exports = {
    fetchEmp: fetchEmp,
    createEmp: createEmp,
    updateEmp:updateEmp,
    deleteEmp:deleteEmp
}