const AWS = require('aws-sdk');

const elb = new AWS.ELB();
const ec2 = new AWS.EC2();
const { elbName } = process.env;
exports.handler = (event) => {
  console.log('Received Event: \n', JSON.stringify(event, undefined, 2)); // eslint-disable-line no-console
};

const elbparams = {
  LoadBalancerName:
        elbName,

};

elb.describeInstanceHealth(elbparams, (elberr, elbdata) => {
  const instanceStates = elbdata.InstanceStates;

  const oos = instanceStates.filter(oosFilter => oosFilter.State === 'OutOfService');
  if (elberr) {
    console.log(elberr, elberr.stack); // eslint-disable-line no-console
  } if (oos.length > 0) {
    oos.forEach((oosInstance) => {
      const oosInstanceId = oosInstance.InstanceId;
      const oosInstanceState = oosInstance.State;

      const ec2params = {
        InstanceIds: [
          oosInstanceId,
        ],
      };
      ec2.rebootInstances(ec2params, (ec2err, ec2data) => {
        if (ec2err) console.log(ec2err, ec2err.stack); // eslint-disable-line no-console
        console.log(`${oosInstanceId} is ${oosInstanceState}: Rebooting!!`); // eslint-disable-line no-console
        return ec2data;
      });
    });
  }
});
