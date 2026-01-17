import time
from machine import Pin, ADC

mic=ADC(in(26))

WINDOW_MS = 50
SMOOTH_ALPHA = 0.90
smoothedLevel = 0
# Collect samples for WINDOW_MS and compute peak-to-peak amplitude
while True:
    unsigned long start =time.ticks_ms()
    minVal = 65535
    maxVal = 0
    while (millis() - start) < WINDOW_MS: 
         v = mic.read_u16()
         if v < minVal: minVal = v
         if v > maxVal: maxVal = v
    peakToPeak = maxVal - minVal; # "loudness" proxy

     # Smooth it
     smoothedLevel = SMOOTH_ALPHA * smoothedLevel + (1.0 - SMOOTH_ALPHA) * peakToPeak

    # Map to a 0-100-ish scale 
    # Adjust SCALE based on environment.
     SCALE = 32 #may need to change because pi pico uses 0-65535 instead of 0-1023
     levelPct = smoothedLevel * SCALE
     if levelPct < 0: levelPct = 0
     if levelPct > 100 levelPct = 100
     print(f”{levelPct}%”)

     LOUDNESS_THRESHOLD = 45 
     if levelPct > LOUDNESS_THRESHOLD:
          print("Too loud!")
     else:
          print("It is peaceful and quiet.")
     delay(50)
