FROM node:19.7-alpine AS sk-build
WORKDIR /usr/src/app

ARG PUBLIC_SUPABASE_URL=${PUBLIC_SUPABASE_URL}
ENV PUBLIC_SUPABASE_URL=${PUBLIC_SUPABASE_URL}

ARG PUBLIC_SUPABASE_ANON_KEY=${PUBLIC_SUPABASE_ANON_KEY}
ENV PUBLIC_SUPABASE_ANON_KEY=${PUBLIC_SUPABASE_ANON_KEY}

ARG TZ=Pacific/Auckland

COPY . /usr/src/app
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm ci
RUN npm install -g @supabase/supabase-js
RUN npm run build

FROM node:19.7-alpine
WORKDIR /usr/src/app

ARG TZ=Pacific/Auckland
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=sk-build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=sk-build /usr/src/app/package-lock.json /usr/src/app/package-lock.json

COPY --from=sk-build /usr/src/app/build /usr/src/app/build

EXPOSE 3000
CMD ["node", "build/index.js"]