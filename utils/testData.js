const loginCredentials = {
  validUser: {
    username: "testuser123",
    password: "testpass123",
  },
  invalidUser: {
    username: "wronguser",
    password: "wrongpass",
  },
};

const orderData = {
  name: "John Doe",
  country: "USA",
  city: "New York",
  creditCard: "1234567890123456",
  month: "12",
  year: "2025",
};

const products = {
  samsungGalaxyS6: "Samsung galaxy s6",
  nokiaLumia: "Nokia lumia 1520",
  nexus6: "Nexus 6",
  samsungGalaxyS7: "Samsung galaxy s7",
  iphone6: "Iphone 6 32gb",
  sony: "Sony xperia z5",
};

const categories = {
  phones: "Phones",
  laptops: "Laptops",
  monitors: "Monitors",
};

module.exports = {
  loginCredentials,
  orderData,
  products,
  categories,
};
