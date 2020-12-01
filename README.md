# ScratchMod
Adds QoL and visual improvements to Scratch.

### Key Detection
ScratchMod allows every key on your keyboard to be detected by Scratch projects. To utilize this feature, you must make a sprite in your project with the exact name: `scratchModCompat`, and then create a public variable called `lastKeyPressed`. Once you have created the `lastKeyPressed` variable, it will be automatically set to the last key you press. Note that keys such as the spacebar will literally set the variable to a " " space character and you will not be able to see it in the variable monitor.  The variable is updated in realtime and there is no additional configuration to use this feature at this time.

Unlike TurboWarp which has full access to the inner workings of the Scratch runtime, ScratchMod cannot update the "when key pressed" or "if key pressed" blocks yet, but a solution to this problem could be coming in the near future.
