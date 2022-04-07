import pandas as pd
from surprise import Dataset
from surprise import Reader
import pickle

def load_model(model_name):
    with open(model_name, 'rb') as file:
        model = pickle.load(file)
    return model

def generate_intervals(dataframe, intervals):
    """
    Función para discretizar los valores de frecuencia de interacción del usuario con las diferentes canciones.
    """
    for interval in intervals:
        min_i = intervals[interval]['min']
        max_i = intervals[interval]['max']
        valor_i = intervals[interval]['valor']
        if max_i != None:
            dataframe.loc[(dataframe['rating']>=min_i) & (dataframe['rating']<max_i), 'rating'] = valor_i
        else:
            dataframe.loc[dataframe['rating']>=min_i, 'rating'] = valor_i
    return dataframe

def initialize(model, intervals, songs):
    
    
    
    ratings_artists = songs[['user_id', 'artist_id']].value_counts().to_frame().reset_index()
    ratings_artists.columns = ['user_id', 'artist_id', 'rating']
    ratings_artists = generate_intervals(ratings_artists, intervals)
    
    n_samples = 80
    ratings_artists = ratings_artists.groupby('user_id').sample(n=n_samples, random_state=1, replace=True).drop_duplicates()
    
    min_rating, max_rating = ratings_artists['rating'].min(), ratings_artists['rating'].max()
    reader = Reader(rating_scale=(min_rating, max_rating))
    ratings_artists_dataset = Dataset.load_from_df(ratings_artists[['user_id', 'artist_id', 'rating']], reader)
    
    rating_data = ratings_artists_dataset.build_full_trainset()
    test = rating_data.build_anti_testset()
    
    predictions = model.test(test)
    
    return predictions, ratings_artists

def get_K_recommendations(uid, ratings, items, top_k, predictions):
    
    items_user = list(ratings[ratings['user_id']==uid]['artist_id'].drop_duplicates())
    unseen_items = [x for x in items['artist_id'] if x not in items_user]
    
    user_predictions = list(filter(lambda x: x[0]==uid, predictions))
    top_K_recommendations = [[x.iid, x.est] for x in user_predictions if x.details['was_impossible']==False and \
                              x.iid in unseen_items]
    
    if len(top_K_recommendations)<top_k:
        top_K_recommendations_tmp = [[x.iid, x.est] for x in user_predictions if x.details['was_impossible']==True and \
                                      x.iid in unseen_items]
        n_items = top_k - len(top_K_recommendations)
        top_K_recommendations = top_K_recommendations + top_K_recommendations_tmp[:n_items]
            
    top_K_recommendations_df = pd.DataFrame(data=top_K_recommendations, columns=['item', 'pred_rating'])
    top_K_recommendations_df = top_K_recommendations_df.sort_values(by='pred_rating', ascending = False).head(top_k)
    top_K_recommendations_df['pred_rating'] = top_K_recommendations_df['pred_rating']
    top_K_recommendations_df = top_K_recommendations_df.merge(items, left_on='item', right_on='artist_id', how='left')
    
    return top_K_recommendations_df[['artist_name', 'pred_rating', 'artist_id']].reset_index(drop=True)

