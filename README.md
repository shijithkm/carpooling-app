# CarpoolingApp

# Step - 1

Install node js from this link https://nodejs.org/en/
<br>after install open terminal and run this command
<br>`npm -v` this should return the current node version

# Step - 2

Open terminal and choose your project folder and clone it using this below command 
<br> `git clone https://github.com/shijithkm/carpooling-app.git`;

# Step - 3

After cloning we need to install our node modules which is mentioned in package.json
<br>first foucus to our application then install
<br>`cd carpooling-app`
<br>`npm install`

# Step - 4

Now we need to configure api written on node
<br>Open an another terminal and focus to carpooling-app\server
<br>`npm install` run this command to install dependencies 
<br> After install we can start the server using below command
<br>`node server`
<br>If everything you will get a message saying `App listening on port 5000`

# Step - 5

Now go to previous terminal which pointed on carpooling-app and run below command to start our application
<br> `ng serve --aot`
<br> This will run the application and you can check from browser using http://localhost:4200
<br> username is hardcoded to 'developer.shijith@gmail.com' and password is 'password'

