# Vehicle Tracking System

This is a simplified version of a Fleet Management System that allows users to track and manage different vehicles used in logistics, construction, or any other fleet-intensive industry.

# Architecture

* React Frontend app
* Nodejs Backend server
* Mongodb Database
* Kafka messaging

Using Kafka and zookeeper message queeing, there progect implements a iot gps device simulator.
This is achieved by calling a google routes API to get geolacation coordinates for a trip from DMCC, UAE to Dubai Airport Freezone, UAE. The Kafka producer then sends each coordinate in five second intervals to a gps_data. The Kafka consumer the consumes the data and broadcasts them to the clients using socketio. This Simulates a moving vehicle on the google map as shown below.

![Image Description](ihttps://raw.githubusercontent.com/matsindect/tenderdProject/main/tenderd.png)

Mongodb is used to save registerd vehicles and maintainance logs.

# How to install

1. Install docker
2. Clone the repository
3. Open terminal in home folder with client and server folder
4. Run the command `docker-compose -f docker-compose.yml up -d`
5. Open browser and go to http://localhost:3000


