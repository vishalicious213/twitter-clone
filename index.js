import { tweetsData } from "./data.js"

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById("tweet-btn")

// ⬇️ USER INTERFACE ⬇️

tweetBtn.addEventListener("click", function() {
    console.log(tweetInput.value)
})

document.addEventListener("click", function(e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
})

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })
    
    console.log(targetTweetObj[0])
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
                                <i class="fa-solid fa-heart" data-like="${tweet.uuid}"></i>
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