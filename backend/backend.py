from flask import Flask, request, jsonify
from manim import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/create-chart', methods=['POST'])
def create_chart():
    data = request.json
    chart_type = data['chartType']
    x_axis_name = data['xAxisName']
    y_axis_name = data['yAxisName']
    x_values = data['xValues']
    y_values = data['yValues']

    chart_path = generate_chart(chart_type, x_axis_name, y_axis_name, x_values, y_values)
    return jsonify({'message': 'Chart created successfully', 'chartPath': chart_path})

def generate_chart(chart_type, x_axis_name, y_axis_name, x_values, y_values):
    config.media_type = "gif"

    if chart_type == "line":
        scene = LineChart(x_axis_name, y_axis_name, x_values, y_values)
    elif chart_type == "bar":
        scene = BarChartScene(x_axis_name, y_axis_name, x_values, y_values)
    else:
        return None  # or handle invalid chart types as needed

    output_path = scene.render()
    return output_path

class LineChart(Scene):
    def __init__(self, x_axis_name, y_axis_name, x_values, y_values):
        super().__init__()
        self.x_axis_name = x_axis_name
        self.y_axis_name = y_axis_name
        self.x_values = x_values
        self.y_values = y_values

    def construct(self):
        axes = Axes(
            x_range=[0, 10, 1],
            y_range=[0, 10, 1],
            x_length=7,
            y_length=5,
            axis_config={"color": BLUE},
            x_axis_config={"numbers_to_include": np.arange(0, 11, 2)},
            y_axis_config={"numbers_to_include": np.arange(0, 11, 2)},
            tips=False,
        )

        graph = axes.plot_line_graph(
            x_values=self.x_values,
            y_values=self.y_values,
            line_color=BLUE,
            vertex_dot_style=dict(fill_color=RED),
            stroke_width=4,
        )

        x_label = axes.get_x_axis_label(self.x_axis_name)
        y_label = axes.get_y_axis_label(self.y_axis_name)
        self.add(axes, graph, x_label, y_label)


class BarChartScene(Scene):
    def __init__(self, x_axis_name, y_axis_name, x_values, y_values):
        super().__init__()
        self.x_axis_name = x_axis_name
        self.y_axis_name = y_axis_name
        self.x_values = x_values
        self.y_values = y_values

    def construct(self):
        bar_chart = BarChart(
            values=self.y_values,
            bar_names=self.x_values,
            y_range=[0, max(self.y_values) + 1, 1],
            y_length=10,
            x_length=7,
            x_axis_config={"font_size": 24},
            y_axis_config={"font_size": 24},
        )

        x_label = bar_chart.get_x_axis_label(
            self.x_axis_name, edge=DOWN, direction=DOWN, buff=0.4
        )
        y_label = bar_chart.get_y_axis_label(
            self.y_axis_name, edge=LEFT, direction=LEFT, buff=0.4
        )

        bar_labels = bar_chart.get_bar_labels(font_size=24)

        self.add(bar_chart, x_label, y_label, bar_labels)

if __name__ == '__main__':
    app.run(debug=True)