const fs = require("fs")

history = JSON.parse(fs.readFileSync('./watch-history.json'))

musicHistory = {}

artistBank = {}

console.log(history.length)

var artist
for (var i = 1; i < history.length; i++) {
    if (history[i].header == "YouTube Music") {
        if (history[i].subtitles != undefined) {
            if (artistBank[history[i].titleUrl] == undefined) artistBank[history[i].titleUrl] = history[i].subtitles[0].name
            if (musicHistory[history[i].subtitles[0].name] == undefined) {
                musicHistory[history[i].subtitles[0].name] = 1
            } else {
                musicHistory[history[i].subtitles[0].name] += 1
            }
        } else {
        if (artistBank[history[i].titleUrl] != undefined) musicHistory[artistBank[history[i].titleUrl]] ++
        } 
    }
}

var values = Object.entries(musicHistory)
values.sort(function(a,b) {
    return b[1]-a[1]
})

fs.writeFile("sorted-artists.txt", JSON.stringify(values).replaceAll("],[", "],\n["), (err) => {console.log(err)})