import { tweetsData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
// console.log(uuidv4()) // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const tweetBtn = document.getElementById("tweet-btn")

// ⬇️ USER INTERFACE ⬇️

// listen for clicks on the tweet button
tweetBtn.addEventListener("click", function() {
    handleTweetBtnClick()
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

// listen for clicks on the reply button
document.addEventListener("click", function(e) {
    if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
})

// listen for clicks on the tweet text
document.addEventListener("click", function(e) {
    if (e.target.dataset.text) {
        console.log("tweet text", e.target.dataset.text)
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

// handle clicks on the reply button
function handleReplyClick(replyId) {
    document.getElementById(`replies=${replyId}`).classList.toggle("hidden")
}

// handle clicks on the tweet button
function handleTweetBtnClick() {
    const tweetInput = document.getElementById("tweet-input")

    if (tweetInput.value) {
        const newTweet = {
            handle: `@Scrimba 💎`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        }

        tweetsData.unshift(newTweet) // add a new tweet to the top of the feed!
        tweetInput.value = ""
        renderFeed()
    }
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
        let retweetIconClass = ""
        let repliesHtml = "" // this will hold replies to a tweet

        // if tweet is liked, populate likeIconClass with "liked" to change its color
        if (tweet.isLiked) {
            likeIconClass = "liked"
        }

        if (tweet.isRetweeted) {
            retweetIconClass = "retweeted"
        }

        // check if tweet has replies. render them in "replies-tweetUuid" div if it does
        if (tweet.replies.length > 0) {
            tweet.replies.forEach(function(reply) {
                repliesHtml += `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                                <div>
                                    <p class="handle">${reply.handle}</p>
                                    <p class="tweet-text">${reply.tweetText}</p>
                                </div>
                            </div>
                    </div>
                `
            })
        }

        // render tweet
        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text" data-text="${tweet.uuid}">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i 
                                    class="fa-regular fa-comment-dots" 
                                    data-reply="${tweet.uuid}">
                                </i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i 
                                    class="fa-solid fa-heart ${likeIconClass}" 
                                    data-like="${tweet.uuid}">
                                </i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i 
                                    class="fa-solid fa-retweet ${retweetIconClass}" 
                                    data-retweet="${tweet.uuid}">
                                </i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
                <div class="hidden" id="replies=${tweet.uuid}">${repliesHtml}</div>
            </div>
        `        
    })

    return(feedHtml)
}

renderFeed()