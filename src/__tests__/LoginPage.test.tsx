import React from "react";
import { render, screen } from "@testing-library/react"
import configureStore from "../store";
import LoginPage from "../components/LoginPage"
import { Provider } from "react-redux";
import '@testing-library/jest-dom'

test("Testing the login page", () => {
    const store = configureStore()
    render(<Provider store={store}><LoginPage /></Provider>);
    const divElement = screen.getByText(/Welcome to Fetch! We love dogs, and hope you do too! We are here to help you bring a lucky dog home. Please enter your name and email to get started./)
    expect(divElement).toBeInTheDocument()
})
