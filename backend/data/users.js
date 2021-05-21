import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin",
    email: "admin@medspace.com",
    password: bcrypt.hashSync("jkjkjk123", 15),
    isAdmin: true,
  },
  {
    name: "Stan Lee",
    email: "stanl@medspace.com",
    password: bcrypt.hashSync("hulk123", 15),
  },
  {
    name: "Tony Stark",
    email: "tonys@medspace.com",
    password: bcrypt.hashSync("pepper123", 15),
  },
  {
    name: "Wanda Vision",
    email: "wandav@medspace.com",
    password: bcrypt.hashSync("wv123456", 15),
  },
  {
    name: "Steve Rogers",
    email: "stever@medspace.com",
    password: bcrypt.hashSync("icedshield123", 15),
  },
];

export default users;
