FROM node:8.11

ENV APP_PATH /component
ENV APP_USER cargox
ENV YARN_CACHE_FOLDER /node_modules/.cache/yarn
ENV NODE_MODULES /node_modules

# UID of the user that will be created
ARG UID

# Validating if UID argument was provided
RUN : "${UID:?You must provide a UID argument when building this image.}"

# Creating an user so we don't run everything as root
RUN deluser node
RUN useradd --home-dir $APP_PATH -u $UID $APP_USER

# Create node_modules directory and changing its owner
RUN mkdir /node_modules && chown -R $APP_USER:$APP_USER /node_modules

WORKDIR $APP_PATH

COPY . $APP_PATH

CMD ["yarn", "serve"]
