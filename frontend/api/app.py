from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.json.get('data')
    processed_data = process_data(data)
    return jsonify({'data': processed_data})

def process_data(data):
    # Process the data as needed
    return data

if __name__ == '__main__':
    app.run()
