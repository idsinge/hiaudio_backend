from flask_mail import Message
from flask import render_template_string
import shortuuid

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
                html_template = """
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                            color: #333;
                        }
                        .container {
                            width: 60%;
                            margin: auto;
                            overflow: hidden;
                        }
                        .header {
                            background: #0275e3;
                            color: #fff;
                            padding: 10px 0;
                            text-align: center;
                        }
                        .content {
                            padding: 20px;
                            background: #fff;
                            margin-top: 10px;
                            border-radius: 5px;
                        }
                        .footer {
                            background: #0275e3;
                            color: #fff;
                            text-align: center;
                            padding: 10px 0;
                            margin-top: 10px;
                            border-radius: 5px;
                        }
                        .footer a { color: white; }
                        img {
                            max-width: 100%;
                            display: block;
							margin-left: auto;
							margin-right: auto;
                        }
                    </style>
                </head>
                <html>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Welcome to Hi-Audio</h1>
                                <cite>Where music is in hands of research</cite>
                            </div>
                            <div class="content">
                                <img src="cid:image1" alt="Invitation Image">
                                <h3>Hi,</h3>
                                <h4>You have been invited to collaborate at Hi-Audio Online Platform.</h4>
                                <h3><a href="https://{{host}}/login.html">Please register here</a><br></h3>
                            </div>
                            <div class="footer">
                                <p>&copy; 2024 Hi-Audio</p>
                                <p><a href="https://{{host}}/refusal.html?code={{refusal_code}}">Unregister here</a></p>
                            </div>
                        </div>
                    </body>
                </html>
                """
                msg.html = render_template_string(html_template, host=host, refusal_code=refusal_code)

                with self._app.open_resource("static/tryhiaudio.jpg") as fp:
                    # For Flask-Mail v0.10.0
                    # msg.attach("tryhiaudio.jpg", "image/jpeg", fp.read(), headers={"Content-ID": "<image1>"})
                    # For Flask-Mail v0.9.1
                    msg.attach("tryhiaudio.jpg", "image/jpeg", fp.read(), headers=[('Content-ID', '<image1>')])
                
                self._mail.send(msg)
                return True
        except Exception as e:
            print(f"Failed to send email. Error: {e}")
            return False
    
    def generate_unique_uuid(self, table, fieldname):

        uuid = shortuuid.uuid()
        if not table.query.filter_by(**{fieldname: uuid}).first():
            return uuid