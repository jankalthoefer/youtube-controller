const playlists = ['PLQZnrgDn-_7R9eCb279SwMASxxxE3ONxd', 'PLNRuQxam6R9z4lIIo1oVDv4v1XWQkFc1V', 'PLy2urwVIMDlmuIJwinFabCb1r5kCr9Kn3'];
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
    const playlistId = playlists[index];
    console.log(playlistId);
    console.log(player);

    player.loadPlaylist({ list: playlistId, listType: 'playlist' });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    console.log('play');
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data != YT.PlayerState.PLAYING || event.data != YT.PlayerState.BUFFERING) {
        console.log('play');

        //<!-- event.target.playVideo(); -->
    }
    //console.log('🚀 ~ event:', event);
    //console.log('🚀 ~ YT.PlayerState:', YT.PlayerState);
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
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
            onStateChange: onPlayerStateChange,
        },
    });
}
