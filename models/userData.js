const userData = {};

function addNewUser(id) {
    userData[id] = {
        state: 1
    };
}

function getUserDataById(id) {
    return userData[id];
}

module.exports = {
    addNewUser,
    getUserDataById
};
