import keras
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer
from gensim.models import Word2Vec
import pickle

import re
import nltk
from nltk.corpus import stopwords
from  nltk.stem import SnowballStemmer
nltk.download('stopwords')

stop_words = stopwords.words("english")


class therapy_diagnoser:
    
    def __init__(self):
        
        #models
        self.word2vec_model = Word2Vec.load('./sentimentAnalysis/models/word2vec.model')
        self.s_analysis_model = load_model('./sentimentAnalysis/models/lstm_model.h5')

        with open('./sentimentAnalysis/models/word_tokenizer.pickle', 'rb') as handle:
            self.tokenizer = pickle.load(handle)
            
        self.stemmer = SnowballStemmer("english")

        #tokenizer / s_analysis args
        self.SEQUENCE_LENGTH = 300
        self.SENTIMENT_THRESHOLDS = (0.4, 0.7)
        self.POSITIVE = "POSITIVE"
        self.NEGATIVE = "NEGATIVE"
        self.NEUTRAL = "NEUTRAL"
        
        self.TEXT_CLEANING_RE = "@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+"
        
        #diagnoser args
        self.CATEGORIES = ["Behaviorial", "Body Image", "Grief", "Relationship", "Depression", "Physical"]
        self.behaviorial_keywords = ["sleep", "ocd", "anxiety", "control", "mood", "behavior", "uncontrollable", "anger", "compulsory"]
        self.body_image_keywords = ["fat", "skinny", "obese", "ugly", "acne", "unpopular", "body", "eating", "drinking", "weight"]
        self.grief_keywords = ["grief", "loss", "sadness", "death", "regret", "shock", "denial", "disbelief", "overwhelmed"]
        self.relationship_keywords = ["cheat", "feelings", "love", "boyfriend", "girlfriend", "wife", "husband", "relations", "friend", "trauma", "abuse", "trust"]
        self.depression_keywords = ["depression", "suicide", "kill", "death", "misery", "motivation", "stress", "lonely", "illness", "drugs"]
        self.physical_keywords = ["burn", "pain", "hurt", "physical", "surgery", "broken", "tear", "sprain", "blood", "bone", "ache", "walk", "rest"]
     
        self.therapy_category_keywords = [self.behaviorial_keywords, self.body_image_keywords, self.grief_keywords, 
                                          self.relationship_keywords, self.depression_keywords, self.physical_keywords]


    
    def decode_sentiment(self, score, include_neutral=True):
        if include_neutral:        
            label = self.NEUTRAL
            if score <= self.SENTIMENT_THRESHOLDS[0]:
                label = self.NEGATIVE
            elif score >= self.SENTIMENT_THRESHOLDS[1]:
                label = self.POSITIVE

            return label
        else:
            return self.NEGATIVE if score < 0.5 else self.POSITIVE
    
    
    def predict_sentiment(self, text, include_neutral=True):
        # Tokenize text
        x_test = pad_sequences(self.tokenizer.texts_to_sequences([text]), maxlen=self.SEQUENCE_LENGTH)
        # Predict
        score = self.s_analysis_model.predict([x_test])[0]
        # Decode sentiment
        label = self.decode_sentiment(score, include_neutral=include_neutral)

        return {"label": label, "score": float(score)}  


    def preprocess(self,text, stem=False):
        # Remove link,user and special characters
        text = re.sub(self.TEXT_CLEANING_RE, ' ', str(text).lower()).strip()
        tokens = []
        for token in text.split():
            if token not in stop_words:
                if stem:
                    tokens.append(self.stemmer.stem(token))
                else:
                    tokens.append(token)
        return tokens


        #calculates similiarity score between each word in the input and each keyword for the categories
        #each categories top 2 words similarity scores are added up. Whichever categories sum is highest is the category for the sentence.

    def categorize_problem(self, input):

        behaviorial_similiarity = []
        body_image_similiarity = []
        grief_similiarity = []
        relationship_similiarity = []
        depression_similarity = []
        physical_similiarity = []


        input_tokens = self.preprocess(input)

        for keyword_list in self.therapy_category_keywords:
            category_index = self.therapy_category_keywords.index(keyword_list)

            for word in input_tokens: 

                try:
                   self. word2vec_model.wv.similarity(word, "hi")
                except KeyError as e:
                    return ("Spell Check Your Words Please")

                word_similarity_score = [(word, self.word2vec_model.wv.similarity(word, keyword), keyword) for keyword in keyword_list]

                if category_index == 0:
                    behaviorial_similiarity.append(word_similarity_score)
                    behaviorial_similiarity = [sorted(x, key = lambda x: x[1], reverse= True) for x in behaviorial_similiarity]
                elif category_index == 1:
                    body_image_similiarity.append(word_similarity_score)
                    body_image_similiarity = [sorted(x, key = lambda x: x[1], reverse= True) for x in body_image_similiarity]
                elif category_index == 2:
                    grief_similiarity.append(word_similarity_score)
                    grief_similiarity = [sorted(x, key = lambda x: x[1], reverse= True) for x in grief_similiarity]
                elif category_index == 3:
                    relationship_similiarity.append(word_similarity_score)
                    relationship_similiarity = [sorted(x, key = lambda x: x[1], reverse= True) for x in relationship_similiarity]
                elif category_index == 4:
                    depression_similarity.append(word_similarity_score)
                    depression_similarity = [sorted(x, key = lambda x: x[1], reverse= True) for x in depression_similarity]
                elif category_index == 5:
                    physical_similiarity.append(word_similarity_score)
                    physical_similiarity = [sorted(x, key = lambda x: x[1], reverse= True) for x in physical_similiarity]


        category_similarity_scores = {
            'behaviorial'  : 0,
            'body_image'   : 0,
            'grief'        : 0,
            'relationship' : 0,
            'depression'   : 0,
            'physical'     : 0
        }

        for i in behaviorial_similiarity:
            category_similarity_scores['behaviorial']  += i[0][1] + i[1][1] #The score for input word to top 2 keywords. Example Keeps = bheavior + sleep = 0.3.
        for i in body_image_similiarity:
            category_similarity_scores['body_image']   += i[0][1] + i[1][1]
        for i in grief_similiarity:
            category_similarity_scores['grief']        += i[0][1] + i[1][1]
        for i in relationship_similiarity:
            category_similarity_scores['relationship'] += i[0][1] + i[1][1]
        for i in depression_similarity:
            category_similarity_scores['depression']   += i[0][1] + i[1][1]
        for i in physical_similiarity:
            category_similarity_scores['physical']     += i[0][1] + i[1][1]

        category = max(category_similarity_scores, key=category_similarity_scores.get)


        return [category, category_similarity_scores]


#my_therapy_diagnoser = therapy_diagnoser() 
#s = my_therapy_diagnoser.predict_sentiment('hi i like cats')
#print(s)