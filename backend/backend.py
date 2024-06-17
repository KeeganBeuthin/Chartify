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

    class LineChart(Scene):
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
                x_values=x_values,
                y_values=y_values,
                line_color=BLUE,
                vertex_dot_style=dict(fill_color=RED),
                stroke_width=4,
            )
            x_label = axes.get_x_axis_label(x_axis_name)
            y_label = axes.get_y_axis_label(y_axis_name)
            self.add(axes, graph, x_label, y_label)

    scene = LineChart()

    output_path = scene.render()

    return output_path

if __name__ == '__main__':
    app.run(debug=True)
