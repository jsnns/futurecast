FROM python:3.7-alpine
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt
COPY . /app

ENV FLASK_APP=api
ENV FLASK_DEBUG=1

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]