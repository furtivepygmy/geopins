const user = {
  _id: '1',
  name: 'John',
  email: 'john@gmail.com',
  picture: 'https://cloudinary.com/asdf'
};

module.exports = {
  Query: {
    me: () => user
  }
};
