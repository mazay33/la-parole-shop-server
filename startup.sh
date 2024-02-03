#!/bin/sh
cp .env ./prisma/.env
npx prisma migrate dev
npm run dev
