from flask import Flask, jsonify, request
import time
import pickle
import os, shutil

# if a room does not respond in 2 minutes, mark as inactive
timeout=120 #2 minutes

app=Flask("Noise meter API")
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
	for uuid in devices:
		if current_time-devices[uuid]["last_update"]>timeout:
			devices[uuid]["active"]=False
	return jsonify(devices)

@app.route("/devices/subscribe",methods=["POST"])
def subscribe():
	uuid=request.args.get("uuid")
	if not uuid:return jsonify({"error":"uuid required"})
	if uuid not in devices:
		devices[uuid]={"value":-1,"active":True,"last_update":-1}
		pickle.dump(tuple(devices.keys()),f:=open(tmpfilepath:=os.path.expanduser("~/.quackers/noisemeter/save_file.pkl.tmp"),'wb'))
		f.close()
		shutil.move(tmpfilepath,fpath) # atomic save
	return jsonify(devices[uuid])
	
@app.route("/devices/update",methods=["PATCH"])
def update():
	uuid=request.args.get("uuid")
	value=request.args.get("value")
	if (not uuid) or (not value):
		return jsonify({"error":"uuid and value required"})
	elif uuid not in devices:
		return jsonify({"error":"specified device not found"})
	try:
		value=int(value)
		if 0<=value<=100:
			devices[uuid]["value"]=value
		else:
			raise ValueError
	except ValueError:
		return jsonify({"error":"value must be an integer from 0-100"})
	devices[uuid]["active"]=True
	devices[uuid]["last_update"]=int(time.time())
	return jsonify(devices[uuid])

app.run(host="0.0.0.0")
