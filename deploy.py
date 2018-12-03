from boto import ec2
import os, sys

if len(sys.argv) != 2:
    print "Usage:",sys.argv[0],"<key>"
    exit()

key = sys.argv[1]

conn = ec2.connect_to_region("us-east-1")

resp = conn.run_instances("ami-06b5810be11add0e2",instance_type="t2.micro", key_name="CurryKey", security_groups=["csc326-group10"])
inst = resp.instances[0]

print "\nStarting",inst.id,"..."
while inst.update() != 'running':
    pass
print "\n",inst.id,"started with IP address",inst.ip_address + "!"

print "\nCrawling and initializing database..."
import run_backend_test
print "\nCrawling and initilaization complete!"

print "\nDeploying files..."
while os.system("rsync -e \"ssh -i " + key +" -o StrictHostKeyChecking=no\" -av " + sys.path[0] + " ubuntu@" + inst.ip_address + ":~ 2> /dev/null") != 0:
    pass
print "\nFiles deployed!"
print "\nSetting up environment on",inst.id,"..."
os.system("ssh -i " + key + " ubuntu@" + inst.ip_address + " \'sudo apt-get update && sudo apt-get -y install python-pip && cd CurryBowl && sudo pip install -r packages.pip && screen -d -m sudo python server.py\'")
print "Deployment complete! Use the following command to access",inst.id,":"
print "\nssh -i " + key + " ubuntu@" + inst.ip_address
