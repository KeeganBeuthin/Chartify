export default function handler(req, res) {
  if (req.method === "POST") {
    const { chartType, xAxisName, yAxisName, xValues, yValues } = req.body;
    console.log(
      `Creating ${chartType} chart with X: ${xAxisName}, Y: ${yAxisName}, X Values: ${xValues}, Y Values: ${yValues}`
    );
    res.status(200).json({ message: "Chart created successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
