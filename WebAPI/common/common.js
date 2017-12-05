/**
 * Created by Nashi on 12/5/2017.
 */


// find age of the user from date of birth
function findage(dob)
{

        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        {
            age--;
        }
        return age;

}

module.exports = {
    findage:findage
}