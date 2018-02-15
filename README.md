# OctoPi-SMS-Alerts
Have your OctoPrint instance text you on events!

This is meant to be run as a daemon on the Raspberry pi or other machine you are running OctoPrint on.

## Getting Started

On your development machine: 

```
git clone git@github.com:nodebotanist/OctoPi-SMS-Alerts.git
```

create a `watcher/.env` file that contains the following:

TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
YOUR_PHONE_NUMBER=YOUR_RECIPIENT_PHONE_NUMBER
TWILIO_PHONE_NUMBER=YOUR_TWILIO_PHONE_NUMBER

```
cd watcher
chmod +x sync-files.sh
./sync-files.sh
```

Then, login to your OctoPrint instance, install the dependencies, and run it using a daemonizer (I use forever):

```
ssh pi@octopi.local
[login prmopt]

> cd octopi-event-alerts
> npm i
> npm i -g forever
> forever run index.js
```

And you should start receiving texts right away!
