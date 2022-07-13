import {
  generateRandomEmail,
  generateRandomAlphabetic
} from "../utilities/helpers";
import Chance from "chance";

const chance = new Chance();

export const ContactDetails = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: generateRandomEmail(),
  phone: chance.phone({ formatted: false }),
  company: generateRandomAlphabetic(),
  message: generateRandomAlphabetic()
};
