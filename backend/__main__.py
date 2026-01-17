from flask import Flask, jsonify, request
import time
import pickle
import os, shutil
from flask_cors import CORS

# if a room does not respond in 2 minutes, mark as inactive
timeout=120 #2 minutes

app=Flask("Noise meter API")
CORS(app)
devices={}
fpath=os.path.expanduser("~/.quackers/noisemeter/save_file.pkl")
os.makedirs(os.path.dirname(fpath),exist_ok=True)
if os.path.isfile(fpath):
	for dev_id in pickle.load(f:=open(fpath,'rb')):
		devices[dev_id]={"value":-1,"active":True,"last_update":-1}
	f.close()

@app.route("/devices/list")
def list():
	current_time=int(time.time())
	returned_data=[]
	for uuid in devices:
		if current_time-devices[uuid]["last_update"]>timeout:
			devices[uuid]["active"]=False
		final_device=dict(devices[uuid])
		final_device["uuid"]=uuid
		returned_data.append(final_device)
	return jsonify(returned_data)
@app.route("/devices/update",methods=["PUT"])
def update():
	uuid=request.args.get("uuid")
	value=request.args.get("value")
	if (not uuid) or (not value):
		return jsonify({"error":"uuid and value required"})
	elif uuid not in devices:
		devices[uuid]={}
	devices[uuid]["active"]=True
	devices[uuid]["last_update"]=int(time.time())
	try:
		value=int(value)
		if 0<=value<=100:
			devices[uuid]["value"]=value
		else:
			raise ValueError
	except ValueError:
		return jsonify({"error":"value must be an integer from 0-100"})
	return jsonify(devices[uuid])

app.run(host="0.0.0.0")
