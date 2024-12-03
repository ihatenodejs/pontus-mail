# pontus-mail
Landing page for p0ntus mail

# Self hosting
## Traditional Node.js
1. Clone the repo
   ```bash
   git clone https://github.com/ihatenodejs/pontus-mail.git
   cd pontus-mail
   ```
2. Copy the example `docker-compose.yml`
   ```bash
   mv docker-compose.yml.example docker-compose.yml
   ```
3. Make the `self` script executable
   ```bash
   chmod +x self
   ```
4. Use `self` script to serve files into `public/` directory
   ```bash
   ./self start
   ```

You will now have to use a server (NGINX, Apache2, etc.) to serve files from the `./public` directory. You may use the example `default.conf` with NGINX if you wish.

Make changes from the `./src` directory, and `self` will copy them over.
## With Docker
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
3. Make the `self` script executable
   ```bash
   chmod +x self
   ```
4. Start Docker containers
   ```bash
   docker compose up -d
   ```
5. Use `self` script to serve files into `public/` directory
   ```bash
   ./self start
   ```

You will now have a fully functioning NGINX server, serving the pontus-mail website from the `./public` directory. Make your changes in the `./src` directory, if any.