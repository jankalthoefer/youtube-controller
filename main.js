const playlists = [
    'PLDFFGwD6I7tL5eLlXB_YKYl2BwmL6UKBk', //Calmm trains
    'PLDFFGwD6I7tIiuvyLH4sImVkJ4oRL6Wux', // trains US
    'PLDFFGwD6I7tJ8scE6VFhDAmijPH6uWcbF', // shorts
];
// 2. This code loads the IFrame Player API code asynchronously.
const defaultVideo = 'IsubCyjw8ic';

var player;
var currentPlaylistIndex = 0;
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// switchPlaylist(0);

function switchPlaylist(index) {
    console.log('Switch to playlist', index);
    const playlistId = playlists[index];

    if (player.getPlaylist() && player.getPlaylistId() === playlistId) {
        return; // Prevent reloading the same playlist
    }
    console.log('before', player.getPlaylistId());
    player.stopVideo();
    player.loadPlaylist({ list: playlistId, listType: 'playlist', index: 0, suggestedQuality: 'hd720' });
    setTimeout(() => {
        player.playVideo();
        console.log('after', player.getPlaylistId());
    }, 1000);
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    console.log('play');
    event.target.playVideo();
}

function skipVideo() {
    player.nextVideo();
}

function onYouTubeIframeAPIReady(playlistId) {
    console.log('switch to ', playlistId);

    if (player) {
        delete player;
    }
    player = new YT.Player('player', {
        videoId: defaultVideo,
        events: {
            onReady: onPlayerReady,
            // onStateChange: onPlayerStateChange,
        },
    });
}

// // 5. The API calls this function when the player's state changes.
// //    The function indicates that when playing a video (state=1),
// //    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
//     if (event.data != YT.PlayerState.PLAYING || event.data != YT.PlayerState.BUFFERING) {
//         console.log('play');

//         //<!-- event.target.playVideo(); -->
//     }
//     //console.log('🚀 ~ event:', event);
//     //console.log('🚀 ~ YT.PlayerState:', YT.PlayerState);
//     if (event.data == YT.PlayerState.PLAYING && !done) {
//         // setTimeout(stopVideo, 6000);
//         done = true;
//     }
// }

// function stopVideo() {
//     player.stopVideo();
// }
