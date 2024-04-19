from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin
from orm import db, TrackAnnotation
from utils import Utils

annotat = Blueprint('annotat', __name__)

RESERVED_WORDS = ["title", "performer", "instrument", "comment", "recorded_at", "recording_date"]

ERROR_404 = "annotation not found"

@annotat.route('/deleteannotation/<string:uuid>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def deleteannotation(uuid):
    from api.track import performauthactionontrack
    annotation = TrackAnnotation.query.filter_by(uuid=uuid).first()

    if(annotation is None):
        return jsonify({"ok":False, "error":ERROR_404})
    else:
        isok, result = performauthactionontrack(annotation.track_uid, ERROR_404)
        if(isok):
            db.session.delete(annotation)
            db.session.commit()
            return jsonify({"ok":True, "result":f"{annotation.uuid} deleted successfully"})
        else:
            return jsonify({"ok":False, "error":result})

@annotat.route('/updateannotation', methods=['PATCH'])
@jwt_required()
@cross_origin()
def updateannotation():
    rjson = request.get_json()
    annotation_uid = rjson.get("uuid", None)
    from api.track import performauthactionontrack
    
    annotation = TrackAnnotation.query.filter_by(uuid=annotation_uid).first()

    if(annotation is None):
        return jsonify({"ok":False, "error":ERROR_404})
    else:
        isok, result = performauthactionontrack(annotation.track_uid, ERROR_404)
        if(isok):
            updates, err_updt = handle_update_track_annotation(annotation.track_uid, rjson)
            if(updates == 1):
                return jsonify({"ok":True, "result":f"{annotation.uuid} updated successfully", "error":err_updt})
            else:
                return jsonify({"ok":False, "error":err_updt})
        else:
            return jsonify({"ok":False, "error":result})    

@annotat.route('/createannotation', methods=['POST'])
@jwt_required()
@cross_origin()
def createannotation():
    rjson = request.get_json()
    track_uid = rjson.get("track_uid", None)
    from api.track import performauthactionontrack

    if(track_uid is None):
        return jsonify({"ok":False, "error":"Track UUID is missing"})
    else:
        isok, result = performauthactionontrack(track_uid, "Track Not Found")
        if(isok):
            creates, err_creat, new_annot = handle_new_track_annotation(track_uid, rjson)
            if(creates == 1):
                return jsonify({"ok":True, "result":"Annotation created successfully", "annotation":new_annot.to_dict(rules=('-id',))})
            else:
                return jsonify({"ok":False, "error":err_creat})
        else:
            return jsonify({"ok":False, "error":result})
    

def remove_duplicate_uuids(annotations):
    unique_annotations = {}
    for annotation in reversed(annotations):
        uuid = annotation.get('uuid')
        if uuid:
            unique_annotations[uuid] = annotation
        else:
            unique_annotations[id(annotation)] = annotation
    return list(reversed(unique_annotations.values()))


def update_track_annotations(track_uid, track_annotations):    
    annotations_updated = 0
    annotations_created = 0
    errors = []
    cleaned_annotations = remove_duplicate_uuids(track_annotations)
    for annotation in cleaned_annotations:
        if(annotation.get('uuid')) is not None:
            updates, err_updt = handle_update_track_annotation(track_uid, annotation)
            if(updates == 1):
                annotations_updated += 1
            if(err_updt is not None):
                errors.append(err_updt)
        else:
            creates, err_new, _ = handle_new_track_annotation(track_uid, annotation)
            if(creates == 1):
                annotations_created += 1
            else:
                errors.append(err_new)

    return annotations_updated, annotations_created, errors

def upgrade_only_key(track_annotation, annotation):
    if(track_annotation.custom_added and annotation.get('key') not in RESERVED_WORDS):            
        setattr(track_annotation, "key", annotation.get('key'))
        db.session.commit()
        return 1, None
    else:
        return 0, f"'{track_annotation.uuid}': key is a reserved word"
    
def upgrade_value_with_key(track_annotation, annotation):
    err_succ = None
    if(annotation.get('key') is not None):
       
        if(track_annotation.custom_added and  annotation.get('key') not in RESERVED_WORDS):
            setattr(track_annotation, "key", annotation.get('key'))
        else:
            err_succ = f"'{track_annotation.uuid}': key is a reserved word"
    
    setattr(track_annotation, "value", annotation.get('value'))
    db.session.commit()           
    return 1, err_succ
    
def handle_update_track_annotation(track_uid, annotation):
    annotation_uid = annotation.get('uuid')
    track_annotation = TrackAnnotation.query.filter_by(uuid=annotation_uid).first()
    if(track_annotation is not None and (track_uid == track_annotation.track_uid)):
        if(annotation.get('value') is not None):
           return upgrade_value_with_key(track_annotation, annotation)

        elif((annotation.get('key') is not None) and (annotation.get('value') is None)):
            return upgrade_only_key(track_annotation, annotation)                
        else:         
            return 0, f"'{annotation_uid}': key and/or value info missing for update annotation"
    else:        
        return 0, f"'{annotation_uid}': track annotation not found or different from track provided in annotation update"
    

def handle_new_track_annotation(track_uid, annotation):
     
    if (annotation.get('key') is not None and annotation.get('value') is not None):
        annotation_key = annotation.get('key').strip()
        is_key_there = TrackAnnotation.query.filter_by(key=annotation_key, track_uid=track_uid).first()
        if(is_key_there is None):
            custom_added_is = True
            if(annotation_key in RESERVED_WORDS):
                custom_added_is = False
    
            annotation_value = annotation.get('value')
            annotation_uuid = Utils().generate_unique_uuid(TrackAnnotation, 'uuid')
            new_track_annotation = TrackAnnotation(key=annotation_key,
                                                    value=annotation_value,
                                                    track_uid=track_uid,
                                                    uuid=annotation_uuid,
                                                    custom_added=custom_added_is)
            db.session.add(new_track_annotation)
            db.session.commit()
            return 1, None, new_track_annotation
        else:
            return 0, f"'{annotation_key}': key already set for track in new annotation", None
    else:        
        return 0, f"'{track_uid}': missing key and / or value for new annotation", None

def get_track_annotations(track_uid):
    track_annotations = TrackAnnotation.query.filter_by(track_uid=track_uid).all()
    annotations_list = [{
            "uuid": annotation.uuid,
            "key": annotation.key,
            "value": annotation.value,
            "custom_added": annotation.custom_added
        }  for annotation in track_annotations]
    return annotations_list

