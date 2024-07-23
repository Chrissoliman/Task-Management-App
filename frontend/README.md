This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

## First, install all dependencies in both frontend folder and backend folder

```bash
cd .\frontend\
npm install

cd .\backend\
npm install
```

## Second, add .env file in both frontend and backend folders
Add MongoDB URI by creating a cluster

```bash
NODE_ENV='development'
JWT_SECRET=
MONGO_URI=
```

## Third, run the backend server:

```bash
cd .\backend\
npm run dev
```

## Fourth, run the frontend server:

```bash
cd .\frontend\
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Built with:
1- Next js
2- Node js / express
3- Typescript
4- MongoDB
5- Redux