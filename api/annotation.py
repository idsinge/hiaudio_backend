from flask import Blueprint, request, jsonify
from flask_jwt_extended import current_user, jwt_required
from flask_cors import cross_origin
from orm import TrackAnnotation

annotat = Blueprint('annotat', __name__)

@annotat.route('/addannotationstotrack', methods=['POST'])
@cross_origin()
@jwt_required()
def addannotationtotrack():

    user_auth = current_user.id
    rjson = request.get_json()
    track_uid = rjson.get("track_uid", None)   
    annot_key = rjson.get("key", None)
    annot_value = rjson.get("value", None)
  
    return jsonify({"ok":True})

@annotat.route('/addannotationstocomp', methods=['POST'])
@cross_origin()
@jwt_required()
def addannotationstocomp():

    user_auth = current_user.id
    rjson = request.get_json()
    track_uid = rjson.get("track_uid", None)   
    annot_key = rjson.get("key", None)
    annot_value = rjson.get("value", None)
  
    return jsonify({"ok":True})


def get_track_annotations(track_uid):
    track_annotations = TrackAnnotation.query.filter_by(track_uid=track_uid).all()
    annotations_list = [{
            "annot_uuid": annotation.uuid,
            "key": annotation.key,
            "value": annotation.value
        }  for annotation in track_annotations]
    return annotations_list
