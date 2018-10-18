from oauth2client.client import OAuth2WebServerFlow
from oauth2client.client import flow_from_clientsecrets
from googleapiclient.errors import HttpError
from googleapiclient.discovery import build
from bottle import route, run, request, response, redirect, static_file
import json
import operator
import httplib2

class UserData:
	def __init__(self, email, name, picture):
		self.email = email
		self.name = name
		self.picture = picture
		self.searchHistory = {}
		self.searchRecent = {}


words = {}
recent = []
users = {}
currentUser = UserData("empty","empty","empty")


SCOPES = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.email']

@route('/<filename>')
def file(filename):
	return static_file(filename, root='')

@route('/')
def home():
	print currentUser.name
	return static_file('index.html', root='')

@route('/logout', method ='GET')
def logout():
	global currentUser, words 
	if currentUser.email == "empty":
		return "[No User signed in]"  
	users[currentUser.email].searchHistory = words
	users[currentUser.email].searchHistory = words
	words = {}
	currentUser = UserData("empty","empty","empty")
	return "[No User signed in]"


@route('/login', method ='GET')
def login():
	response.headers['Access-Control-Allow-Origin'] = '*'
	response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
	response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
	flow = flow_from_clientsecrets("clientSecrets/client_secrets.json",
						scope= SCOPES, 
						redirect_uri="http://localhost:8080/redirect")
	uri = flow.step1_get_authorize_url()
	return uri

@route('/redirect')
def redirect_page():

	code = request.query.get('code', '')
	flow = OAuth2WebServerFlow(client_id= "350489526647-llj98uv4bjlj2ki7dc94g40t62k940uu.apps.googleusercontent.com",
							   client_secret= "msEV3dMER3rnUvKR_pnmGqK-",
							   scope=SCOPES,
							   redirect_uri= "http://localhost:8080/redirect")
	credentials = flow.step2_exchange(code)
	token = credentials.id_token['sub']

	http = httplib2.Http()
	http = credentials.authorize(http)
	# Get user email
	users_service = build('oauth2', 'v2', http=http)
	user_document = users_service.userinfo().get().execute()      
	  
	if user_document['email'] in users:
		currentUser = users[user_document['email']]
		global words
		words = currentUser.searchHistory
	else:
		newUser = UserData(user_document['email'], user_document['name'], user_document['picture'], )
		users[user_document['email']] = newUser 
		global currentUser, words 
		currentUser = newUser
		words = currentUser.searchHistory
	return home()

@route('/submit', method ='POST')
def submit():
	if currentUser.email == "empty":
		return words     
	line = request.body.read()
	inputData = json.loads(line)
	for key in inputData:
		words[key] = words.get(key, 0) + inputData[key]
		recent.insert(0,key)
		print recent

	response.status = 200
	response.headers['Access-Control-Allow-Origin'] = '*'
	sorted_my_dict = sorted(words.items(), key=operator.itemgetter(1))
	first_20 = sorted_my_dict[-20:]
	return json.dumps(first_20[::-1])

@route('/history', method ='GET')
def submit():
	if currentUser.email == "empty":
		return words  
	response.status = 200
	response.headers['Access-Control-Allow-Origin'] = '*'
	sorted_my_dict = sorted(words.items(), key=operator.itemgetter(1))
	first_20 = sorted_my_dict[-20:]
	return json.dumps(first_20[::-1])

@route('/CurrentUser', method ='GET')
def  UserDisplay():
	if currentUser.email == "empty":
		return "[No User signed in]"
	return "Name: ", currentUser.name, " Email: ", currentUser.email

run(host='localhost', port=8080, debug=True)
