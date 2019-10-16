# elbrecover
**Unfortunately there is still infrastructure in 2019 that is not completely self healing.**

**Trend Micro MarketPlace product is an example of this.**

## Situation
* Both Instance Status Checks pass
* ELB Health Check Fails
* Nothing happens, instance stays offline

## The Fix

This CF template will automatically recovers(reboots) the instance with the failed health check.

## How it works

* Cloudwatch detects an "Unhealthy Host Count" event on the specified ELB. 
* Sends it to SNS 
* SNS > Lambda 
* Lambda > Reboot instance that has failed its healthcheck.

## Paramaters


* ELBName1 - Specify the Load Balancer Name that you want to monitor for unhealthy hosts.

* EmailEndpoint - Specify the email address to be notified of self healing events (Leave blank for none)

* CustomerName - This will add whatever you enter here as the subject of the email notification (Leave blank for none)


**You can thank me later Windows Admins :)**
