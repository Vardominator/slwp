# Introduction
Welcome to the Sorin Lab Web Platform repository! You are either Dr. Sorin or a student researcher with top-notch development skills ready to contribute to a high-utility research tool. Below is only a quick setup guide. If you wish to create APIs for new Folding@Home studies or entirely new applications within the web platform, please refer to the Wiki. 

# Prerequisites
First and foremost, you must have a development environment set up on Banana. Contact the lab’s system administrator and ask him or her to set one up for you. Your environment’s domain should be:

```http://folding.cnsm.csulb.edu/[YOUR NAME]/slwp/```

Second, you need to have ```sshfs``` installed on your lab computer. Once set up, contact the system administrator again to recieve an identity file. This will allow you to mount your fork on your lab computer and directly edit the source.

# Installation
* Fork this repository => CHECKOUT BRANCH
* Pull the forked repository into your personal environment on Banana
* In ```templates/index.html```, change the url to ```/[YOUR NAME]/slwp/home.html/```

# Development
To mount the project onto your machine, execute the following command:

```sshfs server@134.139.52.4:/home2/www/slwp-[YOUR NAME]-env/slwp <[YOUR LOCAL DIRECTORY]> -o IdentityFile=<[PATH TO IDENTITY FILE]>```

YOUR LOCAL DIRECTORY: Location on your machine where you want to mount the project to

PATH TO IDENTITY FILE: Location of the identity file that was given to you by the system administrator

Once you are done making edits, you can merge request with the master branch.
