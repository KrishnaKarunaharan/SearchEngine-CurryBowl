from bottle import route, run, request
import json

myDict = {}

@route('/submit', method ='POST')
def submit():    
	line = request.body.read()
	inputData = json.loads(line)
	for key in inputData:
		myDict[key] = myDict.get(key, 0) + inputData[key]

	print myDict

@route('/history', method ='get')
def history():

	return history

run(host='localhost', port=8080, debug=True)
