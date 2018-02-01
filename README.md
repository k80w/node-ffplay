# ffplay
Allows you to play audio using FFplay.

## Usage
```javascript
var FFplay = require("ffplay");
var player = new FFplay("./path/to/sound/file.wav"); // Loads the sound file and automatically starts playing

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
