# Healthcare Pricing WebApp

## Basic NextJS WebApp Setup

### Installing node
Follow this guide to install `nvm` which will be used to install `node` and `npm` for any version that we want. NVM stands for node version manager and keeps multiple versions of node in the computer without conflicts as well as making installation very easy.

https://tecadmin.net/install-nvm-macos-with-homebrew/

This project uses Node v16.

### Run the website locally
Run the following commands

```{bash}
nvm install 16
nvm use 16
npm install
npm run dev
```

This should give you a basic dev deployment with a link to see your website on the terminal

Now, to build and do what would be an actual deployment of the website do as follows:
```{bash}
npm run prisma # Here you may nead to tweak the output in src/database/schema.prisma
npm run build
npm run start
```

## Cloud deployment (deploy to the internet!)
### How to start an EC2 instance
Follow a guide like [this one](https://nzenitram.medium.com/spinning-up-an-ec2-instance-ef7e81044dc4) to spin an EC2 instance. 

I would recommend an Ubuntu instance, with 4GB of RAM and 30GB of disk. Ubuntu is more widely used than Amazon Linux so it's easy to fix the bugs, greater RAM ensures that you'll run into less Out Of Memory errors, so less headaches, and 30GB of disk is more than enough to fit this app.

To connect (note the username is valid for an ubuntu instance): 

```shell
ssh ec2-user@your-public-ip -i your-key-file
```

This can also be stored on `.ssh/config` for your convenience.


### How to deploy in AWS EC2 (to the entire internet)
First, ensure that the ports of your instance are open to the internet. It should look as follows.

![AWS EC2 Security Configuration](./ec2-security-config.png)

Note: for good security advice, visit your closest Cybersecurity expert, this is a proof of concept. 

The following code snippet is a good guide of all you need to setup Docker and install this repo on the instance.

1) **Setting up the repo for the first time in AWS EC2**
```shell
sudo apt update
sudo apt install awscli
# set up nvm
# https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/ 
sudo apt install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
. ~/.bashrc

nvm install 16
git clone https://github.com/felix-hh/healthcare-prices-webapp
aws configure # I use my credentials to get my SQLite database from s3. 
./dbS3Download.sh

# verify development setup
cd healthcare-prices-webapp
npm install && npm run dev

# On a separate terminal
ssh -N -L 8080:localhost:8080 cloud2 # here cloud2 is defined in ssh config
```
2) Setup Docker on the instance

```shell
# deploy
# install docker
curl -sSL https://get.docker.com/ | sh
sudo docker build -t hippo-webapp .
dockerd-rootless-setuptool.sh install
docker run hello-world # to troubleshoot
```

3) Use the existing Dockerfile to deploy an image of our website on port 80 (to the entire internet)
```shell
sudo docker build -t hippo-webapp .
sudo docker run --publish 80:80 -t hippo-webapp
```

And voila, deployed. Look up the Public IPv4 DNS of your EC2 instance and open it on your browser to see your website. It looks something like this: `ec2-<some-numbers>.<region-code>.compute.amazonaws.com`