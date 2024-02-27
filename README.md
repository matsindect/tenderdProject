# Vehicle Tracking System

This is a simplified version of a Fleet Management System that allows users to track and manage different vehicles used in logistics, construction, or any other fleet-intensive industry.

# Architecture

* React Frontend app
* Nodejs Backend server
* Mongodb Database
* Kafka messaging

Using Kafka and zookeeper message queeing, the project implements a iot gps device simulator.
This is achieved by calling a google routes API to get geolacation coordinates for a trip from DMCC, UAE to Dubai Airport Freezone, UAE. The Kafka producer then sends each coordinate in five second intervals to a gps_data. The Kafka consumer the consumes the data and broadcasts them to the clients using socketio. This Simulates a moving vehicle on the google map as shown below.

![Image](https://github.com/matsindect/tenderdProject/assets/52255514/81701572-4257-4996-99a7-06380a2c02f6)

Mongodb is used to save registerd vehicles and maintainance logs.

To view the documentation of the APIs, you can click on documentation on the bottom left corner of the dashboard.

# How to install

1. Install docker
2. Clone the repository
3. Open terminal in home folder with client and server folder
4. Run the command `docker-compose -f docker-compose.yml up -d`
5. Open browser and go to http://localhost:3000

# Note

If the server does not start, the change directory into server and manually create and run the docker image using `docker build -t image-name .`  and `docker run --name container-name image-name`


