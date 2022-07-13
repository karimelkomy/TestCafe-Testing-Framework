import { generateRandomAlphabetic } from "../utilities/helpers";
import Chance from "chance";

const chance = new Chance();

export const ContactsDetails = [
  {
    name: chance.name(),
    email: "email@-example.com",
    mobile: chance.phone({ mobile: true }),
    subject: generateRandomAlphabetic(),
    message: generateRandomAlphabetic()
  },
  {
    name: chance.name(),
    email: "@example.com",
    mobile: chance.phone({ mobile: true }),
    subject: generateRandomAlphabetic(),
    message: generateRandomAlphabetic()
  },
  {
    name: chance.name(),
    email: "email.example.com",
    mobile: chance.phone({ mobile: true }),
    subject: generateRandomAlphabetic(),
    message: generateRandomAlphabetic()
  },
  {
    name: chance.name(),
    email: "email@example@example.com",
    mobile: chance.phone({ mobile: true }),
    subject: generateRandomAlphabetic(),
    message: generateRandomAlphabetic()
  },
  {
    name: chance.name(),
    email: "email111.222.333.44444",
    mobile: chance.phone({ mobile: true }),
    subject: generateRandomAlphabetic(),
    message: generateRandomAlphabetic()
  }
];
