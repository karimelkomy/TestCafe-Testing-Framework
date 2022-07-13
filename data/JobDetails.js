import { generateRandomAlphabetic } from "../utilities/helpers";
import Chance from "chance";

const chance = new Chance();

export const JobDetails = {
  location: "Anywhere",
  position: "Automation QA Engineer",
  applications: [
    {
      email: "test@gmail.com",
      mobile: chance.phone({ mobile: true }),
      error: "The field is required."
    },
    {
      name: chance.name(),
      email: "test@gmail.com",
      error: "The field is required."
    },
    {
      name: chance.name(),
      email: "email.example.com",
      mobile: chance.phone({ mobile: true }),
      error: "The e-mail address entered is invalid."
    }
  ]
};

export const JobDetailsByCity = [
  {
    location: "Sofia"
  },
  {
    location: "Skopje"
  }
];
