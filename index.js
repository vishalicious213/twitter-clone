import { tweetsData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
// console.log(uuidv4()) // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const tweetBtn = document.getElementById("tweet-btn")

let feedSource = [] // get tweets from localStorage or from tweetsData
let localFeed = JSON.parse(localStorage.getItem("tweets"))
    
// use tweets in localStorage if available, or save tweetsData to localStorage
if (localFeed) {
    feedSource = localFeed
} else {
    localStorage.setItem("tweets", JSON.stringify(tweetsData))
    localFeed = JSON.parse(localStorage.getItem("tweets"))
    feedSource = localFeed
}

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

// listen for clicks on the replies icon (to open replies)
document.addEventListener("click", function(e) {
    if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
})

// listen for clicks on the tweet text (to reply to tweet)
document.addEventListener("click", function(e) {
    if (e.target.dataset.text) {
        handleTweetTextClick(e.target.dataset.text)
    }
})

// ⬇️ EVENT HANDLERS ⬇️

// handle clicks on the like button
function handleLikeClick(tweetId) {
    const targetTweetObj = feedSource.filter(function(tweet) {
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
    const targetTweetObj = feedSource.filter(function(tweet) {
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

// handle clicks on the tweet button (new tweet)
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

        feedSource.unshift(newTweet) // add a new tweet to the top of the feed!
        localStorage.setItem("tweets", JSON.stringify(feedSource))
        tweetInput.value = ""
        renderFeed()
    }
}

// handle clicks on the tweet text (reply to tweet via modal)
function handleTweetTextClick(tweetId) {
    const replyModal = document.getElementById("reply-modal")
    const closeButton = document.getElementById("reply-modal-close-btn")
    const replyButton = document.getElementById("reply-modal-reply-btn")
    const modalHeader = document.getElementById("modal-header")
    const replyInput = document.getElementById("tweet-reply-input")
    
    const targetTweetObj = feedSource.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0] // filter returns an array, adding the [0] returns the 1st array element

    console.log(targetTweetObj)

    modalHeader.innerHTML = `
        <img src="images/scrimbalogo.png" class="profile-pic" alt="@Scrimba ✅">
        <hr id="speakers">
        <img src="${targetTweetObj.profilePic}" class="profile-pic" alt="${targetTweetObj.handle}">
    `
    replyInput.placeholder = `Reply to ${targetTweetObj.handle}`

    // console.log("tweet text", targetTweetObj.tweetText)
    // open the modal when a tweet's text is clicked. close it when the X is clicked
    replyModal.classList.remove("hidden")
    closeButton.addEventListener("click", function() {
        replyModal.classList.add("hidden")
    })

    replyButton.addEventListener("click", function() {
        const replyText = document.getElementById("tweet-reply-input")

        if (replyText.value) {
            const newReply = {
                handle: `@Scrimba ✅`,
                profilePic: `images/scrimbalogo.png`,
                tweetText: replyText.value,
            }
    
            targetTweetObj.replies.push(newReply)
            replyModal.classList.add("hidden")
            replyText.value = ""
            saveRepliesLocally(tweetId, newReply)
            renderFeed()
        }
    }, {once: true}) // removes the event listener after its done (so we don't append replies to more than one tweet)
}

function saveRepliesLocally(tweetId, replyDetails) {
    console.log(tweetId, replyDetails)
    // let localFeed = JSON.parse(localStorage.getItem("tweets"))

    // if no localFeed, save tweetsData to localStorage & localFeed
    // if (!localFeed) {
    //     localStorage.setItem("tweets", JSON.stringify(tweetsData))
    //     localFeed = JSON.parse(localStorage.getItem("tweets"))
    // }

    // find tweet in localStorage, append new reply
    const targetTweetObj = localFeed.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0] // filter returns an array, adding the [0] returns the 1st array element

    const replyToSave = {
        // tweetId,
        handle: replyDetails.handle,
        profilePic: replyDetails.profilePic,
        tweetText: replyDetails.tweetText
    }

    targetTweetObj.replies.push(replyToSave)
    localStorage.setItem("tweets", JSON.stringify(localFeed))
    renderFeed()
    // localStorage.setItem("replies", JSON.stringify(tweetsData))
}

// ⬇️ RENDER THE FEED ⬇️

// render tweets onto #feed
function renderFeed() {
    document.getElementById("feed").innerHTML = getFeedHtml()
}

// iterate through tweets data and create HTML for each tweet
function getFeedHtml() {
    let feedHtml = ""
    // let feedSource = [] // get tweets from localStorage or from tweetsData
    // let localFeed = JSON.parse(localStorage.getItem("tweets"))
    
    // // use tweets in localStorage if available, or fall back on tweetsData
    // if (localFeed) {
    //     feedSource = localFeed
    // } else {
    //     feedSource = tweetsData
    // }

    feedSource.forEach(function(tweet) {
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
                            <img src="${reply.profilePic}" class="profile-pic" alt="${reply.handle}">
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
                    <img src="${tweet.profilePic}" class="profile-pic" alt="${tweet.handle}">
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