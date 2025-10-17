import shortuuid

class UtilsSingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Utils(metaclass=UtilsSingletonMeta):

    def __init__(self, app):
        self._app = app
    
    def generate_unique_uuid(self, table, fieldname):

        uuid = shortuuid.uuid()
        if not table.query.filter_by(**{fieldname: uuid}).first():
            return uuid