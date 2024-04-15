# %%
import pandas as pd
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt

# %%


# %%
data = pd.read_csv('uber.csv')

# %%
data.head()

# %%
# drop the first column
data.drop(data.columns[0], axis=1, inplace=True)

# %%
data

# %% [markdown]
# # EDA

# %%
# is there a relationship between fare amoutn and passenger count?
sns.scatterplot(x='fare_amount', y='passenger_count', data=data)

# %%
# find value of correlation r using pandas
r = data['fare_amount'].corr(data['passenger_count'])
r

# %%
# lets convert pickup_datetime to 
data['pickup_datetime'] = pd.to_datetime(data['pickup_datetime'])
data.dtypes

# %%
# let us split datetime to hours, minutes, seconds, day, month, year into new columns
data['pickup_hour'] = data['pickup_datetime'].dt.hour
data['pickup_minute'] = data['pickup_datetime'].dt.minute
data['pickup_second'] = data['pickup_datetime'].dt.second
data['pickup_day'] = data['pickup_datetime'].dt.day
data['pickup_month'] = data['pickup_datetime'].dt.month
data['pickup_year'] = data['pickup_datetime'].dt.year


# %%
data.drop('pickup_datetime', axis=1, inplace=True)

# %%
data.head()

# %%
# drop key
new_data = data.drop('key', axis=1)

# %%
new_data.corr()

# %%
# visualize the correlation matrix
fig, ax = plt.subplots(figsize=(10, 10))
# round the values to 2 decimal places
sns.heatmap(new_data.corr(), annot=True, ax=ax, cmap='coolwarm', fmt='.2f')

# %%
# calculate distance using euclidean distance formula as a new column
# sqrt((x2 - x1)^2 + (y2 - y1)^2)
# we will use the latitude and longitude columns to calculate distance
for i in range(len(new_data)):
    x1 = new_data['pickup_latitude'][i]
    x2 = new_data['dropoff_latitude'][i]
    y1 = new_data['pickup_longitude'][i]
    y2 = new_data['dropoff_longitude'][i]
    distance = np.sqrt((x2 - x1)**2 + (y2 - y1)**2)
    new_data['distance'] = distance
new_data.head()

# %%
# plot distance and fare amount, x is distance and y is fare amount
sns.scatterplot(x='distance', y='fare_amount', data=new_data)

# %%
# plot a line chart
sns.lineplot(x='distance', y='fare_amount', data=new_data)

# %%
new_data['distance'].corr(new_data['fare_amount'])

# %%
new_data['distance'].unique

# %%



