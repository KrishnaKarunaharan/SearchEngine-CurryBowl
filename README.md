# CurryBowl

## Running Unit Tests

To run unit tests, go into the `tests` directory and run the python script `test_server.py` and in a separate terminal, go into the `tests` directory and run the python script `unit_tests.py`

## Browser Compatibility

This project has only been tested on Chromium/ Chrome (and will likely only work on these browsers).

You may have to enable 3rd party cookies on your browser for this lab to work as intended.

## Deployment
The project is currently deployed to http://ec2-18-232-120-67.compute-1.amazonaws.com/

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
ab -n 1000 -c 25 http://ec2-18-232-120-67.compute-1.amazonaws.com/

```

Measurements were made using `ab`, `htop`, and `dstat`.