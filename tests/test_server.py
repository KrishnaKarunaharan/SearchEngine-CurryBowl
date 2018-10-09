from bottle import route, static_file, run
import os

@route('/1')
def showPage(filename='index1.html'):
    return static_file(filename, ".")

@route('/2')
def showPage(filename='index2.html'):
    return static_file(filename, ".")


run(host='localhost', port=8080, debug=True)