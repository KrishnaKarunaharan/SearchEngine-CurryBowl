from bottle import route, run, request
@route('/submit', method ='POST')
def hello():    
    x = request.body.readlines()
    print (x)

run(host='localhost', port=8080, debug=True)
