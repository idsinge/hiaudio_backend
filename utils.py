from flask_mail import Message

class UtilsSingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Utils(metaclass=UtilsSingletonMeta):

    def __init__(self, app, mail):
        self._app = app
        self._mail = mail   
 

    def sendeverificationcode(self, recipient, code):
        try:
            with self._app.app_context():
                msg = Message(subject='Your validation code', sender=('HiAudio', 'admin@hiaudio.fr'), recipients=[recipient])
                msg.body = "Please, use the following validation code to login: " + code
                self._mail.send(msg)
                return True
        except Exception as e:
            print(f"Failed to send email. Error: {e}")
            return False
    
    def sendinvitationemail(self, recipient, host, refusal_code):
        try:
            with self._app.app_context():
                msg = Message(subject='Invitation to Hi-Audio', sender=('HiAudio', 'admin@hiaudio.fr'), recipients=[recipient])
                html_content = f"""
                <html>
                    <head></head>
                    <body>
                        <p>Hi,</p>
                        <p>You have been invited to Hi-Audio Online Platform. Please register on the following link: https://{host}.<br>
                        </p>
                        <p>If you think this email was sent by mistake you can reject it by visiting: https://{host}/refusal.html and filling the form with your email plus the following refusal code: {refusal_code}</p>
                    </body>
                </html>
                """
                msg.html = html_content
                self._mail.send(msg)
                return True
        except Exception as e:
            print(f"Failed to send email. Error: {e}")
            return False