from flask import Blueprint, request, jsonify
from flask_jwt_extended import current_user, jwt_required
from flask_cors import cross_origin

annotat = Blueprint('annotat', __name__)

@annotat.route('/addannotationtotrack', methods=['POST'])
@cross_origin()
@jwt_required()
def addannotationtotrack():

    user_auth = current_user.id
    rjson = request.get_json()
    track_uid = rjson.get("track_uid", None)   
    annot_key = rjson.get("key", None)
    annot_value = rjson.get("value", None)
  
    return jsonify({"ok":True})
