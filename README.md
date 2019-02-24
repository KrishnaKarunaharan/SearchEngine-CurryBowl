# CurryBowl
Developed basic search engine using Crawler.py using AWS and Google Authentication services. Final project for CSC326 (Computer Languages Fundementals).



Created by: Krishna Karunaharan & Garauv Kishore

## Description
Search Engine that utilizes, 

## Running locally
Please use the `master` branch when running the webserver locally by running the python script `server.py`. When running on an EC2 instance, use the `aws-ec2` branch and run the script as `sudo`.

## Running Unit Tests

To run unit tests, go into the `tests` directory and run the python script `test_server.py` and in a separate terminal, go into the `tests` directory and run the python script `unit_tests.py`

## Browser Compatibility

This project has only been tested on Chromium/ Chrome (and will likely only work on these browsers).

You may have to enable 3rd party cookies on your browser for this lab to work as intended.

## Deployment
Please use the `aws-ec2` branch for deployment.

The project is currently deployed to http://ec2-18-208-115-52.compute-1.amazonaws.com/

To update the URL database, run the python script `run_backend_test.py`

To launch a new instance, run the python script `deploy.py` and ssh into the new IP address and run the following commands:

```
sudo apt-get update
sudo apt-get install pip
cd CurryBowl
pip install -r packages.pip
```


## Benchmarking
Benchmarking results can be seen in RESULT.md.

The following command was used as a benchmark test:

```
ab -n 1000 -c 25 -p post.txt http://ec2-18-208-115-52.compute-1.amazonaws.com/submit

```

Where `post.txt` contains a single line of text (the search query).

Measurements were made using `ab`, `htop`, and `dstat`.

Full results are in `RESULT.md`.
