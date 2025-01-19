from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

# Load the saved TF-IDF vectorizer and Logistic Regression model
vectorizer = joblib.load("tfidf_vectorizer.pkl")
model = joblib.load("logistic_regression.pkl")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Sentiment Analysis API is running! Use /predict?text=your_text_here"

@app.route("/predict", methods=["GET"])
def predict():
    try:
        # Get text from query parameters
        text = request.args.get("text")

        if not text:
            return jsonify({"error": "No text provided"}), 400

        vectorizer = joblib.load("tfidf_vectorizer.pkl")
        model = joblib.load("logistic_regression.pkl")

        # print(text)

        # Transform input text using the saved vectorizer
        text_tfidf = vectorizer.transform([text])

        # print(text_tfidf)

        # Predict sentiment
        prediction = model.predict(text_tfidf)[0]

        # print(prediction)

        return jsonify({"text": text, "sentiment": str(prediction)}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
