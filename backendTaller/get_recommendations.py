import pandas as pd
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

def initialize(songs):
    
    
    
    intervals = {
        'intervalo 1': {'min':0, 'max':2, 'valor':0},
        'intervalo 2': {'min':2, 'max':None, 'valor':1}
    }
    
    ratings_artists = songs[['user_id', 'artist_id']].value_counts().to_frame().reset_index()
    ratings_artists.columns = ['user_id', 'artist_id', 'rating']
    ratings_artists = generate_intervals(ratings_artists, intervals)
    
    n_samples = 80
    ratings_artists = ratings_artists.groupby('user_id').sample(n=n_samples, random_state=1, replace=True).drop_duplicates()
    
    return ratings_artists

def get_K_recommendations(uid, ratings, items, top_k, model):
    
    items_user = list(ratings[ratings['user_id']==uid]['artist_id'].drop_duplicates())
    unseen_items = [x for x in items['artist_id'] if x not in items_user]
    
    top_K_recommendations = []
    for item in unseen_items:
        pred = model.predict(uid=uid, iid=item)
        if not pred.details['was_impossible']:
            top_K_recommendations.append([item, pred.est])
    
    if len(top_K_recommendations)<top_k:
        for item in unseen_items:
            pred = model.predict(uid=uid, iid=item)
            top_K_recommendations.append([item, pred.est])
            
    top_K_recommendations_df = pd.DataFrame(data=top_K_recommendations, columns=['item', 'pred_rating'])
    top_K_recommendations_df = top_K_recommendations_df.sort_values(by='pred_rating', ascending = False).head(top_k)
    top_K_recommendations_df['pred_rating'] = top_K_recommendations_df['pred_rating'].round(decimals=0)
    top_K_recommendations_df = top_K_recommendations_df.merge(items, left_on='item', right_on='artist_id', how='left')
    
    return top_K_recommendations_df[['artist_name', 'pred_rating']].reset_index(drop=True)

