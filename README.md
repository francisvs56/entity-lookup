# EntityLookup

Search banks and addresses to retrieve structured metadata.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import your repo
3. Click Deploy — done!

## Add more data

Edit `src/entity-database.json` to add banks or addresses.
Each bank key is the lowercase search term (e.g. `"my bank name"`).
