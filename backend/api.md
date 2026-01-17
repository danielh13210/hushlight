#Errors

{"error":"message goes here"}

#/devices/list
method:GET
{
  "uuid": {
    "value":integer from 0 to 100,
    "active":true,
    "last_update":unix time of last update, -1 if never
  }
}

#/devices/subscribe
method:POST
{
  "value":-1,
  "active":True,
  "last_update":-1
}

#/devices/update
method:PATCH
{
  "value":-1,
  "active":True,
  "last_update":current unix time
}

#formats
uuid can be anything
