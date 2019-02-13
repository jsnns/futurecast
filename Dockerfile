FROM python:3.7-alpine
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt
COPY . /app

ENV FLASK_APP=api

CMD ["python", "-m", "api"]