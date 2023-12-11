import os

import joblib


model_file_path = os.path.join( os.path.dirname( __file__ ), '../models/gender_classifier_model.joblib' )

def predict_gender( model, name ) :
    # Predict the gender for the given name
    predicted_gender = model.predict( [ name ] )
    
    # Return the predicted gender
    return predicted_gender[ 0 ]

def import_model() :
    # Load the model using joblib
    model = joblib.load( model_file_path )
    print( f"Model loaded from {model_file_path}" )
    
    return model

def guess_gender( name ) :
    imported_model = import_model()
    predicted_gender_imported = predict_gender( imported_model, name )
    if predicted_gender_imported == 0 :
        predicted_gender_imported = "Male"
    else :
        predicted_gender_imported = "Female"
    return predicted_gender_imported

# example usage
# name = input("Enter a name: ")
# print("gender:", guess_gender(name))
