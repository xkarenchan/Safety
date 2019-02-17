# ReDirect

# Inspiration
**ReDirect** is inspired by solving small events that may caused inconvenient in people's daily life.

Case1: a tree falls on the street v.s. Case2: someone was in a bike accident. In both cases, do you know who exactly you should contact to help the situation out?

**ReDirect** is the solution we come up with to solve those problem. Our goal is to help people with non-emergency cases that may or may not need (higher authority to help solve).

**ReDirect** uses audio recording and IBM Watson(AI) to do speech detection and NPL for language detection and further translate audio into a text file to connect with the right (department).

# What it does
ReDirect aims to help people with non-emergency cases and redirect them to the right authority through audio recording and text translating(including different languages). The real-time location connects the users to the closest help they can possibly get.

# How we built it
For Frontend, we used ProCreate to design the display and react-native and javascript on expo to develop the app. Backend we used IBM-watson(AI), system recording and NPL (also use react/react-native and js to write) to create a text file from audio files recorded. The app does not take any user-data or local memory, instead, the audio files are directly uploaded and translate into a text file(also in different language) to the user.
