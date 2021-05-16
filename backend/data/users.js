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
];

export default users;
