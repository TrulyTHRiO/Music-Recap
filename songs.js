const fs = require("fs")

history = JSON.parse(fs.readFileSync('./watch-history.json'))

musicHistory = {}

console.log(history.length)

var artist
for (var i = 1; i < history.length; i++) {
    if (history[i].header == "YouTube Music") {
        if (musicHistory[history[i].titleUrl] == undefined) {
            try {
                artist = history[i].subtitles[0].name
            } catch {
                artist = null
            }
            musicHistory[history[i].titleUrl] = [1, history[i].title, artist, history[i].titleUrl, history[i].titleUrl.split("=")[1]]
        } else {
            musicHistory[history[i].titleUrl][0]++
        }
    }
}

var values = Object.values(musicHistory)
values.sort(function(a,b) {
    return b[0]-a[0]
})

values.map((element, index) => element.unshift(index+1))

fs.writeFile("sorted-songs.txt", JSON.stringify(values).replaceAll("],[","],\n["), (err) => {console.log(err)})
