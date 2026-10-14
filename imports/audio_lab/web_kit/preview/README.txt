Preview (Windows PowerShell), from this folder:
  npm i -D react react-dom typescript @types/react @types/react-dom @types/node esbuild tailwindcss@3
  npx esbuild preview/entry.tsx --bundle --outfile=preview/dist/app.js --jsx=automatic --alias:@=./src --define:process.env.NODE_ENV='"development"'
  npx tailwindcss -c tailwind.config.cjs -i preview/input.css -o preview/dist/app.css
  node preview/serve.mjs 5353
Then open http://localhost:5353/?song=seyi&profile=balanced&t=15.5   (add &play=1 to start the silent clock)

Squall (the weather-map visual), same server:
  npx esbuild preview/squall-entry.tsx --bundle --outfile=preview/dist/squall.js --jsx=automatic --alias:@=./src --define:process.env.NODE_ENV='"development"'
  npx tailwindcss -c tailwind.config.cjs -i preview/input.css -o preview/dist/squall.css
  node preview/serve.mjs 5353
Then open http://localhost:5353/squall  (?source=demo | song:seyi | song:detty starts a source; ?view=switch has a Squall/Constellation toggle)
Browser checks (Edge, headless): node --import ./tests/resolve-ts.mjs --experimental-transform-types preview/squall-check.mjs [render audio offline pointer cleanup states a11y]
