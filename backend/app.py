from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import csv
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# File path
DATASET_FILE = 'dataset/dataset.csv'

# Ensure the dataset file exists and has the correct headers
def initialize_dataset_file():
    if not os.path.exists(DATASET_FILE):
        os.makedirs(os.path.dirname(DATASET_FILE), exist_ok=True)  # Create the directory if it doesn't exist
        with open(DATASET_FILE, mode='w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=["original text", "corrected text"])
            writer.writeheader()

initialize_dataset_file()

@app.route('/api/dataset-count', methods=['GET'])
def get_dataset_count():
    if not os.path.exists(DATASET_FILE):
        return jsonify({"count": 0})

    with open(DATASET_FILE, mode='r') as file:
        reader = csv.DictReader(file)
        count = sum(1 for row in reader)
    return jsonify({"count": count})

@app.route('/api/download-dataset', methods=['GET'])
def download_dataset():
    dataset_dir = os.path.dirname(DATASET_FILE)  # Path to the dataset directory
    filename = 'dataset.csv'  # Ensure this matches the actual file name
    return send_from_directory(directory=dataset_dir, path=filename, as_attachment=True)

@app.route('/api/add-data', methods=['POST'])
def add_data():
    data = request.json
    original_text = data.get('original_text')
    corrected_text = data.get('corrected_text')

    # Write to CSV
    with open(DATASET_FILE, mode='a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=["original text", "corrected text"])
        if file.tell() == 0:  # Check if file is empty
            writer.writeheader()
        writer.writerow({"original text": original_text, "corrected text": corrected_text})

    return jsonify({"message": "Data added successfully"}), 201

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=10000, debug=False)
