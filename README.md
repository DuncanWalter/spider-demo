# Spider Stopwatch

A stupid-simple demo for a `react` + `typescript` application using the new hooks API and an experimental state store called `spider-store`. `react` and `typescript` can be a bit awkward when used together due to the mixture of paradigms at play, and I hope this demo is a refreshing take on well-typed `react` development.

## Running the App

```
npm install && npm run dev
```

And then open `localhost:8080` in a browser!

## Spider-Store

`spider-store` is a tiny (smaller than `redux`) framework agnostic state store. It provides observable state using pseudo-observable "slices" and will provide `redux-devtool` support when I get around to it. It _should_ run fine in IE11 (given a `Promise` implementation) along with other near-es5 browsers while also allowing for the fun, new stuff like tree shaking and code splitting. `spider-store` is designed for use with `typescript` and linting rules like `no-shadowed-variable`, so you won't be fighting your editor all day. Finally, `spider-store` is theoretically (not rigorously tested) about as optimized as aggressively used `reselect`.

I chose to make a stopwatch for the first demo because it uses side effects and frankly isn't as overdone as counters and todo-apps. As a tradeoff, I have not yet been forced to flesh out the forking utilities for optimizing rendering collections (the operator exists for the state slices, but it doesn't use keys and no hook is included in the hooks library). Until that gets done, the library `spider-hook` for using `spider-store` with `react` is admittedly a bit hamstrung.
