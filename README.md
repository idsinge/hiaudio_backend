# Hi-Audio Backend

## About

Hi-Audio online platform is a collaborative web application for musicians and researchers in the MIR (Music Information Retrieval) domain, with a view to build a public database of music recordings from a wide variety of styles and different cultures. It allows:

- Creating musical compositions and collections with different levels of privacy.
- Uploading and recording audio tracks from the browser.
- Annotating audio tracks with relevant MIR information.
- Inviting collaborators to participate using different roles.

![screenshot](doc/screenshot.png)

This repo contains information relative to the server side or back-end, for the client side (web application) see Note 1.

## Getting Started

> **Recommended Python version: 3.10** — [installation guide (macOS)](https://github.com/idsinge/hiaudio_backend/wiki/Manually-install-Python-3.10-(macOS))

### Clone or download the repository
```bash
git clone --depth=1 https://github.com/idsinge/hiaudio_backend.git

cd hiaudio_backend
```
### (Linux and macOS) Create and activate Python environment 
```bash
python3 -m venv venv

. venv/bin/activate
```

### (Windows) Create and activate Python environment 
```bash
python -m venv venv

venv\Scripts\activate
```

### Install requirements
```bash
pip install -r requirements.txt
```

### Create .env file with the following content
```env
# Google Values: https://console.cloud.google.com/apis/credentials
# See Note 2 for more info about Google OAuth 2.0 clients
# SECRET_KEY is independent and can be self-elected
# JWT_SECRET_KEY: https://flask-jwt-extended.readthedocs.io/en/stable/options.html#JWT_SECRET_KEY
GOOGLE_CLIENT_ID=*****
GOOGLE_CLIENT_SECRET=*****
SECRET_KEY=*****
JWT_SECRET_KEY=*****
```

### Duplicate `config.py.sample` and rename it to `config.py`

### Initialize the DB for the first time and run the app:
```bash
python initdb.py

# Run the local server
python app.py
```

Then open https://localhost:7007/ in your browser to verify it's running.

## Notes

1. [Web App Repo](https://github.com/idsinge/hiaudio_webapp) — [frontend + backend dev instructions](https://github.com/idsinge/hiaudio_backend/wiki/Working-with-the-frontend-and-backend-at-the-same-time-for-development)
2. [How to configure Google OAuth](https://github.com/idsinge/hiaudio_backend/wiki/Create-a-Google-OAuth-2.0-Client)
3. [Using MySQL instead of SQLite](https://github.com/idsinge/hiaudio_backend/wiki/Using-MySQL-by-default-instead-of-SQLite)
4. [Activate the email feature](https://github.com/idsinge/hiaudio_backend/wiki/Activate-email-exchange-feature)
5. [Run the audio compression module](https://github.com/idsinge/hiaudio_backend/wiki/Audio-compression-module)
6. [Run the audio processing module](https://github.com/idsinge/hiaudio_backend/wiki/Audio-processing-module)

---

## Acknowledgments

The Hi-Audio platform is developed as part of the project *Hybrid and Interpretable Deep Neural Audio Machines*, funded by the **European Research Council (ERC)** under the European Union's Horizon Europe research and innovation programme (grant agreement No. 101052978).

<img src="./doc/ERC_logo.png" alt="European Research Council logo" width="250"/>

---

## How to Cite

If you use or reference the data or findings from this repository, please cite the published journal article. You may also cite the repository directly.

> Gil Panal, J. M., David, A., & Richard, G. (2026). The Hi-Audio online platform for recording and distributing multi-track music datasets. *Journal on Audio, Speech, and Music Processing*. https://doi.org/10.1186/s13636-026-00459-0

**BibTeX:**

```bibtex
@article{GilPanal2026,
  author  = {Gil Panal, Jos{\'e} M. and David, Aur{\'e}lien and Richard, Ga{\"e}l},
  title   = {The Hi-Audio online platform for recording and distributing multi-track music datasets},
  journal = {Journal on Audio, Speech, and Music Processing},
  year    = {2026},
  issn    = {3091-4523},
  doi     = {10.1186/s13636-026-00459-0},
  url     = {https://doi.org/10.1186/s13636-026-00459-0}
}
```

A preprint version is also available at: [https://hal.science/hal-05153739](https://hal.science/hal-05153739)

**Repository citation:**

> Gil Panal, J. M., David, A., & Richard, G. (2026). *Hi-Audio Backend* [Software repository]. GitHub. https://github.com/idsinge/hiaudio_backend

```bibtex
@misc{GilPanal2026backend,
  author = {Gil Panal, Jos{\'e} M. and David, Aur{\'e}lien and Richard, Ga{\"e}l},
  title  = {Hi-Audio Backend},
  year   = {2026},
  url    = {https://github.com/idsinge/hiaudio_backend}
}
```

---

## License

This project is licensed under the [MIT License](LICENSE.md).  
Copyright (c) 2022 Hi-Audio.