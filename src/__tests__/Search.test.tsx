import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../components/Search";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store"
import configureStore from "redux-mock-store";
import '@testing-library/jest-dom';


const mockStore = configureStore([]);
const store = mockStore({})

describe("Search Component", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("renders the search page", () => {
        const { getByText } = render(
            <Provider store={store}>
                <Search />
            </Provider>
        );


        expect(getByText("Dog Breeds")).toBeInTheDocument();
        expect(getByText("Minimum Age")).toBeInTheDocument();
        expect(getByText("Maximum Age")).toBeInTheDocument();
        expect(getByText("Sort By")).toBeInTheDocument();
        expect(getByText("Results Per Page")).toBeInTheDocument();

    });



});
