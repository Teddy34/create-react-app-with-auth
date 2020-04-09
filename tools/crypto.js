const crypto = require("crypto");
const fs = require("fs");

const PATH = "./assets/users.json";
const users = JSON.parse(fs.readFileSync(PATH, "utf8"));

const ITERATIONS = 10000;

const createUser = (login, password) => {
  const salt = crypto.randomBytes(128).toString("base64");
  const hashBuffer = crypto.pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    64,
    "sha512"
  );

  return {
    login,
    salt: salt,
    hash: hashBuffer.toString("hex"),
    iterations: ITERATIONS,
  };
};

const getProvidedPasswordHash = (providedLogin, providedPassword) => {
  const user = users.find(({ login }) => providedLogin === login);
  if (!user) {
    throw new Error("User not found");
  }
  const providedHash =  crypto.pbkdf2Sync(
    providedPassword,
    user.salt,
    ITERATIONS,
    64,
    "sha512"
  ).toString("hex");
  return {
    hash: user.hash,
    providedHash
  }
};

module.exports = {
  createUser,
  getProvidedPasswordHash,
};
