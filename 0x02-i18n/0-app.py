#!/usr/bin/env python3
"""Basic Flask app"""


from flask import Flask, render_template
from flask_babel import Babel


app = Flask(__name__)  # creates an instance of the Flask class
babel = Babel(app)


@app.route('/', methods=["GET"], strict_slashes=False)
# this decorator defines the route for the URL
def index():
    """rendering index page"""
    return render_template(index.html)


if __name__ == '__main__':
    # this ensures that the Flask app is only run
    #  if the script is executes directly
    app.run(host="0.0.0.0", port="5000")
