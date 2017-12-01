
var conn = require("../connection.js"); //db

// fetch employee from mongodb collection
function fetchEmp(textToSearch, callback) {
    var op = [];
    try{
        conn.mongoConn(function(err,db){
            var query = textToSearch == null ? null : { $text: { $search: textToSearch } } ;
            var cursor = db.collection('employees').find(query);
            cursor.sort({_id:1});

            cursor.forEach(
                function(doc) {
                    op.push(doc);
                },
                function(err) {
                    db.close();
                    callback(err,op);
                }
            );
        });
    }
    catch (err) {
        op.Message = "FAILURE";
        op.Reason = err.stack.split("\n")[0];
        callback(err.stack.split("\n")[0], op);
    }
}

//add document to the employees collection
function createEmp(empdata, callback) {
    var op = [];
    try{
        conn.mongoConn(function(err,db){

            var cursor = db.collection('employees').find();
            cursor.sort({_id:-1});
            cursor.limit(1);
            cursor.forEach(
                function(doc) {
                    empdata["_id"] = parseInt(doc._id)+1;
                    empdata["isActive"] = true;
                    db.collection("employees").insert(empdata, function(err, res) {

                        db.close();
                        callback(err,res);
                    });
                }
            );


        });
    }
    catch (err) {
        op.Message = "FAILURE";
        op.Reason = err.stack.split("\n")[0];
        callback(err.stack.split("\n")[0], op);
    }
}

// updates the document in the employees collection
function updateEmp(empdata, callback) {
    var op = [];
    var id = empdata.id;
    delete empdata.id;
    try{
        conn.mongoConn(function(err,db){
            db.collection("employees").updateOne({"_id":parseInt(id)},{$set:empdata}, function(err, res) {

                db.close();
                callback(err,res);
            });
        });
    }
    catch (err) {
        op.Message = "FAILURE";
        op.Reason = err.stack.split("\n")[0];
        callback(err.stack.split("\n")[0], op);
    }
}

// delete the document from the employee collection
function deleteEmp(userID, callback) {
    var op = [];
    try{
        conn.mongoConn(function(err,db){
            db.collection("employees").deleteOne({"_id":parseInt(userID)}, function(err, res) {

                db.close();
                callback(err,res);
            });
        });
    }
    catch (err) {
        op.Message = "FAILURE";
        op.Reason = err.stack.split("\n")[0];
        callback(err.stack.split("\n")[0], op);
    }
}



module.exports = {
    fetchEmp: fetchEmp,
    createEmp: createEmp,
    updateEmp:updateEmp,
    deleteEmp:deleteEmp
}
