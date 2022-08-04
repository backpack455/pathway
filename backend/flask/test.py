import os
from gensim.models import Word2Vec


dirname = os.getcwd()

print(dirname)
print(__file__)

os.chdir('backend')

word2vec_model = Word2Vec.load(__file__ + '/sentimentAnalysis/models/word2vec.model')