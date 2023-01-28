import { tweetsData } from "./data.js"

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById("tweet-btn")

// ⬇️ USER INTERFACE ⬇️

tweetBtn.addEventListener("click", function() {
    console.log(tweetInput.value)
})

// listen for clicks on the like button
document.addEventListener("click", function(e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
})

// listen for clicks on the retweet button
document.addEventListener("click", function(e) {
    if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
})

// handle clicks on the like button
function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0] // filter returns an array, adding the [0] returns the 1st array element

    if (targetTweetObj.isLiked === false) {
        targetTweetObj.likes++
    } else {
        targetTweetObj.likes--
    }

    targetTweetObj.isLiked = !targetTweetObj.isLiked

    renderFeed()
}

// handle clicks on the retweet button
function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isRetweeted === false) {
        targetTweetObj.retweets++
    } else {
        targetTweetObj.retweets--
    }

    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    renderFeed()
}

// ⬇️ RENDER THE FEED ⬇️

// render tweets onto #feed
function renderFeed() {
    document.getElementById("feed").innerHTML = getFeedHtml()
}

// iterate through tweetsData and create HTML for each tweet
function getFeedHtml() {
    let feedHtml = ""

    tweetsData.forEach(function(tweet) {
        let likeIconClass = "" // add this empty class to the "liked" icon

        // if tweet is liked, populate likeIconClass with "liked" to change its color
        if (tweet.isLiked) {
            likeIconClass = "liked"
        }

        // render tweet
        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
            </div>
        `        
    })

    return(feedHtml)
}

renderFeed()