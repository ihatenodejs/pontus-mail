# pontus-mail

[![Last Update](https://img.shields.io/badge/last_update-23_Jan_2025-blue)](https://github.com/ihatenodejs/pontus-mail)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)

Landing page for p0ntus mail

## Self hosting

### Using Express

1. Clone the repo

   ```bash
   git clone https://github.com/ihatenodejs/pontus-mail.git
   cd pontus-mail
   ```

2. Copy the example `docker-compose.yml`

   ```bash
   mv docker-compose.yml.example docker-compose.yml
   ```

3. Copy the example `donations.json`

   ```bash
   mv donations.json.example donations.json
   ```

4. Copy the example `.env`

   ```bash
   mv .env.example .env
   ```

   Make sure you edit this with the desired internal port. We suggest keeping the internal port set to `3000`.
5. Install dependencies

   ```bash
   npm install
   ```

6. Start the server

   ```bash
   node app.js
   ```

You will now have a fully functioning Node.js Express server, which will be running on port `3000`.

### Using Docker

You can also use Docker to self-host pontus-mail's frontend. Make sure you have docker-compose or docker-compose-plugin installed on your system.

1. Clone the repo

   ```bash
   git clone https://github.com/ihatenodejs/pontus-mail.git
   cd pontus-mail
   ```

2. Copy the example `docker-compose.yml`

   ```bash
   mv docker-compose.yml.example docker-compose.yml
   ```

3. Copy the example `.env`

   ```bash
   mv .env.example .env
   ```

   This configuration's defaults have been set to be compatible with Docker. Please do not change this file unless you know what you're doing!
4. Copy the example `donations.json`

   ```bash
   mv donations.json.example donations.json
   ```

5. Start and build Docker containers

   ```bash
   docker compose up -d --build
   ```

You will now have a fully functioning Node.js Express server, which will be running on the port specified in `docker-compose.yml`, and internally on port `3000`.

## To-Do

- [ ] Port to NextJS?
- [ ] Hovering effects for buttons
- [ ] Reintegrate backend logic for counters on home page
- [ ] Statistics animation
