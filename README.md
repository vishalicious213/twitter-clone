# Twitter Clone

This was a Scrimba project that I customized and built onto. We were tasked to build a Twitter clone that read an array of tweet objects. Some of these tweets included an array of replies. We had to render them onscreen, showing the tweet text, name of the person who wrote the tweet, that person's profile picture, the number of replies, number of likes and number of retweets - along with an clicable icon for each of these. Clicking a "like" icon increments/decrements the number of likes, clicking the retweet icon does the same for number of retweets. Clicking the replies icon shows the replies, which are essentially mini-tweets.

The top of the window, above the feed, shows the user's profile picture and gives the user an area from which to compose and sent a new tweet.

I added on to the project with the ability to click on a tweet's text to display a modal and reply to a tweet, much like the real Twitter. This reply gets added to the tweet's replies in chronological order. All tweets and replies are saved to local storage, so they persist if the window is closed and reopened again. To do this, I refactored the code and changed the data source, along with making a series of functions to handle user input, accessing the correct tweet and its replies, and saving data.

Deployed at: https://vish213-twimba.netlify.app/