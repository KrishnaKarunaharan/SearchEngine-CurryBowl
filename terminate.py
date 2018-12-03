from boto import ec2
import os, sys

if len(sys.argv) != 2:
    print "Usage:",sys.argv[0],"<instance_id>"
    exit()

instance_id = sys.argv[1]

conn = ec2.connect_to_region("us-east-1")
inst = conn.terminate_instances(instance_ids=[instance_id])[0]

print "Terminating instance", instance_id,"..."
while inst.update() != 'terminated':
    pass

print "Terminated instance" , instance_id , "successfully."
