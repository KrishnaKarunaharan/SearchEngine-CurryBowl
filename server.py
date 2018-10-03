from bottle import route, run, request, response
import json
import operator

myDict = {}

@route('/submit', method ='POST')
def submit():    
	line = request.body.read()
	inputData = json.loads(line)
	for key in inputData:
		myDict[key] = myDict.get(key, 0) + inputData[key]

	theBody = json.dumps({'hello': 'world'})
	response.status = 200
	response.headers['Access-Control-Allow-Origin'] = '*' #TODO: Check with the TA if this is okay
	sorted_myDict = sorted(myDict.items(), key=operator.itemgetter(1))
	first_20 = sorted_myDict[-20:]
	return json.dumps(first_20[::-1])

run(host='localhost', port=8080, debug=True)
