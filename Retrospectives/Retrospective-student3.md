# Retrospective

- name: Nate Weddle
- email: nathanweddle@u.boisestate.edu

## Experience

This project definitely had its ups and downs for me. The HTML (pug) and CSS parts of this project went pretty smooth. Granted it's not the most
extravigant website ever created, I think it gets the job done and doesn't look horrendous. And I mean c'mon, who doesn't like Harry Potter? Anyways,
the part of this project that really got me stuck was connecting the comments page to the home page, and having the comments that were written in 
the comments page to show up on the home page. I was able to get the comments page functionallity working correctly. I could create, edit, and delete
the comments no problem. The javascript file and server.js file all seemed to be working great. But nothing would happen on my home page, and for awhile
I had no idea why. After several hours of headscratching and lots of curse words, I figured out that my app.get method for my index page in server.js wasn't 
correct. Instead of passing comments (with an s) as a variable into index, which was the name of my array of comments, I was passing comment (no s). Once
I got that fixed, everything ran great! This project really helped me learn how the front end interacts with the backend as I've never done this before,
and it was fun to complete! 

## Known issues or Bugs

None

## Sources used

Along with the text book, I used w3schools.com and https://developer.mozilla.org/en-US/ for some help on css.
