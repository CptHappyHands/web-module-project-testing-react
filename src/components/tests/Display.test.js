import React from "react";
import {
  getByRole,
  queryAllByTestId,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "./../Display";
import fetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow");

const testShow = {
  name: "",
  summary: "STRANGER THINGS",
  image: null,
  seasons: [
    {
      id: 1,
      name: "1",
      episodes: [],
    },
    {
      id: 2,
      name: "2",
      episodes: [],
    },
  ],
};

test("display component is being rendered without passing in props", () => {
  render(<Display />);
});

test("Test that when the fetch button is pressed the show component will display", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  render(<Display />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  const testFetch = await screen.findByTestId("show-container");
  expect(testFetch).toBeInTheDocument();
});

test("test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  console.log("HERE IS MY CONSOLE", fetchShow);
  render(<Display />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  const testSelect = await screen.findByRole("combobox");
  expect(testSelect).toHaveLength(3);

  //   const fakeFunction = jest.fn();
  //   console.log("Here is my console", fakeFunction);
  //   render(<Display show={testShow} handleSelect={fakeFunction} />);
  //   const testSelect = screen.getByRole("button");
  //   userEvent.click(testSelect);
  //   expect(fakeFunction.mock.results.length).toBe(2);
});

test("Test that when the fetch button is pressed, this function is called", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  const fakeFunction = jest.fn();
  render(<Display displayFunc={fakeFunction} />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  const shows = await screen.findByTestId("show-container");
  expect(shows).toBeInTheDocument();
  expect(fakeFunction).toBeCalledTimes(1);
});
///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
