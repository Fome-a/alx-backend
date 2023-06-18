#!/usr/bin/env python3
"""Babel Instance"""

from flask import Flask, render_template
from babel_flask import Babel


app = Flask(__name__)  # creates an instance of the Flask class
babel = Babel(app)  # creating an instance of Babel


class Config(object):
    """Config class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)  # setting  my Flask app's configuration to use
# the Config class as the config


@app.route('/', methods=["GET"], strict_slashes=False)
# this decorator defines the route for the URL
def index():
    """rendering index page"""
    return render_template(index.html)


@babel.localeselector
def get_locale():


    
if __name__ == '__main__':
    # this ensures that the Flask app is only run if
    # the script is executes directly
    app.run(host="0.0.0.0", port="5000")
