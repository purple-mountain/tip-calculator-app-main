# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Screenshot

![](/screenshot-desktop.png)
![](/screenshot-mobile.png)


### Links

- Solution URL: [](https://www.frontendmentor.io/solutions/tip-calculator-made-with-vanilla-js-UhYZXbq3n)
- Live Site URL: [Add live site URL here](https://purple-mountain.github.io/tip-calculator-app-main/)


### Built with

- Semantic HTML5 markup
- SCSS
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JS 


### What I learned

```css
/* Hides mini arrows */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}
```

```js
// Limits number of characters entered in input
function limitBill(element) {
    let maxChars = 7;

    if(element.value.length > maxChars) {
        element.value = element.value.substr(0, maxChars);
    }
}
```




### Useful resources

- [Example resource 1](https://stackoverflow.com/questions/9841363/how-to-restrict-number-of-characters-that-can-be-entered-in-html5-number-input-f) - This helped me to limit number of characters entered in input.

- [Example resource 2](https://css-tricks.com/working-with-javascript-media-queries/) - Learned about JS Media Queries


## Author

- Frontend Mentor - [@purple-mountain](https://www.frontendmentor.io/profile/purple-mountain)




