import joblib
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import os

csv_file_path = os.path.join( os.path.dirname( __file__ ), '../data/Gender_Data.csv' )
model_file_path = os.path.join( os.path.dirname(__file__), '../models/gender_classifier_model.joblib')
def train_gender_classifier(csv_file):
    # Load data from CSV file
    df = pd.read_csv(csv_file)
    
    # Create a pipeline with CountVectorizer and Multinomial Naive Bayes
    model = make_pipeline(CountVectorizer(), MultinomialNB())
    
    # Train the model
    model.fit(df['name'], df['gender'])
    
    # Return the trained model
    return model

def predict_gender(model, name):
    # Predict the gender for the given name
    predicted_gender = model.predict([name])
    
    # Return the predicted gender
    return predicted_gender[0]

def export_model(model, output_path):
    # Export the model using joblib
    joblib.dump(model, output_path)
    print(f"Model exported to {output_path}")

# Example usage:
trained_model = train_gender_classifier(csv_file_path)

# Export the trained model
export_model(trained_model, model_file_path)
