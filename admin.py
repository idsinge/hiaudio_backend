
from flask_admin import Admin, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from sqlalchemy import inspect
from api.auth import is_user_logged_in

from flask import url_for, redirect

from orm import *



def restrict_to_admins():
    user = is_user_logged_in()
    return user is not None and user.is_admin


class HiModelView(ModelView):
    column_display_pk = True
    column_auto_select_related = True
    column_display_all_relations = True

    def is_accessible(self):
        return restrict_to_admins()

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('index'))


    # force using all columns and relashionships
    # TODO: use prettier views for each model
    def scaffold_list_columns(self):

        insp = inspect(self.model)
        columns = [column.name for column in insp.c]
        rel_names = [rel.key for rel in insp.mapper.relationships]

        return columns +  rel_names



class HiAdminIndexView(AdminIndexView):

    def is_accessible(self):
        return restrict_to_admins()

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('index'))




class HiAdmin():

    def __init__(self, app, db):
        self._app = app
        self._db = db

        admin = Admin(app, name='hiadmin', template_mode='bootstrap3', index_view=HiAdminIndexView())

        admin.add_view(HiModelView(User, db.session, endpoint="_user"))
        admin.add_view(HiModelView(UserInfo, db.session))
        admin.add_view(HiModelView(Collection, db.session))
        admin.add_view(HiModelView(Composition, db.session))
        admin.add_view(HiModelView(Track, db.session, endpoint="_track"))
        admin.add_view(HiModelView(Contributor, db.session))
