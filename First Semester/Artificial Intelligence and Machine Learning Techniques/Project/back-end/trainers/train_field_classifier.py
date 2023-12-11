# Import necessary libraries
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib
import pandas as pd
import os

def train_field_classifier():
    # data csv path
    data_path = os.path.join( os.path.dirname( __file__ ), '../data/field_classification_data.csv' )
    # get data from csv file
    data = pd.read_csv( data_path )
    
    # create data frame
    df = pd.DataFrame( data )
    
    # ouput data frame to csv file
    df.to_csv( 'data/field_classification_data.csv', index = False )
    
    # TF-IDF Vectorization
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_data = tfidf_vectorizer.fit_transform( df[ 'summary' ] )
    
    # Train a Naive Bayes classifier
    classifier = MultinomialNB()
    classifier.fit( tfidf_data, df[ 'category' ] )
    
    # classifier path
    classifier_path = os.path.join( os.path.dirname( __file__ ), '../models/category_classifier_model.joblib' )
    # tfidf vectorizer path
    tfidf_vectorizer_path = os.path.join( os.path.dirname( __file__ ), '../models/tfidf_vectorizer.joblib' )
    
    # Save the trained model to a file
    joblib.dump( classifier, classifier_path )
    joblib.dump( tfidf_vectorizer, tfidf_vectorizer_path )

# train_field_classifier()