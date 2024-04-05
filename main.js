
const getAuth = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token',
    {
        method : 'POST',
        headers : {
            'Authorization' : `Basic ${btoa(clientID + ':' + clientSecret)}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body : 'grant_type=client_credentials'
    });
    const token = await response.json();
    // console.log(token);
    return token
}
// getAuth()

const getSong = async (songname, artist, tok) => {
    let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=track:${songname}+artist:${artist}`,
    {
        method : 'GET',
        headers: {
            'Authorization' : 'Bearer ' + tok.access_token
          }
    });
    let data = await response.json();

    return data.tracks.items[0]
    
}
// getSong('schism', 'too')

// let's set up our array of tracks!

let music = [
    {id: 0, track: 'Schism', artist : 'Tool' },
    {id: 1, track: 'electric worry', artist : 'clutch' },
    {id: 2, track: 'numb', artist : 'linkin park' },
    {id: 3, track: 'Shimmer', artist : 'fuel' },
    {id: 4, track: 'electric worry', artist : 'clutch' },
    {id: 5, track: 'Hukilau', artist : 'John K' },
    {id: 6, track: 'electric worry', artist : 'clutch' },
    {id: 7, track: 'Sedona', artist : 'Houndmouth' },
    {id: 8, track: 'ghost of tom joad', artist : 'rage against' }
]
// global playing variable kinda
let playing;
let stopbtn = document.getElementById('stopbtn');
let headertitle = document.getElementById('headertitle');

const setupTrackList = async () => {
    let tok = await getAuth();
    for (let i = 0; i < music.length;i++ ){
        let data = await getSong(music[i].track, music[i].artist, tok);
        
        music[i].preview_url = new Audio(data.preview_url)
        music[i].album_cover = data.album.images[0].url

        let img = document.getElementById(`${i}`);
        img.src = music[i].album_cover;
        img.hidden = false;
    }
}
setupTrackList()


let clickEvent = (id) => {
    console.log(id);

    let track = music[id.slice(-1)];
    console.log(track);
    // TO-DO   the tricky logic
    if (playing && !playing.preview_url.paused) {

        if ( playing == track){
            pauseTrack();
            return
        }
        else {
            playing.preview_url.pause();
        }
    }

    //play the music man!
    track.preview_url.play();
    playing = track;
    headertitle.innerHTML = `${playing.artist}  |  ${playing.track}`
}

let pauseTrack = () => {

    playing.preview_url.pause();
    headertitle.innerHTML = 'Padawans | SpottyAPI Music'

}