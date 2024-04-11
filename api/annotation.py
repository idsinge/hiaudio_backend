from flask import Blueprint, request, jsonify
from flask_jwt_extended import current_user, jwt_required
from flask_cors import cross_origin
from orm import TrackAnnotation

annotat = Blueprint('annotat', __name__)

# def update_annotation(track_uid, annot_key, annot_value):
#     track_annotations = get_track_annotations(track_uid)
#     for annotation in track_annotations:
#         if annotation.key == annot_key:
#             annotation.value = annot_value
#             db.session.commit()
#             return True
#     return False


def get_track_annotations(track_uid):
    track_annotations = TrackAnnotation.query.filter_by(track_uid=track_uid).all()
    annotations_list = [{
            "annot_uuid": annotation.uuid,
            "key": annotation.key,
            "value": annotation.value
        }  for annotation in track_annotations]
    return annotations_list
