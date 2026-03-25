import 'zone.js';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

type Movie = {
  title: string;
  releaseYear: string;
};

type TreeNode = {
  name?: string;
  movies?: Movie[];
  subCategories?: TreeNode[];
};

@Component({
  selector: 'app-root',
  standalone: true,
  styles: [
    `
    .container-title {
      justify-self: center;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
    }
    .container {
      background-color: #2c3e50;
      padding: 20px;
      min-height: 100vh;
    }
    .card-list{
      justify-content: space-between;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    .card-box {
      justify-content: center;
      padding: 15px;
      margin: 15px;
      flex-direction: column;
      width: 14rem;
      font-family: sans-serif;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
      transition: transform 0.2s;
    }

    .card-box:hover {
      transform: scale(1.05);
    }

    .movie-name {
      font-size: 18px;
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 8px;
    }
    .movie-year {
      text-align: right;
      font-size: 14px;
      color: #7f8c8d;
    }
  `,
  ],
  template: `
    <h1 class="container-title">{{ title }}</h1>
    <div class="container">
      <div class="card-list">
      @for(movie of movieList; track movie.title){
        <div class="card-box">
          <div class="movie-name">{{movie.title}}</div>
          <div class="movie-year">{{movie.releaseYear}}</div>
        </div>
      }
    </div>
    </div>
  `,
})
export class App {
  title = '🎬 Movie Archive Explorer';
  data = MOVIE_DATABASE;
  movieList: Movie[] = [];

  ngOnInit() {
    this.movieList = this.getAllSections(this.data);
  }

  getAllSections(root: TreeNode): Movie[] | [] {
    const result: Movie[] = [];

    function traverse(node: TreeNode) {
      if (!node) return;

      if (node.movies) {
        result.push(...node.movies);
      }

      // Recursively check sub-categories
      if (node.subCategories && node.subCategories.length > 0) {
        for (const child of node.subCategories) {
          traverse(child);
        }
      }
    }

    traverse(root);
    return result;
  }
}

/**
 * This is a movie archive tree. Suppose this data was loaded via REST service.
 * The tree content could look different when fetching for another company
 * while the structure always stays the same.
 * Please keep that in mind.
 */
const MOVIE_DATABASE: TreeNode = {
  subCategories: [
    {
      name: 'Universal Pictures',
      movies: [{ title: 'Oppenheimer', releaseYear: '2023' }],
      subCategories: [
        {
          name: 'Sci-Fi Classics',
          movies: [{ title: 'Jurassic Park', releaseYear: '1993' }],
          subCategories: [
            {
              name: 'Time Travel',
              movies: [
                { title: 'Back to the Future', releaseYear: '1985' },
                { title: 'Back to the Future II', releaseYear: '1989' },
              ],
            },
            {
              name: 'Space Exploration',
              movies: [
                { title: 'Apollo 13', releaseYear: '1995' },
                { title: 'First Man', releaseYear: '2018' },
              ],
            },
          ],
        },
        {
          name: 'Action & Thriller',
          movies: [{ title: 'Jason Bourne', releaseYear: '2016' }],
          subCategories: [
            {
              name: 'Fast Saga',
              movies: [
                { title: 'The Fast and the Furious', releaseYear: '2001' },
                { title: 'Fast Five', releaseYear: '2011' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

bootstrapApplication(App);
