function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'John',
    lastName: 'Doe'
};

const element = (
    React.createElement("h1", null, 
        "Hello, ", formatName(user), "!"
    )
);

ReactDOM.render(
    element,
    document.getElementById('root')
);
