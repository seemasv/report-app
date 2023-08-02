import React from 'react'
import ReactDOM from 'react-dom'
import {cleanup} from '@testing-library/react'

import StateList from '../StateList'

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<StateList />, div);
});

