"use client";
import { useState } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

const handleSubmit = async (e) => {
  e.preventDefault();
  const chartData = {
    chartType,
    xAxisName,
    yAxisName,
    dataValues: dataValues.split(",").map(Number),
  };

  try {
    const response = await fetch("/api/create-chart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chartData),
    });

    const result = await response.json();
    console.log(result);
    handleClose();
  } catch (error) {
    console.error("Error creating chart:", error);
  }
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [chartType, setChartType] = useState("");
  const [xAxisName, setXAxisName] = useState("");
  const [yAxisName, setYAxisName] = useState("");
  const [xValues, setXValues] = useState("");
  const [yValues, setYValues] = useState("");

  const handleShow = (type) => {
    setChartType(type);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const chartData = {
      chartType,
      xAxisName,
      yAxisName,
      xValues: xValues.split(",").map(Number),
      yValues: yValues.split(",").map(Number),
    };

    try {
      const response = await fetch("http://localhost:5000/create-chart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chartData),
      });

      const result = await response.json();
      console.log(result);
      handleClose();
    } catch (error) {
      console.error("Error creating chart:", error);
    }
  };

  return (
    <div className="container pt-5">
      <Head>
        <title>Create Chart</title>
        <meta
          name="description"
          content="Generate charts with Manim and Next.js"
        />
      </Head>
      <h1 className="mb-4">Chart Generator</h1>
      <div>
        <button
          className="btn btn-primary me-2"
          onClick={() => handleShow("line")}
        >
          Create Line Chart
        </button>
        <button className="btn btn-secondary" onClick={() => handleShow("bar")}>
          Create Bar Chart
        </button>
      </div>

      <div
        className={`modal ${showModal ? "d-block" : "d-none"}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{`Create ${chartType} Chart`}</h5>
              <button
                type="button"
                className="close"
                onClick={handleClose}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="xAxisName" className="form-label">
                    X Axis Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="xAxisName"
                    value={xAxisName}
                    onChange={(e) => setXAxisName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="yAxisName" className="form-label">
                    Y Axis Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="yAxisName"
                    value={yAxisName}
                    onChange={(e) => setYAxisName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="xValues" className="form-label">
                    X Values (comma-separated)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="xValues"
                    value={xValues}
                    onChange={(e) => setXValues(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="yValues" className="form-label">
                    Y Values (comma-separated)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="yValues"
                    value={yValues}
                    onChange={(e) => setYValues(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Generate Chart
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
