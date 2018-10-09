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

	response.status = 200
	response.headers['Access-Control-Allow-Origin'] = '*'
	sorted_my_dict = sorted(myDict.items(), key=operator.itemgetter(1))
	first_20 = sorted_my_dict[-20:]
	return json.dumps(first_20[::-1])

run(host='localhost', port=8080, debug=True)
