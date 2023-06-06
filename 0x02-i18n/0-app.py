from flask import Flask, render_template

app = Flask(__name__) # creates an instance of the Flask class

@app.route('/') #this decorator defines the routr for the URL 
def index():
    return render_template(index.html)

if __name__ == '__main__':#this ensures that the Flask app is only run if the script is executes directly
    app.run()