# Ngrx feature workflow

We're going to create a new post list with Ngrx.

First we create the new module `Posts`

```bash
ng g m Posts --routing -m app --route=posts
```

Adding the ngrx feature.

```bash
ng g f posts/Post -m posts/posts.module.ts -g
```

Dispatch `loadPost` in the component init.

```ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromPost from '../reducers/post.reducer';
import { loadPosts } from '../actions/posts.actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private store: Store<fromPost.State>) { }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }

}
```

Create a 

ng g service posts/services/Posts y lo rellenamos

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
```

Modificamos las acciones de posts.actions para añadir parámetros

```ts
export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ posts: any[] }>()
);
```

Modificamos el efecto

```ts
loadPosts$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(PostActions.loadPosts),
    exhaustMap(() =>
      this.postsService.getAll().pipe(
        map((data: any[]) => {
          return PostActions.loadPostsSuccess({ posts: data });
        }),
      )
    )
  );
});
```

nos vamos al reducer y lo completamos.

```ts

export interface State {
  posts: any[];
}

export const initialState: State = {
  posts: []
};


export const reducer = createReducer(
  initialState,

  on(PostActions.loadPosts, state => state),
  on(PostActions.loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts
    };
  }),
  on(PostActions.loadPostsFailure, (state, action) => state),

);
```

Añadir ReactiveComponentModule a posts

```ts
import { ReactiveComponentModule } from '@ngrx/component';
ReactiveComponentModule
```


Creamos selector 

```ts
export const selectPosts = createSelector(
  selectPostState,
  (state: fromPost.State) => state.posts
);
```

Componente añadimos

```ts
import { Component, OnInit } from '@angular/core';
export class PostsComponent implements OnInit {
  posts$: Observable<any[]>;

  constructor(private store: Store<fromPost.State>) { }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());

    this.posts$ = this.store.select(selectPosts);
  }

}
```

al html

```html
<div *ngFor="let post of posts$ | ngrxPush">
  {{ post.title }}
</div>
```
