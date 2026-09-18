# Beginner Web Dev Checklist

## 1) File naming rules
- The file name in HTML must match the actual file name exactly.
- Check spelling, spacing, and case.
- Example: `style.css` must match the real file `style.css`.
- Wrong name: `styles.css` or `Style.css` if the real file is lowercase.

## 2) Link the CSS correctly
- In HTML, the stylesheet link must point to the real CSS file.
- Example:
  ```html
  <link rel="stylesheet" href="style.css" />
  ```
- If the file is missing or misnamed, the page will look unstyled.

## 3) Save files before refreshing
- Always save the HTML, CSS, and JS files before reloading the browser.
- A browser will not show new changes unless the file is saved.

## 4) Refresh the page after edits
- After changing HTML, CSS, or JS, refresh the browser to test the result.

## 5) HTML is structure
- HTML gives the page content.
- Examples: headings, text, buttons, sections, links.

## 6) CSS is style
- CSS controls color, spacing, layout, fonts, and design.
- Example: background color, margin, padding, grid, hover effects.

## 7) JavaScript is behavior
- JavaScript makes things happen.
- Examples: button click, dark mode toggle, updating text, counters.

## 8) `getElementById` basics
- Use `document.getElementById('something')` to grab an element.
- Then store it in a variable.
- Example:
  ```js
  const button = document.getElementById('theme-toggle');
  ```

## 9) Event listeners
- Add a click event when you want something to happen on button click.
- Example:
  ```js
  button.addEventListener('click', () => {
    console.log('clicked');
  });
  ```

## 10) CSS classes and JavaScript
- JavaScript can add or remove CSS classes.
- Example:
  ```js
  document.body.classList.toggle('dark');
  ```
- This changes the page appearance without rewriting the whole HTML.

## 11) Use the browser console
- If something breaks, check the browser dev tools console.
- Look for file errors, missing files, or script issues.

## 12) Common beginner mistakes
- wrong file name
- wrong path
- file not saved
- wrong HTML tag or attribute
- JavaScript selecting an ID that does not exist
- forgetting semicolons is optional in many cases, but the code still needs to be correct

## 13) The real beginner formula
- HTML = content
- CSS = appearance
- JavaScript = interaction

## 14) Small changes are good
- Do not make huge random edits.
- Change one thing at a time and test it.
- This is how you learn faster.

## 15) Keep project notes nearby
- Save notes in the same project folder.
- That makes debugging faster and easier.

## 16) Quick debugging order
1. Check the file name.
2. Check the HTML link path.
3. Save all files.
4. Refresh the browser.
5. Check the console.
6. Fix one issue at a time.

## 17) The mindset
- Tiny mistakes are normal.
- They are part of learning.
- You are not failing; you are building the habit of debugging.
