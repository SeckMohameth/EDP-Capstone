from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

#load the model from disk
model_file_name = "model.pkl"  # replace with the actual model file name from the comments
with open(model_file_name, 'rb') as file: # add name of pickle file here before the .pkl
    model = pickle.load(file)

#testing route
@app.route('/', methods=['GET'])
def greet():
    return jsonify(message="Hello, world!")

@app.route('/analyze-sentiment', methods=['POST'])
def predict():
    #get the request data
    data = request.get_json(force=True)
    print(data)
    if isinstance(data, dict):
        data = [data]

    # make prediction
    prediction = model.predict(pd.DataFrame(data))

    # Return the prediction result
    return jsonify(prediction=prediction.tolist())



if __name__ == '__main__':
    app.run(port=5000)