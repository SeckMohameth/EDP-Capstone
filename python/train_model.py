import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, f1_score
import matplotlib.pyplot as plt
from wordcloud import WordCloud

comments = pd.read_json("comments.json")
print(comments.head())

# Split data into test and train sets
x = comments["content"]
y = comments["sentiment"]
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

#Create model pipeline and fit data
model = Pipeline(
    steps=[
        (
            "count_vectorizer", CountVectorizer(lowercase=True)
        ),
        (
            "naive_bayes", MultinomialNB()
        )
    ])
model.fit(x_train, y_train)

# Predict on test data and evaluate accuracy
y_pred = model.predict(x_test)
accuracy = accuracy_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred, pos_label="negative")
print(f"Accuracy: {accuracy}")
print(f"F1 Score for 'negative' class: {f1}")

with open("model.pkl", 'wb') as out:
    pickle.dump(model, out)

#========== Data Visualizations ==========#

#====== Pie chart of positive vs negative count ======#
# class_distribution = comments['sentiment'].value_counts()
# class_distribution.plot(kind='pie', autopct='%1.1f%%', colors=['#66b3ff','#99ff99'])
# plt.title('Distribution of Spam and Ham Messages')
# plt.show()

#====== Wordcloud for positive and negative messages ======#
# negative_text = ' '.join(comments[comments["sentiment"] == "negative"]["content"])
# negative_wordcloud = WordCloud(width=800, height=400, max_words=100, background_color='white', random_state=42).generate(negative_text)
# positive_text = ' '.join(comments[comments["sentiment"] == "positive"]["content"])
# positive_wordcloud = WordCloud(width=800, height=400, max_words=100, background_color='white', random_state=42).generate(positive_text)

# plt.figure(figsize=(10, 4))
# plt.subplot(1, 2, 1)
# plt.imshow(negative_wordcloud, interpolation='bilinear')
# plt.title('Word Cloud for negative Messages')
# plt.axis('off')
# plt.subplot(1, 2, 2)
# plt.imshow(positive_wordcloud, interpolation='bilinear')
# plt.title('Word Cloud for positive Messages')
# plt.axis('off')
# plt.tight_layout()
# plt.show()

#========== End Visualizations ==========#