# 🎬 Movie Archive Explorer

A modern, recursive Angular application designed to parse and visualize complex, nested data structures. This project transforms a hierarchical "Genre Tree Node" (Studios → Categories → Sub-categories) into a flattened, user-friendly movie gallery.

## 🚀 Overview

Handling nested data is a common challenge in software development (e.g., file systems, organization charts, or category menus). This project showcases a custom **recursive traversal algorithm** that navigates an N-level deep tree structure to extract and display data in a clean, card-based interface.

### Key Features
* **Recursive Data Processing:** A robust traversal engine that flattens deeply nested objects without losing performance.
* **Modern Angular Architecture:** Utilizes Angular 17+ standalone components and the new `@for` control flow syntax.
* **Strongly Typed:** Fully implemented with TypeScript interfaces to ensure data integrity and developer productivity.
* **Cinematic UI:** A responsive, "Dark Mode" inspired design with hover effects and CSS Flexbox layouts.

## 🛠️ Tech Stack

* **Framework:** Angular (Standalone Components)
* **Language:** TypeScript
* **Styling:** CSS3 (Modern Flexbox & Animations)
* **Utility:** Zone.js

## 🧠 Technical Highlight: The Flattening Logic

The core of this application is the `extractMovies` method. It demonstrates the ability to handle data that doesn't have a fixed depth by using a recursive helper function:

```typescript
extractMovies(root: GenreCategory): Movie[] {
  const result: Movie[] = [];
  const traverse = (node: GenreCategory) => {
    if (!node) return;

    // Extract movies at the current level
    if (node.movies) {
      result.push(...node.movies);
    }

    // Recurse into deeper sub-categories
    if (node.subCategories && node.subCategories.length > 0) {
      for (const child of node.subCategories) {
        traverse(child);
      }
    }
  };
  traverse(root);
  return result;
}
```

## 📂 Project Structure

* **`Movie`**: The base interface defining the core properties of movie objects.
* **`TreeNode`**: A recursive interface capable of nesting both arrays of movies and sub-arrays of itself, allowing for deep category trees.
* **`App Component`**: The heart of the logic. It manages application state, triggers data extraction during the `ngOnInit` lifecycle hook, and handles the rendering of visual cards.

---

## 🏁 How to Run

Follow these steps to get your local development environment up and running:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/movie-archive-explorer.git](https://github.com/your-username/movie-archive-explorer.git)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Launch the dev server:**
    ```bash
    ng serve
    ```

4.  **View the app:**
    Navigate to `http://localhost:4200/` in your preferred browser.

---

## 🛣️ Future Roadmap

- [ ] **Real-time Filtering**: Add a search bar to filter the flattened movie list dynamically.
- [ ] **View Toggles**: Implement a "View by Category" toggle to switch between flat and hierarchical tree views.
- [ ] **API Integration**: Connect with an external API (like TMDB) to pull in live movie metadata and posters.

---

## 👤 Author

Developed by **Karen D** *Passionate about clean code and efficient data structures.*