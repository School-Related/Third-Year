from typing import Optional
from fastapi.responses import HTMLResponse
from fastapi import APIRouter
from pydantic import BaseModel
import os
# import models, trainers and scrappers.
from trainers.train_field_classifier import train_field_classifier
from trainers.run_field_classifier import get_profession_from_blob
from trainers.run_guess_gender import guess_gender

from web_scrappers.dork_sites import get_google_links
from web_scrappers.get_google_images import get_google_images
from web_scrappers.github_scrapper import get_github_info, get_github_people_images
from web_scrappers.make_blob_by_scrapping import make_blob_by_scrapping
from web_scrappers.breachdirApi import get_breach_info
from web_scrappers.textscrapping import scrape_text_from_search_query


from dotenv import load_dotenv
load_dotenv()


router = APIRouter(
        prefix = "/train",
        tags = [ "Train" ]
)

class TrainModelInputModel( BaseModel ) :
    first_name: str
    last_name: str
    city: str
    email: Optional[ str ] | None = None
    github: Optional[ str ] | None = None
    workplace: Optional[ str ] | None = None

@router.post( "/train_models" )
def start_train_dork_sites( Data: TrainModelInputModel ) :
    # get names from request
    first_name = Data.first_name
    last_name = Data.last_name
    city = Data.city
    email = Data.email
    github = Data.github
    workplace = Data.workplace
    
    # print everything
    print( f"First name: {first_name}" )
    print( f"Last name: {last_name}" )
    print( f"City: {city}" )
    print( f"Email: {email}" )
    print( f"Github: {github}" )
    print( f"Workplace: {workplace}" )
    
    try :
        
        print( "Training classifier" )
        train_field_classifier()
        
        # get google links
        # google_links = get_google_links( first_name, last_name, city, workplace, email, github )
        # print( f"Google links: {google_links}" )
        print("getting images")
        # get images links
        images_links = get_google_images( first_name, last_name, city, workplace, email, github )
        print( f"Images links: {images_links}" )
        
        # get github stuff
        [ followers, following, join_year, active_years ] = get_github_info( github )
        
        associated_people = following + followers
        
        # get github people images
        # images_links += get_github_people_images( associated_people )
        
        # make blob from scrapping all links we got from google
        # blob, urls = make_blob_by_scrapping( first_name, last_name, city )

        api_key = os.getenv("google_api_key")
        cx = os.getenv("google_cx")

        blob = scrape_text_from_search_query(api_key, cx, first_name, last_name, city, workplace)
        for i in blob:
            blob += i + " "
        blob = "Parth Zarekar Parth Zarekar. Student at MIT World Peace University. Pune, Maharashtra, India ... Vishwanath Karad MIT WORLD PEACE UNIVERSITY|PUNE Graphic · Dr.Vishwanath Karad ... 200+ Zarekar profiles Pune. RMD Sinhgad School of Engineering · Parth Zarekar. Student at MIT World Peace University. Pune. Dr.Vishwanath Karad MIT WORLD PEACE UNIVERSITY ... Domestic Help, His Wife Sedate & Rob Employers | Pune ... 26 Oct 2023 — “The elderly man had employed the couple, who are natives of Nepal, about eight days ago. The couple was staying in the bungalow,” Zarekar said. PhD student booked for molesting advocate woman 28 May 2023 — A 26-year-old student registered for Doctor of Philosophy (PhD) has been booked for outraging the modesty of an advocate woman in a road rage ... Elated Parents Bring Baby Girl Home In Helicopter In Pune 5 Apr 2022 — ... Zarekar (30), an advocate by profession. e didnt have a girlchild in our entire family. So, to make our daughter's homecoming special, we ... Suresh S/O Bajarang Zarekar & Ors vs State Of ... Pushpalata w/o Suresh Zarekar, Age: 56 years, Occu: Housewife R/o: Anmol Bangla No.-5, Behind Chattrapati Bajaj Showroom, Nagar-Pune Road, Ahmednagar. 3. Milind ..."
        print( f"Blob: {blob}" )
        # get profession from blob
        profession = get_profession_from_blob( blob )
        
        # get gender from model
        gender = guess_gender( first_name )
        
        # get breaches
        breaches = get_breach_info( email )
        
        # print everything
        print( f"Images links: {images_links}" )
        # print( f"Followers: {followers}" )
        # print( f"Following: {following}" )
        # print( f"Join year: {join_year}" )
        # print( f"Active years: {active_years}" )
        # print( f"Associated people: {associated_people}" )
        print( f"Profession: {profession}" )
        print(f"gender: {gender}")
        # print( f"Google links: {google_links}" )
        
        
        # send a message with 200 status code, and a dictionary
        return {
            # "google_links" : google_links,
            "images_links" : images_links,
            # "people" : associated_people,
            # "active_years" : active_years,
            # "join_year" : join_year,
            "gender" : gender,
            "profession" : profession,
            # "breaches" : breaches
        }
    
    except Exception as e :
        print( f"An error occurred: {e}" )
        return HTMLResponse( content = f"An error occurred: {e}", status_code = 500 )
