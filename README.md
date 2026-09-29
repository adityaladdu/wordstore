# Wordstore Project Documentation

This project is a static bookstore landing page built using plain HTML and CSS. It is designed to look like an online book store homepage with a modern e-commerce layout, promotional banners, product cards, category blocks, author highlights, blog articles, and a footer.

The project is composed of:

- `book.html` — the full page structure and content
- `book.css` — all styling, layout rules, colors, spacing, and responsiveness
- `img/` — image assets used across the page

This is not a framework-based app or JavaScript-heavy website. It is a front-end static project that can be opened directly in a browser.

---

## 1. How this project was built

### 1.1 Overall approach

The design is built in two major layers:

1. HTML creates the structure of the page.
2. CSS controls the layout, colors, typography, spacing, and responsiveness.

The page is styled to feel like a premium shopping website with:

- a sticky header
- a promotional hero banner
- searchable top bar
- product cards with pricing and discount labels
- genre/category tiles
- author showcase cards
- marketing promo panel
- featured article cards
- footer navigation

### 1.2 Page structure

The markup in `book.html` is organized into semantic sections so that the page can be read clearly and styled consistently:

- `header` for website identity and navigation
- `main` for the main content area
- `section` blocks for content categories
- `article` for product and article cards
- `footer` for shop information and legal links

### 1.3 CSS architecture

The styling in `book.css` is organized into logical groups:

- global reset and root variables
- header styling
- navigation styling
- hero area styling
- product card styling
- genre/category styling
- author cards styling
- promo banner styling
- article section styling
- footer styling
- responsive media queries for smaller screens

The CSS uses custom color variables like `--purple`, `--cream`, and `--line`, which keeps the design consistent and easy to update.

### 1.4 Design system used

The design uses a soft luxury bookstore aesthetic:

- purple accent color for branding and interactions
- warm neutral background tones for product areas
- high-contrast typography for headings
- rounded corners and subtle shadowing for buttons and product cards
- lots of whitespace to create a premium retail feel

### 1.5 How to run the project

Since this is a static webpage, there is no installation needed.

To view it:

1. Open `book.html` in a browser.
2. Or run a simple local static server if needed.
3. The CSS is linked from `book.css`, and the page loads local images from the `img` folder.

This project does not require npm, Node.js, or a build step.

---

## 2. Project structure and content breakdown

### 2.1 HTML file overview

`book.html` contains the complete storefront layout.

The page begins with:

- `<!doctype html>` to declare HTML5
- `<html lang="en">` for the root document
- `<head>` with metadata and the stylesheet link
- `<body>` containing the visible page content

The page then uses the following repeated content sections:

1. Header / brand / search / account / shopping button
2. Navigation links
3. Hero banner with promotional text and call-to-action
4. Best sellers product grid
5. Genre category section
6. Manga section
7. Author showcase section
8. Gift card promo banner
9. Reading desk articles section
10. Footer with links

### 2.2 CSS file overview

`book.css` contains all the design rules. It starts with an imported Google font and defines variables in `:root`:

- `--purple` / purple brand color
- `--purple-dark` / darker purple for hover states
- `--cream` / warm background tone
- `--line` / border color
- `--text` / main text color
- `--muted` / secondary text color
- `--white` / white color

These variables make design changes easier and more consistent.

---

## 3. Detailed explanation of every HTML tag used

Below is a tag-by-tag explanation of what each element does in this project.

### 3.1 Root and document tags

| Tag               | Meaning                              | Used in this project                                                        |
| ----------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| `<!doctype html>` | Declares the document type as HTML5. | At the top of the page to tell the browser this is a modern HTML5 document. |
| `<html>`          | Root element of the document.        | Wraps the entire page and sets the language using `lang="en"`.              |
| `<head>`          | Contains metadata and linked files.  | Holds the page title, viewport setting, font import, and stylesheet link.   |
| `<meta>`          | Provides metadata about the page.    | Used for character encoding and mobile viewport configuration.              |
| `<title>`         | Sets the browser tab title.          | Displays “Wordstore” in the tab.                                            |
| `<style>`         | Embeds CSS inside the HTML document. | Used to import the Google Font.                                             |
| `<link>`          | Connects external resources.         | Links the page to `book.css`.                                               |
| `<body>`          | Main viewable content of the page.   | Contains all visible content.                                               |

### 3.2 Structural tags

| Tag         | Meaning                                               | Used in this project                                                                        |
| ----------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `<header>`  | Top section of a page.                                | Used to hold the brand, search box, account button, and navigation.                         |
| `<nav>`     | Navigation block.                                     | Holds menu links such as Books, Top 50, Manga, Authors, and The Reading Desk.               |
| `<main>`    | Main content area of the document.                    | Contains all the store sections.                                                            |
| `<section>` | Logical part of the page.                             | Used for hero, best sellers, genre tiles, manga, authors, promo, and reading desk sections. |
| `<article>` | Self-contained content item.                          | Used for each product card and blog article.                                                |
| `<footer>`  | Footer area.                                          | Used for store information and links.                                                       |
| `<div>`     | Generic block container.                              | Used throughout to group content and apply layout styling.                                  |
| `<span>`    | Inline container used within text or inline elements. | Used for discount labels, price values, and text inside links and badges.                   |

### 3.3 Text and heading tags

| Tag        | Meaning               | Used in this project                                                                   |
| ---------- | --------------------- | -------------------------------------------------------------------------------------- |
| `<h1>`     | Main page heading.    | The hero section uses a large headline: “Find your next favourite story.”              |
| `<h2>`     | Section heading.      | Used in every major section like Best Sellers and Explore by Genre.                    |
| `<h3>`     | Subheading for cards. | Used inside product cards and articles.                                                |
| `<p>`      | Paragraph text.       | Used in hero text, section intro text, promo description, and footer copy.             |
| `<a>`      | Hyperlink.            | Used for navigation links, category cards, CTA buttons, and footer links.              |
| `<button>` | Clickable button.     | Used in the header account area, shopping bag, add-to-cart buttons, and gift card CTA. |

### 3.4 Form and input tags

| Tag       | Meaning                   | Used in this project                                                              |
| --------- | ------------------------- | --------------------------------------------------------------------------------- |
| `<label>` | Describes a form control. | Used around the search input to display the search icon and input field together. |
| `<input>` | User input field.         | Used for search with `type="search"`.                                             |

|

### 3.5 Media and image tags

| Tag        | Meaning                 | Used in this project                                                                  |
| ---------- | ----------------------- | ------------------------------------------------------------------------------------- |
| `<img>`    | Inserts an image.       | Used for book covers, category backgrounds, author portraits, and article thumbnails. |
| `<svg>`    | Inline vector graphics. | Used for the search icon and user/shopping icons in the header.                       |
| `<circle>` | SVG circle element.     | Used to draw the circular icon details in the search and account icons.               |
| `<path>`   | SVG shape path.         | Used to draw the lines and strokes of icons.                                          |

### 3.6 Other useful tags

| Tag             | Meaning                  | Used in this project                                                               |
| --------------- | ------------------------ | ---------------------------------------------------------------------------------- |
| `<ul>` / `<li>` | Unordered list elements. | Not used in this exact project, but could have been used for menu or footer lists. |
| `<br>`          | Line break.              | Used in the promo banner text to split lines in the heading.                       |
| `<strong>`      | Strong emphasis.         | Not used here in the current version.                                              |
| `<em>`          | Emphasized text.         | Not used here in the current version.                                              |

---

## 4. Detailed CSS property reference

This project uses a large number of CSS properties. Below is a structured explanation of the main ones and what they do.

### 4.1 Global reset and base styling

These properties set the starting point for the page.

- `box-sizing: border-box;`  
  Ensures width and height include padding and borders, making layout easier to control.

- `margin: 0;` and `padding: 0;`  
  Removes default spacing from HTML elements so the design starts from a clean canvas.

- `scroll-behavior: smooth;`  
  Makes in-page anchor navigation scroll smoothly.

- `font-family: "Rubik", sans-serif;`  
  Sets the main typography across the body.

- `color: var(--text);`  
  Sets default text color.

- `background: #fff;`  
  Makes the main page background white.

- `line-height: 1.45;`  
  Improves readability of text blocks.

- `font: inherit;`  
  Ensures buttons and inputs inherit the correct font styles.

- `cursor: pointer;`  
  Shows a pointing cursor on buttons for interactivity.

### 4.2 Color variables and root styling

- `:root { ... }`  
  Stores reusable theme colors and design values for consistent styling.

- `--purple`  
  Brand purple used for buttons, highlights, badges, and accent text.

- `--purple-dark`  
  Darker variation for hover effects.

- `--cream`  
  Warm neutral tone used for surfaces.

- `--line`  
  Light border color used for separators.

- `--text`  
  Main dark text color.

- `--muted`  
  Secondary gray-brown text for subtitles and descriptions.

- `--white`  
  White base color.

### 4.3 Layout and sizing properties

- `display: grid;`  
  Used to lay out the header, product grids, category cards, and promo sections in structured columns.

- `display: flex;`  
  Used to align items inside nav bars, buttons, cards, and content blocks.

- `display: flex;` with `justify-content: center;` and `align-items: center;`  
  Centers elements horizontally and vertically.

- `grid-template-columns: ...;`  
  Creates multi-column layouts such as header columns and product cards.

- `gap: 25px;` / `gap: 20px;` / `gap: 16px;`  
  Adds spacing between items in flex or grid layouts.

- `max-width: 1440px;` / `max-width: 1360px;`  
  Keeps the layout centered and contained within a wide maximum width.

- `margin: auto;`  
  Centers container blocks horizontally.

- `padding: 0 42px;` / `padding: 70px;` / `padding: 35px;`  
  Adds inner spacing inside sections and containers.

- `height: 97px;` / `height: 57px;` / `min-height: 280px;`  
  Controls vertical sizing for headers and sections.

- `width: fit-content;`  
  Makes the CTA button fit exactly to its content.

- `min-width: 0;`  
  Prevents overflow issues inside product cards and layout items.

### 4.4 Positioning and stacking properties

- `position: sticky;`  
  Keeps the header pinned to the top while the user scrolls.

- `position: relative;`  
  Establishes a positioning context for child elements like badges and buttons.

- `position: absolute;`  
  Allows labels and overlays to sit exactly where needed.

- `top`, `left`, `right`, `bottom`  
  Place absolutely positioned elements precisely.

- `z-index`  
  Controls stack order so content like overlays and backgrounds appear in the correct layering.

- `inset: 0;`  
  Quickly stretches an element to cover the full container.

### 4.5 Typography properties

- `font-size`  
  Controls text size across headings, body, buttons, and labels.

- `font-weight`  
  Controls boldness, such as `400`, `600`, `700`, `800`, and `900`.

- `letter-spacing`  
  Used to increase spacing for small uppercase text like navigation and eyebrow labels.

- `text-transform: uppercase;`  
  Converts small headings into uppercase text.

- `text-decoration: none;`  
  Removes underlines from links.

- `text-decoration: underline;`  
  Adds underline to CTA links.

- `line-height`  
  Controls spacing between lines in paragraphs and headings.

- `font-family: "Rubik"` and `font-family: "Inter"`  
  Sets the visual typography style for headings and text.

### 4.6 Border, shadow, and background properties

- `border`, `border-top`, `border-bottom`  
  Creates separators and dividers between major sections.

- `border-radius`  
  Rounds corners of inputs, buttons, badges, and cards.

- `background: #fafafa;` / `background: #f4f2ef;` / `background: #eee9e2;`  
  Sets backgrounds for searches, product images, and tiles.

- `background: url("img/...jpg") center / cover no-repeat;`  
  Applies the hero background image and scales it to cover the container.

- `box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);`  
  Adds subtle depth to the add button.

- `overflow: hidden;`  
  Keeps child elements inside card boundaries and creates clean card edges.

- `overflow-x: auto;`  
  Allows horizontal scrolling for author cards on smaller screens.

- `opacity`  
  Used to reduce the strength of overlay backgrounds or text.

### 4.7 Color and text styling

- `color: var(--purple);`  
  Applies the brand purple to headings and interactive controls.

- `color: #111;` / `#171717;` / `#6f6a65;`  
  Controls text colors for contrast and emphasis.

- `background: rgba(247, 243, 237, 0.5);`  
  Creates a translucent overlay over the hero image.

- `content: "";`  
  Used with pseudo-elements `::before` and `::after` to create overlays and decorative text backgrounds.

### 4.8 Specific section styling properties

#### Header

- `position: sticky;` to keep the header visible while scrolling
- `z-index: 50;` to ensure it stays above other content
- `display: grid;` to structure brand, search, and actions
- `grid-template-columns: 230px 1fr 230px;` to set layout proportions

#### Logo

- `font-weight: 800;` and `letter-spacing: -1.5px;` to create a bold modern brand look
- `text-decoration: none;` to remove underline from anchor links

#### Search field

- `display: flex;` to align icon and text input
- `border: 1px solid #d8d3ce;` to create a subtle outline
- `border-radius: 5px;` to round corners
- `background: #fafafa;` for a soft input background
- `outline: 0;` to remove browser default focus outline

#### Hero section

- `background: url(...);` sets the large promotional image
- `display: grid;` creates two-column layout
- `min-height: 60vh;` gives hero good vertical space
- `position: relative;` and `::before` overlay for glassy effect

#### Product cards

- `display: grid;` on `.products` for multi-card layout
- `grid-template-columns: repeat(5, 1fr);` creates five product columns
- `position: relative;` for discounts and add button placement
- `overflow: hidden;` keeps images inside card boundaries

#### Price styles

- `.old` uses `text-decoration: line-through;` for previous price
- `.new` uses `font-weight: 800;` to emphasize sale price

#### Image styling

- `object-fit: cover;` ensures background and cover images fill their areas cleanly without distortion
- `width: 75%` and `height: 75%` make book cover images fit elegantly in cards

#### Category tiles

- `display: flex;` and `flex-direction: column;` align text at bottom of each tile
- `justify-content: flex-end;` pushes content to lower area of the card

#### Blog article cards

- `isolation: isolate;` ensures layered backgrounds remain controlled
- `linear-gradient(...)` overlays dark tint to improve readability over image backgrounds
- `transition: transform 0.3s ease;` adds hover animation for image zoom

#### Footer

- `display: grid;` with multiple columns for information blocks
- `border-top` and color contrast create clear separation from main content

### 4.9 Responsive media queries

The project is mobile-friendly thanks to media queries.

- `@media (max-width: 1000px)`  
  Reduces the header layout and product grid for tablets.

- `@media (max-width: 650px)`  
  Stacks sections vertically for phones, reduces padding, and changes the grid layout to 1 or 2 columns.

Major mobile rules:

- `.header-main` changes from multi-column to single column
- `.products` becomes fewer columns on smaller screens
- `.category-grid` becomes a single-column layout on very small screens
- `.footer-top` stacks to one column

---

## 5. Section-by-section project explanation

### 5.1 Header

The header contains:

- logo: “wordstore”
- search input with an icon
- account button
- shopping bag with a count bubble
- navigation links

It uses a white background, subtle border-bottom, and sticky positioning to remain visible while scrolling.

### 5.2 Hero banner

The hero section is the first main visual area. It combines:

- full-width background image
- overlay tint to make the text readable
- large headline
- short promotional description
- CTA button named “Explore Books”

The entire section is built with a two-column grid and uses a translucent background overlay to improve contrast.

### 5.3 Product sections

The site repeats a grid layout for product cards. Each card contains:

- discount badge
- product image
- add button
- author name
- book title
- old and new price

This is the main e-commerce pattern used throughout the project.

### 5.4 Genre categories

The category section uses a grid of 4 cards, each with:

- a background image
- a category title
- “Explore →” link text

The images are layered with `opacity` and `object-fit: cover` so they look visually attractive without dominating the text.

### 5.5 Authors

The author section uses a horizontal scrollable row of cards. Each one contains:

- a portrait image
- an author name overlay
- unique background colors for each card

This creates a gallery style while staying compact and modern.

### 5.6 Promo banner

The promo segment uses a purple background and a large decorative text overlay:

- “WORD STORE” repeated in large, transparent text
- a heading promoting gift cards
- a button to send a gift card

The layout is deliberately minimal and promotional, matching an online bookstore campaign.

### 5.7 Reading desk articles

This section shows article previews using image backgrounds and overlay gradients. The featured article is larger than the other two. The hover effect slightly enlarges the image to add subtle motion and life to the section.

### 5.8 Footer

The footer contains:

- bookstore branding
- introductory text
- shop links
- useful links
- Wordstore links
- copyright text

This closes the landing page and gives the user navigation and store policy references.

---

## 6. Summary of the entire build process

This project was built by combining a clear HTML structure with CSS layout utilities and design rules.

The process was:

1. Create the page semantically with HTML sections and related content
2. Add all images and icons to support the storefront design
3. Define color variables, text styles, and reusable spacing values
4. Build the header, hero, cards, and footer layout
5. Add hover states and discount styling for product-based interaction
6. Add responsive media queries so the site adjusts on smaller screens
7. Finalize the design with subtle transitions, overlays, and spacing refinements

In short: this project is a static HTML5 + CSS3 storefront mockup designed for a bookstore landing page.

---

## 7. Final notes

This is a clean, simplified front-end project meant to demonstrate styling and page composition rather than dynamic web app behavior. It uses straightforward HTML and CSS only, which makes it easy to expand with additional pages, product filters, JavaScript interactions, or a full e-commerce flow later.

If you want to extend this project further, possible next steps include:

- adding JavaScript for cart count updates
- creating separate product detail pages
- adding filters for category or price
- turning it into a React or Next.js shop
- integrating a real backend product database

---

## 8. Quick reference

Main files:

- `book.html` — page content and layout markup
- `book.css` — all visual styling
- `img/` — images

Main technologies:

- HTML5
- CSS3
- Google Fonts
- SVG icons
- Responsive web layout

This project is a static bookstore homepage built to demonstrate professional design and front-end layout skills using only HTML and CSS.
