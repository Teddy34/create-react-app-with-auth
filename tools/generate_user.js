const fs = require("fs");
const PATH = "./assets/users.json";
const users = JSON.parse(fs.readFileSync(PATH, "utf8"));

const crypto = require("./crypto");

if (process.argv.length !== 4) {
  console.error("Please use this script with the login and password");
  return 1;
}

const saveUser = (user) => {
  fs.writeFileSync(PATH, JSON.stringify([...users, user], null, 2));
};

saveUser(crypto.createUser(process.argv[2], process.argv[3]));
