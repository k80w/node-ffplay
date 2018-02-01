# ffplay
Allows you to play audio using FFplay. This is a quick and dirty solution that spawns an `ffplay` process and controls it with interrupt signals. It probably isn't the best solution for end-user applications, but it has its uses. It's also incredibly easy to set up if all you need is to test something with audio for a quick project.

## Usage

```javascript
var FFplay = require("ffplay");
var player = new FFplay("./path/to/sound/file.wav"); // Loads the sound file and automatically starts playing
// It runs `ffplay` with the options `-nodisp` and `-autoexit` by default

player.pause(); // Pauses playback

player.resume(); // Resumes playback

player.stop(); // Stops playback.

// The player can't play again after being stopped,
// so you should remove it
player = null;
```

### Custom options

You can also pass custom options when you construct `FFplay` like so:
```
var player = new FFplay("./path/to/sound/file.wav", ["-ss 12", "-nodisp", "-autoexit"]);
```

The `-nodisp` and `-autoexit` flags are set by default, but if you provide an array of options, you will have to manually specify them.
