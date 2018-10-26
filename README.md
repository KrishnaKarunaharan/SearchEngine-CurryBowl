# CurryBowl

## Running Unit Tests

To run unit tests, go into the `tests` directory and run the python script `test_server.py` and in a separate terminal, go into the `tests` directory and run the python script `unit_tests.py`

## Browser Compatibility

This project has only been tested on Chromium/ Chrome (and will likely only work on these browsers).

You may have to enable 3rd party cookies on your browser for this lab to work as intended.

## Deployment
The project is currently deployed to the IP address http://18.232.120.67/.

To launch a new instance, run the python script `deploy.py` and ssh into the new IP address and run the following commands:

```
sudo apt-get update
sudo apt-get install pip
cd CurryBowl
pip install -r packages.pip
```
