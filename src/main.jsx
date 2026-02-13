import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Counter from "./component/Counter.jsx";
import Form from "./component/Form.jsx";

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <div className="flex flex-col gap-4 justify-center items-center">
            <Form />
            <Counter />
        </div>
    </React.StrictMode>
);
