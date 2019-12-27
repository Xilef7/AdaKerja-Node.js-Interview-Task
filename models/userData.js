const userData = {};

function addNewUserData(id, data) {
    userData[id] = data;
}

function getUserDataById(id) {
    return userData[id];
}

module.exports = {
    addNewUserData,
    getUserDataById
};
