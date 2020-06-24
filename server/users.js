const users = []  //{id,room,user} per entry

// add a user to the users array ; before that trim user & room and check if an user exists in that
// room with the same name;if so, return error message else add the user
const addUser = ({ id, name, room }) => {
    name = name.trim(name)
    room = room.trim(room)

    const isExist = users.find(user => user.room === room && user.name === name)
    if (isExist)
        return { error: 'Username is taken' }

    const user = { id, name, room }//ES6
    users.push(user)

    return { user }

}

//remove the user if exists
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1)
        return users.splice(index, 1)[0] // {id:'',name:'',room:''}
}

// return the user based on id
const getUser = (id) => users.find(user => user.id === id);

//get all users of a room
const getUsersInRoom = (room) => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom }