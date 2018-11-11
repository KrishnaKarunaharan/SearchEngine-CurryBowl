from boto import ec2
import os, sys

if len(sys.argv) != 3:
    print "Usage:",sys.argv[0],"<key> <project_dir>"
    exit()

key = sys.argv[1]
project_dir = sys.argv[2]

conn = ec2.connect_to_region("us-east-1")
reservations = conn.get_all_instances()
instances = [i for r in reservations for i in r.instances]
for inst in instances:
    if inst.state == 'terminated':
	continue
    print "\nTerminating",inst,"..."
    inst.terminate()
    while inst.update() != 'terminated':
	pass

resp = conn.run_instances("ami-06b5810be11add0e2",instance_type="t2.micro", key_name="CurryKey", security_groups=["csc326-group10"])
inst = resp.instances[0]
print "\nStarting",inst,"..."
while inst.update() != 'running':
    pass

print "\n",inst,"started with IP address",inst.ip_address

print "Crawling and initializing database..."
import run_backend_test

print "Deploying files..."
os.system("rsync -e \"ssh -i" + key +"\" -av " + project_dir + " ubuntu@" + inst.ip_address + ":~")
