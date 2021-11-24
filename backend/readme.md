# BB Foundry Test Back-end
This is a test back-end for BB Foundry for resource management. It comprises of three main endpoints
* `/employees`
* `/clients`
* `/engagements`
* `/websockets`
> Note: All data is generated automatically and is randomized. Ids, names and start dates are not static.
# Setup
## Installation
```bash
$ npm install
```
## Running
#### Production
```bash
$ npm run start 
```
#### Development
```bash
$ npm run dev
```

# API
## Employees and Clients
These endpoints are the same with the exception of their names. For brevity's sake, they've been documented as `/employees`.

### <b style="color: #42d42f">GET</b> `/employees`
Get all employees.
```JSON
[
  {
    "id": "824615f1-dcd2-4821-9ad7-95f62f233551",
    "name": "Deontae"
  },
  {
    "id": "826c1f02-16fa-434d-a47d-ae5b0b59637d",
    "name": "Adelbert"
  },
]
```

### <b style="color: #e39b36">POST</b> `/employees`
Creates a new employee. 
<span style="color: #de2307">Required*</span> `name`
__Errors__
* <b style="color: #e00202">400</b> Bad request.
* <b style="color: #e00202">404</b> Not found.

###### Example curl
```bash
curl --location --request POST 'http://localhost:8080/api/v1/employees' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "test"}'
```

###### Response
```JSON
[
  {
    "id": "824615f1-dcd2-4821-9ad7-95f62f233551",
    "name": "Deontae"
  },
  {
    "id": "826c1f02-16fa-434d-a47d-ae5b0b59637d",
    "name": "Adelbert"
  },
  {
  	"id": "182eeb3b-7a60-446d-bfe8-70d81ee49995",
	"name": "test"
  }
]
```
### <b style="color: #42d42f">GET</b> `/employees/:id`
Gets an employee with a specific UUID/GUID
<span style="color: #de2307">Required*</span> `ID`
__Errors__
* <b style="color: #e00202">400</b> Bad request.
* <b style="color: #e00202">404</b> Not found.
###### Example error
```JSON
{
  "status": "error",
  "message": "No employee with that ID",
  "stack": "🥞"
}
```

###### Response
```JSON
[
  {
    "id": "824615f1-dcd2-4821-9ad7-95f62f233551",
    "name": "Deontae"
  },
  {
    "id": "826c1f02-16fa-434d-a47d-ae5b0b59637d",
    "name": "Adelbert"
  },
  {
  	"id": "182eeb3b-7a60-446d-bfe8-70d81ee49995",
	"name": "test"
  }
]
```

### <b style="color: #42d42f">GET</b> `/employees/:id/engagements`
Gets an employee with a specific UUID/GUID
<span style="color: #de2307">Required*</span> `ID`
__Errors__
* <b style="color: #e00202">400</b> Bad request.
* <b style="color: #e00202">404</b> Not found.
###### Example error
```JSON
{
  "status": "error",
  "message": "No employee with that ID",
  "stack": "🥞"
}
```

###### Response
```JSON
[
  {
    "id": "b314f198-a8c7-4fc7-97aa-3dbffec4fbd0",
    "name": "facere",
    "description": "Lorem Ipsum",
    "start": 1624910991679, // UNIX timestamp
    "end": null, // UNIX timestamp or null
    "employee": {
      "id": "bac2bca5-bf2a-4296-97f2-cfeddac7a1af",
      "name": "Daren"
    },
    "client": {
      "id": "acd101c8-5d24-4b0b-bf22-1d23cd662aa7",
      "name": "Littel Inc"
    }
  }
]
```


### <b style="color: #ffe500">PUT</b> `/employees/:id`
Update the specified employees name.
<span style="color: #de2307">Required*</span> `ID`
__Errors__
* <b style="color: #e00202">400</b> Bad request.
* <b style="color: #e00202">404</b> Not found.
###### Curl
```bash
curl --location --request PUT 'http://localhost:8080/api/v1/employees/{id}' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "test"}'
```
###### Example error
```JSON
{
  "status": "error",
  "message": "No employee with that ID",
  "stack": "🥞"
}
```
###### Response
```JSON
[
  {
    "id": "824615f1-dcd2-4821-9ad7-95f62f233551",
    "name": "Test"
  },
  {
    "id": "826c1f02-16fa-434d-a47d-ae5b0b59637d",
    "name": "Adelbert"
  },
  {
  	"id": "182eeb3b-7a60-446d-bfe8-70d81ee49995",
	"name": "test"
  }
]
```

### <b style="color: red">DELETE</b> `/employees/:id`
Delete a employee.
<span style="color: #de2307">Required*</span> `ID`
__Errors__
* <b style="color: #e00202">400</b> Bad request.
* <b style="color: #e00202">404</b> Not found.
###### Curl
```bash
curl --location --request PUT 'http://localhost:8080/api/v1/employees/{id}' \
--header 'Content-Type: application/json' \
```
###### Example error
```JSON
{
  "status": "error",
  "message": "No employee with that ID",
  "stack": "🥞"
}
```
###### Response
```JSON
[
  {
    "id": "824615f1-dcd2-4821-9ad7-95f62f233551",
    "name": "Test"
  },
  {
    "id": "826c1f02-16fa-434d-a47d-ae5b0b59637d",
    "name": "Adelbert"
  },
  {
  	"id": "182eeb3b-7a60-446d-bfe8-70d81ee49995",
	"name": "test"
  }
]
```


## Engagements
Engagements are periods of time when an employee is working for a client. A client can have multiple projects going on and employees can be assigned to multiple projects.
### <b style="color: #42d42f">GET</b> `/engagements`
Get all engagements
###### Response
```JSON
[
	{
		"id": "21d84dd5-295e-4d0e-819e-748f07b11f72",
		"name": "fugiat",
		"description": null, // null or lorem ipsum
		"start": 1617300192195,
		"end": null, // null or lorem ipsum
		"employee": {
		  "id": "f3ffd246-6a61-4409-adad-df1b5f9eac14",
		  "name": "Kellie"
		},
		"client": {
		  "id": "d0e04a9f-3d8d-41e1-884e-37c558e8af0b",
		  "name": "Lindgren Group"
		}
  	},
	...
]

```

### <b style="color: #42d42f">GET</b> `/engagements/:id`
Get a specific engagement from UUID / GUID.
###### Response
```JSON
[
	{
		"id": "21d84dd5-295e-4d0e-819e-748f07b11f72",
		"name": "fugiat",
		"description": null, // null or lorem ipsum
		"start": 1617300192195,
		"end": null, // null or lorem ipsum
		"employee": {
		  "id": "f3ffd246-6a61-4409-adad-df1b5f9eac14",
		  "name": "Kellie"
		},
		"client": {
		  "id": "d0e04a9f-3d8d-41e1-884e-37c558e8af0b",
		  "name": "Lindgren Group"
		}
  	}
]

```

### <b style="color: #e39b36">POST</b>  `/engagements`
Creates a new engagement between a client and employee.
__Optional Parameters__
- Description
- Started

__Errors__
* <b style="color: #e00202">400</b> Bad request.
	- No employee id
	- No client id
	- Invalid chars in description ```/[a-zA-Z_0-9\[\],.\/\`!@#$%^&*()_+-=\s]/```
	- No employee with that id was found
	- No client with that id was found
* <b style="color: #e00202">404</b> Not found.


###### Curl
```bash
curl --location --request POST 'http://localhost:8080/api/v1/engagements/' \
--header 'Content-Type: application/json' \
--data-raw '{
 "name": "name",
 "description": "description",
 "client": {"id": ":id"},
 "employee": {"id":":id"},
 "started": "UNIX TIMESTAMP / new Date.getTime()"
}'
```

###### Response
```JSON
[
	 {
		 "id": "21d84dd5-295e-4d0e-819e-748f07b11f72",
		 "name": "test",
		 "start": 1617300192195,
		 "end": null,
		 "employee": {
		 "id": "f3ffd246-6a61-4409-adad-df1b5f9eac14",
		 "name": "Kellie"
		 },
		 "client": {
			"id": "d0e04a9f-3d8d-41e1-884e-37c558e8af0b",
			"name": "Lindgren Group"
		}
 	},
	...
	// rest of the engagements here
]

```


### <b style="color: #ffe500">PUT</b> `/engagements/:id`
Updates an engagement between a client and employee.
__Optional Parameters__
- name
- description
- ended
- started

__Errors__
* <b style="color: #e00202">400</b> Bad request.
	- Invalid chars in description ```/[a-zA-Z_0-9\[\],.\/\`!@#$%^&*()_+-=\s]/```
* <b style="color: #e00202">404</b> Not found.


###### Curl
```bash
curl --location --request PUT 'http://localhost:8080/api/v1/engagements/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
 "name": "name",
 "description": "description",
 "started": "UNIX TIMESTAMP / new Date.getTime() / null"
 "ended": "UNIX TIMESTAMP / new Date.getTime() / null"
}'
```

###### Response
```JSON
[
	 {
		 "id": "21d84dd5-295e-4d0e-819e-748f07b11f72",
		 "name": "test",
		 "start": 1617300192195,
		 "end": 1617300199374,
		 "employee": {
		 "id": "f3ffd246-6a61-4409-adad-df1b5f9eac14",
		 "name": "Kellie"
		 },
		 "client": {
			"id": "d0e04a9f-3d8d-41e1-884e-37c558e8af0b",
			"name": "Lindgren Group"
		}
 	},
	...
	// rest of the engagements here
]

```



### <b style="color: red">DELETE</b> `/engagements/:id`
__Errors__
* <b style="color: #e00202">400</b> Bad request.
* <b style="color: #e00202">404</b> Not found.


###### Curl
```bash
curl --location --request DELETE 'http://localhost:8080/api/v1/engagements/:id' \
--header 'Content-Type: application/json' 
```

###### Response
```JSON
[
	 {
		"id": "21d84dd5-295e-4d0e-819e-748f07b11f72",
		"name": "fugiat",
		"description": null,
		"start": 1617300192195,
		"end": null,
		"employee": {
			"id": "f3ffd246-6a61-4409-adad-df1b5f9eac14",
			"name": "Kellie"
		},
		"client": {
			"id": "d0e04a9f-3d8d-41e1-884e-37c558e8af0b",
			"name": "Lindgren Group"
		}
	},
	...
	// rest of the engagements here
]

```


## Web-socket
Not required for the scope of the assessment but non the less added this access point for those who like sockets.
> NOTE: This isn't 100% 'live' as it short polls the DB for updates.


### <b style="color: green">WS</b> `/websocket`
###### On message
```JS
{
  type: 'DB update',
  data: {
    employees: [
		...
    ],
    clients: [
		...
    ],
    engagements: [
		...
    ],
    update: false
  }
}

```