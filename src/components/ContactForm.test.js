import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.getByText(/Contact Form/i);
  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/First Name*/i);
  const lastName = screen.getByLabelText(/last name*/i);

  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();

  userEvent.type(firstName, "chas");
  expect(firstName).toHaveValue("chas");

  const errMessage = screen.getByText(/error: firstname/i);
  expect(errMessage).toBeInTheDocument();
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);

  const submitButton = screen.getByText(/submit/i);
  expect(submitButton).toBeInTheDocument();
  userEvent.click(submitButton);

  const errMessageFirst = screen.getByText(/error: firstname/i);
  const errMessageLast = screen.getByText(/error: lastname/i);
  const errMessageEmail = screen.getByText(/error: email/i);

  expect(errMessageFirst).toBeInTheDocument();
  expect(errMessageLast).toBeInTheDocument();
  expect(errMessageEmail).toBeInTheDocument();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/First Name*/i);
  const lastName = screen.getByLabelText(/last name*/i);
  const email = screen.getByLabelText(/email*/i);
  const submitButton = screen.getByText(/submit/i);

  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  userEvent.type(firstName, "charlie");
  userEvent.type(lastName, "may");

  expect(firstName).toHaveValue("charlie");
  expect(lastName).toHaveValue("may");
  expect(email).toHaveValue("");

  userEvent.click(submitButton);
  const errMessageEmail = screen.getByText(/error: email/i);
  expect(errMessageEmail).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const email = screen.getByLabelText(/email*/i);
  expect(email).toBeInTheDocument();

  userEvent.type(email, "charliemay");
  const errMessageEmail = screen.getByText(/error: email/i);
  expect(errMessageEmail).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const lastName = screen.getByLabelText(/last name*/i);
  const submitButton = screen.getByText(/submit/i);

  expect(lastName).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  userEvent.click(submitButton);
  const errMessageLast = screen.getByText(/error: lastname/i);
  expect(errMessageLast).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/First Name*/i);
  const lastName = screen.getByLabelText(/last name*/i);
  const email = screen.getByLabelText(/email*/i);
  const submitButton = screen.getByText(/submit/i);

  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  const firstNameInput = "charlie";
  const lastNameInput = "may";
  const emailInput = "charlie@gmail.com";

  userEvent.type(firstName, firstNameInput);
  userEvent.type(lastName, lastNameInput);
  userEvent.type(email, emailInput);
  userEvent.click(submitButton);

  const dsiplayFirstName = screen.getByText(firstNameInput);
  const dsiplayLastName = screen.getByText(lastNameInput);
  const dsiplayEmail = screen.getByText(emailInput);

  expect(dsiplayFirstName).toBeInTheDocument();
  expect(dsiplayLastName).toBeInTheDocument();
  expect(dsiplayEmail).toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/First Name*/i);
  const lastName = screen.getByLabelText(/last name*/i);
  const email = screen.getByLabelText(/email*/i);
  const message = screen.getByLabelText(/message/i);
  const submitButton = screen.getByText(/submit/i);

  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(message).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  const firstNameInput = "charlie";
  const lastNameInput = "may";
  const emailInput = "charlie@gmail.com";
  const messageInput = "This is a message";

  userEvent.type(firstName, firstNameInput);
  userEvent.type(lastName, lastNameInput);
  userEvent.type(email, emailInput);
  userEvent.type(message, messageInput);
  userEvent.click(submitButton);

  const dsiplayFirstName = screen.getByText(/First Name:/i);
  const dsiplayLastName = screen.getByText(/last name:/i);
  const dsiplayEmail = screen.getByText(/email:/i);
  const displayMessage = screen.getByText(/message:/i);

  expect(dsiplayFirstName).toBeInTheDocument();
  expect(dsiplayLastName).toBeInTheDocument();
  expect(dsiplayEmail).toBeInTheDocument();
  expect(displayMessage).toBeInTheDocument();
});
