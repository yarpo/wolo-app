import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./Signup";

describe("Signup Component", () => {
  test("renders signup form", () => {
    render(<Signup />);
    
    expect(screen.getByTestId("signup-form")).toBeInTheDocument();
  });

  test("submits form on button click", () => {
    render(<Signup />);
    
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });
    
    fireEvent.click(screen.getByTestId("submit-button"));
    
    expect(screen.getByTestId("form-submitted")).toBeInTheDocument();
  });
});
