import { Icon } from "semantic-ui-react";
import React from "react";

export const defaultUser = {
  firstName: "",
  lastName: "",
  phoneNo: "",
  email: "",
  password: "",
};
const regex = {
  email: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  // password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%])[A-Za-z\d@#$%]{8,}$/,
  password:
    /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*[0-9]))(?=.*[@#$%])[A-Za-z\d@#$%]{8,}$/,
  amount: /^[+-]?\d*(?:[.,]\d*)?$/,
  name: /^\S*$/,
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
export const emailRegex = (email) => regex.email.test(email);
export const passwordRegex = (password) => regex.password.test(password);
export const nameRegex = (name) => regex.name.test(name);
export const amountRegex = (amount) => regex.amount.test(amount);
export const passwordIndicator = (input) => {
  const pass = { icon: "check circle", verify: true };
  const fail = { icon: "info circle", verify: false };
  const results = {
    pLength: { ...fail },
    pNumber: { ...fail },
    pSpecial: { ...fail },
    pUpper: { ...fail },
    pLower: { ...fail },
  };

  // Check if password strength meets the below criteria
  input?.password?.length >= 8 ? (results.pLength = { ...pass }) : { ...fail };

  /^(?=.*[A-Z])/.test(input.password)
    ? (results.pUpper = { ...pass })
    : { ...fail };

  /^(?=.*[a-z])/.test(input.password)
    ? (results.pLower = { ...pass })
    : { ...fail };

  /\d/.test(input.password) ? (results.pNumber = { ...pass }) : { ...fail };

  // /^(?:.*[@#$%])$/.test(input.password)
  /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*[0-9]))(?=.*[@#$%])[A-Za-z\d@#$%]{8,}$/.test(
    input.password
  )
    ? (results.pSpecial = { ...pass })
    : { ...fail };

  return results;
};
export const errorClass = (target, parent, field) => {
  return `${target} ${parent[field]?.error ? "error" : null} `;
};
export const errorMsg = (parent, field) => {
  return (
    parent[field]?.error && (
      <>
        <Icon name="warning circle" />
        {parent[field].msg}
      </>
    )
  );
};
export const disableInput = (mode) => {
  return mode ? "disabled" : null;
};
export const userAlias = (name, separator) => {
  if (name && separator) {
    const firstName = name?.split(separator)[0] ?? "";
    const lastName = name?.split(separator)[1] ?? "";
    const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

    return {
      firstName,
      lastName,
      initials,
    };
  }
};

export const guidGenerator = () => {
  let S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export const deBloatObject = (obj) => {
  let debloatedList = {};

  if (obj && typeof obj === "object") {
    debloatedList = Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != "" && v != null)
    );
  }

  return debloatedList;
};
