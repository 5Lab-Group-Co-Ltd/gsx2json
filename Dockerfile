FROM node:14-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# Bundle app source
ADD . /usr/src/app
RUN yarn install

# Set environment variables
ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 8080

# Clear the cache
RUN yarn cache clean

EXPOSE 8080
CMD [ "yarn", "start" ]